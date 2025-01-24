'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

type Page = 'Home' | 'Order' | 'Profile';

export default function Navbar() {
  const [active, setActive] = useState<Page | null>(null);
  return (
    <nav className="bg-project-blue w-80 grid grid-cols-3 place-items-center rounded-lg p-1">
      <Icon
        icon="mdi-light:format-list-checks"
        onClick={() => setActive('Order')}
        className={cn(
          'w-8 h-8 rounded-md',
          active === 'Order' && 'bg-white text-project-blue'
        )}
      />
      <Icon
        icon="mdi-light:home"
        onClick={() => setActive('Home')}
        className={cn(
          'w-8 h-8 rounded-md',
          active === 'Home' && 'bg-white text-project-blue'
        )}
      />
      <Icon
        icon="mdi-light:account"
        onClick={() => setActive('Profile')}
        className={cn(
          'w-8 h-8 rounded-md',
          active === 'Profile' && 'bg-white text-project-blue'
        )}
      />
    </nav>
  );
}
