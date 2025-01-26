import ProfileForm from '@/components/ProfileForm';
interface UserInfo {
  name: string;
  address: string;
  city: string;
  province: string;
  zip: string;
  language: string;
  image: string;
}
const tempUser: UserInfo = {
  name: 'Sirapatch Thammaleelakul',
  address: '999 Moo 1 Payupnai',
  city: 'Wangchan',
  province: 'Rayong',
  zip: '21877',
  language: 'TH',
  image: '',
};

export default function Profile() {
  return (
    <>
      <ProfileForm userInfo={tempUser} />
    </>
  );
}
