'use client';

import Navbar from '@/components/Navbar';
import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function Profile() {
  const [language, setLanguage] = useState('Thai');
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="flex items-center justify-center p-12 bg-gray-100 w-3/4">
        <Link
          href="./"
          className="bg-gray-200 rounded-2xl p-3"
        >
          <Icon
            icon="ion:chevron-back"
            color="black"
            width="24"
            height="24"
          />
        </Link>
      </div>
    </div>
  );
}
