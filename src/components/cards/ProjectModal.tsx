import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from './ProjectCard';
import { Button } from '../ui/Button';
import { useCursorHandlers } from '../cursor/CustomCursor';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const closeHandlers = useCursorHandlers('button');

  // Close on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (project) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Media items (image + video if available)
  const mediaItems = project ? [
    project.image,
    ...(project.video ? [project.video] : []),
  ] : [];

  const nextMedia = () => {
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const prevMedia = () => {
    setCurrentMediaIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-dark-900/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal */}
          <motion.div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto
              bg-dark-800 rounded-2xl border border-zinc-800
              shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full
                bg-dark-700/80 backdrop-blur-sm border border-zinc-700
                flex items-center justify-center
                text-zinc-400 hover:text-white hover:border-zinc-600
                transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              {...closeHandlers}
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Media carousel */}
            <div className="relative aspect-video bg-dark-900">
              {mediaItems.map((media, index) => {
                const isVideo = media.endsWith('.mp4') || media.endsWith('.webm');
                return (
                  <motion.div
                    key={media}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index === currentMediaIndex ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ pointerEvents: index === currentMediaIndex ? 'auto' : 'none' }}
                  >
                    {isVideo ? (
                      <video
                        src={media}
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img
                        src={media}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </motion.div>
                );
              })}

              {/* Navigation arrows */}
              {mediaItems.length > 1 && (
                <>
                  <button
                    onClick={prevMedia}
                    className="absolute left-4 top-1/2 -translate-y-1/2
                      w-10 h-10 rounded-full bg-dark-900/80 backdrop-blur-sm
                      flex items-center justify-center text-white
                      hover:bg-dark-700 transition-colors"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextMedia}
                    className="absolute right-4 top-1/2 -translate-y-1/2
                      w-10 h-10 rounded-full bg-dark-900/80 backdrop-blur-sm
                      flex items-center justify-center text-white
                      hover:bg-dark-700 transition-colors"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}

              {/* Dots indicator */}
              {mediaItems.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {mediaItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentMediaIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentMediaIndex
                          ? 'bg-white w-6'
                          : 'bg-white/50 hover:bg-white/70'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {project.title}
              </h2>

              <p className="text-zinc-400 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-zinc-500 uppercase tracking-wider mb-3">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm font-medium
                        bg-pastel-purple/10 text-pastel-purple-light
                        rounded-lg border border-pastel-purple/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                {project.liveUrl && (
                  <Button
                    variant="primary"
                    icon={<ExternalLink className="w-4 h-4" />}
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    View Live
                  </Button>
                )}
                {project.githubUrl && (
                  <Button
                    variant="secondary"
                    icon={<Github className="w-4 h-4" />}
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    Source Code
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
