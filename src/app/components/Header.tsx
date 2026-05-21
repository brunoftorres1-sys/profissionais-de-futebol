import { Menu, User, Trophy, ClipboardCheck } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  currentPage: 'home' | 'trials';
  onNavigate: (page: 'home' | 'trials') => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-3 group"
        >
          <div className="relative">
            <Trophy className="h-10 w-10 text-primary drop-shadow-[0_0_8px_rgba(0,200,83,0.5)]" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <div>
            <span className="font-bold text-2xl text-foreground group-hover:text-primary transition-colors">FuturoCraque</span>
            <p className="text-xs text-primary font-semibold">ACADEMIA PROFISSIONAL</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => onNavigate('home')}
            className={`text-sm font-medium hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}
          >
            Início
          </button>
          <a href="#cursos" className="text-sm font-medium hover:text-primary transition-colors">Cursos</a>
          <a href="#recursos" className="text-sm font-medium hover:text-primary transition-colors">Recursos</a>
          <button
            onClick={() => onNavigate('trials')}
            className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${currentPage === 'trials' ? 'text-primary' : ''}`}
          >
            <ClipboardCheck className="h-4 w-4" />
            Testes em Clubes
          </button>
        </nav>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-semibold">
            <User className="h-4 w-4" />
            Entrar
          </button>
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t bg-card">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <button
              onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}
              className="text-sm font-medium hover:text-primary transition-colors text-left"
            >
              Início
            </button>
            <a href="#cursos" className="text-sm font-medium hover:text-primary transition-colors">Cursos</a>
            <a href="#recursos" className="text-sm font-medium hover:text-primary transition-colors">Recursos</a>
            <button
              onClick={() => { onNavigate('trials'); setIsMenuOpen(false); }}
              className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors text-left"
            >
              <ClipboardCheck className="h-4 w-4" />
              Testes em Clubes
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold">
              <User className="h-4 w-4" />
              Entrar
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
