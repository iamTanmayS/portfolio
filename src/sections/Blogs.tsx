import { BlogsIntro } from './blogs/BlogsIntro';
import { FeaturedBlogs } from './blogs/FeaturedBlogs';
import { BlogsGrid } from './blogs/BlogsGrid';

export function Blogs() {
  return (
    <section
      id="blogs"
      data-section="blogs"
      style={{
        position: 'relative',
        width: '100vw',
        overflow: 'hidden',
        background: '#0a0a0f',
      }}
    >
      {/* 1. Intro Panel */}
      <BlogsIntro />

      {/* 2. Featured Blogs (Hero Articles) */}
      <FeaturedBlogs />

      {/* 3. All Blogs Grid */}
      <BlogsGrid />
    </section>
  );
}
