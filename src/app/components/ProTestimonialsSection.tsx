import { BadgeCheck, Building2, Quote, Star, Trophy, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: 'Marcos Vieira',
    role: 'Treinador de base, licença CBF B',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop',
    quote: 'O que mais ajuda um jovem em avaliação é chegar com fundamentos, rotina e informações organizadas.',
    proof: '12 anos em escolas de futebol e categorias Sub-13 a Sub-17.',
  },
  {
    id: 2,
    name: 'Ana Paula Mendes',
    role: 'Preparadora física e fisiologista',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop',
    quote: 'Treinar mais não significa treinar melhor. Idade, recuperação e prevenção precisam fazer parte do plano.',
    proof: 'Especialista em desenvolvimento motor e prevenção de lesões na base.',
  },
  {
    id: 3,
    name: 'Rafael Costa',
    role: 'Analista de desempenho',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
    quote: 'Vídeos curtos, contexto de jogo e dados simples ajudam olheiros a entenderem melhor o atleta.',
    proof: 'Atua com relatórios técnicos, vídeo-análise e scout juvenil.',
  },
];

const trustNumbers = [
  { icon: UserCheck, label: 'Treinadores com currículo publicado' },
  { icon: Building2, label: 'Parceiros exibidos apenas com identificação institucional' },
  { icon: BadgeCheck, label: 'Depoimentos e histórias reais sujeitos à autorização' },
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
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Star className="h-4 w-4 text-primary fill-primary" />
            <span className="text-sm font-semibold text-primary">CREDIBILIDADE VERIFICÁVEL</span>
          </div>
          <h2 className="mb-4">Instrutores próprios, parceiros reais e provas claras</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Nomes, imagens e frases famosas só devem aparecer com autorização. Aqui a confiança vem de profissionais identificados,
            experiência publicada e regras transparentes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative h-full bg-card rounded-xl border border-border/50 p-6 hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10"
            >
              <Quote className="absolute top-4 right-4 h-12 w-12 text-primary/10" />

              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30"
                />
                <div>
                  <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                  <p className="text-xs text-primary font-medium">{testimonial.role}</p>
                </div>
              </div>

              <blockquote className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                "{testimonial.quote}"
              </blockquote>

              <div className="pt-4 border-t border-border/50">
                <p className="text-xs font-semibold text-primary mb-2">EXPERIÊNCIA:</p>
                <p className="text-sm text-foreground leading-relaxed">{testimonial.proof}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {trustNumbers.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-xl border border-border bg-card p-5 flex gap-3 items-start">
                <Icon className="h-6 w-6 text-primary shrink-0" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-10 text-center"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent border border-border">
            <Trophy className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              Página Sobre Nós com treinadores, certificados, parceiros, histórias e critérios de validação.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
