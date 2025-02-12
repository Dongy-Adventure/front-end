'use client';

import ProfileForm from '@/components/ProfileForm';
import { useAuth } from '@/context/AuthContext';
import Pakichu from '@/../public/placeholder2.jpg';
import { Seller } from '@/types/user';

interface UserInfo {
  name: string;
  surname: string;
  tel: string;
  address: string;
  city: string;
  province: string;
  zip: string;
  image: string;
  balance: number;
}

export default function Profile() {
  const { user } = useAuth();
  console.log(user);

  const userInfo: UserInfo = {
    name: user?.name ?? 'John',
    surname: user?.surname ?? 'Dong',
    tel: (user as Seller)?.phoneNumber ?? '0960000000',
    address: (user as Seller)?.address ?? '999 Moo 1 Payupnai',
    city: (user as Seller)?.city ?? 'Wangchan',
    province: (user as Seller)?.province ?? 'Rayong',
    zip: (user as Seller)?.zip ?? '21877',
    image: user?.image ?? Pakichu,
    balance: user?.balance ?? 812379,
  };

  return <ProfileForm userInfo={userInfo} />;
}
