import { useState } from 'react';
import { motion } from 'framer-motion';
import { blogTags } from '../../data/blogs';
import { useCursorHandlers } from '../../components/cursor/CustomCursor';
import { staggerContainer } from '../../animations';
import { useBlogs } from '../../context/BlogContext';
import { BlogCard } from '../../components/cards/BlogCard';


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
