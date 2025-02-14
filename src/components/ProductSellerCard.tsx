import Image from 'next/image';
import placeholder from '@/../public/placeholder2.jpg';
import { getSellerById } from '@/utils/seller';

const mockSeller = {
  sellerName: 'petchluvsyou',
  rating: 4,
};

export default function ProductSellerCard({ sid }: { sid: string }) {
  const seller = getSellerById(sid);

  return (
    <div className="flex gap-4">
      <Image
        src={placeholder}
        alt="profile image"
        className="w-12 h-12 rounded-full"
      />
      <div className="flex-col gap-0">
        <p className="font-semibold">{mockSeller.sellerName}</p>
        <p>score: {mockSeller.rating}</p>
      </div>
    </div>
  );
}
