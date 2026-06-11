import { Facebook, Instagram, Trophy, Twitter, Youtube } from 'lucide-react';
import type { Page } from '../App';

interface FooterProps {
  onNavigate: (page: Page) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const links = {
    plataforma: [
      { label: 'Cursos', page: 'resources' as Page },
      { label: 'Buscar Atletas', page: 'athletes' as Page },
      { label: 'Testes em Clubes', page: 'trials' as Page },
      { label: 'Perfil do Atleta', page: 'dashboard' as Page },
      { label: 'Comunidade', page: 'resources' as Page },
    ],
    suporte: [
      { label: 'Central de Ajuda', page: 'support' as Page },
      { label: 'Contato', page: 'support' as Page },
      { label: 'FAQ', page: 'support' as Page },
      { label: 'Termos de Uso', page: 'legal' as Page },
    ],
    empresa: [
      { label: 'Sobre Nós', page: 'about' as Page },
      { label: 'Pais e Responsáveis', page: 'parents' as Page },
      { label: 'Clubes e Olheiros', page: 'clubs' as Page },
      { label: 'Parceiros', page: 'about' as Page },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com', label: 'Twitter' },
    { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">FuturoCraque</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Plataforma de formação para jovens atletas, com treinos, perfil esportivo, recursos,
              segurança para menores e oportunidades verificadas.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-background border hover:bg-accent hover:border-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <h4 className="mb-4 capitalize">{group}</h4>
              <ul className="space-y-2">
                {items.map((link) => (
                  <li key={link.label}>
                    <button onClick={() => onNavigate(link.page)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">© 2026 FuturoCraque. Todos os direitos reservados.</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate('legal')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </button>
            <button onClick={() => onNavigate('legal')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termos
            </button>
            <button onClick={() => onNavigate('legal')} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
