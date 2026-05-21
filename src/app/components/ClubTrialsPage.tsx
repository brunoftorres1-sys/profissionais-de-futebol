import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Users, CheckCircle, Shield, Trophy, Clock, Target, Mail, Phone, User, FileText, Send } from 'lucide-react';

interface ClubTrial {
  id: number;
  club: string;
  logo: string;
  category: string;
  location: string;
  date: string;
  ageRange: string;
  positions: string[];
  vacancies: number;
  level: string;
  description: string;
}

const clubTrials: ClubTrial[] = [
  {
    id: 1,
    club: 'São Paulo FC',
    logo: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=100&h=100&fit=crop',
    category: 'Base Sub-15',
    location: 'CT Barra Funda, São Paulo - SP',
    date: '2026-06-15',
    ageRange: '14-15 anos',
    positions: ['Atacante', 'Meio-Campo', 'Lateral'],
    vacancies: 8,
    level: 'Intermediário/Avançado',
    description: 'Peneira oficial para categorias de base do São Paulo FC. Buscamos talentos com boa técnica individual e visão de jogo.'
  },
  {
    id: 2,
    club: 'Palmeiras',
    logo: 'https://images.unsplash.com/photo-1614632537234-84f0bb1e0b94?w=100&h=100&fit=crop',
    category: 'Base Sub-17',
    location: 'Academia de Futebol, São Paulo - SP',
    date: '2026-06-22',
    ageRange: '16-17 anos',
    positions: ['Zagueiro', 'Volante', 'Atacante'],
    vacancies: 6,
    level: 'Avançado',
    description: 'Seleção para Academia de Futebol do Palmeiras. Priorizamos jogadores com experiência em competições estaduais.'
  },
  {
    id: 3,
    club: 'Flamengo',
    logo: 'https://images.unsplash.com/photo-1614632537290-e5cf6d3e8721?w=100&h=100&fit=crop',
    category: 'Base Sub-13',
    location: 'Ninho do Urubu, Rio de Janeiro - RJ',
    date: '2026-06-28',
    ageRange: '12-13 anos',
    positions: ['Todas as posições'],
    vacancies: 12,
    level: 'Iniciante/Intermediário',
    description: 'Teste aberto para categorias de formação. Avaliação de fundamentos técnicos e potencial de desenvolvimento.'
  },
  {
    id: 4,
    club: 'Corinthians',
    logo: 'https://images.unsplash.com/photo-1614632537447-f5e8e3c7e1f3?w=100&h=100&fit=crop',
    category: 'Base Sub-16',
    location: 'CT Dr. Joaquim Grava, São Paulo - SP',
    date: '2026-07-05',
    ageRange: '15-16 anos',
    positions: ['Goleiro', 'Zagueiro', 'Meio-Campo'],
    vacancies: 5,
    level: 'Intermediário',
    description: 'Peneira focada em posições específicas para reforço das categorias de base 2026/2027.'
  },
  {
    id: 5,
    club: 'Grêmio',
    logo: 'https://images.unsplash.com/photo-1614632537258-5c74e6d1d6d6?w=100&h=100&fit=crop',
    category: 'Base Sub-14',
    location: 'CT Luiz Carvalho, Porto Alegre - RS',
    date: '2026-07-12',
    ageRange: '13-14 anos',
    positions: ['Lateral', 'Meio-Campo', 'Ponta'],
    vacancies: 10,
    level: 'Todos os níveis',
    description: 'Avaliação técnica para formação de elenco da categoria Sub-14. Aberto a jovens talentos de todo o Brasil.'
  },
  {
    id: 6,
    club: 'Santos FC',
    logo: 'https://images.unsplash.com/photo-1614632537371-aae28e1def6e?w=100&h=100&fit=crop',
    category: 'Base Sub-18',
    location: 'CT Rei Pelé, Santos - SP',
    date: '2026-07-20',
    ageRange: '17-18 anos',
    positions: ['Atacante', 'Ponta', 'Meio-Campo Ofensivo'],
    vacancies: 4,
    level: 'Avançado',
    description: 'Seleção para time de transição rumo ao profissional. Exigência de experiência competitiva comprovada.'
  }
];

