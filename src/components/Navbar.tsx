'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/../public/logo.png';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';

type Page = 'Home' | 'Order' | 'Profile';

interface NavComponent {
  icons: string;
  text: string;
  iconsText: Page;
  link: string;
}

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const user = useAuth();

  const handleSearch = () => {
    if (query != '') {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <nav className="z-50 flex justify-stretch p-2 bg-white shadow-md fixed md:top-0 bottom-4 md:bottom-auto md:left-0 left-1/2 transform -translate-x-1/2 md:translate-x-0 w-4/5 md:w-screen">
      <div
        className="flex align-center justify-center w-full cursor-pointer"
        onClick={() => router.push('/home')}
      >
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
      <div className="hidden md:flex items-center justify-center w-full bg-gray-200 rounded-lg px-2">
        <input
          className="bg-gray-200 flex-grow rounded-lg px-2 outline-none"
          value={query}
          placeholder="Search Anything"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setQuery(e.target.value)
          }
        />
        <Icon
          icon="material-symbols:search"
          width="20"
          height="20"
          className="text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
      </div>
      <div className="flex align-center justify-center w-full gap-8 cursor-pointer">
        <div
          className="flex justify-center gap-2"
          onClick={() =>
            user.user ? router.push('/profile') : router.push('/login')
          }
        >
          <Icon
            icon="iconamoon:profile"
            width="24"
            height="24"
            className="self-center"
          />
          <div className="flex flex-col gap-0 m-0 leading-none self-center">
            <p className="m-0 text-sm">Welcome!</p>
            {user.user ? (
              <p className="m-0 font-semibold">{user.user?.username}</p>
            ) : (
              <p className="m-0 font-semibold">Please login</p>
            )}
          </div>
        </div>
        <Icon
          icon="lineicons:cart-2"
          width="24"
          height="24"
          className="self-center"
          onClick={() =>
            user.user ? router.push('/cart') : router.push('/login')
          }
        />
      </div>
    </nav>
  );
}
