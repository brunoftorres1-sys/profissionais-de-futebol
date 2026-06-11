import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { CourseGrid } from './components/CourseGrid';
import { ProgressTracker } from './components/ProgressTracker';
import { ResourcesSection } from './components/ResourcesSection';
import { Footer } from './components/Footer';
import { CourseDetailModal } from './components/CourseDetailModal';
import { ProTestimonialsSection } from './components/ProTestimonialsSection';
import { ClubTrialsPage } from './components/ClubTrialsPage';
import { AthleteJourney } from './components/AthleteJourney';
import { AthleteProfileSection } from './components/AthleteProfileSection';
import { DevelopmentPathways } from './components/DevelopmentPathways';
import { TrustAndSafetySection } from './components/TrustAndSafetySection';
import { AuthModal } from './components/AuthModal';
import { ResourceHubPage } from './components/ResourceHubPage';
import { InfoPage } from './components/InfoPage';
import { AthleteDashboard } from './components/AthleteDashboard';
import type { Course } from './components/CourseGrid';

export type Page = 'home' | 'trials' | 'resources' | 'dashboard' | 'support' | 'about' | 'parents' | 'clubs' | 'legal';
export interface AthleteSummary {
  name: string;
  age: string;
  position: string;
  city: string;
  level: string;
  guardian: string;
}

const defaultAthlete: AthleteSummary = {
  name: 'Lucas Almeida',
  age: '15',
  position: 'Meia ofensivo',
  city: 'Campinas-SP',
  level: 'Intermediario',
  guardian: 'Autorizacao confirmada',
};

export default function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authMode, setAuthMode] = useState<'login' | 'signup' | null>(null);
  const [athlete, setAthlete] = useState<AthleteSummary>(defaultAthlete);
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem('futurocraque-authenticated') === 'true');

  useEffect(() => {
    localStorage.setItem('futurocraque-authenticated', String(isAuthenticated));
  }, [isAuthenticated]);

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} onAuthOpen={setAuthMode} />

      {currentPage === 'home' && (
        <>
          <Hero
            onNavigateToTrials={() => setCurrentPage('trials')}
            onCreateProfile={() => setAuthMode('signup')}
          />
          <AthleteJourney onCreateProfile={() => setAuthMode('signup')} onNavigateToTrials={() => setCurrentPage('trials')} />
          <AthleteProfileSection onCreateProfile={() => setAuthMode('signup')} />
          <DevelopmentPathways />
          <ProTestimonialsSection />
          <CategorySection activeTab={activeTab} setActiveTab={setActiveTab} />
          <CourseGrid activeTab={activeTab} onCourseClick={setSelectedCourse} isAuthenticated={isAuthenticated} />
          <ProgressTracker />
          <ResourcesSection onNavigate={setCurrentPage} onCreateProfile={() => setAuthMode('signup')} />
          <TrustAndSafetySection onNavigate={setCurrentPage} />
        </>
      )}

      {currentPage === 'trials' && (
        <ClubTrialsPage />
      )}

      {currentPage === 'resources' && (
        <ResourceHubPage onCreateProfile={() => setAuthMode('signup')} />
      )}

      {currentPage === 'dashboard' && (
        <AthleteDashboard athlete={athlete} onNavigateToTrials={() => setCurrentPage('trials')} />
      )}

      {currentPage === 'support' && (
        <InfoPage type="support" onCreateProfile={() => setAuthMode('signup')} />
      )}

      {currentPage === 'about' && (
        <InfoPage type="about" onCreateProfile={() => setAuthMode('signup')} />
      )}

      {currentPage === 'parents' && (
        <InfoPage type="parents" onCreateProfile={() => setAuthMode('signup')} />
      )}

      {currentPage === 'clubs' && (
        <InfoPage type="clubs" onCreateProfile={() => setAuthMode('signup')} />
      )}

      {currentPage === 'legal' && (
        <InfoPage type="legal" onCreateProfile={() => setAuthMode('signup')} />
      )}

      <Footer onNavigate={setCurrentPage} />

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}

      {authMode && (
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
            setCurrentPage('dashboard');
          }}
        />
      )}
    </div>
  );
}
