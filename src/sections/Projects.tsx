import { useState } from 'react';

import { ProjectsIntro } from './projects/ProjectsIntro';
import { FeaturedProjects } from './projects/FeaturedProjects';
import { ProjectsGrid } from './projects/ProjectsGrid';
import { ProjectDetailModal } from './projects/ProjectDetailModal';
import { ProjectsCTA } from './projects/ProjectsCTA';
import type { Project } from '../data/projects';

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300); // Clear after animation
  };

  return (
    <section
      id="projects"
      data-section="projects"
      style={{
        position: 'relative',
        width: '100vw',
        overflow: 'hidden',
        background: '#0a0a0f', // Ensure background avoids gaps
      }}
    >
      {/* 1. Intro Panel */}
      <ProjectsIntro />

      {/* 2. Featured Projects (Hero) */}
      
      {/* 3. All Projects Grid */}
      <ProjectsGrid onOpenModal={handleOpenModal} />

      {/* 4. Projects CTA */}
      <ProjectsCTA />

      {/* 5. Detail Modal Overlay */}
      <ProjectDetailModal 
        project={selectedProject} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  );
}
