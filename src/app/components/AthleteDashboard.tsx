import { BarChart3, CalendarCheck, CheckCircle2, ClipboardList, Dumbbell, ExternalLink, FileVideo, Flag, ShieldCheck, Target, Trophy, UserRound } from 'lucide-react';
import { useState } from 'react';
import type { AthleteSummary } from '../App';
import { logger } from '../../lib/logger';
import {
  listNotifications,
  listUploadedVideos,
  markNotificationRead,
  saveUploadedVideo,
  type NotificationItem,
  type UploadedVideo,
} from '../../lib/platform';
import { getSupabaseConfigStatus, uploadVideoToStorage } from '../../lib/supabase';

interface AthleteDashboardProps {
  athlete: AthleteSummary;
  onNavigateToTrials: () => void;
}

const weeklyPlan = [
  { day: 'Seg', task: 'Dominio orientado + passe curto', status: 'Concluido' },
  { day: 'Ter', task: 'Velocidade, forca e finalizacao', status: 'Hoje' },
  { day: 'Qua', task: 'Video-analise e recuperacao', status: 'Pendente' },
  { day: 'Qui', task: 'Treino por posicao', status: 'Pendente' },
  { day: 'Sex', task: 'Jogo reduzido + tomada de decisao', status: 'Pendente' },
];

const goals = [
  'Enviar 2 videos de lances ate sexta',
  'Completar avaliacao fisica mensal',
  'Atualizar historico de campeonatos',
  'Escolher 3 peneiras compativeis',
];

const applications = [
  { club: 'Sao Paulo FC', category: 'Sub-15', date: '15/06/2026', status: 'Inscrito' },
  { club: 'Palmeiras', category: 'Sub-17', date: '22/06/2026', status: 'Aguardando analise' },
  { club: 'Flamengo', category: 'Sub-13', date: '28/06/2026', status: 'Nao selecionado' },
];

