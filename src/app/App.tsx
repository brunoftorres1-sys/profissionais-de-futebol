import { useState } from 'react';
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
import type { Course } from './components/CourseGrid';

export default function App() {
  const [activeTab, setActiveTab] = useState('todos');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState<'home' | 'trials'>('home');

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      {currentPage === 'home' ? (
        <>
          <Hero onNavigateToTrials={() => setCurrentPage('trials')} />
          <ProTestimonialsSection />
          <CategorySection activeTab={activeTab} setActiveTab={setActiveTab} />
          <CourseGrid activeTab={activeTab} onCourseClick={setSelectedCourse} />
          <ProgressTracker />
          <ResourcesSection />
        </>
      ) : (
        <ClubTrialsPage />
      )}

      <Footer onNavigate={setCurrentPage} />

      {selectedCourse && (
        <CourseDetailModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
}