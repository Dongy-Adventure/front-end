'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default function RootLayoutNav({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== '/' && pathname !== '/login' && <Navbar />}
      <main className="my-8">{children}</main>
    </>
  );
}
