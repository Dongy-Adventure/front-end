import Image from 'next/image';
import tempProfilePicture from '@/../public/placeholder2.jpg';
import { useAuth } from '@/context/AuthContext';

export default function ProfileBadge() {
  const { user } = useAuth();

  return (
    <div className="text-black px-4 md:px-12 flex h-28 w-full bg-project-secondary rounded-xl items-center justify-start gap-8">
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
  );
}
