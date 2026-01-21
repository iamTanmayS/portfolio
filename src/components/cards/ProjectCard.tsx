import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Play } from 'lucide-react';
import { TiltCard } from './TiltCard';
import { useCursorHandlers } from '../cursor/CustomCursor';
import { IconButton } from '../ui/IconButton';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  video?: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: string;
  featured?: boolean;
}

interface ProjectCardProps {
  project: Project;
  onOpenModal: (project: Project) => void;
  index?: number;
}

export function ProjectCard({ project, onOpenModal, index = 0 }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cursorHandlers = useCursorHandlers('text', 'View Project');

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && project.video) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <TiltCard tiltAmount={8} className="h-full">
        <motion.div
          className={`
            relative overflow-hidden rounded-2xl
            bg-dark-700/50 border border-zinc-800
            hover:border-pastel-purple/30
            transition-colors duration-300
            ${project.featured ? 'col-span-2 row-span-2' : ''}
          `}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => onOpenModal(project)}
          {...cursorHandlers}
        >
          {/* Media Container */}
          <div className="relative aspect-video overflow-hidden">
            {/* Image */}
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              animate={{
                scale: isHovered ? 1.05 : 1,
                filter: isHovered ? 'brightness(0.7)' : 'brightness(1)',
              }}
              transition={{ duration: 0.4 }}
            />

            {/* Video overlay on hover */}
            {project.video && (
              <AnimatePresence>
                {isHovered && (
                  <motion.video
                    ref={videoRef}
                    src={project.video}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent" />

            {/* Play icon for video projects */}
            {project.video && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 0 : 1 }}
              >
                <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Play className="w-5 h-5 text-white ml-1" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-400 line-clamp-2 mb-4">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.techStack.slice(0, 4).map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 text-xs font-medium
                    bg-pastel-purple/10 text-pastel-purple-light
                    rounded-md border border-pastel-purple/20"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-xs text-zinc-500">
                  +{project.techStack.length - 4}
                </span>
              )}
            </div>

            {/* Links */}
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {project.liveUrl && (
                <IconButton
                  icon={<ExternalLink />}
                  label="Live Demo"
                  href={project.liveUrl}
                  external
                  size="sm"
                />
              )}
              {project.githubUrl && (
                <IconButton
                  icon={<Github />}
                  label="GitHub"
                  href={project.githubUrl}
                  external
                  size="sm"
                />
              )}
            </div>
          </div>

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            animate={{
              boxShadow: isHovered
                ? 'inset 0 0 60px rgba(167, 139, 250, 0.1)'
                : 'inset 0 0 0px transparent',
            }}
          />
        </motion.div>
      </TiltCard>
    </motion.div>
  );
}
