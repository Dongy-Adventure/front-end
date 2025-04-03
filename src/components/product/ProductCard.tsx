'use client';

import Image from 'next/image';
import tempProductImage from '@/../public/placeholder200.jpeg';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useRouter } from 'next/navigation';

const ProductCard = ({
  pid,
  category,
  productName,
  price,
  discountedPrice,
  image,
}: {
  pid: string;
  category: string;
  productName: string;
  price: number;
  discountedPrice: number;
  image: string;
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/product/${pid}`)}
      className="relative bg-white rounded-md flex flex-col items-center max-w-60 min-w-60 min-h-84 max-h-84 border-[1px] border-gray-200 cursor-pointer"
    >
      <Image
        src={image && image !== '' ? image : tempProductImage}
        alt={productName}
        width={200}
        height={200}
        className="rounded-lg object-cover p-6 w-full"
      />
      <div className="text-left w-full border-t-[1px] border-gray-200">
        <div className="px-4 py-4 flex flex-col">
          <p className="text-sm text-gray-500 font-light">{category}</p>
          <h2 className="text-md text-black font-semibold">{productName}</h2>
          <div className="flex gap-2 pt-2">
            <p className="font-bold text-purple-600">
              ฿{discountedPrice.toFixed(2)}
            </p>
            {discountedPrice < price && (
              <p className="text-gray-400 line-through">${price.toFixed(2)}</p>
            )}
          </div>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          router.push('/buyer/cart');
        }}
        className="z-10 absolute top-3 right-3 w-6 h-6 flex items-center justify-center rounded-full bg-project-secondary"
      >
        <Icon
          icon="lineicons:cart-2"
          width="15"
          height="15"
          className="text-project-primary"
        />
      </button>
    </div>
  );
};

export default ProductCard;
