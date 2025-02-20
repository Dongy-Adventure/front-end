'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/../public/logo.png';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import NavbarHamburger from './NavbarHamburger';

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const { user } = useAuth();

  const handleSearch = () => {
    if (query != '') {
      router.push(`/search?q=${query}`);
    }
  };

  return (
    <>
      <nav className="z-40 hidden md:flex justify-stretch p-2 bg-white shadow-md fixed top-0 bottom-auto left-0 transform translate-x-0 w-screen">
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
        <div className="flex items-center justify-center w-full bg-gray-200 rounded-lg px-2">
          <input
            className="bg-gray-200 flex-grow rounded-lg px-2 outline-none"
            value={query}
            placeholder="Search Anything"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
              }
            }}
          />
          <Icon
            icon="material-symbols:search"
            width="20"
            height="20"
            className="text-gray-500 cursor-pointer"
            onClick={handleSearch}
          />
        </div>
        <div className="flex align-center justify-center w-full gap-8">
          <div
            className="flex justify-center gap-2  cursor-pointer"
            onClick={() => (user ? router.push('/profile') : router.push('/'))}
          >
            <Icon
              icon="iconamoon:profile"
              width="24"
              height="24"
              className="self-center"
            />
            <div className="flex flex-col gap-0 m-0 leading-none self-center">
              <p className="m-0 text-sm">Welcome!</p>
              {user ? (
                <p className="m-0 font-semibold">{user?.username}</p>
              ) : (
                <p className="m-0 font-semibold">Please login</p>
              )}
            </div>
          </div>
          {user?.userType === 'buyer' && (
            <Icon
              icon="lineicons:cart-2"
              width="24"
              height="24"
              className="self-center  cursor-pointer"
              onClick={() =>
                user ? router.push('/buyer/cart') : router.push('/login')
              }
            />
          )}
          <NavbarHamburger />
        </div>
      </nav>
      <nav className="z-40 flex md:hidden justify-between p-2 bg-white shadow-md fixed top-0 bottom-auto left-0 transform translate-x-0 w-screen px-6">
        <div
          className="flex align-center justify-center cursor-pointer self-center"
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
        <NavbarHamburger />
      </nav>
    </>
  );
}
