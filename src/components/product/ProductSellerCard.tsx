import Image from 'next/image';
import placeholder from '@/../public/placeholder2.jpg';
import { Seller } from '@/types/user';
import { Icon } from '@iconify/react/dist/iconify.js';

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
        <div className="flex">
          {[2, 4, 6, 8, 10].map((threshold, index) => (
            <Icon
              key={index}
              className="-ml-1.5"
              icon={
                seller.score >= threshold
                  ? 'material-symbols-light:star'
                  : 'material-symbols-light:star-outline'
              }
              width="20"
              height="20"
            />
          ))}
          <p className="-mt-0.5"> | 96 Ratings</p>
        </div>
      </div>
    </div>
  );
}
