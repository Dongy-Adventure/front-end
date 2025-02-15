'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import tempProfilePicture from '@/../public/placeholder2.jpg';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getSellerBalance } from '@/utils/seller';
import { useRouter } from 'next/navigation';
import { Seller } from '@/types/user';

export default function Profile() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sellerBalance, setSellerBalance] = useState<number | null>(null);

  useEffect(() => {
    if (user?.userType === 'seller') {
      const getBalance = async () => {
        const balance = await getSellerBalance();
        setSellerBalance(balance ?? 0);
      };

      getBalance();
    }
  }, []);

  const handleLogout = () => {
    logout();
    router.push('/');
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
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-semibold pb-4">My Profile</h1>
          <div className="flex overflow-scroll gap-4 w-full h-28 mb-12  text-white">
            <div className="bg-black w-full min-w-60 max-w-72 h-full rounded-2xl px-8">
              <p className="pt-10 font-semibold">Balance</p>
              <p className="font-semibold text-2xl">
                {Number(sellerBalance).toFixed(2)} THB
              </p>
            </div>
            <div className="bg-black w-full min-w-60 max-w-72 h-full rounded-2xl px-8">
              <p className="pt-10 font-semibold">Products Sold</p>
              <p className="font-semibold text-2xl">{20}</p>
            </div>
            <div className="bg-black w-full min-w-60 max-w-72 h-full rounded-2xl px-8">
              <p className="pt-10 font-semibold">Review Score</p>
              <p className="font-semibold text-2xl">
                {Number((user as Seller)?.score).toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-4/5">
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Username</p>
                <p className="text-md font-semibold">{user?.username}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Password</p>
                <p className="text-md font-semibold">*******************</p>
              </div>
            </div>
            <div className="grid grid-cols-2">
              <div className="flex flex-col gap-2">
                <p className="text-sm">Name</p>
                <p className="text-md font-semibold">{user?.name}</p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Surname</p>
                <p className="text-md font-semibold">{user?.surname}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Phone Number</p>
              <p className="text-md font-semibold">{user?.phoneNumber}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Address</p>
              <p className="text-md font-semibold">{user?.address}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">District</p>
              <p className="text-md font-semibold">{(user as Seller)?.city}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Province</p>
              <p className="text-md font-semibold">
                {(user as Seller)?.province}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">ZIP Code</p>
              <p className="text-md font-semibold">{(user as Seller)?.zip}</p>
            </div>
            <button
              onClick={() => router.push('/profile/edit')}
              className="w-24 h-10 mt-8 bg-project-primary rounded-lg font-semibold text-white align-center justify-center"
            >
              <p>Edit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
