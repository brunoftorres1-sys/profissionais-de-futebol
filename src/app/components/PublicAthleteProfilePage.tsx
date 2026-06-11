import { BarChart3, FileVideo, MapPin, ShieldCheck, Star, UserRound } from 'lucide-react';
import { listAthletes, listEvaluations } from '../../lib/platform';
import type { Page } from '../App';

interface PublicAthleteProfilePageProps {
  onNavigate: (page: Page) => void;
  slug?: string;
}

export function PublicAthleteProfilePage({ onNavigate, slug }: PublicAthleteProfilePageProps) {
  const athlete = listAthletes().find((profile) => profile.publicSlug === slug) || listAthletes()[0];
  const evaluations = listEvaluations().filter((evaluation) => evaluation.athleteId === athlete.id);
  const average = evaluations.length
    ? Math.round(evaluations.reduce((total, evaluation) => total + evaluation.score, 0) / evaluations.length)
    : athlete.score;

  return (
    <main className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <section className="mb-6 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                <UserRound className="h-12 w-12 text-primary" />
              </div>
              <div>
                <span className="text-sm font-bold uppercase tracking-wide text-primary">Perfil publico</span>
                <h1 className="mt-1">{athlete.name}</h1>
                <p className="text-muted-foreground">{athlete.age} anos - {athlete.position} - {athlete.city}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('athletes')}
              className="rounded-lg border border-border px-5 py-3 font-bold hover:bg-accent"
            >
              Buscar outros atletas
            </button>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl">Resumo esportivo</h2>
            <div className="grid gap-3">
              {[
                ['Cidade', athlete.city, MapPin],
                ['Pe dominante', athlete.dominantFoot, ShieldCheck],
                ['Videos', `${athlete.videos} enviados`, FileVideo],
                ['Score publico', `${average}/100`, BarChart3],
              ].map(([label, value, Icon]) => {
                const TypedIcon = Icon as typeof MapPin;
                return (
                  <div key={label as string} className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
                    <TypedIcon className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-xs text-muted-foreground">{label as string}</p>
                      <p className="font-bold">{value as string}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="rounded-xl border border-border bg-card p-6">
            <h2 className="mb-4 text-xl">Avaliacoes recentes</h2>
            {evaluations.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Este atleta ainda nao recebeu avaliacoes registradas na plataforma.
              </p>
            ) : (
              <div className="space-y-3">
                {evaluations.slice(0, 4).map((evaluation) => (
                  <article key={evaluation.id} className="rounded-lg bg-muted/30 p-4">
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-primary"><Star className="h-4 w-4" /> {evaluation.score}/100</span>
                      <span className="text-xs text-muted-foreground">{evaluation.evaluatorRole}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{evaluation.comment}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
