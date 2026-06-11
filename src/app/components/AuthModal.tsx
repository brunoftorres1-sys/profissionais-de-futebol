import { AlertCircle, Calendar, Lock, Mail, MapPin, ShieldCheck, Target, User, X } from 'lucide-react';
import { useState } from 'react';
import type { AthleteSummary, UserRole } from '../App';
import { logger } from '../../lib/logger';
import { getGoogleOAuthUrl, getSupabaseConfigStatus, signInWithPassword, signUpWithEmail } from '../../lib/supabase';

interface AuthModalProps {
  mode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  onClose: () => void;
  onSuccess: (profile?: AthleteSummary) => void;
}

export function AuthModal({ mode, onModeChange, onClose, onSuccess }: AuthModalProps) {
  const isSignup = mode === 'signup';
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabaseStatus = getSupabaseConfigStatus();

  const validate = (form: HTMLFormElement) => {
    const data = new FormData(form);
    const email = String(data.get('email') || '').trim();
    const password = String(data.get('password') || '');

    if (!email.includes('@')) {
      return 'Informe um email valido.';
    }

    if (password.length < 8) {
      return 'A senha precisa ter pelo menos 8 caracteres.';
    }

    if (isSignup && Number(data.get('age')) < 6) {
      return 'A idade minima para cadastro e 6 anos.';
    }

    return '';
  };

  return (
    <div className="fixed inset-0 z-[60] bg-background/90 backdrop-blur-md overflow-y-auto" role="dialog" aria-modal="true" aria-labelledby="auth-title">
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-card border border-border rounded-xl shadow-2xl">
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 id="auth-title">{isSignup ? 'Criar perfil' : 'Entrar na plataforma'}</h2>
              <p className="text-sm text-muted-foreground">
                {isSignup
                  ? 'Monte seu perfil esportivo e comece sua avaliacao inicial.'
                  : 'Acesse seus treinos, progresso, perfil e inscricoes.'}
              </p>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent" aria-label="Fechar">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form
            className="p-6 space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setError('');
              setIsSubmitting(true);

              const validationError = validate(event.currentTarget);
              if (validationError) {
                setError(validationError);
                setIsSubmitting(false);
                logger.warn('Formulario de autenticacao invalido', { context: 'AuthModal', data: validationError });
                return;
              }

              if (!isSignup) {
                if (supabaseStatus.configured) {
                  try {
                    await signInWithPassword(
                      String(new FormData(event.currentTarget).get('email') || ''),
                      String(new FormData(event.currentTarget).get('password') || ''),
                    );
                  } catch (authError) {
                    setError('Nao foi possivel entrar. Confira email, senha e configuracao do Supabase.');
                    setIsSubmitting(false);
                    logger.error('Falha no login Supabase', { context: 'AuthModal', error: authError });
                    return;
                  }
                }
                onSuccess();
                return;
              }

              const data = new FormData(event.currentTarget);
              const profile = {
                name: String(data.get('athleteName') || 'Atleta'),
                age: String(data.get('age') || ''),
                position: String(data.get('position') || 'Atleta'),
                city: String(data.get('city') || ''),
                level: String(data.get('level') || 'Em avaliacao'),
                guardian: String(data.get('guardian') || 'Responsavel informado'),
                role: String(data.get('role') || 'athlete') as UserRole,
              };

              if (supabaseStatus.configured) {
                try {
                  await signUpWithEmail(
                    String(data.get('email') || ''),
                    String(data.get('password') || ''),
                    profile,
                  );
                } catch (authError) {
                  setError('Nao foi possivel criar conta no Supabase. Verifique as variaveis e politicas do projeto.');
                  setIsSubmitting(false);
                  logger.error('Falha no cadastro Supabase', { context: 'AuthModal', error: authError });
                  return;
                }
              }

              onSuccess(profile);
            }}
            noValidate
          >
            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-sm" role="alert">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
                <span>{error}</span>
              </div>
            )}

            {!supabaseStatus.configured && (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-muted-foreground">
                Autenticacao real ainda depende das variaveis do Supabase no Vercel. Este fluxo local libera a plataforma para validacao.
              </div>
            )}

            {isSignup && (
              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-2 md:col-span-2">
                  <span className="text-sm font-semibold flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Tipo de perfil</span>
                  <select name="role" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="athlete">Atleta</option>
                    <option value="coach">Treinador</option>
                    <option value="scout">Olheiro</option>
                  </select>
                </label>
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
                <input name="email" required type="email" autoComplete="email" className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="voce@email.com" />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold flex items-center gap-2"><Lock className="h-4 w-4" /> Senha</span>
                <input name="password" required type="password" autoComplete={isSignup ? 'new-password' : 'current-password'} minLength={8} className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-primary/20" placeholder="Senha segura" />
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

            <button disabled={isSubmitting} className="w-full px-6 py-4 rounded-lg bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-70">
              <ShieldCheck className="h-5 w-5" />
              {isSubmitting ? 'Validando...' : isSignup ? 'Criar perfil e iniciar avaliacao' : 'Entrar no painel'}
            </button>

            <button
              type="button"
              onClick={() => {
                logger.info('Login Google demonstrativo iniciado', { context: 'AuthModal' });
                if (supabaseStatus.configured) {
                  window.location.href = getGoogleOAuthUrl();
                  return;
                }

                onSuccess({
                  name: 'Usuario Google',
                  age: '16',
                  position: 'Atleta',
                  city: 'Brasil',
                  level: 'Em avaliacao',
                  guardian: 'Responsavel informado',
                  role: 'athlete' as UserRole,
                });
              }}
              className="w-full rounded-lg border border-border px-6 py-3 font-bold hover:bg-accent transition-colors"
            >
              Entrar com Google
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
