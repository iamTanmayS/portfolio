import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Clock, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs, blogTags, type Blog } from '../../data/blogs';
import { useMotion } from '../../context/AppContext';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { springs, staggerContainer, staggerItem } from '../../animations';
import { useBlogs } from '../../context/BlogContext';
import { GlowCard } from '../../components/ui/GlowCard';

// ================================
// Blog Card
// ================================
interface BlogCardProps {
  blog: Blog;
  index: number;
}

function BlogCard({ blog }: BlogCardProps) {
  const navigate = useNavigate();
  const { prefersReducedMotion } = useMotion();
  const cursorHandlers = useCursorHandlers('link');
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Subtle tilt
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothRotateX = useSpring(rotateX, springs.gentle);
  const smoothRotateY = useSpring(rotateY, springs.gentle);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (prefersReducedMotion || !cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    rotateX.set((y - 0.5) * -4);
    rotateY.set((x - 0.5) * 4);
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
      variants={staggerItem}
      glowColor="#67e8f9"
      borderRadius={16}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        padding: 24,
        cursor: 'pointer',
        rotateX: prefersReducedMotion ? 0 : smoothRotateX,
        rotateY: prefersReducedMotion ? 0 : smoothRotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 1000,
      }}
      whileHover={{ y: -2 }}
      transition={springs.snappy}
      {...cursorHandlers}
    >
      
      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
          {blog.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 8px',
                fontSize: 11,
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
        <h4
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: '#fafafa',
            lineHeight: 1.4,
            marginBottom: 8,
            fontFamily: "'Outfit', system-ui, sans-serif",
          }}
        >
          {blog.title}
        </h4>
        
        {/* Excerpt */}
        <p
          style={{
            fontSize: 14,
            color: '#71717a',
            lineHeight: 1.6,
            marginBottom: 16,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {blog.excerpt}
        </p>
        
        {/* Meta */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 12,
            color: '#52525b',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Clock style={{ width: 12, height: 12 }} />
            {blog.readingTime}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Calendar style={{ width: 12, height: 12 }} />
            {new Date(blog.publishDate).toLocaleDateString('en-US', {
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </GlowCard>
  );
}

// ================================
// Tag Filter
// ================================
interface TagFilterProps {
  activeTag: string;
  onTagChange: (tag: string) => void;
}

function TagFilter({ activeTag, onTagChange }: TagFilterProps) {
  const cursorHandlers = useCursorHandlers('button');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'flex',
        gap: 8,
        flexWrap: 'wrap',
        marginBottom: 40,
      }}
    >
      {blogTags.map((tag) => (
        <motion.button
          key={tag.id}
          onClick={() => onTagChange(tag.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 500,
            color: activeTag === tag.id ? '#0a0a0f' : '#a1a1aa',
            background: activeTag === tag.id 
              ? 'linear-gradient(135deg, #67e8f9 0%, #a78bfa 100%)' 
              : 'rgba(255, 255, 255, 0.05)',
            border: 'none',
            borderRadius: 9999,
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          {...cursorHandlers}
        >
          {tag.label}
        </motion.button>
      ))}
    </motion.div>
  );
}

// ================================
// Main Component
// ================================
export function BlogsGrid() {
  const { blogs, isLoading } = useBlogs();
  const [activeTag, setActiveTag] = useState('all');
  
  // Combine static tags with any new ones found in blogs, or just use static for now.
  // Ideally, we derive unique tags from `blogs`.
  // For now, let's just use the filtered blogs.
  
  const filteredBlogs = activeTag === 'all' 
    ? blogs.filter(b => !b.featured) 
    : blogs.filter(b => b.tags.includes(activeTag) && !b.featured);

  if (isLoading) {
      return (
        <section
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 1200,
            margin: '0 auto',
            padding: '40px 24px 100px',
          }}
        >
             {/* Skeleton Grid */}
             <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 24,
                }}
              >
                {[1, 2, 3, 4, 5, 6].map((i) => (
                   <div key={i} style={{ height: 300, background: 'rgba(255,255,255,0.02)', borderRadius: 16 }} />
                ))}
            </div>
        </section>
      )
  }

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px 100px',
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        style={{
          marginBottom: 32,
        }}
      >
        <h3
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#a78bfa',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: 8,
          }}
        >
          All Posts
        </h3>
        <p
          style={{
            fontSize: 18,
            color: '#a1a1aa',
          }}
        >
          Browse all writings and notes
        </p>
      </motion.div>

      {/* Tag filter */}
      <TagFilter activeTag={activeTag} onTagChange={setActiveTag} />

      {/* Blog grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 24,
        }}
      >
        {filteredBlogs.map((blog, index) => (
          <BlogCard key={blog.id} blog={blog} index={index} />
        ))}
      </motion.div>

      {/* Empty state */}
      {filteredBlogs.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#71717a',
          }}
        >
          <p>No posts found in this category.</p>
        </motion.div>
      )}
    </section>
  );
}