export function AthleteDashboard({ athlete, onNavigateToTrials }: AthleteDashboardProps) {
  const [profileMessage, setProfileMessage] = useState('');
  const [videos, setVideos] = useState<UploadedVideo[]>(() => listUploadedVideos());
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => listNotifications());
  const [uploadMessage, setUploadMessage] = useState('');
  const publicProfilePath = `/atleta/${athlete.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'perfil'}`;
  const publicProfileUrl = `${window.location.origin}${publicProfilePath}`;
  const roleLabel = athlete.role === 'coach' ? 'Treinador' : athlete.role === 'scout' ? 'Olheiro' : 'Atleta';

  const shareProfile = async () => {
    try {
      await navigator.clipboard.writeText(publicProfileUrl);
      setProfileMessage('Link publico copiado para area de transferencia.');
    } catch (error) {
      setProfileMessage(`Link publico: ${publicProfileUrl}`);
      logger.warn('Nao foi possivel copiar link publico', { context: 'AthleteDashboard', error });
    }
  };

  const uploadVideo = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('video/')) {
      setUploadMessage('Envie um arquivo de video valido.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setUploadMessage('O video precisa ter ate 100 MB nesta versao.');
      return;
    }

    const nextVideos = saveUploadedVideo(file);
    setVideos(nextVideos);

    if (!getSupabaseConfigStatus().configured) {
      setUploadMessage('Video salvo no painel local. Configure Supabase para enviar ao Storage em producao.');
      return;
    }

    try {
      const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, '-');
      await uploadVideoToStorage(file, `${athlete.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}/${crypto.randomUUID()}-${safeName}`);
      setUploadMessage('Video enviado para o Supabase Storage.');
    } catch (error) {
      setUploadMessage('Video salvo localmente, mas o envio ao Supabase falhou. Verifique bucket e politicas.');
      logger.error('Falha no upload Supabase Storage', { context: 'AthleteDashboard', error });
    }
  };

  return (
    <main className="py-10 bg-muted/20 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
          <div>
            <span className="text-sm font-bold text-primary uppercase tracking-wide">Area do {roleLabel.toLowerCase()}</span>
            <h1 className="mt-2 mb-2">Painel de evolucao de {athlete.name}</h1>
            <p className="text-muted-foreground max-w-3xl">
              Acompanhe avaliacao inicial, plano de treino, metas, videos, perfil publico, favoritos e notificacoes.
            </p>
          </div>
          <button
            onClick={onNavigateToTrials}
            className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
          >
            <Trophy className="h-5 w-5" />
            Ver peneiras disponiveis
          </button>
        </div>

        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-6 mb-6">
          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="h-20 w-20 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <UserRound className="h-10 w-10 text-primary" />
              </div>
              <div className="min-w-0">
                <h2 className="text-xl mb-1">{athlete.name}</h2>
                <p className="text-sm text-muted-foreground">{athlete.age} anos - {athlete.position} - {athlete.city}</p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="px-2 py-1 rounded bg-primary text-primary-foreground">Pe direito</span>
                  <span className="px-2 py-1 rounded bg-accent">1,71m - 61kg</span>
                  <span className="px-2 py-1 rounded bg-accent">{athlete.level}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                ['Videos', '6 enviados', FileVideo],
                ['Progresso', '68%', BarChart3],
                ['Metas', '4 ativas', Flag],
                ['Responsavel', athlete.guardian, ShieldCheck],
              ].map(([label, value, Icon]) => {
                const TypedIcon = Icon as typeof FileVideo;
                return (
                  <div key={label as string} className="rounded-lg border border-border bg-muted/30 p-4">
                    <TypedIcon className="h-5 w-5 text-primary mb-2" />
                    <p className="text-xs text-muted-foreground">{label as string}</p>
                    <p className="font-bold">{value as string}</p>
                  </div>
                );
              })}
            </div>

            <button
              onClick={shareProfile}
              className="mt-5 w-full px-4 py-3 rounded-lg border border-border font-bold hover:bg-accent transition-colors flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir link publico do perfil
            </button>
            {profileMessage && (
              <p className="mt-3 rounded-lg bg-primary/10 p-3 text-sm text-muted-foreground" role="status">
                {profileMessage}
              </p>
            )}
          </section>

          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <FileVideo className="h-6 w-6 text-primary" />
              <h2 className="text-xl">Upload de videos</h2>
            </div>
            <label className="block rounded-xl border border-dashed border-primary/40 bg-primary/10 p-5 text-center cursor-pointer hover:bg-primary/15">
              <input className="sr-only" type="file" accept="video/*" onChange={uploadVideo} />
              <span className="font-bold">Selecionar video de treino ou lance</span>
              <span className="mt-2 block text-sm text-muted-foreground">Formatos de video, ate 100 MB nesta versao.</span>
            </label>
            {uploadMessage && (
              <p className="mt-3 rounded-lg bg-primary/10 p-3 text-sm text-muted-foreground" role="status">{uploadMessage}</p>
            )}
            <div className="mt-4 space-y-2">
              {videos.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum video enviado ainda.</p>
              ) : videos.map((video) => (
                <div key={video.id} className="flex items-center justify-between gap-3 rounded-lg bg-muted/30 p-3 text-sm">
                  <span className="truncate">{video.name}</span>
                  <span className="shrink-0 text-muted-foreground">{Math.max(1, Math.round(video.size / 1024 / 1024))} MB</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <ClipboardList className="h-6 w-6 text-primary" />
              <h2 className="text-xl">Avaliacao inicial</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                ['Tecnica', '72%', 'Passe, dominio e finalizacao acima da media para a categoria.'],
                ['Fisico', '61%', 'Precisa evoluir forca de membros inferiores e resistencia.'],
                ['Tatica', '69%', 'Boa visao central, melhorar recomposicao defensiva.'],
              ].map(([title, score, text]) => (
                <div key={title} className="rounded-lg bg-muted/30 border border-border p-4">
                  <p className="text-sm text-muted-foreground">{title}</p>
                  <p className="text-2xl font-bold text-primary my-2">{score}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="grid xl:grid-cols-3 gap-6">
          <section className="xl:col-span-2 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Dumbbell className="h-6 w-6 text-primary" />
              <h2 className="text-xl">Plano de treino da semana</h2>
            </div>
            <div className="space-y-3">
              {weeklyPlan.map((item) => (
                <div key={item.day} className="grid grid-cols-[52px_1fr_auto] gap-3 items-center rounded-lg bg-muted/30 border border-border p-3">
                  <span className="h-10 w-10 rounded-lg bg-background border border-border flex items-center justify-center font-bold text-primary">{item.day}</span>
                  <span className="text-sm">{item.task}</span>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${item.status === 'Concluido' ? 'bg-primary text-primary-foreground' : 'bg-accent'}`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <Target className="h-6 w-6 text-primary" />
              <h2 className="text-xl">Metas atuais</h2>
            </div>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div key={goal} className="flex gap-3 text-sm rounded-lg bg-muted/30 border border-border p-3">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>{goal}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <ShieldCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl">Notificacoes</h2>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() => setNotifications(markNotificationRead(notification.id))}
                  className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${notification.read ? 'border-border bg-muted/20 text-muted-foreground' : 'border-primary/30 bg-primary/10'}`}
                >
                  <span className="block font-bold">{notification.title}</span>
                  <span>{notification.text}</span>
                </button>
              ))}
            </div>
          </section>

          <section className="xl:col-span-3 bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-5">
              <CalendarCheck className="h-6 w-6 text-primary" />
              <h2 className="text-xl">Status das inscricoes</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {applications.map((application) => (
                <div key={`${application.club}-${application.category}`} className="rounded-lg bg-muted/30 border border-border p-4">
                  <p className="font-bold">{application.club}</p>
                  <p className="text-sm text-muted-foreground">{application.category} - {application.date}</p>
                  <span className="mt-3 inline-flex px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {application.status}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
