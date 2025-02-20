'use client';

import Link from 'next/link';
import ProductSellerCard from '@/components/product/ProductSellerCard';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import Image from 'next/image';
import ProductCard from './ProductCard';
import temp from '@/../public/placeholder200.avif';
import { Seller } from '@/types/user';
import { Review } from '@/types/review';

const exampleProducts = [
  {
    pid: '1001',
    category: 'Dried fruit',
    productName: 'Mango',
    price: 150,
    discountedPrice: 100,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1002',
    category: 'Dried fruit',
    productName: 'Pineapple',
    price: 130,
    discountedPrice: 90,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1003',
    category: 'Dried fruit',
    productName: 'Banana',
    price: 110,
    discountedPrice: 80,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1004',
    category: 'Dried fruit',
    productName: 'Apple',
    price: 140,
    discountedPrice: 95,
    image: 'public/placeholder2.jpg',
  },
  {
    pid: '1005',
    category: 'Dried fruit',
    productName: 'Peach',
    price: 160,
    discountedPrice: 120,
    image: 'public/placeholder2.jpg',
  },
];

export default function ProductPanel({
  product,
  seller,
  reviews,
}: {
  product: Product;
  seller: Seller;
  reviews: Review[];
}) {
  const [count, setCount] = useState(1);

  const router = useRouter();

  const handleAddToCart = () => {
    router.push('/buyer/cart');
  };

  return (
    <div className="p-12 md:pt-16 flex flex-col">
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Product Detail</p>
      </div>
      <div className="flex gap-12 w-full h-full flex-col lg:flex-row justify-center">
        <div className="flex lg:w-2/5 lg:max-w-2/5 items-center border-[1px] rounded-md p-4">
          {/* <ProductCarousel /> */}
          <Image
            src={temp}
            alt="product image"
            className="w-full h-auto rounded-md"
            width={1000}
            height={1000}
          />
        </div>
        <div className="flex flex-col lg:w-2/5 lg:max-w-2/5">
          <p className="text-lg md:text-xl lg:text-2xl font-bold pb-12">
            {product.productName}
          </p>
          <div className="flex gap-2 align-text-bottom pb-4">
            <p className="text-xl font-medium">฿{product.price}</p>
            <p className="text-project-green font-light translate-y-0.5">
              -78%
            </p>
          </div>
          <p className="leading-tight font-light text-sm pb-8">
            {product.description}
          </p>
          <ProductSellerCard
            seller={seller}
            reviews={reviews}
          />
          <div className="flex pt-12 pb-12 gap-4">
            <div className="flex items-center justify-between w-28 h-10 border rounded-lg bg-gray-100">
              <button
                className="w-1/3 h-full flex items-center justify-center text-xl text-gray-700 hover:bg-gray-200"
                onClick={() => setCount((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <span className="w-1/3 text-center text-lg">{count}</span>
              <button
                className="w-1/3 h-full flex items-center justify-center text-xl text-gray-700 hover:bg-gray-200"
                onClick={() => setCount((prev) => prev + 1)}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-36 h-10 bg-project-primary rounded-lg font-semibold text-white"
            >
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
      <div className="flex font-semibold text-xl gap-2 pt-16 justify-center w-full">
        <h1>Related</h1>
        <h1 className="text-project-primary">Products</h1>
      </div>
      <div className="flex justify-center">
        <div className="flex overflow-x-auto gap-4 py-8 justify-start">
          {exampleProducts.map((product) => (
            <ProductCard
              key={product.pid}
              pid={product.pid}
              category={product.category}
              productName={product.productName}
              price={product.price}
              discountedPrice={product.discountedPrice}
              image={product.image}
            />
          ))}
        </div>
      </div>
      pid: {product.productID}
    </div>
  );
}
