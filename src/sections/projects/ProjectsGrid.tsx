import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectsByCategory, projectCategories } from '../../data/projects';
import type { Project } from '../../data/projects';
import { springs } from '../../animations';
import { Layers } from 'lucide-react';
import { ProjectCard } from '../../components/cards/ProjectCard';

// ================================
// Main Grid Component
// ================================
interface ProjectsGridProps {
  onOpenModal: (project: Project) => void;
}

export function ProjectsGrid({ onOpenModal }: ProjectsGridProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleProjects = getProjectsByCategory(activeCategory);

  return (
    <section
      style={{
        position: 'relative',
        width: '100vw',
        padding: '64px 0 128px',
        marginLeft: 'calc(-50vw + 50%)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* Header & Filters */}
        <div style={{ marginBottom: 48, display: 'flex', flexDirection: 'column', gap: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 24, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                All Projects
              </h3>
              <p style={{ color: '#a1a1aa' }}>
                A collection of experiments, tools, and full-stack applications.
              </p>
            </div>

            {/* Filter Pills */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {projectCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  style={{
                    position: 'relative',
                    padding: '8px 16px',
                    fontSize: 14,
                    fontWeight: 500,
                    borderRadius: 9999,
                    color: activeCategory === category.id ? '#0a0a0f' : '#a1a1aa',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s',
                  }}
                >
                  {activeCategory === category.id && (
                    <motion.div
                      layoutId="activeCategory"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: '#fff',
                        borderRadius: 9999,
                      }}
                      transition={springs.snappy}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>
                    {category.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 32,
          }}
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                onOpenModal={onOpenModal}
                index={index}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {visibleProjects.length === 0 && (
          <div style={{ padding: 64, textAlign: 'center', color: '#71717a' }}>
            <Layers style={{ width: 32, height: 32, margin: '0 auto 16px', opacity: 0.5 }} />
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
