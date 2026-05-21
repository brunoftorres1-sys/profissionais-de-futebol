import { Trophy, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'trials') => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const links = {
    plataforma: [
      { label: 'Cursos', action: () => onNavigate('home') },
      { label: 'Testes em Clubes', action: () => onNavigate('trials') },
      { label: 'Recursos', action: () => onNavigate('home') },
      { label: 'Comunidade', action: () => onNavigate('home') }
    ],
    suporte: [
      { label: 'Central de Ajuda', action: () => {} },
      { label: 'Contato', action: () => {} },
      { label: 'FAQ', action: () => {} },
      { label: 'Termos de Uso', action: () => {} }
    ],
    empresa: [
      { label: 'Sobre Nós', action: () => {} },
      { label: 'Instrutores', action: () => {} },
      { label: 'Parceiros', action: () => {} },
      { label: 'Carreiras', action: () => {} }
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
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
              Transformando aspirantes em jogadores profissionais através de educação de qualidade e acesso democratizado ao conhecimento do futebol.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-background border hover:bg-accent hover:border-primary transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="mb-4">Plataforma</h4>
            <ul className="space-y-2">
              {links.plataforma.map((link) => (
                <li key={link.label}>
                  <button onClick={link.action} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Suporte</h4>
            <ul className="space-y-2">
              {links.suporte.map((link) => (
                <li key={link.label}>
                  <button onClick={link.action} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4">Empresa</h4>
            <ul className="space-y-2">
              {links.empresa.map((link) => (
                <li key={link.label}>
                  <button onClick={link.action} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2026 FuturoCraque. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termos
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
