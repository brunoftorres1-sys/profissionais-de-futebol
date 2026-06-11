import { ClipboardCheck, Play, ShieldCheck, Star } from 'lucide-react';

interface HeroProps {
  onNavigateToTrials: () => void;
  onCreateProfile: () => void;
}

export function Hero({ onNavigateToTrials, onCreateProfile }: HeroProps) {
  return (
    <section className="relative py-18 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/15" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 mb-6">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm">Treino, perfil esportivo e peneiras em uma jornada clara</span>
          </div>

          <h1 className="mb-6">
            Monte seu caminho para ser visto no <span className="text-primary">futebol de base</span>
          </h1>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Cadastre o atleta, faça a avaliação inicial, receba um plano de treino por idade e posição,
            acompanhe a evolução e encontre testes com requisitos transparentes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onCreateProfile}
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center gap-2 font-bold text-lg"
            >
              Criar perfil de atleta
              <Play className="h-5 w-5" />
            </button>
            <button
              onClick={onNavigateToTrials}
              className="px-8 py-4 rounded-lg border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 font-bold text-lg"
            >
              <ClipboardCheck className="h-5 w-5" />
              Ver peneiras disponíveis
            </button>
          </div>

          <div className="mt-8 inline-flex items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-muted-foreground">
            <ShieldCheck className="h-5 w-5 text-amber-600 shrink-0" />
            O site organiza preparação e oportunidades. Não há promessa de aprovação, contrato ou vaga garantida.
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t">
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">6</div>
              <div className="text-sm text-muted-foreground">etapas de jornada</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">7</div>
              <div className="text-sm text-muted-foreground">posições com trilhas</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">com consentimento para menores</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
