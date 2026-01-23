import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { BlogProvider } from './context/BlogContext';
import { SoundProvider } from './context/SoundProvider';
import { MusicPlayer } from './components/ui';
import { MultiStateHero } from './components/hero';
import { About, Projects, Blogs, Album, Resume, Contact } from './sections';
import { BlogArticle } from './pages/BlogArticle';

import { useSectionObserver } from './hooks/useScrollObserver';
import { HomeLayout } from './layouts/HomeLayout';
import { ContentLayout } from './layouts/ContentLayout';
import ProjectPage from './pages/ProjectPage';

// ================================
// Main Content (Home Page)
// ================================
function HomeContent() {
  // Initialize section observer
  useSectionObserver();

  return (
    <main className="relative">
      <MultiStateHero />
      <About />
      <Projects />
      <Blogs />
      <Album />
      <Resume />
      <Contact />
    </main>
  );
}

// ================================
// App with Routing
// ================================
function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <BlogProvider>
          <SoundProvider>
            {/* Music Player - Persists across all routes */}
            <MusicPlayer />
            
            <Routes>
              {/* Home Route */}
              <Route path="/" element={
                <HomeLayout>
                  <HomeContent />
                </HomeLayout>
              } />

              {/* All other routes wrapped in ContentLayout */}
              <Route path="/*" element={
                <ContentLayout>
                  <Routes>
                    <Route path="/blog/:slug" element={<BlogArticle />} />
                    <Route path="/project/:id" element={<ProjectPage />} />
                  </Routes>
                </ContentLayout>
              } />
            </Routes>
          </SoundProvider>
        </BlogProvider>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
