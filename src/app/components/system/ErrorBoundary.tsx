import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { logger } from '../../../lib/logger';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    logger.error('Erro global capturado pela aplicacao', {
      context: 'ErrorBoundary',
      data: info.componentStack,
      error,
    });
  }

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <main className="min-h-screen bg-background px-4 py-16">
        <section className="mx-auto max-w-xl rounded-xl border border-border bg-card p-8 text-center">
          <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h1 className="mb-3">Algo saiu do planejado</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            A pagina encontrou um erro inesperado. Tente recarregar para voltar ao fluxo.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-primary-foreground hover:bg-primary/90"
          >
            <RotateCcw className="h-4 w-4" />
            Recarregar
          </button>
        </section>
      </main>
    );
  }
}
