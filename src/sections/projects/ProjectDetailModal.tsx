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
        <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 md:px-6 py-0 md:py-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={springs.snappy}
            className="relative w-full h-[100dvh] md:h-auto md:max-h-[90vh] md:max-w-6xl md:mx-4 bg-[#12121a] md:rounded-3xl md:border border-white/10 overflow-hidden flex flex-col shadow-2xl"
          >
            {/* Header / Media - Fixed */}
            <div className="relative h-64 md:h-80 shrink-0">
              <img 
                src={project.thumbnail} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-[#12121a]/20 to-transparent" />
              
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-50">
                <IconButton
                  icon={<X size={20} />}
                  label="Close modal"
                  onClick={onClose}
                  variant="default"
                  className="!bg-black/50 !backdrop-blur-md !border-white/10 hover:!bg-black/70 !size-10 md:!size-12"
                />
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 pb-28 md:px-12 md:pb-12 -mt-16 md:-mt-24 relative z-10">
              {/* Title Block */}
              <div className="mb-10 md:mb-12">
                <div className="flex gap-3 mb-5">
                  <span className="px-4 py-1.5 bg-pastel-purple/10 text-pastel-purple rounded-full text-sm md:text-base font-semibold">
                    {project.category.replace('-', ' / ')}
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-bold font-display text-white mb-5 leading-tight">
                  {project.title}
                </h2>
                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl">
                  {project.tagline}
                </p>
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-10 md:gap-12 items-start">
                
                {/* Left Column: Story */}
                <div className="flex flex-col gap-10 md:gap-12 order-2 md:order-1">
                  <section>
                    <h3 className="text-sm font-semibold text-pastel-pink uppercase tracking-widest mb-5">
                      The Problem
                    </h3>
                    <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                      {project.problem}
                    </p>
                  </section>
                  
                  <section>
                    <h3 className="text-sm font-semibold text-pastel-cyan uppercase tracking-widest mb-5">
                      The Solution
                    </h3>
                    <p className="text-base md:text-lg text-zinc-300 leading-relaxed">
                      {project.solution}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-sm font-semibold text-pastel-peach uppercase tracking-widest mb-5">
                      Key Learnings
                    </h3>
                    <ul className="space-y-3">
                      {project.learnings.map((item, i) => (
                        <li key={i} className="flex gap-3 text-zinc-400 text-sm md:text-base leading-relaxed">
                          <span className="text-pastel-peach shrink-0">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </div>

                {/* Right Column: Metadata */}
                <div className="order-1 md:order-2 bg-white/[0.02] border border-white/5 rounded-2xl p-7 md:p-9 md:sticky md:top-0">
                  <div className="flex flex-col gap-6">
                    
                    {/* Links */}
                    <div className="flex flex-col gap-3">
                      <Button 
                        variant="primary" 
                        icon={<Eye size={18}/>} 
                        onClick={() => {
                          onClose();
                          navigate(`/project/${project.id}`);
                        }}
                        className="w-full justify-center !text-sm md:!text-base !py-3"
                      >
                        View in Detail
                      </Button>
                      {project.liveUrl && (
                        <Button 
                          variant="secondary" 
                          icon={<ExternalLink size={18}/>} 
                          onClick={() => window.open(project.liveUrl, '_blank')}
                          className="w-full justify-center !text-sm md:!text-base !py-3"
                        >
                          Visit Live Site
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button 
                          variant="secondary" 
                          icon={<Github size={18}/>} 
                          onClick={() => window.open(project.githubUrl, '_blank')}
                          className="w-full justify-center !text-sm md:!text-base !py-3"
                        >
                          View Code
                        </Button>
                      )}
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider mb-1">
                          <Calendar size={12} /> Year
                        </div>
                        <div className="text-white font-medium">{project.year}</div>
                      </div>
                      {project.duration && (
                        <div>
                          <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider mb-1">
                            <Clock size={12} /> Duration
                          </div>
                          <div className="text-white font-medium">{project.duration}</div>
                        </div>
                      )}
                    </div>

                    {/* Tech Stack */}
                    <div>
                      <div className="flex items-center gap-2 text-zinc-500 text-xs uppercase tracking-wider mb-3">
                        <Code2 size={12} /> Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-2.5">
                        {project.techStack.map(tech => (
                          <span key={tech} className="text-sm text-zinc-300 bg-white/5 px-3 py-1.5 rounded-md border border-white/5">
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
