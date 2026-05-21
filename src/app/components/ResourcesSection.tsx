import { BookOpen, Video, Users, FileText } from 'lucide-react';

export function ResourcesSection() {
  const resources = [
    {
      id: 1,
      icon: Video,
      title: 'Biblioteca de Vídeos',
      description: 'Acesso a mais de 500 vídeos de treinos e análises táticas',
      link: '#',
    },
    {
      id: 2,
      icon: BookOpen,
      title: 'Guias e E-books',
      description: 'Material didático completo para estudar no seu ritmo',
      link: '#',
    },
    {
      id: 3,
      icon: Users,
      title: 'Comunidade',
      description: 'Conecte-se com outros aspirantes e troque experiências',
      link: '#',
    },
    {
      id: 4,
      icon: FileText,
      title: 'Planos de Treino',
      description: 'Rotinas personalizadas baseadas no seu nível e objetivos',
      link: '#',
    },
  ];

  return (
    <section id="recursos" className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-2">Recursos Exclusivos</h2>
          <p className="text-muted-foreground">Ferramentas para acelerar seu desenvolvimento</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <a
                key={resource.id}
                href={resource.link}
                className="group bg-card rounded-xl border p-6 hover:shadow-lg hover:border-primary/50 transition-all"
              >
                <div className="mb-4 p-3 rounded-lg bg-primary/10 w-fit">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="mb-2 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>
              </a>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary/10 via-accent/20 to-primary/10 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="mb-4">Pronto para começar sua jornada?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Junte-se a milhares de aspirantes que estão transformando seu sonho em realidade. Comece gratuitamente hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              Criar Conta Grátis
            </button>
            <button className="px-8 py-3 rounded-lg border border-border bg-background hover:bg-accent transition-colors">
              Ver Demonstração
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
