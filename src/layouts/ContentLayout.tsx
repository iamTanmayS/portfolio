import type { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

interface ContentLayoutProps {
  children: ReactNode;
}

export function ContentLayout({ children }: ContentLayoutProps) {
  return (
    <BaseLayout>
      <main className="w-full min-h-screen">
        <div className="mx-auto w-full max-w-[1400px] px-8">
          {children}
        </div>
      </main>
    </BaseLayout>
  );
}
