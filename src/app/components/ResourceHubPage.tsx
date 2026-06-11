import { BookOpen, CalendarDays, MessageCircle, PlaySquare, Smartphone, Target, Users, Video } from 'lucide-react';

interface ResourceHubPageProps {
  onCreateProfile: () => void;
}

const resources = [
  { icon: Video, title: 'Biblioteca de vídeos', text: 'Treinos técnicos, análises táticas, exercícios por posição e exemplos de tomada de decisão.' },
  { icon: BookOpen, title: 'Guias e e-books', text: 'Materiais sobre rotina, nutrição, preparação mental, comportamento em peneiras e estudo do jogo.' },
  { icon: Target, title: 'Planos de treino', text: 'Rotinas semanais por idade, posição, nível e objetivo competitivo.' },
  { icon: MessageCircle, title: 'Comunidade', text: 'Espaço moderado para atletas trocarem experiências, dúvidas e evolução com segurança.' },
  { icon: CalendarDays, title: 'Calendário esportivo', text: 'Organização de treinos, avaliações, campeonatos, peneiras e prazos de inscrição.' },
  { icon: Smartphone, title: 'Checklist de avaliação', text: 'Lista prática para preparar documentos, vídeos, hidratação, descanso e chegada ao local.' },
];

export function ResourceHubPage({ onCreateProfile }: ResourceHubPageProps) {
  return (
    <main className="py-14">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Central de recursos</span>
          <h1 className="mt-2 mb-4">Tudo que o jovem atleta precisa para evoluir com método</h1>
          <p className="text-muted-foreground">
            Esta área reúne materiais, ferramentas e rotinas para transformar treino solto em desenvolvimento acompanhado.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5 mb-12">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div key={resource.title} className="bg-card border border-border rounded-xl p-6">
                <Icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{resource.text}</p>
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-[1fr_0.8fr] gap-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="mb-4">Modelo de semana ideal</h2>
            <div className="space-y-3">
              {['Segunda: técnica individual e mobilidade', 'Terça: força, velocidade e finalização', 'Quarta: estudo tático e recuperação', 'Quinta: treino por posição e tomada de decisão', 'Sexta: jogo reduzido e análise de vídeo', 'Sábado: amistoso, campeonato ou avaliação', 'Domingo: descanso, sono e planejamento'].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-muted/40 p-3">
                  <PlaySquare className="h-5 w-5 text-primary shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6">
            <Users className="h-8 w-8 text-primary mb-4" />
            <h2 className="mb-3">Comece pela avaliação inicial</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Com o perfil criado, a plataforma consegue indicar trilhas por idade, posição e objetivo.
            </p>
            <button
              onClick={onCreateProfile}
              className="w-full px-5 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
            >
              Criar perfil de atleta
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
