import { AlertTriangle, BadgeCheck, Building2, FileCheck, LockKeyhole, UsersRound } from 'lucide-react';
import type { Page } from '../App';

interface TrustAndSafetySectionProps {
  onNavigate: (page: Page) => void;
}

const trustItems = [
  {
    icon: BadgeCheck,
    title: 'Instrutores identificados',
    text: 'Cada professor deve ter currículo, experiência, CREF quando aplicável e área de especialidade.',
  },
  {
    icon: Building2,
    title: 'Parceiros verificados',
    text: 'Clubes, escolinhas e avaliadores precisam aparecer com dados claros e contato institucional.',
  },
  {
    icon: UsersRound,
    title: 'Responsáveis no processo',
    text: 'Menores de idade só podem participar de inscrições com autorização de mãe, pai ou responsável legal.',
  },
  {
    icon: LockKeyhole,
    title: 'Dados protegidos',
    text: 'Política de privacidade, uso de imagem, termos e cookies precisam estar visíveis e fáceis de entender.',
  },
];

export function TrustAndSafetySection({ onNavigate }: TrustAndSafetySectionProps) {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-8 items-start">
          <div>
            <span className="text-sm font-bold text-primary uppercase tracking-wide">Confiança e responsabilidade</span>
            <h2 className="mt-2 mb-4">Profissional também é seguro, transparente e honesto</h2>
            <p className="text-muted-foreground mb-6">
              A plataforma precisa deixar claro que ajuda na preparação e organização do atleta, mas não promete contrato,
              aprovação ou vaga garantida em clube. Isso protege o jovem, a família e a marca.
            </p>
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-5 flex gap-3">
              <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
              <div>
                <h3 className="text-base mb-1">Aviso essencial</h3>
                <p className="text-sm text-muted-foreground">
                  Nenhuma peneira séria deve cobrar promessa de aprovação. O site deve informar requisitos, critérios
                  e próximos passos de forma transparente.
                </p>
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-card border border-border rounded-xl p-5">
                  <Icon className="h-7 w-7 text-primary mb-3" />
                  <h3 className="text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
                </div>
              );
            })}
            <button
              onClick={() => onNavigate('legal')}
              className="sm:col-span-2 px-5 py-4 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <FileCheck className="h-5 w-5" />
              Ver termos, privacidade e autorização
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
