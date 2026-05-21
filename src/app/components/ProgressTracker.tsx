import { Trophy, Target, TrendingUp, Award } from 'lucide-react';

export function ProgressTracker() {
  const stats = [
    { label: 'Cursos Completos', value: '3', icon: Trophy, color: 'text-yellow-500' },
    { label: 'Horas de Treino', value: '24', icon: Target, color: 'text-blue-500' },
    { label: 'Nível Atual', value: 'Inter.', icon: TrendingUp, color: 'text-green-500' },
    { label: 'Conquistas', value: '12', icon: Award, color: 'text-purple-500' },
  ];

  const achievements = [
    { id: 1, title: 'Primeiro Passo', description: 'Completou o primeiro curso', earned: true },
    { id: 2, title: 'Dedicação', description: '10 horas de treinamento', earned: true },
    { id: 3, title: 'Técnico', description: 'Dominou fundamentos técnicos', earned: true },
    { id: 4, title: 'Estrategista', description: 'Completou módulo tático', earned: false },
  ];

  return (
    <section id="progresso" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="mb-2">Seu Progresso</h2>
          <p className="text-muted-foreground">Acompanhe sua evolução rumo ao profissionalismo</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-card rounded-xl p-6 text-center border hover:shadow-lg transition-shadow">
                <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-3`} />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            );
          })}
        </div>

        <div className="bg-card rounded-xl border p-6">
          <h3 className="mb-6">Conquistas Recentes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`flex items-center gap-4 p-4 rounded-lg border ${
                  achievement.earned
                    ? 'bg-accent/50 border-primary/20'
                    : 'bg-muted/50 opacity-60'
                }`}
              >
                <div className={`p-3 rounded-full ${
                  achievement.earned ? 'bg-primary/10' : 'bg-muted'
                }`}>
                  <Award className={`h-6 w-6 ${
                    achievement.earned ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </div>
                <div>
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
