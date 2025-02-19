import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function NavbarHamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { user, logout } = useAuth();

  const menuItems = user
    ? [
        { path: '/profile', label: 'Profile' },
        { path: '/seller/order', label: 'Manage Order' },
        { path: '/seller/post', label: 'Post Product' },
        { path: '/seller/product-on-display', label: 'Product On-display' },
        { path: '/seller/transaction-history', label: 'Transaction History' },
        { path: '/seller/wallet', label: 'Wallet' },
        { path: '/seller/ads', label: 'Create Ads' },
        { path: '/seller/review', label: 'My Review' },
      ]
    : [{ label: 'Home', path: '/home' }];

  return (
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
  );
}
