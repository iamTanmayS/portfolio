import React, { createContext, useContext, useEffect, useState } from 'react';
import type { Blog } from '../data/blogs';
import { fetchHashnodePosts } from '../services/hashnode';

interface BlogContextType {
  blogs: Blog[];
  isLoading: boolean;
  error: string | null;
  refreshBlogs: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export function BlogProvider({ children }: { children: React.ReactNode }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const posts = await fetchHashnodePosts();
      setBlogs(posts);
      if (posts.length === 0) {
        // Only warn if absolutely no posts, could be valid for new blog
        console.log('No blogs found or API error (check network tab)');
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  return (
    <BlogContext.Provider value={{ blogs, isLoading, error, refreshBlogs: loadBlogs }}>
      {children}
    </BlogContext.Provider>
  );
}

export function useBlogs() {
  const context = useContext(BlogContext);
  if (context === undefined) {
    throw new Error('useBlogs must be used within a BlogProvider');
  }
  return context;
}
