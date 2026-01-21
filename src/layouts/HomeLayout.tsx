import type { ReactNode } from 'react';
import { BaseLayout } from './BaseLayout';

interface HomeLayoutProps {
  children: ReactNode;
}

export function HomeLayout({ children }: HomeLayoutProps) {
  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
}
