'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useToast } from '@/context/ToastContext';

export default function Sidebar({ state }: { state: number }) {
  const { logout } = useAuth();
  const router = useRouter();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast?.setToast('success', 'Successfully Logged Out!');
    router.push('/login');
  };

  const links = [
    { href: '/profile', label: 'Profile' },
    { href: '/order', label: 'Manage Order' },
    { href: '/home', label: 'Product On-display' },
    { href: '/seller/transaction-history', label: 'Transaction History' },
    { href: '/seller/withdraw', label: 'Wallet' },
    { href: '/ads', label: 'Create Ads' },
    { href: '/seller/review', label: 'My Review' },
  ];

  return (
    <div className="rounded-xl hidden xl:block w-1/4 max-w-80 font-semibold">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0 ${
            state - 1 === index ? 'bg-project-secondary' : ''
          } ${index === 0 ? 'rounded-t-xl' : ''}`}
        >
          {link.label}
        </Link>
      ))}
      <button
        className="flex px-4 w-full h-12 items-center justify-start border-[1px] text-red-500 rounded-b-xl"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}
