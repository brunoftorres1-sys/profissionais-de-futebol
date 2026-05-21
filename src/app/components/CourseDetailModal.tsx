import { X, Play, Clock, BarChart, CheckCircle, BookOpen, Target, Award, Users, Video, FileText, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import type { Course } from './CourseGrid';
import { useState } from 'react';

interface CourseDetailModalProps {
  course: Course;
  onClose: () => void;
}

const courseContent = {
  1: {
    instructor: 'Carlos Silva',
    instructorBio: 'Ex-jogador profissional com 15 anos de carreira e treinador certificado UEFA Pro.',
    students: 2847,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Introdução ao Controle de Bola',
        lessons: [
          { id: 1, title: 'Importância do domínio de bola no futebol moderno', duration: '12:30', type: 'video' },
          { id: 2, title: 'Anatomia do primeiro toque', duration: '15:45', type: 'video' },
          { id: 3, title: 'Exercício prático: Controle com peito do pé', duration: '8:20', type: 'exercise' },
        ]
      },
      {
        id: 2,
        title: 'Técnicas de Controle em Movimento',
        lessons: [
          { id: 4, title: 'Recepção de bola em velocidade', duration: '18:15', type: 'video' },
          { id: 5, title: 'Controle orientado para driblar', duration: '14:30', type: 'video' },
          { id: 6, title: 'Drills de coordenação motora', duration: '10:00', type: 'exercise' },
        ]
      },
      {
        id: 3,
        title: 'Controle Sob Pressão',
        lessons: [
          { id: 7, title: 'Proteção de bola com o corpo', duration: '16:45', type: 'video' },
          { id: 8, title: 'Decisões rápidas: passar ou driblar', duration: '13:20', type: 'video' },
          { id: 9, title: 'Simulação de jogo real', duration: '20:00', type: 'exercise' },
        ]
      },
    ],
    learningObjectives: [
      'Dominar os fundamentos do controle de bola com todas as partes do pé',
      'Desenvolver o primeiro toque para criar vantagens táticas',
      'Executar recepções de bola em alta velocidade sem perder o controle',
      'Proteger a bola efetivamente sob pressão defensiva',
      'Tomar decisões rápidas após receber a bola'
    ],
    requirements: [
      'Bola de futebol',
      'Chuteiras ou tênis esportivo',
      'Espaço mínimo de 5x5 metros para praticar',
      'Dedicação de pelo menos 30 minutos por dia'
    ],
    benefits: [
      'Aumente sua confiança com a bola nos pés',
      'Melhore drasticamente sua capacidade de reter posse',
      'Destaque-se em peneiras e testes',
      'Aprenda técnicas usadas por jogadores profissionais',
      'Acesso vitalício ao conteúdo e atualizações'
    ]
  },
  2: {
    instructor: 'Ricardo Mendes',
    instructorBio: 'Analista tático profissional e ex-coordenador técnico de clube da Série A.',
    students: 1923,
    rating: 4.8,
    modules: [
      {
        id: 1,
        title: 'Fundamentos do Posicionamento',
        lessons: [
          { id: 1, title: 'Os princípios do posicionamento tático', duration: '20:15', type: 'video' },
          { id: 2, title: 'Entendendo zonas de jogo', duration: '17:30', type: 'video' },
          { id: 3, title: 'Análise de jogo profissional', duration: '25:00', type: 'video' },
        ]
      },
      {
        id: 2,
        title: 'Posicionamento por Posição',
        lessons: [
          { id: 4, title: 'Atacantes: movimentação sem bola', duration: '22:45', type: 'video' },
          { id: 5, title: 'Meio-campistas: equilíbrio defensivo/ofensivo', duration: '19:30', type: 'video' },
          { id: 6, title: 'Defensores: linha defensiva organizada', duration: '18:15', type: 'video' },
        ]
      },
      {
        id: 3,
        title: 'Transições e Movimentos Coletivos',
        lessons: [
          { id: 7, title: 'Transição defesa-ataque', duration: '16:40', type: 'video' },
          { id: 8, title: 'Criando superioridade numérica', duration: '21:20', type: 'video' },
          { id: 9, title: 'Exercícios táticos em grupo', duration: '30:00', type: 'exercise' },
        ]
      },
    ],
    learningObjectives: [
      'Compreender os princípios fundamentais do posicionamento tático',
      'Reconhecer zonas de jogo e como ocupá-las efetivamente',
      'Dominar movimentação específica para sua posição',
      'Melhorar leitura de jogo e antecipação',
      'Executar transições rápidas e organizadas'
    ],
    requirements: [
      'Conhecimento básico de futebol',
      'Capacidade de assistir e analisar jogos',
      'Acesso a partidas de futebol para praticar análise',
      'Caderno para anotações táticas'
    ],
    benefits: [
      'Destaque-se pela inteligência tática',
      'Compreenda o jogo como jogadores profissionais',
      'Aumente suas chances em peneiras',
      'Desenvolva visão de jogo superior',
      'Materiais complementares em PDF'
    ]
  },
  3: {
    instructor: 'Dr. Paulo Ferreira',
    instructorBio: 'Preparador físico especializado em futebol, com mestrado em Ciências do Esporte.',
    students: 3156,
    rating: 4.9,
    modules: [
      {
        id: 1,
        title: 'Preparação Física Base',
        lessons: [
          { id: 1, title: 'Avaliação física inicial', duration: '15:20', type: 'video' },
          { id: 2, title: 'Aquecimento específico para futebol', duration: '12:45', type: 'video' },
          { id: 3, title: 'Exercícios de mobilidade', duration: '18:30', type: 'exercise' },
        ]
      },
      {
        id: 2,
        title: 'Força e Potência',
        lessons: [
          { id: 4, title: 'Treino de força funcional', duration: '25:15', type: 'video' },
          { id: 5, title: 'Explosão muscular para sprints', duration: '20:30', type: 'video' },
          { id: 6, title: 'Programa de 6 semanas', duration: '10:00', type: 'document' },
        ]
      },
      {
        id: 3,
        title: 'Velocidade e Resistência',
        lessons: [
          { id: 7, title: 'Treinos intervalados de alta intensidade', duration: '22:40', type: 'video' },
          { id: 8, title: 'Aumentando sua velocidade máxima', duration: '19:20', type: 'video' },
          { id: 9, title: 'Periodização do treinamento', duration: '16:15', type: 'video' },
        ]
      },
      {
        id: 4,
        title: 'Prevenção de Lesões',
        lessons: [
          { id: 10, title: 'Fortalecimento preventivo', duration: '17:30', type: 'video' },
          { id: 11, title: 'Alongamento e recuperação', duration: '14:45', type: 'video' },
          { id: 12, title: 'Nutrição para atletas', duration: '21:00', type: 'video' },
        ]
      },
    ],
    learningObjectives: [
      'Desenvolver força funcional específica para futebol',
      'Aumentar velocidade e capacidade de sprint',
      'Melhorar resistência aeróbica e anaeróbica',
      'Prevenir lesões comuns no futebol',
      'Criar rotina de treino personalizada'
    ],
    requirements: [
      'Nenhum equipamento obrigatório (opcionais são sugeridos)',
      'Autorização médica para atividade física',
      'Espaço para exercícios',
      'Comprometimento de 4-5 treinos por semana'
    ],
    benefits: [
      'Aumente seu desempenho físico significativamente',
      'Reduza risco de lesões',
      'Planos de treino personalizáveis',
      'Guia completo de nutrição esportiva',
      'Acompanhamento de progresso'
    ]
  },
  4: {
    instructor: 'Dra. Mariana Costa',
    instructorBio: 'Psicóloga esportiva especializada em futebol de alto rendimento.',
    students: 1654,
    rating: 5.0,
    modules: [
      {
        id: 1,
        title: 'Fundamentos da Psicologia Esportiva',
        lessons: [
          { id: 1, title: 'O que separa bons de grandes jogadores', duration: '18:30', type: 'video' },
          { id: 2, title: 'Desenvolvimento de mentalidade vencedora', duration: '16:20', type: 'video' },
          { id: 3, title: 'Auto-avaliação mental', duration: '8:00', type: 'exercise' },
        ]
      },
      {
        id: 2,
        title: 'Gestão de Pressão e Ansiedade',
        lessons: [
          { id: 4, title: 'Técnicas de respiração para controle emocional', duration: '14:15', type: 'video' },
          { id: 5, title: 'Lidando com momentos decisivos', duration: '19:45', type: 'video' },
          { id: 6, title: 'Visualização e preparação mental', duration: '12:30', type: 'video' },
        ]
      },
      {
        id: 3,
        title: 'Confiança e Motivação',
        lessons: [
          { id: 7, title: 'Construindo confiança inabalável', duration: '17:20', type: 'video' },
          { id: 8, title: 'Superando erros e fracassos', duration: '15:40', type: 'video' },
          { id: 9, title: 'Estabelecendo metas efetivas', duration: '13:25', type: 'video' },
        ]
      },
    ],
    learningObjectives: [
      'Desenvolver mentalidade de campeão',
      'Controlar ansiedade em momentos de pressão',
      'Aumentar confiança dentro e fora de campo',
      'Superar obstáculos mentais',
      'Estabelecer e alcançar metas ambiciosas'
    ],
    requirements: [
      'Mente aberta para autoconhecimento',
      'Caderno para exercícios de reflexão',
      'Comprometimento com desenvolvimento pessoal',
      'Honestidade consigo mesmo'
    ],
    benefits: [
      'Melhore seu desempenho sob pressão',
      'Desenvolva resiliência mental',
      'Técnicas usadas por atletas de elite',
      'Exercícios práticos diários',
      'Comunidade de apoio'
    ]
  },
};

