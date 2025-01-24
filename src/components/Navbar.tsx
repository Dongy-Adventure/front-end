'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Page = 'Home' | 'Order' | 'Profile';

interface NavComponent {
  icons: string;
  text: string;
  iconsText: Page;
  link?: string;
}

const navs: NavComponent[] = [
  {
    icons: 'mdi-light:format-list-checks',
    text: 'รายการคำสั่งซื้อ',
    iconsText: 'Order',
  },
  {
    icons: 'mdi-light:home',
    text: 'หน้าหลัก',
    iconsText: 'Home',
  },
  {
    icons: 'mdi-light:account',
    text: 'โปรไฟล์',
    iconsText: 'Profile',
  },
];

export default function Navbar() {
  const [active, setActive] = useState<Page | null>(null);

  return (
    <nav className="bg-project-blue w-4/5 grid grid-cols-3 place-items-center rounded-xl p-1 font-athiti">
      {navs.map((nav: NavComponent, index: number) => (
        <div
          key={index}
          className="flex items-center gap-x-1 font-semibold"
        >
          <Icon
            icon={nav.icons}
            onClick={() => setActive(nav.iconsText)}
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
