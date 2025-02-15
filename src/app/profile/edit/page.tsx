'use client';

import ProfileForm from '@/components/ProfileForm';
import { useAuth } from '@/context/AuthContext';
import tempProfilePicture from '@/../public/placeholder2.jpg';
import { Seller } from '@/types/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface UserInfo {
  username: string;
  password: string;
  name: string;
  surname: string;
  phoneNumber: string;
  address: string;
  city: string;
  province: string;
  zip: string;
  image: string;
  balance: number;
}

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push('/');
  };
  const userInfo: UserInfo = {
    username: user?.username ?? 'error',
    password: '',
    name: user?.name ?? 'error',
    surname: user?.surname ?? 'error',
    phoneNumber: (user as Seller)?.phoneNumber ?? 'error',
    address: user?.address ?? 'error',
    city: (user as Seller)?.city ?? 'error',
    province: (user as Seller)?.province ?? 'error',
    zip: (user as Seller)?.zip ?? 'error',
    image: '',
    balance: 0,
  };

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-gray-400">My Account</p>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Profile</p>
      </div>
      <div className=" px-4 md:px-12 flex h-28 w-full bg-project-secondary rounded-xl items-center justify-start gap-8">
        <Image
          src={tempProfilePicture}
          alt="Profile Picture"
          width={90}
          height={90}
          className="rounded-full"
        />
        <div className="flex flex-col gap-1">
          <p className="text-lg font-semibold">
            {user?.name} {user?.surname}
          </p>
          <p className="text-sm">placeholder@gmail.com</p>
        </div>
      </div>
      <div className="flex pt-16 gap-16">
        <div className="rounded-xl hidden xl:block w-1/4 max-w-80 font-semibold">
          <Link
            href="/profile"
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0 rounded-t-xl bg-project-secondary"
          >
            Profile
          </Link>
          <Link
            href="/home"
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0"
          >
            Manage Order
          </Link>
          <Link
            href="/home"
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0"
          >
            Product On-display
          </Link>
          <Link
            href="/seller/transaction-history"
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0"
          >
            Transaction History
          </Link>
          <Link
            href="/withdraw"
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0"
          >
            Wallet
          </Link>
          <Link
            href="/ads"
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0"
          >
            Create Ads
          </Link>
          <Link
            href="/review"
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] border-b-0"
          >
            My Review
          </Link>
          <button
            className="flex px-4 w-full h-12 items-center justify-start border-[1px] text-red-500 rounded-b-xl"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        <ProfileForm userInfo={userInfo} />
      </div>
    </div>
  );
}
function useState<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}