export function CourseDetailModal({ course, onClose }: CourseDetailModalProps) {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const content = courseContent[course.id as keyof typeof courseContent];

  if (!content) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="container mx-auto px-4 py-8 max-w-6xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-card rounded-2xl shadow-2xl overflow-hidden border">
            {/* Header com imagem */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs px-3 py-1 rounded-full bg-primary text-primary-foreground">
                      {course.level}
                    </span>
                    <span className="text-xs px-3 py-1 rounded-full bg-accent">
                      {content.students.toLocaleString()} alunos
                    </span>
                    <div className="flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-accent">
                      <Award className="h-3 w-3 text-yellow-500" />
                      {content.rating}
                    </div>
                  </div>
                  <h1 className="text-white mb-2">{course.title}</h1>
                  <p className="text-gray-200">{course.description}</p>
                </motion.div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              {/* Informações do instrutor */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex items-start gap-4 p-4 rounded-lg bg-accent/50 mb-8"
              >
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3>Instrutor: {content.instructor}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{content.instructorBio}</p>
                </div>
              </motion.div>

              {/* Estatísticas rápidas */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
              >
                <div className="p-4 rounded-lg border text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold">{course.duration}</div>
                  <div className="text-xs text-muted-foreground">Duração Total</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <Video className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold">{content.modules.length}</div>
                  <div className="text-xs text-muted-foreground">Módulos</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <BookOpen className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold">
                    {content.modules.reduce((acc, m) => acc + m.lessons.length, 0)}
                  </div>
                  <div className="text-xs text-muted-foreground">Aulas</div>
                </div>
                <div className="p-4 rounded-lg border text-center">
                  <TrendingUp className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="font-bold">{course.progress || 0}%</div>
                  <div className="text-xs text-muted-foreground">Completo</div>
                </div>
              </motion.div>

              {/* O que você vai aprender */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <h2 className="mb-4">O que você vai aprender</h2>
                <div className="grid md:grid-cols-2 gap-3">
                  {content.learningObjectives.map((objective, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{objective}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Conteúdo do curso */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h2 className="mb-4">Conteúdo do Curso</h2>
                <div className="space-y-3">
                  {content.modules.map((module, index) => (
                    <motion.div
                      key={module.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      className="border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
                        className="w-full p-4 flex items-center justify-between bg-accent/30 hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                            {index + 1}
                          </div>
                          <div className="text-left">
                            <h4>{module.title}</h4>
                            <p className="text-xs text-muted-foreground">{module.lessons.length} aulas</p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: activeModule === module.id ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Target className="h-5 w-5" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeModule === module.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 space-y-2 bg-background">
                              {module.lessons.map((lesson) => (
                                <div
                                  key={lesson.id}
                                  className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                                >
                                  <div className="flex items-center gap-3">
                                    {lesson.type === 'video' && <Play className="h-4 w-4 text-primary" />}
                                    {lesson.type === 'exercise' && <Target className="h-4 w-4 text-primary" />}
                                    {lesson.type === 'document' && <FileText className="h-4 w-4 text-primary" />}
                                    <span className="text-sm">{lesson.title}</span>
                                  </div>
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Requisitos */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9 }}
                className="mb-8 grid md:grid-cols-2 gap-6"
              >
                <div>
                  <h3 className="mb-3">Requisitos</h3>
                  <ul className="space-y-2">
                    {content.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="mb-3">Benefícios</h3>
                  <ul className="space-y-2">
                    {content.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* Botões de ação */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-col sm:flex-row gap-4 pt-6 border-t"
              >
                <button className="flex-1 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
                  <Play className="h-5 w-5" />
                  {course.progress ? 'Continuar Curso' : 'Iniciar Curso'}
                </button>
                <button className="px-6 py-3 rounded-lg border hover:bg-accent transition-colors">
                  Adicionar à Lista
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
