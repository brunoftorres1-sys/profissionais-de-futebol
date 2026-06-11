import { Camera, FileVideo, MapPin, Ruler, Share2, Shield, Star, UserRound } from 'lucide-react';

interface AthleteProfileSectionProps {
  onCreateProfile: () => void;
}

const profileItems = [
  'Dados pessoais e contato do responsavel',
  'Posicao principal, posicao secundaria e pe dominante',
  'Altura, peso, cidade, categoria e disponibilidade',
  'Historico em escolinhas, clubes e campeonatos',
  'Videos de lances, treinos e avaliacoes tecnicas',
  'Link publico para olheiros e comissoes tecnicas',
];

export function AthleteProfileSection({ onCreateProfile }: AthleteProfileSectionProps) {
  return (
    <section id="perfil-atleta" className="py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-8 items-start">
          <div>
            <span className="text-sm font-bold text-primary uppercase tracking-wide">Curriculo esportivo</span>
            <h2 className="mt-2 mb-4">Perfil profissional para o jovem ser visto do jeito certo</h2>
            <p className="text-muted-foreground mb-6">
              Alem de treinar, o atleta precisa apresentar sua trajetoria com organizacao. Esta area transforma
              informacoes soltas em um perfil esportivo pronto para compartilhar com clubes, olheiros e professores.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {profileItems.map((item) => (
                <div key={item} className="flex gap-3 rounded-lg border border-border bg-card p-4">
                  <Star className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xl">
            <div className="bg-gradient-to-r from-primary/20 to-accent/40 p-6">
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-xl bg-background border border-border flex items-center justify-center">
                  <UserRound className="h-10 w-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl">Lucas Almeida</h3>
                  <p className="text-sm text-muted-foreground">Meia ofensivo - Sub-15 - Campinas-SP</p>
                  <div className="mt-2 flex flex-wrap gap-2 text-xs">
                    <span className="px-2 py-1 rounded bg-primary text-primary-foreground">Pe direito</span>
                    <span className="px-2 py-1 rounded bg-background border">Nivel intermediario</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 grid sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <Ruler className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Altura / peso</p>
                  <p className="font-semibold">1,71m - 61kg</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Disponibilidade</p>
                  <p className="font-semibold">SP e regiao</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FileVideo className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Videos enviados</p>
                  <p className="font-semibold">4 lances + 2 avaliacoes</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Responsavel</p>
                  <p className="font-semibold">Autorizacao confirmada</p>
                </div>
              </div>
            </div>

            <div className="border-t border-border p-6 flex flex-col sm:flex-row gap-3">
              <button onClick={onCreateProfile} className="flex-1 px-4 py-3 rounded-lg bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2">
                <Camera className="h-4 w-4" />
                Atualizar videos
              </button>
              <button onClick={onCreateProfile} className="flex-1 px-4 py-3 rounded-lg border border-border font-bold flex items-center justify-center gap-2">
                <Share2 className="h-4 w-4" />
                Compartilhar perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
