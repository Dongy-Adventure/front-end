import type { Metadata } from 'next';
import { Athiti } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/context/AuthContext';
import Layout from '@/components/Layout';
import { ToastProvider } from '@/context/ToastContext';
import CartProvider from '@/context/CartContext';

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
        className={`${athiti.variable} bg-white text-black antialiased font-athiti`}
      >
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              <Layout>{children}</Layout>
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
