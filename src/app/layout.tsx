import type { Metadata } from 'next';
import { Athiti } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';
import AuthProvider from '@/context/AuthContext';
import Layout from '@/components/Layout';

const athiti = Athiti({
  subsets: ['latin', 'thai'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--athiti',
});

export const metadata: Metadata = {
  title: "Tar's Marketplace",
  description: "SE2 term's project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${athiti.variable} bg-gray-100 antialiased font-athiti`}
      >
        <Toaster />
        <AuthProvider>
          <Layout>{children}</Layout>
        </AuthProvider>
      </body>
    </html>
  );
}
