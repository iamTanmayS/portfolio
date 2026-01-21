import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Clock, Code2, Eye } from 'lucide-react';
import type { Project } from '../../data/projects';
import { Button, IconButton } from '../../components/ui';
import { springs } from '../../animations';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999, // Ensure it's above everything
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
          }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(10, 10, 15, 0.8)',
              backdropFilter: 'blur(12px)',
            }}
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={springs.snappy}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 1000,
              maxHeight: '90vh',
              background: '#12121a',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 24,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Header / Media - Fixed */}
            <div style={{ position: 'relative', height: 300, flexShrink: 0 }}>
              <img 
                src={project.thumbnail} 
                alt={project.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #12121a, transparent)' }} />
              
              <div style={{ position: 'absolute', top: 24, right: 24, zIndex: 10 }}>
                <IconButton
                  icon={<X size={20} />}
                  label="Close modal"
                  onClick={onClose}
                  variant="default" // or 'glass' if available, but default fits
                  className="!bg-black/50 !backdrop-blur-sm !border-white/10 hover:!bg-black/70"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div 
              style={{ 
                flex: 1, 
                overflowY: 'auto', 
                padding: '0 40px 40px',
                marginTop: -60, // Overlap banner
                position: 'relative',
                zIndex: 10
              }}
            >
              {/* Title Block */}
              <div style={{ marginBottom: 40 }}>
                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <span style={{ 
                    padding: '4px 12px', background: 'rgba(167, 139, 250, 0.1)', 
                    color: '#a78bfa', borderRadius: 9999, fontSize: 13, fontWeight: 600
                  }}>
                    {project.category.replace('-', ' / ')}
                  </span>
                </div>
                <h2 style={{ 
                  fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 700, 
                  fontFamily: "'Outfit', system-ui, sans-serif", color: '#fff', marginBottom: 16
                }}>
                  {project.title}
                </h2>
                <p style={{ fontSize: 20, color: '#a1a1aa', lineHeight: 1.5 }}>
                  {project.tagline}
                </p>
              </div>

              {/* Grid Layout */}
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48, alignItems: 'start' }}>
                
                {/* Left Column: Story */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
                  <section>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#f9a8d4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                      The Problem
                    </h3>
                    <p style={{ fontSize: 16, color: '#d4d4d8', lineHeight: 1.7 }}>
                      {project.problem}
                    </p>
                  </section>
                  
                  <section>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#67e8f9', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                      The Solution
                    </h3>
                    <p style={{ fontSize: 16, color: '#d4d4d8', lineHeight: 1.7 }}>
                      {project.solution}
                    </p>
                  </section>

                  <section>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: '#fcd9bd', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
                      Key Learnings
                    </h3>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                      {project.learnings.map((item, i) => (
                        <li key={i} style={{ display: 'flex', gap: 12, marginBottom: 12, color: '#a1a1aa' }}>
                          <span style={{ color: '#fcd9bd' }}>→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Right Column: Metadata */}
                <div style={{ 
                  background: 'rgba(255,255,255,0.02)', 
                  border: '1px solid rgba(255,255,255,0.05)', 
                  borderRadius: 16, 
                  padding: 24 
                }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    
                    {/* Links */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <Button 
                        variant="primary" 
                        icon={<Eye size={16}/>} 
                        onClick={() => {
                          onClose();
                          navigate(`/project/${project.id}`);
                        }}
                        className="w-full justify-center"
                      >
                        View in Detail
                      </Button>
                      {project.liveUrl && (
                        <Button 
                          variant="secondary" 
                          icon={<ExternalLink size={16}/>} 
                          onClick={() => window.open(project.liveUrl, '_blank')}
                          className="w-full justify-center"
                        >
                          Visit Live Site
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          variant="secondary" 
                          icon={<Github size={16}/>} 
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="w-full justify-center"
                        >
                          View Code
                        </Button>
                      )}
                    </div>

                    <div style={{ height: 1, background: 'rgba(255,255,255,0.1)' }} />

                    {/* Stats */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#71717a', fontSize: 12, marginBottom: 4 }}>
                          <Calendar size={12} /> Year
                        </div>
                        <div style={{ color: '#fff', fontWeight: 500 }}>{project.year}</div>
                      </div>
                      {project.duration && (
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#71717a', fontSize: 12, marginBottom: 4 }}>
                            <Clock size={12} /> Duration
                          </div>
                          <div style={{ color: '#fff', fontWeight: 500 }}>{project.duration}</div>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#71717a', fontSize: 12, marginBottom: 12 }}>
                        <Code2 size={12} /> Tech Stack
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {project.techStack.map(tech => (
                          <span key={tech} style={{ 
                            fontSize: 12, color: '#d4d4d8', background: 'rgba(255,255,255,0.05)', 
                            padding: '4px 8px', borderRadius: 4, border: '1px solid rgba(255,255,255,0.05)'
                          }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
