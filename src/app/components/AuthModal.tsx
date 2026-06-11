import { Calendar, Lock, Mail, MapPin, ShieldCheck, Target, User, X } from 'lucide-react';
import type { AthleteSummary } from '../App';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  onClose: () => void;
  onSuccess: (profile?: AthleteSummary) => void;
}

export function AuthModal({ mode, onModeChange, onClose, onSuccess }: AuthModalProps) {
  const isSignup = mode === 'signup';

  return (
    <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-card border border-border rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2>{isSignup ? 'Criar perfil de atleta' : 'Entrar na plataforma'}</h2>
              <p className="text-sm text-muted-foreground">
                {isSignup
                  ? 'Monte seu curriculo esportivo e comece sua avaliacao inicial.'
                  : 'Acesse seus treinos, progresso, perfil e inscricoes.'}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent" aria-label="Fechar">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            className="p-6 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              if (!isSignup) {
                onSuccess();
                return;
              }

              const data = new FormData(event.currentTarget);
              onSuccess({
                name: String(data.get('athleteName') || 'Atleta'),
                age: String(data.get('age') || ''),
                position: String(data.get('position') || 'Atleta'),
                city: String(data.get('city') || ''),
                level: String(data.get('level') || 'Em avaliacao'),
                guardian: String(data.get('guardian') || 'Responsavel informado'),
              });
            }}
          >
            {isSignup && (
              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="text-sm font-semibold flex items-center gap-2"><User className="h-4 w-4" /> Nome do atleta</span>
                  <input name="athleteName" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nome completo" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold flex items-center gap-2"><Calendar className="h-4 w-4" /> Idade</span>
                  <input name="age" required type="number" min="6" max="23" className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ex: 15" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold flex items-center gap-2"><Target className="h-4 w-4" /> Posicao principal</span>
                  <select name="position" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Selecione</option>
                    <option>Goleiro</option>
                    <option>Zagueiro</option>
                    <option>Lateral</option>
                    <option>Volante</option>
                    <option>Meia</option>
                    <option>Ponta</option>
                    <option>Atacante</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold flex items-center gap-2"><MapPin className="h-4 w-4" /> Cidade/estado</span>
                  <input name="city" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Ex: Campinas-SP" />
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold flex items-center gap-2"><Target className="h-4 w-4" /> Nivel atual</span>
                  <select name="level" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="">Selecione</option>
                    <option>Iniciante</option>
                    <option>Intermediario</option>
                    <option>Avancado</option>
                    <option>Competitivo</option>
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="text-sm font-semibold flex items-center gap-2"><User className="h-4 w-4" /> Responsavel</span>
                  <input name="guardian" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Nome do responsavel" />
                </label>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold flex items-center gap-2"><Mail className="h-4 w-4" /> Email</span>
                <input required type="email" className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="voce@email.com" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold flex items-center gap-2"><Lock className="h-4 w-4" /> Senha</span>
                <input required type="password" className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Senha segura" />
              </label>
            </div>

            {isSignup && (
              <div className="rounded-xl border border-border bg-muted/40 p-4">
                <label className="flex gap-3 text-sm">
                  <input type="checkbox" required className="mt-1" />
                  <span>
                    Confirmo que tenho autorizacao do responsavel legal quando o atleta for menor de idade e aceito
                    os termos de uso, privacidade e uso de imagem para fins de avaliacao esportiva.
                  </span>
                </label>
              </div>
            )}

            <button className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              {isSignup ? 'Criar perfil e iniciar avaliacao' : 'Entrar no painel'}
            </button>

            <button
              type="button"
              onClick={() => onModeChange(isSignup ? 'login' : 'signup')}
              className="w-full text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {isSignup ? 'Ja tenho conta. Entrar' : 'Ainda nao tenho conta. Criar perfil'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
