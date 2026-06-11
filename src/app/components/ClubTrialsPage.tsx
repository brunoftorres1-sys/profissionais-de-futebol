import { useMemo, useState } from 'react';
import { AlertTriangle, Calendar, CheckCircle, FileText, Mail, MapPin, Phone, Search, Shield, Target, Trophy, User, Users } from 'lucide-react';

interface ClubTrial {
  id: number;
  club: string;
  logo: string;
  category: string;
  state: string;
  city: string;
  location: string;
  date: string;
  ageRange: string;
  positions: string[];
  vacancies: number;
  level: string;
  status: 'Inscrições abertas' | 'Últimas vagas' | 'Lista de espera';
  applicationStatus: 'Inscrito' | 'Aguardando' | 'Aprovado' | 'Não selecionado';
  requirements: string[];
  description: string;
}

const clubTrials: ClubTrial[] = [
  {
    id: 1,
    club: 'São Paulo FC',
    logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=100&h=100&fit=crop',
    category: 'Sub-15',
    state: 'SP',
    city: 'São Paulo',
    location: 'CT Barra Funda, São Paulo - SP',
    date: '2026-06-15',
    ageRange: '14-15 anos',
    positions: ['Atacante', 'Meia', 'Lateral'],
    vacancies: 8,
    level: 'Intermediário/Avançado',
    status: 'Inscrições abertas',
    applicationStatus: 'Inscrito',
    requirements: ['Documento com foto', 'Autorização do responsável', 'Atestado médico atualizado'],
    description: 'Avaliação para categorias de base com foco em técnica individual, intensidade e leitura de jogo.',
  },
  {
    id: 2,
    club: 'Palmeiras',
    logo: 'https://images.unsplash.com/photo-1551958219-acbc608c6377?w=100&h=100&fit=crop',
    category: 'Sub-17',
    state: 'SP',
    city: 'São Paulo',
    location: 'Academia de Futebol, São Paulo - SP',
    date: '2026-06-22',
    ageRange: '16-17 anos',
    positions: ['Zagueiro', 'Volante', 'Atacante'],
    vacancies: 6,
    level: 'Avançado',
    status: 'Últimas vagas',
    applicationStatus: 'Aguardando',
    requirements: ['Experiência competitiva', 'Vídeo recente', 'Autorização do responsável'],
    description: 'Seleção para atletas com experiência em competições regionais e alto compromisso de treino.',
  },
  {
    id: 3,
    club: 'Flamengo',
    logo: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=100&h=100&fit=crop',
    category: 'Sub-13',
    state: 'RJ',
    city: 'Rio de Janeiro',
    location: 'Ninho do Urubu, Rio de Janeiro - RJ',
    date: '2026-06-28',
    ageRange: '12-13 anos',
    positions: ['Todas as posições'],
    vacancies: 12,
    level: 'Iniciante/Intermediário',
    status: 'Inscrições abertas',
    applicationStatus: 'Aprovado',
    requirements: ['RG ou certidão', 'Responsável presente', 'Material de treino completo'],
    description: 'Teste aberto para formação, com avaliação de coordenação, fundamentos e potencial de evolução.',
  },
  {
    id: 4,
    club: 'Grêmio',
    logo: 'https://images.unsplash.com/photo-1556056504-5c7696c4c28d?w=100&h=100&fit=crop',
    category: 'Sub-14',
    state: 'RS',
    city: 'Porto Alegre',
    location: 'CT Luiz Carvalho, Porto Alegre - RS',
    date: '2026-07-12',
    ageRange: '13-14 anos',
    positions: ['Lateral', 'Meia', 'Ponta'],
    vacancies: 10,
    level: 'Todos os níveis',
    status: 'Lista de espera',
    applicationStatus: 'Não selecionado',
    requirements: ['Ficha de inscrição', 'Autorização do responsável', 'Vídeo de apresentação'],
    description: 'Avaliação técnica para atletas da região Sul e jovens em fase de desenvolvimento.',
  },
];

