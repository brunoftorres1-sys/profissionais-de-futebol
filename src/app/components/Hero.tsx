import { Play, Star, Users, ClipboardCheck } from 'lucide-react';

interface HeroProps {
  onNavigateToTrials: () => void;
}

export function Hero({ onNavigateToTrials }: HeroProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/50 mb-6">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm">Mais de 10.000 aspirantes treinando</span>
          </div>

          <h1 className="mb-6">
            Transforme seu sonho em <span className="text-primary">realidade profissional</span>
          </h1>

          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Aprenda com especialistas, desenvolva suas habilidades técnicas e táticas, e conquiste as ferramentas necessárias para se tornar um jogador profissional de futebol.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-xl shadow-primary/30 flex items-center gap-2 font-bold text-lg">
              Começar Gratuitamente
              <Play className="h-5 w-5" />
            </button>
            <button
              onClick={onNavigateToTrials}
              className="px-8 py-4 rounded-lg border-2 border-primary hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-2 font-bold text-lg"
            >
              <ClipboardCheck className="h-5 w-5" />
              Inscrever-se em Testes
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t">
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">150+</div>
              <div className="text-sm text-muted-foreground">Vídeo Aulas</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Treinadores Profissionais</div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="text-3xl font-bold text-primary">1000+</div>
              <div className="text-sm text-muted-foreground">Jogadores Formados</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
