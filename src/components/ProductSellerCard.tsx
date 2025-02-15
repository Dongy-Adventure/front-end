import Image from 'next/image';
import placeholder from '@/../public/placeholder2.jpg';
import { Seller } from '@/types/user';

export default function ProductSellerCard({ seller }: { seller: Seller }) {
  return (
    <div className="flex gap-4">
      <Image
        src={placeholder}
        alt="profile image"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-col gap-0">
        <p className="font-semibold">{seller.username}</p>
        <p>score: {seller.score}</p>
      </div>
    </div>
  );
}
