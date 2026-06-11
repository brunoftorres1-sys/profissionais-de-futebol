import { Building2, CheckCircle2, HelpCircle, LockKeyhole, Mail, MessageCircle, ShieldCheck, UserCheck, UsersRound } from 'lucide-react';

interface InfoPageProps {
  type: 'support' | 'about' | 'parents' | 'clubs' | 'legal';
  onCreateProfile: () => void;
}

const Card = ({ Icon, title, text }: { Icon: typeof ShieldCheck; title: string; text: string }) => (
  <div className="bg-card border border-border rounded-xl p-6">
    <Icon className="h-8 w-8 text-primary mb-4" />
    <h3 className="mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
  </div>
);

export function InfoPage({ type, onCreateProfile }: InfoPageProps) {
  if (type === 'support') {
    return (
      <main className="py-14">
        <div className="container mx-auto px-4">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Suporte</span>
          <h1 className="mt-2 mb-4">Ajuda para atletas, responsáveis e treinadores</h1>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Central para tirar dúvidas sobre cadastro, treinos, perfil esportivo, peneiras, segurança dos dados e contato.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            <Card Icon={HelpCircle} title="Central de ajuda" text="Guias rápidos para criar perfil, enviar vídeos, montar histórico e se inscrever em testes." />
            <Card Icon={MessageCircle} title="WhatsApp e contato" text="Atendimento em horário comercial para responsáveis, atletas, treinadores e parceiros." />
            <Card Icon={Mail} title="FAQ" text="Respostas sobre idade mínima, autorização, custos, avaliação, oportunidades e uso de imagem." />
          </div>
          <div className="mt-8 rounded-xl border border-border bg-card p-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div>
              <h2 className="text-xl mb-1">Precisa montar seu perfil?</h2>
              <p className="text-sm text-muted-foreground">Comece pelo cadastro e complete a avaliação inicial.</p>
            </div>
            <button onClick={onCreateProfile} className="px-5 py-3 rounded-lg bg-primary text-primary-foreground font-bold">
              Criar perfil
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (type === 'about') {
    return (
      <main className="py-14">
        <div className="container mx-auto px-4">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Sobre o FuturoCraque</span>
          <h1 className="mt-2 mb-4">Uma plataforma para organizar a formação do jovem atleta</h1>
          <p className="text-muted-foreground max-w-3xl mb-8">
            O objetivo é democratizar acesso a treinamento, orientação e apresentação profissional, conectando atletas
            preparados a oportunidades verificadas, sempre com responsabilidade.
          </p>
          <div className="grid md:grid-cols-3 gap-5 mb-10">
            <Card Icon={Building2} title="Clubes e parceiros" text="Espaço para publicar oportunidades verificadas, requisitos, canais institucionais e critérios de avaliação." />
            <Card Icon={UserCheck} title="Treinadores" text="Profissionais identificados por especialidade, currículo, experiência, certificados e área de atuação." />
            <Card Icon={CheckCircle2} title="Histórias reais" text="Depoimentos de alunos e números publicados apenas com fonte, contexto e autorização de uso." />
          </div>
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-xl mb-4">Critérios de credibilidade</h2>
            <div className="grid md:grid-cols-2 gap-3">
              {['Nenhum uso de imagem ou frase famosa sem autorização formal.', 'Números de alunos, aprovações e parceiros precisam ter fonte.', 'Instrutores exibem experiência, certificados e contato institucional.', 'O site informa que não garante contrato, aprovação ou vaga em clube.'].map((item) => (
                <div key={item} className="flex gap-3 rounded-lg bg-muted/30 p-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    );
  }

  if (type === 'parents') {
    return (
      <main className="py-14">
        <div className="container mx-auto px-4">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Pais e responsáveis</span>
          <h1 className="mt-2 mb-4">Segurança, autorização e acompanhamento familiar</h1>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Menores de idade precisam de acompanhamento real. A plataforma registra consentimento, contato do responsável,
            uso de imagem, documentos e status de inscrições.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            <Card Icon={ShieldCheck} title="Consentimento obrigatório" text="Cadastro, vídeos e inscrição em peneiras pedem confirmação do responsável legal." />
            <Card Icon={UsersRound} title="Painel para família" text="Responsáveis acompanham treinos, metas, progresso, prazos e convocações." />
            <Card Icon={LockKeyhole} title="Controle de dados" text="Privacidade, exclusão de dados e autorização de imagem seguem finalidade clara." />
          </div>
        </div>
      </main>
    );
  }

  if (type === 'clubs') {
    return (
      <main className="py-14">
        <div className="container mx-auto px-4">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Clubes e olheiros</span>
          <h1 className="mt-2 mb-4">Perfis esportivos organizados para avaliação</h1>
          <p className="text-muted-foreground max-w-3xl mb-8">
            Clubes, escolinhas e avaliadores podem divulgar oportunidades com requisitos transparentes e receber perfis
            com dados, vídeos, histórico, estatísticas e contato do responsável.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            <Card Icon={Building2} title="Publicar peneiras" text="Calendário com estado, cidade, idade, posição, requisitos, vagas e status de inscrição." />
            <Card Icon={UserCheck} title="Analisar atletas" text="Perfil público com posição, pé dominante, altura, peso, vídeos, histórico e estatísticas." />
            <Card Icon={CheckCircle2} title="Processo transparente" text="Retornos por status: inscrito, aguardando, aprovado e não selecionado, sem promessa falsa." />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="py-14">
      <div className="container mx-auto px-4">
        <span className="text-sm font-bold text-primary uppercase tracking-wide">Termos, LGPD e privacidade</span>
        <h1 className="mt-2 mb-4">Regras claras para proteger atletas e responsáveis</h1>
        <p className="text-muted-foreground max-w-3xl mb-8">
          Esta página resume os pontos jurídicos que devem estar formalizados na versão final do site e nos documentos oficiais.
        </p>

        <div className="grid lg:grid-cols-2 gap-5">
          <Card Icon={ShieldCheck} title="Autorização dos responsáveis" text="Atletas menores precisam de consentimento do responsável legal para cadastro, inscrições, contato e uso de imagem." />
          <Card Icon={LockKeyhole} title="Privacidade e LGPD" text="Dados pessoais, vídeos e contatos devem ter finalidade clara, controle de acesso, opção de correção e exclusão." />
          <Card Icon={Mail} title="Comunicação segura" text="Convocações e retornos de peneiras devem acontecer por canais oficiais, sem promessas de aprovação." />
          <Card Icon={CheckCircle2} title="Termos de uso" text="A plataforma oferece preparação e organização. Ela não garante contrato, aprovação ou vaga em clube." />
        </div>
      </div>
    </main>
  );
}
