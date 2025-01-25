import type { Metadata } from 'next';
import { Athiti } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/AuthContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

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
        className={`${athiti.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Toaster />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
