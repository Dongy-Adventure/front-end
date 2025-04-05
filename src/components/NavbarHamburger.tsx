import { Icon } from '@iconify/react/dist/iconify.js';
import { useState } from 'react';
import { useToast } from '@/context/ToastContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function NavbarHamburger() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const toast = useToast();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [query, setQuery] = useState<string>('');

  const handleSearch = () => {
    if (query != '') {
      router.push(`/search?q=${query}`);
    }
  };

  const menuItems = user
    ? user.userType === 'seller'
      ? [
          { path: '/home', label: 'Home' },
          { path: '/profile', label: 'Profile' },
          { path: '/order', label: 'Manage Order' },
          { path: '/seller/product-on-display', label: 'Product On-display' },
          { path: '/seller/transaction-history', label: 'Transaction History' },
          { path: '/seller/wallet', label: 'Wallet' },
          { path: '/seller/ads', label: 'Create Ads' },
          { path: '/seller/review', label: 'My Review' },
        ]
      : [
          { path: '/profile', label: 'Profile' },
          { path: '/buyer/cart', label: 'My Cart' },
          { path: '/order', label: 'My Order' },
          { path: '/buyer/review', label: 'My Review' },
        ]
    : [{ label: 'Home', path: '/home' }];

  return (
    <div className="self-center">
      <Icon
        icon={!isOpen ? 'bx:menu-alt-left' : 'material-symbols:close'}
        width="32"
        height="32"
        className="fixed top-4 right-5 cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      />
      <div
        className={`fixed text-2xl font-semibold flex flex-col gap-4 pt-32 px-12 top-0 right-0 w-screen h-screen md:max-w-96 bg-project-secondary transform ${
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
              className="hover:text-project-primary mb-4 w-fit cursor-pointer"
              onClick={() => {
                router.push(item.path);
                setIsOpen(false);
              }}
            >
              {item.label}
            </p>
          ))}
          <div className="flex flex-col gap-2 mb-4 w-full">
            <div
              className="flex items-center gap-2 hover:text-project-primary w-fit"
              onClick={() => setSearchIsOpen(!searchIsOpen)}
            >
              <p>Search</p>
              <Icon
                icon={
                  !searchIsOpen
                    ? 'icon-park-outline:down'
                    : 'icon-park-outline:up'
                }
                width="24"
                height="24"
                className="cursor-pointer mt-1"
              />
            </div>
            {searchIsOpen && (
              <div className="-mb-14 flex w-full h-12 font-light text-base items-center gap-2">
                <input
                  className="flex-grow rounded-lg w-full h-full md:max-w-96 px-2 bg-inherit border-gray-500 hover:border-project-primary focus:border-project-primary border-2"
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
                  width="28"
                  height="28"
                  className="text-gray-500 cursor-pointer h-full"
                  onClick={handleSearch}
                />
              </div>
            )}
          </div>
        </div>

        {user ? (
          <p
            className="text-red-500 mt-12 w-fit"
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
            className="hover:text-project-primary w-fit"
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
