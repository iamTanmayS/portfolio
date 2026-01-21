import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Clock, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../../data/blogs';
import { useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../cursor/CustomCursor';
import { GlowCard } from '../ui/GlowCard';
import { springs, scrollReveal } from '../../animations';

interface FeaturedBlogCardProps {
  blog: Blog;
  index: number;
}

export function FeaturedBlogCard({ blog, index }: FeaturedBlogCardProps) {
  const navigate = useNavigate();
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('link');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Tilt effect
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, springs.gentle);
  const smoothRotateY = useSpring(rotateY, springs.gentle);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    rotateX.set((y - 0.5) * -6);
    rotateY.set((x - 0.5) * 6);
  };
  
  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    navigate(`/blog/${blog.slug}`);
  };

  return (
    <GlowCard
      ref={cardRef}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      variants={scrollReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.15 }}
      glowColor="#67e8f9"
      borderRadius={20}
      style={{
        position: 'relative',
        padding: 32,
        cursor: 'pointer',
        rotateX: prefersReducedMotion ? 0 : smoothRotateX,
        rotateY: prefersReducedMotion ? 0 : smoothRotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ y: -4 }}
      {...cursorHandlers}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, height: '100%' }}>
        {/* Cover image (if available) */}
        {blog.coverImage && (
          <motion.div
            style={{
              width: '100%',
              height: 180,
              borderRadius: 12,
              overflow: 'hidden',
              background: '#1a1a24',
            }}
          >
            <motion.img
              src={blog.coverImage}
              alt={blog.title}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
          </motion.div>
        )}
        
        {/* Content */}
        <div style={{ position: 'relative', zIndex: 10 }}>
          {/* Tags */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            {blog.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '4px 10px',
                  fontSize: 12,
                  fontWeight: 500,
                  color: '#a5f3fc',
                  background: 'rgba(103, 232, 249, 0.1)',
                  borderRadius: 9999,
                  textTransform: 'capitalize',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <h3
            style={{
              fontSize: 'clamp(22px, 3vw, 28px)',
              fontWeight: 600,
              color: '#fafafa',
              lineHeight: 1.3,
              marginBottom: 8,
              fontFamily: "'Outfit', system-ui, sans-serif",
            }}
          >
            {blog.title}
          </h3>
          
          {/* Subtitle */}
          {blog.subtitle && (
            <p
              style={{
                fontSize: 16,
                color: '#a1a1aa',
                marginBottom: 12,
                fontStyle: 'italic',
              }}
            >
              {blog.subtitle}
            </p>
          )}
          
          {/* Excerpt */}
          <p
            style={{
              fontSize: 15,
              color: '#71717a',
              lineHeight: 1.6,
              marginBottom: 20,
            }}
          >
            {blog.excerpt}
          </p>
          
          {/* Meta */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              fontSize: 13,
              color: '#52525b',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Clock style={{ width: 14, height: 14 }} />
              {blog.readingTime}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Calendar style={{ width: 14, height: 14 }} />
              {new Date(blog.publishDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          
          {/* Read more indicator */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 20,
              fontSize: 14,
              fontWeight: 500,
              color: '#67e8f9',
            }}
            animate={{ x: isHovered ? 4 : 0 }}
            transition={springs.snappy}
          >
            Read article
            <ArrowRight style={{ width: 16, height: 16 }} />
          </motion.div>
        </div>
      </div>
    </GlowCard>
  );
}