export function ClubTrialsPage() {
  const [selectedTrial, setSelectedTrial] = useState<ClubTrial | null>(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [stateFilter, setStateFilter] = useState('Todos');
  const [cityFilter, setCityFilter] = useState('Todas');
  const [categoryFilter, setCategoryFilter] = useState('Todos');
  const [positionFilter, setPositionFilter] = useState('Todos');

  const filteredTrials = useMemo(() => {
    return clubTrials.filter((trial) => {
      const stateMatches = stateFilter === 'Todos' || trial.state === stateFilter;
      const cityMatches = cityFilter === 'Todas' || trial.city === cityFilter;
      const categoryMatches = categoryFilter === 'Todos' || trial.category === categoryFilter;
      const positionMatches = positionFilter === 'Todos' || trial.positions.includes(positionFilter) || trial.positions.includes('Todas as posições');
      return stateMatches && cityMatches && categoryMatches && positionMatches;
    });
  }, [stateFilter, cityFilter, categoryFilter, positionFilter]);

  const cities = ['Todas', ...Array.from(new Set(clubTrials.filter((trial) => stateFilter === 'Todos' || trial.state === stateFilter).map((trial) => trial.city)))];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSuccessMessage('Inscricao registrada. Na versao final, o atleta recebera protocolo e acompanhamento de status.');
    setSelectedTrial(null);
  };

  return (
    <main className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">OPORTUNIDADES VERIFICADAS</span>
          </div>
          <h1 className="mb-4">Testes e peneiras em clubes</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto">
            Encontre oportunidades por estado, cidade, idade e posição. Veja requisitos, status e próximos passos antes de se inscrever.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Search className="h-5 w-5 text-primary" />
            <h2 className="text-xl">Filtrar oportunidades</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <select value={stateFilter} onChange={(e) => { setStateFilter(e.target.value); setCityFilter('Todas'); }} className="px-4 py-3 rounded-lg bg-input-background border border-border">
              {['Todos', 'SP', 'RJ', 'RS'].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="px-4 py-3 rounded-lg bg-input-background border border-border">
              {cities.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-3 rounded-lg bg-input-background border border-border">
              {['Todos', 'Sub-9', 'Sub-11', 'Sub-13', 'Sub-14', 'Sub-15', 'Sub-17', 'Sub-20'].map((item) => <option key={item}>{item}</option>)}
            </select>
            <select value={positionFilter} onChange={(e) => setPositionFilter(e.target.value)} className="px-4 py-3 rounded-lg bg-input-background border border-border">
              {['Todos', 'Goleiro', 'Zagueiro', 'Lateral', 'Volante', 'Meia', 'Ponta', 'Atacante'].map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>
        </div>

        <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 mb-8 flex gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0" />
          <p className="text-sm text-muted-foreground">
            A plataforma não promete aprovação, contrato ou vaga. Ela organiza inscrições e preparação. Confirme sempre
            canais oficiais, requisitos e autorização dos responsáveis.
          </p>
        </div>

        {successMessage && (
          <div className="mb-8 flex gap-3 rounded-xl border border-primary/30 bg-primary/10 p-4 text-sm" role="status">
            <CheckCircle className="h-5 w-5 shrink-0 text-primary" />
            <span>{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {filteredTrials.map((trial) => (
            <div key={trial.id} className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <img src={trial.logo} alt={trial.club} className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30" />
                    <div>
                      <h3 className="font-bold text-lg">{trial.club}</h3>
                      <p className="text-sm text-primary font-semibold">{trial.category}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">{trial.status}</span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{trial.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm"><MapPin className="h-4 w-4 text-primary" /><span>{trial.location}</span></div>
                  <div className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4 text-primary" /><span>{new Date(trial.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span></div>
                  <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-primary" /><span>{trial.ageRange} • {trial.level} • {trial.vacancies} vagas</span></div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">POSIÇÕES:</p>
                  <div className="flex flex-wrap gap-2">
                    {trial.positions.map((position) => <span key={position} className="px-3 py-1 rounded-full bg-accent text-xs font-medium">{position}</span>)}
                  </div>
                </div>

                <div className="mb-5">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">REQUISITOS:</p>
                  <ul className="space-y-1">
                    {trial.requirements.map((requirement) => (
                      <li key={requirement} className="text-xs text-muted-foreground flex gap-2">
                        <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                        {requirement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-5 rounded-lg bg-muted/40 border border-border p-3 flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">Status do atleta</span>
                  <span className="px-3 py-1 rounded-full bg-background border text-xs font-bold">{trial.applicationStatus}</span>
                </div>

                <button onClick={() => setSelectedTrial(trial)} className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-bold flex items-center justify-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Inscrever-se agora
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredTrials.length === 0 && (
          <div className="text-center rounded-xl border border-border bg-card p-10 mb-12">
            <h2 className="mb-2">Nenhuma oportunidade encontrada</h2>
            <p className="text-muted-foreground">Ajuste os filtros ou volte depois para novas peneiras.</p>
          </div>
        )}

        {selectedTrial && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4" onClick={() => setSelectedTrial(null)}>
            <div className="bg-card border border-primary/30 rounded-xl max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img src={selectedTrial.logo} alt={selectedTrial.club} className="w-20 h-20 rounded-full object-cover ring-2 ring-primary" />
                  <div>
                    <h2>{selectedTrial.club}</h2>
                    <p className="text-primary font-semibold">{selectedTrial.category} • {selectedTrial.status}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="space-y-2">
                      <span className="block text-sm font-semibold"><User className="h-4 w-4 inline mr-2" />Nome do atleta *</span>
                      <input required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border" placeholder="Nome completo" />
                    </label>
                    <label className="space-y-2">
                      <span className="block text-sm font-semibold"><Mail className="h-4 w-4 inline mr-2" />Email *</span>
                      <input type="email" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border" placeholder="seu@email.com" />
                    </label>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <label className="space-y-2">
                      <span className="block text-sm font-semibold"><Phone className="h-4 w-4 inline mr-2" />WhatsApp do responsável *</span>
                      <input type="tel" required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border" placeholder="(11) 99999-9999" />
                    </label>
                    <label className="space-y-2">
                      <span className="block text-sm font-semibold"><Target className="h-4 w-4 inline mr-2" />Posição principal *</span>
                      <select required className="w-full px-4 py-3 rounded-lg bg-input-background border border-border">
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
                  </div>

                  <label className="space-y-2 block">
                    <span className="block text-sm font-semibold"><FileText className="h-4 w-4 inline mr-2" />Resumo esportivo</span>
                    <textarea rows={3} className="w-full px-4 py-3 rounded-lg bg-input-background border border-border resize-none" placeholder="Conte onde treina, competições e links de vídeo." />
                  </label>

                  <label className="flex gap-3 rounded-xl border border-border bg-muted/40 p-4 text-sm">
                    <input required type="checkbox" className="mt-1" />
                    <span>Confirmo autorização do responsável legal e entendo que a inscrição não garante aprovação ou contrato.</span>
                  </label>

                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-bold flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5" />
                      Enviar inscrição
                    </button>
                    <button type="button" onClick={() => setSelectedTrial(null)} className="px-6 py-4 rounded-lg border border-border hover:bg-accent transition-all font-semibold">
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
