import { Zap, Brain, Heart, Target } from 'lucide-react';

interface CategorySectionProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const categories = [
  { id: 'todos', label: 'Todos', icon: Target },
  { id: 'tecnica', label: 'Técnica', icon: Zap },
  { id: 'tatica', label: 'Tática', icon: Brain },
  { id: 'fisica', label: 'Física', icon: Heart },
  { id: 'mental', label: 'Mental', icon: Brain },
];

export function CategorySection({ activeTab, setActiveTab }: CategorySectionProps) {
  return (
    <section id="cursos" className="py-12 border-b bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h2 className="mb-2">Áreas de Desenvolvimento</h2>
            <p className="text-muted-foreground">Escolha a área que você quer aprimorar</p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                    activeTab === category.id
                      ? 'bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'bg-background border border-border hover:bg-accent'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
