'use client';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import logo from '@/../public/logo.png';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const toast = useToast();

  const handleSearch = () => {
    if (query != '') {
      router.push(`/search?q=${query}`);
    }
  };

  const menuItems = user
    ? [
        { path: '/profile', label: 'Profile' },
        { path: '/order', label: 'Manage Order' },
        { path: '/home', label: 'Product On-display' },
        { path: '/seller/transaction-history', label: 'Transaction History' },
        { path: '/seller/wallet', label: 'Wallet' },
        { path: '/ads', label: 'Create Ads' },
        { path: '/seller/review', label: 'My Review' },
      ]
    : [{ label: 'Home', path: '/home' }];

  return (
    <>
      <nav className="z-50 hidden md:flex justify-stretch p-2 bg-white shadow-md fixed top-0 bottom-auto left-0 transform translate-x-0 w-screen">
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
              user ? router.push('/profile') : router.push('/login')
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
              {user ? (
                <p className="m-0 font-semibold">{user?.username}</p>
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
              user ? router.push('/cart') : router.push('/login')
            }
          />
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
        <div className="self-center">
          <Icon
            icon="bx:menu-alt-left"
            width="32"
            height="32"
            className="fixed top-4 right-5 cursor-pointer z-50"
            onClick={() => setIsOpen(!isOpen)}
          />
          <div
            className={`fixed text-2xl font-semibold flex flex-col gap-4 pt-32 px-12 top-0 right-0 w-screen h-screen bg-project-secondary transform ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out z-40`}
          >
            <div>
              <p
                className="fixed top-4 left-6 font-bold text-2xl"
                onClick={() => setIsOpen(false)}
              >
                Menu.
              </p>
              {menuItems.map((item, index) => (
                <p
                  key={index}
                  className="hover:text-project-primary pb-4"
                  onClick={() => {
                    router.push(item.path);
                    setIsOpen(false);
                  }}
                >
                  {item.label}
                </p>
              ))}
            </div>

            {user ? (
              <p
                className="text-red-500 pt-12"
                onClick={() => {
                  logout();
                  toast?.setToast('success', 'Successfully Logged Out!');
                  router.push('/');
                  setIsOpen(false);
                }}
              >
                Logout
              </p>
            ) : (
              <p
                className="hover:text-project-primary"
                onClick={() => {
                  router.push('/');
                  setIsOpen(false);
                }}
              >
                Login
              </p>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
