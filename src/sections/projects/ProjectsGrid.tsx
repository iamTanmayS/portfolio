import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { getProjectsByCategory, projectCategories } from '../../data/projects';
import type { Project } from '../../data/projects';
import { useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { springs, staggerContainer, staggerItem } from '../../animations';
import { Layers } from 'lucide-react';

// ================================
// Grid Card
// ================================
import { GlowCard } from '../../components/ui/GlowCard';

interface GridCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index: number;
}

function GridCard({ project, onOpenModal, index }: GridCardProps) {
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('button');
  const cardRef = useRef<HTMLDivElement>(null);
  
  // 3D tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, springs.snappy);
  const springRotateY = useSpring(rotateY, springs.snappy);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    rotateX.set(-y * 5);
    rotateY.set(x * 5);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const colors = ['#a78bfa', '#67e8f9', '#f9a8d4', '#34d399', '#fbbf24'];
  const glowColor = colors[index % colors.length];

  return (
    <GlowCard
      layout
      glowColor={glowColor}
      borderRadius={16}
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onOpenModal(project)}
      style={{
        position: 'relative',
        cursor: 'pointer',
        transformStyle: 'preserve-3d',
        perspective: 1000,
        rotateX: springRotateX,
        rotateY: springRotateY,
      }}
      whileHover={prefersReducedMotion ? {} : {
        y: -4,
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
      }}
      {...cursorHandlers}
    >
      {/* Thumbnail */}
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden' }}>
        <motion.img
          src={project.thumbnail}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          whileHover={{ scale: 1.05 }}
          transition={springs.gentle}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.2)' }} />
      </div>

      {/* Content */}
      <div style={{ padding: 24 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <h4 style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontFamily: "'Outfit', system-ui, sans-serif" }}>
            {project.title}
          </h4>
          <span style={{ fontSize: 12, color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
            {project.year}
          </span>
        </div>
        
        <p style={{ fontSize: 14, color: '#a1a1aa', lineHeight: 1.6, marginBottom: 16 }}>
          {project.tagline}
        </p>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {project.techStack.slice(0, 3).map(tech => (
            <span 
              key={tech}
              style={{ 
                fontSize: 11, 
                color: '#d4d4d8', 
                background: 'rgba(255,255,255,0.05)', 
                padding: '4px 8px', 
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.05)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </GlowCard>
  );
}

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
              <GridCard 
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