export function ClubTrialsPage() {
  const [selectedTrial, setSelectedTrial] = useState<ClubTrial | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    position: '',
    experience: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Inscrição enviada com sucesso! Você receberá um email de confirmação em breve.');
    setSelectedTrial(null);
    setFormData({ name: '', email: '', phone: '', age: '', position: '', experience: '', message: '' });
  };

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-primary">OPORTUNIDADES OFICIAIS</span>
          </div>
          <h1 className="mb-4">Testes em Clubes Profissionais</h1>
          <p className="text-muted-foreground max-w-3xl mx-auto mb-8">
            Inscreva-se gratuitamente em peneiras oficiais dos maiores clubes do Brasil. Todas as oportunidades são verificadas e aprovadas pelos clubes.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card border border-border rounded-xl p-6">
              <Shield className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="mb-2">100% Verificado</h3>
              <p className="text-sm text-muted-foreground">Todas as peneiras são oficiais e aprovadas pelos clubes</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Trophy className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="mb-2">Grandes Clubes</h3>
              <p className="text-sm text-muted-foreground">Oportunidades nos principais times do país</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <Target className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="mb-2">Inscrição Gratuita</h3>
              <p className="text-sm text-muted-foreground">Sem taxas ou custos escondidos</p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
          {clubTrials.map((trial, index) => (
            <motion.div
              key={trial.id}
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/50 transition-all hover:shadow-xl hover:shadow-primary/10"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={trial.logo}
                      alt={trial.club}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/30"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{trial.club}</h3>
                      <p className="text-sm text-primary font-semibold">{trial.category}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {trial.vacancies} vagas
                  </span>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{trial.description}</p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{trial.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{new Date(trial.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-primary" />
                    <span>Idade: {trial.ageRange} • {trial.level}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-muted-foreground mb-2">POSIÇÕES:</p>
                  <div className="flex flex-wrap gap-2">
                    {trial.positions.map((position) => (
                      <span key={position} className="px-3 py-1 rounded-full bg-accent text-xs font-medium">
                        {position}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTrial(trial)}
                  className="w-full px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-bold flex items-center justify-center gap-2"
                >
                  <CheckCircle className="h-5 w-5" />
                  Inscrever-se Agora
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {selectedTrial && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 overflow-y-auto flex items-center justify-center p-4"
            onClick={() => setSelectedTrial(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-card border border-primary/30 rounded-2xl max-w-2xl w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={selectedTrial.logo}
                    alt={selectedTrial.club}
                    className="w-20 h-20 rounded-full object-cover ring-2 ring-primary"
                  />
                  <div>
                    <h2>{selectedTrial.club}</h2>
                    <p className="text-primary font-semibold">{selectedTrial.category}</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <User className="h-4 w-4 inline mr-2" />
                        Nome Completo *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <Phone className="h-4 w-4 inline mr-2" />
                        Telefone/WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        <Calendar className="h-4 w-4 inline mr-2" />
                        Idade *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Sua idade"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <Target className="h-4 w-4 inline mr-2" />
                      Posição Principal *
                    </label>
                    <select
                      required
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    >
                      <option value="">Selecione sua posição</option>
                      <option value="Goleiro">Goleiro</option>
                      <option value="Zagueiro">Zagueiro</option>
                      <option value="Lateral">Lateral</option>
                      <option value="Volante">Volante</option>
                      <option value="Meio-Campo">Meio-Campo</option>
                      <option value="Ponta">Ponta</option>
                      <option value="Atacante">Atacante</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      <FileText className="h-4 w-4 inline mr-2" />
                      Experiência Anterior
                    </label>
                    <input
                      type="text"
                      value={formData.experience}
                      onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Ex: 2 anos em escolinha, participou do campeonato municipal..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Mensagem (Opcional)
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg bg-input-background border border-border focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                      placeholder="Conte um pouco sobre sua trajetória no futebol..."
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex-1 px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 font-bold flex items-center justify-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                      Enviar Inscrição
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedTrial(null)}
                      className="px-6 py-4 rounded-lg border border-border hover:bg-accent transition-all font-semibold"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
