import { BarChart3, Heart, Search, Star, UserRound, Video } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { UserRole } from '../App';
import {
  listAthletes,
  listEvaluations,
  listFavorites,
  saveEvaluation,
  toggleFavorite,
  type AthleteProfile,
} from '../../lib/platform';

interface AthleteSearchPageProps {
  currentRole: UserRole;
}

const positions = ['Todas', 'Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Ponta', 'Atacante'];

export function AthleteSearchPage({ currentRole }: AthleteSearchPageProps) {
  const [athletes] = useState<AthleteProfile[]>(() => listAthletes());
  const [favorites, setFavorites] = useState(() => listFavorites());
  const [evaluations, setEvaluations] = useState(() => listEvaluations());
  const [query, setQuery] = useState('');
  const [position, setPosition] = useState('Todas');
  const [selectedAthlete, setSelectedAthlete] = useState<AthleteProfile | null>(null);
  const [score, setScore] = useState('75');
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const filteredAthletes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return athletes.filter((athlete) => {
      const matchesQuery = !normalizedQuery
        || athlete.name.toLowerCase().includes(normalizedQuery)
        || athlete.city.toLowerCase().includes(normalizedQuery)
        || athlete.position.toLowerCase().includes(normalizedQuery);
      const matchesPosition = position === 'Todas' || athlete.position === position;

      return matchesQuery && matchesPosition;
    });
  }, [athletes, position, query]);

  const submitEvaluation = (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedAthlete) {
      return;
    }

    if (comment.trim().length < 10) {
      setMessage('Escreva uma avaliacao com pelo menos 10 caracteres.');
      return;
    }

    setEvaluations(saveEvaluation({
      athleteId: selectedAthlete.id,
      comment: comment.trim(),
      evaluatorRole: currentRole,
      score: Number(score),
    }));
    setComment('');
    setMessage(`Avaliacao salva para ${selectedAthlete.name}.`);
  };

  return (
    <main className="min-h-screen bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <span className="text-sm font-bold uppercase tracking-wide text-primary">Banco de atletas</span>
          <h1 className="mt-2 mb-4">Buscar, favoritar e avaliar atletas</h1>
          <p className="text-muted-foreground">
            Encontre perfis por nome, cidade ou posicao, salve favoritos e registre avaliacoes tecnicas para acompanhamento.
          </p>
        </div>

        <section className="mb-8 rounded-xl border border-border bg-card p-5">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <label className="space-y-2">
              <span className="text-sm font-semibold">Busca</span>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-input-background px-3">
                <Search className="h-4 w-4 text-primary" />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent py-3 outline-none"
                  placeholder="Nome, cidade ou posicao"
                />
              </div>
            </label>
            <label className="space-y-2">
              <span className="text-sm font-semibold">Posicao</span>
              <select
                value={position}
                onChange={(event) => setPosition(event.target.value)}
                className="w-full rounded-lg border border-border bg-input-background px-4 py-3"
              >
                {positions.map((item) => <option key={item}>{item}</option>)}
              </select>
            </label>
          </div>
        </section>

        {message && (
          <div className="mb-6 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm" role="status">
            {message}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <section className="grid gap-5 md:grid-cols-2">
            {filteredAthletes.map((athlete) => {
              const isFavorite = favorites.includes(athlete.id);
              const athleteEvaluations = evaluations.filter((evaluation) => evaluation.athleteId === athlete.id);

              return (
                <article key={athlete.id} className="rounded-xl border border-border bg-card p-5">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/20 bg-primary/10">
                        <UserRound className="h-7 w-7 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-xl">{athlete.name}</h2>
                        <p className="text-sm text-muted-foreground">{athlete.age} anos - {athlete.city}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFavorites(toggleFavorite(athlete.id))}
                      className={`rounded-lg border px-3 py-2 ${isFavorite ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-accent'}`}
                      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                    >
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-3 text-sm">
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">Posicao</p>
                      <p className="font-bold">{athlete.position}</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">Nivel</p>
                      <p className="font-bold">{athlete.level}</p>
                    </div>
                    <div className="rounded-lg bg-muted/30 p-3">
                      <p className="text-xs text-muted-foreground">Score</p>
                      <p className="font-bold text-primary">{athlete.score}</p>
                    </div>
                  </div>

                  <div className="mb-4 flex flex-wrap gap-2 text-xs">
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1"><Video className="h-3 w-3" /> {athlete.videos} videos</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1"><BarChart3 className="h-3 w-3" /> {athlete.dominantFoot}</span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1"><Star className="h-3 w-3" /> {athleteEvaluations.length} avaliacoes</span>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAthlete(athlete);
                        setMessage('');
                      }}
                      className="flex-1 rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground hover:bg-primary/90"
                    >
                      Avaliar atleta
                    </button>
                    <a
                      href={`/#/atleta/${athlete.publicSlug}`}
                      className="rounded-lg border border-border px-4 py-3 text-center font-bold hover:bg-accent"
                    >
                      Perfil publico
                    </a>
                  </div>
                </article>
              );
            })}
          </section>

          <aside className="rounded-xl border border-border bg-card p-5">
            <h2 className="mb-4 text-xl">Avaliacao tecnica</h2>
            {selectedAthlete ? (
              <form className="space-y-4" onSubmit={submitEvaluation}>
                <div className="rounded-lg bg-muted/30 p-4">
                  <p className="font-bold">{selectedAthlete.name}</p>
                  <p className="text-sm text-muted-foreground">{selectedAthlete.position} - {selectedAthlete.city}</p>
                </div>

                <label className="space-y-2 block">
                  <span className="text-sm font-semibold">Nota geral</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={score}
                    onChange={(event) => setScore(event.target.value)}
                    className="w-full"
                  />
                  <span className="text-sm font-bold text-primary">{score}/100</span>
                </label>

                <label className="space-y-2 block">
                  <span className="text-sm font-semibold">Comentario</span>
                  <textarea
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    rows={5}
                    className="w-full rounded-lg border border-border bg-input-background px-4 py-3"
                    placeholder="Descreva tecnica, fisico, tatica, comportamento e proximos passos."
                  />
                </label>

                <button className="w-full rounded-lg bg-primary px-4 py-3 font-bold text-primary-foreground hover:bg-primary/90">
                  Salvar avaliacao
                </button>
              </form>
            ) : (
              <p className="text-sm text-muted-foreground">
                Escolha um atleta na lista para registrar uma avaliacao estruturada.
              </p>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
