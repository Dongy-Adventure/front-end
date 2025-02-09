'use client';

import Return from '@/components/Return';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Wallet from '@/components/seller/wallet/Wallet';
import { Seller } from '@/types/user';
import Pakichu from '@/../public/placeholder2.jpg';
import Image from 'next/image';

interface UserInfo {
  name: string;
  surname: string;
  tel: string;
  address: string;
  city: string;
  province: string;
  zip: string;
  language: string;
  image: string;
  balance: number;
}

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col items-center pb-20 gap-12">
      <div className="flex flex-col items-center justify-center gap-8 pt-8">
        <Return />
        {user?.userType === 'seller' && (
          <div className="text-black absolute right-4 top-8">Score: 10</div>
        )}
        <div className="flex flex-col gap-4 items-center">
          <div
            className="flex items-center justify-center w-48 h-48 border-[1px] border-project-blue rounded-lg bg-gray-100"
            // style={{
            //   backgroundImage: Pakichu ? `url(${Pakichu})` : 'none',
            //   backgroundSize: 'cover',
            //   backgroundPosition: 'center',
            // }}
          >
            <Image
              src={Pakichu}
              alt="Pakichu"
              className="object-contain rounded-lg"
            />
          </div>
          <p className="text-project-blue font-bold text-xl">
            {user?.name} {user?.surname}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 pt-4 w-full">
          <p className="text-project-blue text-left pb-2 font-semibold">
            เบอร์โทรศัพท์
          </p>
          <p className="w-80 p-1 pt-0 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue">
            {user?.phoneNumber}
          </p>
        </div>
        <div className="flex flex-col items-start gap-2 pt-4">
          <p className="text-project-blue text-left pb-2 font-semibold">
            ที่อยู่
          </p>
          <p className="w-80 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue">
            {user?.address}
          </p>
          <div className="flex gap-8">
            <p className="w-36 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue">
              {user?.city ?? 'Wangchan'}
            </p>
            <p className="w-36 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue">
              {user?.province ?? 'Rayong'}
            </p>
          </div>
          <p className="w-14 p-1 border-0 border-b-[1px] border-project-blue bg-transparent text-base focus:outline-none focus:border-b-2 focus:border-project-blue text-project-blue">
            {user?.zip ?? '21877'}
          </p>
        </div>
      </div>
      <Link
        className="flex w-32 items-center gap-6 mb-4"
        href="./profile/edit"
      >
        <button className="w-full h-12 bg-project-blue text-white border rounded-xl hover:bg-blue-950">
          แก้ไขข้อมูล
        </button>
      </Link>
      {(user?.userType === 'seller' || 1) && <Wallet balance={872319} />}
    </div>
  );
}
