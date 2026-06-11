import { ClipboardCheck, Menu, Trophy, User } from 'lucide-react';
import { useState } from 'react';
import type { Page } from '../App';

interface HeaderProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onAuthOpen: (mode: 'login' | 'signup') => void;
}

export function Header({ currentPage, onNavigate, onAuthOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const goTo = (page: Page) => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const navItems: Array<{ label: string; page: Page; icon?: typeof ClipboardCheck }> = [
    { label: 'Inicio', page: 'home' },
    { label: 'Cursos', page: 'resources' },
    { label: 'Area do atleta', page: 'dashboard' },
    { label: 'Pais', page: 'parents' },
    { label: 'Clubes', page: 'clubs' },
    { label: 'Testes em Clubes', page: 'trials', icon: ClipboardCheck },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/98 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 flex h-20 items-center justify-between">
        <button onClick={() => goTo('home')} className="flex items-center gap-3 group" aria-label="Ir para inicio">
          <div className="relative">
            <Trophy className="h-10 w-10 text-primary drop-shadow-[0_0_8px_rgba(0,200,83,0.5)]" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <div className="text-left">
            <span className="font-bold text-2xl text-foreground group-hover:text-primary transition-colors">FuturoCraque</span>
            <p className="text-xs text-primary font-semibold">FORMACAO DE ATLETAS</p>
          </div>
        </button>

        <nav className="hidden xl:flex items-center gap-6" aria-label="Navegacao principal">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => goTo(item.page)}
                aria-current={currentPage === item.page ? 'page' : undefined}
                className={`flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ${currentPage === item.page ? 'text-primary' : ''}`}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onAuthOpen('signup')}
            className="hidden md:flex px-5 py-2.5 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold"
          >
            Criar conta gratis
          </button>
          <button
            onClick={() => onAuthOpen('login')}
            className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-semibold"
          >
            <User className="h-4 w-4" />
            Entrar
          </button>
          <button
            className="xl:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-controls="menu-mobile"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="menu-mobile" className="xl:hidden border-t bg-card">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4" aria-label="Navegacao mobile">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.label}
                  onClick={() => goTo(item.page)}
                  aria-current={currentPage === item.page ? 'page' : undefined}
                  className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors text-left"
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {item.label}
                </button>
              );
            })}
            <button
              onClick={() => {
                onAuthOpen('signup');
                setIsMenuOpen(false);
              }}
              className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors font-semibold text-left"
            >
              Criar conta gratis
            </button>
            <button
              onClick={() => {
                onAuthOpen('login');
                setIsMenuOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold"
            >
              <User className="h-4 w-4" />
              Entrar
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
