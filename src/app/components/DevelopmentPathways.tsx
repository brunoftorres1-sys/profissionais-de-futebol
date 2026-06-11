import { Activity, Brain, Goal, HeartPulse, Map, ShieldCheck } from 'lucide-react';

const ageTracks = ['Sub-9', 'Sub-11', 'Sub-13', 'Sub-15', 'Sub-17', 'Sub-20'];
const positions = ['Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Ponta', 'Atacante'];
const modules = [
  { icon: Goal, title: 'Técnica', text: 'Domínio, passe, condução, finalização, drible e tomada de decisão com bola.' },
  { icon: Map, title: 'Tática', text: 'Posicionamento, leitura de jogo, compactação, transições e funções por posição.' },
  { icon: Activity, title: 'Físico', text: 'Velocidade, resistência, força, mobilidade e prevenção de lesões.' },
  { icon: Brain, title: 'Mental', text: 'Confiança, foco, disciplina, rotina, estudo do jogo e comportamento competitivo.' },
  { icon: HeartPulse, title: 'Nutrição e recuperação', text: 'Sono, hidratação, alimentação pré-treino e recuperação segura.' },
  { icon: ShieldCheck, title: 'Conduta profissional', text: 'Pontualidade, respeito, redes sociais, comunicação e postura em avaliações.' },
];

export function DevelopmentPathways() {
  return (
    <section id="trilhas" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-sm font-bold text-primary uppercase tracking-wide">Trilhas por idade e posição</span>
          <h2 className="mt-2 mb-3">Treino certo para cada fase da base</h2>
          <p className="text-muted-foreground">
            Um site profissional não trata todos os jovens igual. A evolução muda conforme idade, maturação,
            posição em campo e objetivo competitivo.
          </p>
        </div>

        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          <div className="space-y-5">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="mb-4">Categorias</h3>
              <div className="flex flex-wrap gap-2">
                {ageTracks.map((track) => (
                  <span key={track} className="px-3 py-2 rounded-lg bg-primary/10 text-primary font-semibold text-sm">
                    {track}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="mb-4">Posições</h3>
              <div className="flex flex-wrap gap-2">
                {positions.map((position) => (
                  <span key={position} className="px-3 py-2 rounded-lg bg-accent text-sm font-medium">
                    {position}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <div key={module.title} className="bg-card border border-border rounded-xl p-5">
                  <Icon className="h-7 w-7 text-primary mb-3" />
                  <h3 className="text-lg mb-2">{module.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{module.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
