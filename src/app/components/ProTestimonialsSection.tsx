import { Quote, Star } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: 'Ronaldo Fenômeno',
    role: 'Bicampeão Mundial pela Seleção Brasileira',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=150&h=150&fit=crop',
    quote: 'O talento te leva longe, mas a dedicação e o treinamento correto te fazem lenda. Nunca pare de aprender e buscar melhorar a cada dia.',
    tip: 'Treine com intensidade, mas sempre ouça seu corpo. A recuperação é tão importante quanto o treino.'
  },
  {
    id: 2,
    name: 'Tite',
    role: 'Ex-Técnico da Seleção Brasileira',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    quote: 'Um jogador completo não domina apenas a técnica, mas entende o jogo taticamente. Estude futebol como você estuda para a escola.',
    tip: 'Assista jogos com olhar analítico. Observe não apenas quem tem a bola, mas todo o posicionamento da equipe.'
  },
  {
    id: 3,
    name: 'Formiga',
    role: 'Campeã Mundial e Medalhista Olímpica',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    quote: 'Acredite no seu potencial mesmo quando ninguém mais acreditar. Minha jornada foi cheia de desafios, mas a persistência me trouxe até aqui.',
    tip: 'Trabalhe sua mentalidade todos os dias. A confiança vem da preparação, não da sorte.'
  },
  {
    id: 4,
    name: 'Carlos Alberto Parreira',
    role: 'Técnico Campeão do Mundo 1994',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
    quote: 'O futebol moderno exige jogadores inteligentes. Não basta ter habilidade, você precisa saber quando e como usar cada recurso.',
    tip: 'Seja versátil. O mercado valoriza jogadores que podem atuar em múltiplas posições e sistemas táticos.'
  },
  {
    id: 5,
    name: 'Marta',
    role: '6x Melhor Jogadora do Mundo FIFA',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop',
    quote: 'Vim de uma realidade humilde e transformei minha vida através do futebol. O sonho é possível para quem trabalha por ele todos os dias.',
    tip: 'Cuide da sua nutrição e sono. Seu corpo é sua ferramenta de trabalho e precisa estar sempre em condições ideais.'
  },
  {
    id: 6,
    name: 'Muricy Ramalho',
    role: 'Tri-Campeão Brasileiro como Técnico',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    quote: 'Talento individual importa, mas o trabalho coletivo vence campeonatos. Aprenda a ser um jogador de equipe desde cedo.',
    tip: 'Respeite todos os profissionais do clube - do presidente ao roupeiro. Humildade abre portas no futebol.'
  }
];

export function ProTestimonialsSection() {
  return (
    <section className="py-20 relative overflow-hidden border-y border-border/50">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/10 via-transparent to-accent/10" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-primary">CONSELHO DE CAMPEÕES</span>
          </div>
          <h2 className="mb-4">Aprenda com os Melhores</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dicas e conselhos de ex-jogadores profissionais e técnicos de elite que chegaram ao topo do futebol mundial
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative h-full bg-card rounded-2xl border border-border/50 p-6 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
                <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />

                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-primary-foreground fill-primary-foreground" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                    <p className="text-xs text-primary font-medium">{testimonial.role}</p>
                  </div>
                </div>

                <blockquote className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-xs font-semibold text-primary mb-2">💡 DICA DE OURO:</p>
                  <p className="text-sm text-foreground leading-relaxed">
                    {testimonial.tip}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent border border-border">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              Mais de <span className="text-primary font-bold">200 profissionais</span> compartilhando conhecimento na plataforma
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Trophy({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}
