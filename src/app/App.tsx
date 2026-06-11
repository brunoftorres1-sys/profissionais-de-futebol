import { lazy, Suspense, useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CourseGrid } from './components/CourseGrid';
import { ProgressTracker } from './components/ProgressTracker';
import { ResourcesSection } from './components/ResourcesSection';
import { Footer } from './components/Footer';
import { CourseDetailModal } from './components/CourseDetailModal';
import { ProTestimonialsSection } from './components/ProTestimonialsSection';
import { AthleteJourney } from './components/AthleteJourney';
import { AthleteProfileSection } from './components/AthleteProfileSection';
import { DevelopmentPathways } from './components/DevelopmentPathways';
import { TrustAndSafetySection } from './components/TrustAndSafetySection';
import { LoadingPage } from './components/system/LoadingPage';
import { Seo } from './components/system/Seo';
import { ErrorPage } from './components/system/ErrorPages';
import { logger } from '../lib/logger';
import type { Course } from './components/CourseGrid';

export type Page = 'home' | 'trials' | 'resources' | 'dashboard' | 'support' | 'about' | 'parents' | 'clubs' | 'legal' | 'notFound' | 'serverError';
export type UserRole = 'athlete' | 'coach' | 'scout';
export interface AthleteSummary {
  name: string;
  age: string;
  position: string;
  city: string;
  level: string;
  guardian: string;
  role: UserRole;
}

const defaultAthlete: AthleteSummary = {
  name: 'Lucas Almeida',
  age: '15',
  position: 'Meia ofensivo',
  city: 'Campinas-SP',
  level: 'Intermediario',
  guardian: 'Autorizacao confirmada',
  role: 'athlete',
};

const AuthModal = lazy(() => import('./components/AuthModal').then((module) => ({ default: module.AuthModal })));
const AthleteDashboard = lazy(() => import('./components/AthleteDashboard').then((module) => ({ default: module.AthleteDashboard })));
const ClubTrialsPage = lazy(() => import('./components/ClubTrialsPage').then((module) => ({ default: module.ClubTrialsPage })));
const InfoPage = lazy(() => import('./components/InfoPage').then((module) => ({ default: module.InfoPage })));
const ResourceHubPage = lazy(() => import('./components/ResourceHubPage').then((module) => ({ default: module.ResourceHubPage })));

const pagePaths: Record<Page, string> = {
  about: '/sobre',
  clubs: '/clubes',
  dashboard: '/dashboard',
  home: '/',
  legal: '/legal',
  notFound: '/404',
  parents: '/pais',
  resources: '/recursos',
  serverError: '/500',
  support: '/suporte',
  trials: '/peneiras',
};

function pageFromPath(pathname: string): Page {
  const match = Object.entries(pagePaths).find(([, path]) => path === pathname);
  return match ? (match[0] as Page) : 'notFound';
}

function readStoredAuth() {
  try {
    return localStorage.getItem('futurocraque-authenticated') === 'true';
  } catch {
    return false;
  }
}

export default function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>(() => pageFromPath(window.location.pathname));
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [athlete, setAthlete] = useState<AthleteSummary>(defaultAthlete);
  const [isAuthenticated, setIsAuthenticated] = useState(readStoredAuth);

  useEffect(() => {
    try {
      localStorage.setItem('futurocraque-authenticated', String(isAuthenticated));
    } catch (error) {
      logger.warn('Nao foi possivel salvar sessao local', { context: 'App', error });
    }
  }, [isAuthenticated]);

  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.history.pushState({}, '', pagePaths[page]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => setCurrentPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Seo page={currentPage} />
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:font-bold focus:text-primary-foreground"
      >
        Pular para conteudo
      </a>
      <Header currentPage={currentPage} onNavigate={navigate} onAuthOpen={setAuthMode} />

      {currentPage === 'home' && (
        <main id="conteudo">
          <Hero
            onNavigateToTrials={() => navigate('trials')}
            onCreateProfile={() => setAuthMode('signup')}
          />
          <AthleteJourney onCreateProfile={() => setAuthMode('signup')} onNavigateToTrials={() => navigate('trials')} />
          <AthleteProfileSection onCreateProfile={() => setAuthMode('signup')} />
          <DevelopmentPathways />
          <ProTestimonialsSection />
          <CategorySection activeTab={activeTab} setActiveTab={setActiveTab} />
          <CourseGrid activeTab={activeTab} onCourseClick={setSelectedCourse} isAuthenticated={isAuthenticated} />
          <ProgressTracker />
          <ResourcesSection onNavigate={navigate} onCreateProfile={() => setAuthMode('signup')} />
          <TrustAndSafetySection onNavigate={navigate} />
        </main>
      )}

      <Suspense fallback={<LoadingPage />}>
        {currentPage === 'trials' && <ClubTrialsPage />}
        {currentPage === 'resources' && <ResourceHubPage onCreateProfile={() => setAuthMode('signup')} />}
        {currentPage === 'dashboard' && <AthleteDashboard athlete={athlete} onNavigateToTrials={() => navigate('trials')} />}
        {currentPage === 'support' && <InfoPage type="support" onCreateProfile={() => setAuthMode('signup')} />}
        {currentPage === 'about' && <InfoPage type="about" onCreateProfile={() => setAuthMode('signup')} />}
        {currentPage === 'parents' && <InfoPage type="parents" onCreateProfile={() => setAuthMode('signup')} />}
        {currentPage === 'clubs' && <InfoPage type="clubs" onCreateProfile={() => setAuthMode('signup')} />}
        {currentPage === 'legal' && <InfoPage type="legal" onCreateProfile={() => setAuthMode('signup')} />}
        {currentPage === 'notFound' && <ErrorPage code="404" onNavigate={navigate} />}
        {currentPage === 'serverError' && <ErrorPage code="500" onNavigate={navigate} />}
      </Suspense>

      <Footer onNavigate={navigate} />

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {authMode && (
        <Suspense fallback={<LoadingPage />}>
          <AuthModal
            mode={authMode}
            onModeChange={setAuthMode}
            onClose={() => setAuthMode(null)}
            onSuccess={(profile) => {
              if (profile) {
                setAthlete(profile);
              }
              setIsAuthenticated(true);
              setAuthMode(null);
              navigate('dashboard');
              logger.info('Usuario autenticado no fluxo local', { context: 'AuthModal', data: { role: profile?.role ?? 'athlete' } });
            }}
          />
        </Suspense>
      )}
    </div>
  );
}
