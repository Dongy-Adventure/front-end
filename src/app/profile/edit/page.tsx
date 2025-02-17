'use client';

import ProfileForm from '@/components/ProfileForm';
import { useAuth } from '@/context/AuthContext';
import tempProfilePicture from '@/../public/placeholder2.jpg';
import { Seller } from '@/types/user';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ProfileBadge from '@/components/ProfileBadge';
import Sidebar from '@/components/Sidebar';

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
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={1} />
        <ProfileForm userInfo={userInfo} />
      </div>
    </div>
  );
}
function useState<T>(arg0: null): [any, any] {
  throw new Error('Function not implemented.');
}
