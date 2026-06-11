import { AlertCircle, Home } from 'lucide-react';
import type { Page } from '../../App';

interface ErrorPageProps {
  code: '404' | '500';
  onNavigate: (page: Page) => void;
}

export function ErrorPage({ code, onNavigate }: ErrorPageProps) {
  const isNotFound = code === '404';

  return (
    <main className="min-h-[70vh] bg-background py-16">
      <section className="container mx-auto max-w-2xl px-4 text-center">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
          <AlertCircle className="h-8 w-8 text-primary" />
        </div>
        <p className="mb-2 text-sm font-bold uppercase text-primary">{code}</p>
        <h1 className="mb-4">{isNotFound ? 'Pagina nao encontrada' : 'Erro no servidor'}</h1>
        <p className="mx-auto mb-7 max-w-lg text-muted-foreground">
          {isNotFound
            ? 'O conteudo solicitado nao existe ou foi movido.'
            : 'Nao conseguimos carregar esta area agora. Tente novamente em alguns instantes.'}
        </p>
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground hover:bg-primary/90"
        >
          <Home className="h-4 w-4" />
          Voltar ao inicio
        </button>
      </section>
    </main>
  );
}
