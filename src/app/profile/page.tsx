'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getSellerBalance } from '@/utils/seller';
import { useRouter } from 'next/navigation';
import { Seller } from '@/types/user';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import { getSellerProducts } from '@/utils/product';

export default function Profile() {
  const router = useRouter();
  const { user } = useAuth();
  const [sellerBalance, setSellerBalance] = useState<number | null>(null);
  const [productCount, setProductCount] = useState<number>(0);

  useEffect(() => {
    if (user?.userType === 'seller') {
      const getBalance = async () => {
        const balance = await getSellerBalance();
        setSellerBalance(balance ?? 0);
      };

      const getProductCount = async () => {
        const total = await getSellerProducts();
        if (total) setProductCount(total.length);
      };

      getBalance();
      getProductCount();
    }
  }, []);

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
        <p className="text-black font-semibold">Profile</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={1} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-semibold pb-4">My Profile</h1>
          {user?.userType === 'seller' && (
            <div className="flex overflow-x-scroll gap-4 w-full h-28 mb-12  text-white">
              <div className="bg-black w-full min-w-72 max-w-72 h-full rounded-2xl px-8">
                <p className="pt-10 font-semibold">Balance</p>
                <p className="font-semibold text-2xl">
                  {Number(sellerBalance).toFixed(2)} THB
                </p>
              </div>
              <div className="bg-black w-full min-w-72 max-w-72 h-full rounded-2xl px-8">
                <p className="pt-10 font-semibold">Products On List</p>
                <p className="font-semibold text-2xl">{productCount}</p>
              </div>
              <div className="bg-black w-full min-w-72 max-w-72 h-full rounded-2xl px-8">
                <p className="pt-10 font-semibold">Review Score</p>
                <p className="font-semibold text-2xl">
                  {Number((user as Seller)?.score).toFixed(2)}
                </p>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-4 md:w-4/5">
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
                <p
                  className="text-md font-semibold"
                  data-testid="name"
                >
                  {user?.name}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-sm">Surname</p>
                <p
                  className="text-md font-semibold"
                  data-testid="surname"
                >
                  {user?.surname}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Phone Number</p>
              <p
                className="text-md font-semibold"
                data-testid="phone"
              >
                {user?.phoneNumber}
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm">Address</p>
              <p
                className="text-md font-semibold"
                data-testid="address"
              >
                {user?.address}
              </p>
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
              className="w-24 h-10 mt-8 bg-project-primary rounded-lg font-semibold text-white align-center justify-center hover:bg-project-dark"
            >
              <p>Edit</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
