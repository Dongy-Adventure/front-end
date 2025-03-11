'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';

export default function RootLayoutNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <main className={cn(pathname !== '/' && 'my-8')}>
        {children}
      </main>
    </>
  );
}
