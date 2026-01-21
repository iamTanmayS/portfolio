import type { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { CustomCursor, SplashCursor } from '../components/cursor';
import { DynamicIsland } from '../components/navbar';
import { ToastContainer } from '../components/ui';

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  const location = useLocation();
  const isBlogPage = location.pathname.startsWith('/blog/');

  return (
    <>
      {/* Custom Cursor - disabled on blog pages */}
      {!isBlogPage && (
        <>
          <CustomCursor />
          <SplashCursor />
        </>
      )}

      {/* Dynamic Island Navbar */}
      <DynamicIsland />

      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Page content */}
      {children}

      {/* Toast notifications */}
      <ToastContainer />
    </>
  );
}
