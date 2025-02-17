'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import logo from '@/../public/logo.png';
import Image from 'next/image';

type Page = 'Home' | 'Order' | 'Profile';

interface NavComponent {
  icons: string;
  text: string;
  iconsText: Page;
  link: string;
}

const navs: NavComponent[] = [
  {
    icons: 'mdi-light:format-list-checks',
    text: 'รายการคำสั่งซื้อ',
    iconsText: 'Order',
    link: '/order',
  },
  {
    icons: 'mdi-light:home',
    text: 'หน้าหลัก',
    iconsText: 'Home',
    link: '/home',
  },
  {
    icons: 'mdi-light:account',
    text: 'โปรไฟล์',
    iconsText: 'Profile',
    link: '/profile',
  },
];

export default function Navbar() {
  const router = useRouter();
  const [active, setActive] = useState<Page | null>(null);

  return (
    <nav className="z-50 flex justify-stretch p-1 bg-white shadow-md fixed md:top-0 bottom-4 md:bottom-auto md:left-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-4/5 md:w-screen">
      <div className="flex align-center justify-center w-full">
        <div className="w-10 h-10">
          <Image
            src={logo}
            alt="logo"
            className="w-full"
          />
        </div>
        <p className="font-bold text-xl text-black text-center p-2">
          TarsMarketplace
        </p>
      </div>
      <div className="flex align-center justify-center w-full">
        <div className="bg-gray-200 rounded-lg w-full my-1"></div>
      </div>
    </nav>
  );
}
