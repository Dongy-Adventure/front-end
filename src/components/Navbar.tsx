'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

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
    <nav className="bg-project-blue fixed md:top-0 bottom-4 md:bottom-auto md:left-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-4/5 md:w-screen grid grid-cols-3 place-items-center md:rounded-none rounded-xl p-1">
      {navs.map((nav: NavComponent, index: number) => (
        <div
          key={index}
          className="flex items-center gap-x-1 font-semibold"
        >
          <Icon
            icon={nav.icons}
            onClick={() => {
              setActive(nav.iconsText);
              router.push(nav.link);
            }}
            className={cn(
              'w-8 h-8 rounded-md',
              active === nav.iconsText &&
                'max-md:bg-white max-md:text-project-blue'
            )}
          />
          <p className="max-md:hidden">{nav.text}</p>
        </div>
      ))}
    </nav>
  );
}
