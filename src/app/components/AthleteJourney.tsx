import { ClipboardList, Dumbbell, LineChart, Share2, ShieldCheck, Trophy } from 'lucide-react';

interface AthleteJourneyProps {
  onCreateProfile: () => void;
  onNavigateToTrials: () => void;
}

const steps = [
  {
    icon: ClipboardList,
    title: '1. Avaliação inicial',
    description: 'O atleta informa idade, posição, cidade, histórico, rotina de treino e objetivos.',
  },
  {
    icon: Dumbbell,
    title: '2. Plano personalizado',
    description: 'A plataforma indica trilhas técnicas, físicas, táticas e mentais por fase de desenvolvimento.',
  },
  {
    icon: LineChart,
    title: '3. Evolução acompanhada',
    description: 'Metas semanais, presença em treinos, conquistas e vídeos de progresso ficam organizados no painel.',
  },
  {
    icon: Share2,
    title: '4. Perfil esportivo',
    description: 'O jovem monta um currículo com dados, vídeos, posição, estatísticas e contato do responsável.',
  },
  {
    icon: Trophy,
    title: '5. Testes e oportunidades',
    description: 'Peneiras filtradas por idade, cidade, posição e nível mostram requisitos e status de inscrição.',
  },
  {
    icon: ShieldCheck,
    title: '6. Segurança para menores',
    description: 'Consentimento dos responsáveis, avisos claros e política de privacidade fazem parte da jornada.',
  },
];

export function AthleteJourney({ onCreateProfile, onNavigateToTrials }: AthleteJourneyProps) {
  return (
    <section id="jornada" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-10">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Jornada do atleta</span>
          <h2 className="mt-2 mb-3">Um caminho claro para sair do sonho e entrar no plano</h2>
          <p className="text-muted-foreground">
            O FuturoCraque organiza a evolução do jovem atleta em etapas simples, com treino, acompanhamento,
            perfil esportivo e oportunidades verificadas em um só lugar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="bg-card border border-border rounded-xl p-6">
                <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCreateProfile}
            className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors"
          >
            Criar perfil de atleta
          </button>
          <button
            onClick={onNavigateToTrials}
            className="px-6 py-3 rounded-lg border border-border bg-background font-bold hover:bg-accent transition-colors"
          >
            Ver peneiras disponíveis
          </button>
        </div>
      </div>
    </section>
  );
}
