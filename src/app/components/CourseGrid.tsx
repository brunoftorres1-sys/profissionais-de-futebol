import { Clock, BarChart, Lock, CheckCircle } from 'lucide-react';

export interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  duration: string;
  level: string;
  progress?: number;
  locked?: boolean;
  thumbnail: string;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Fundamentos do Controle de Bola',
    description: 'Domine os princípios básicos do controle e domínio de bola',
    category: 'tecnica',
    duration: '2h 30min',
    level: 'Iniciante',
    progress: 65,
    thumbnail: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=250&fit=crop'
  },
  {
    id: 2,
    title: 'Táticas de Posicionamento em Campo',
    description: 'Aprenda a se posicionar corretamente em diferentes situações de jogo',
    category: 'tatica',
    duration: '3h 15min',
    level: 'Intermediário',
    progress: 30,
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop'
  },
  {
    id: 3,
    title: 'Preparação Física para Jogadores',
    description: 'Desenvolva força, velocidade e resistência específicas para futebol',
    category: 'fisica',
    duration: '4h 00min',
    level: 'Todos os Níveis',
    thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=250&fit=crop'
  },
  {
    id: 4,
    title: 'Mentalidade de Campeão',
    description: 'Desenvolva resiliência mental e confiança em campo',
    category: 'mental',
    duration: '1h 45min',
    level: 'Todos os Níveis',
    progress: 0,
    thumbnail: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=400&h=250&fit=crop'
  },
  {
    id: 5,
    title: 'Dribles e Fintas Avançadas',
    description: 'Técnicas profissionais para superar marcadores',
    category: 'tecnica',
    duration: '2h 20min',
    level: 'Avançado',
    locked: true,
    thumbnail: 'https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?w=400&h=250&fit=crop'
  },
  {
    id: 6,
    title: 'Sistemas Táticos Modernos',
    description: 'Entenda os principais sistemas táticos do futebol atual',
    category: 'tatica',
    duration: '3h 30min',
    level: 'Avançado',
    locked: true,
    thumbnail: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop'
  },
];

interface CourseGridProps {
  activeTab: string;
  onCourseClick: (course: Course) => void;
}

export function CourseGrid({ activeTab, onCourseClick }: CourseGridProps) {
  const filteredCourses = activeTab === 'todos'
    ? courses
    : courses.filter(course => course.category === activeTab);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img
                  src={course.thumbnail}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {course.locked && (
                  <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Lock className="h-12 w-12 text-muted-foreground" />
                  </div>
                )}
                {course.progress !== undefined && course.progress > 0 && !course.locked && (
                  <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <CheckCircle className="h-3 w-3" />
                    {course.progress}%
                  </div>
                )}
              </div>

              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs px-2 py-1 rounded bg-accent text-accent-foreground">
                    {course.level}
                  </span>
                </div>

                <h3 className="mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4">
                  {course.description}
                </p>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <BarChart className="h-4 w-4" />
                    {course.level}
                  </div>
                </div>

                {course.progress !== undefined && course.progress > 0 && !course.locked && (
                  <div className="mt-3">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <button
                  className={`w-full mt-4 px-4 py-2 rounded-lg transition-colors ${
                    course.locked
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                  disabled={course.locked}
                  onClick={() => !course.locked && onCourseClick(course)}
                >
                  {course.locked ? 'Bloqueado' : course.progress ? 'Continuar' : 'Começar'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
