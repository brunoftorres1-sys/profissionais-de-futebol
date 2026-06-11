import type { UserRole } from '../app/App';
import { logger } from './logger';

export interface AthleteProfile {
  age: number;
  city: string;
  dominantFoot: string;
  id: string;
  level: string;
  name: string;
  position: string;
  publicSlug: string;
  score: number;
  videos: number;
}

export interface Evaluation {
  athleteId: string;
  comment: string;
  createdAt: string;
  evaluatorRole: UserRole;
  id: string;
  score: number;
}

export interface NotificationItem {
  createdAt: string;
  id: string;
  read: boolean;
  text: string;
  title: string;
}

export interface UploadedVideo {
  createdAt: string;
  id: string;
  name: string;
  size: number;
  type: string;
}

const athleteSeed: AthleteProfile[] = [
  {
    age: 15,
    city: 'Campinas-SP',
    dominantFoot: 'Direito',
    id: 'ath-001',
    level: 'Intermediario',
    name: 'Lucas Almeida',
    position: 'Meia',
    publicSlug: 'lucas-almeida',
    score: 78,
    videos: 6,
  },
  {
    age: 16,
    city: 'Sao Paulo-SP',
    dominantFoot: 'Esquerdo',
    id: 'ath-002',
    level: 'Avancado',
    name: 'Rafaela Santos',
    position: 'Ponta',
    publicSlug: 'rafaela-santos',
    score: 84,
    videos: 9,
  },
  {
    age: 14,
    city: 'Rio de Janeiro-RJ',
    dominantFoot: 'Direito',
    id: 'ath-003',
    level: 'Iniciante',
    name: 'Mateus Oliveira',
    position: 'Goleiro',
    publicSlug: 'mateus-oliveira',
    score: 69,
    videos: 4,
  },
  {
    age: 17,
    city: 'Porto Alegre-RS',
    dominantFoot: 'Direito',
    id: 'ath-004',
    level: 'Competitivo',
    name: 'Bruno Torres',
    position: 'Volante',
    publicSlug: 'bruno-torres',
    score: 88,
    videos: 12,
  },
];

const defaultNotifications: NotificationItem[] = [
  {
    createdAt: new Date().toISOString(),
    id: 'not-001',
    read: false,
    text: 'Seu plano semanal de treino foi atualizado.',
    title: 'Plano atualizado',
  },
  {
    createdAt: new Date().toISOString(),
    id: 'not-002',
    read: false,
    text: 'Ha novas peneiras compativeis com seu perfil.',
    title: 'Novas oportunidades',
  },
];

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    logger.warn('Falha ao ler dados locais da plataforma', { context: 'platform', data: key, error });
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    logger.warn('Falha ao salvar dados locais da plataforma', { context: 'platform', data: key, error });
  }
}

export function listAthletes() {
  return readJson<AthleteProfile[]>('futurocraque-athletes', athleteSeed);
}

export function listFavorites() {
  return readJson<string[]>('futurocraque-favorites', []);
}

export function toggleFavorite(athleteId: string) {
  const favorites = listFavorites();
  const next = favorites.includes(athleteId)
    ? favorites.filter((id) => id !== athleteId)
    : [...favorites, athleteId];

  writeJson('futurocraque-favorites', next);
  return next;
}

export function listEvaluations() {
  return readJson<Evaluation[]>('futurocraque-evaluations', []);
}

export function saveEvaluation(evaluation: Omit<Evaluation, 'createdAt' | 'id'>) {
  const next = [
    {
      ...evaluation,
      createdAt: new Date().toISOString(),
      id: crypto.randomUUID(),
    },
    ...listEvaluations(),
  ];

  writeJson('futurocraque-evaluations', next);
  return next;
}

export function listNotifications() {
  return readJson<NotificationItem[]>('futurocraque-notifications', defaultNotifications);
}

export function markNotificationRead(notificationId: string) {
  const next = listNotifications().map((notification) => (
    notification.id === notificationId ? { ...notification, read: true } : notification
  ));

  writeJson('futurocraque-notifications', next);
  return next;
}

export function listUploadedVideos() {
  return readJson<UploadedVideo[]>('futurocraque-videos', []);
}

export function saveUploadedVideo(file: File) {
  const video: UploadedVideo = {
    createdAt: new Date().toISOString(),
    id: crypto.randomUUID(),
    name: file.name,
    size: file.size,
    type: file.type || 'video',
  };
  const next = [video, ...listUploadedVideos()];

  writeJson('futurocraque-videos', next);
  return next;
}
