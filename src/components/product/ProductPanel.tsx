'use client';

import Link from 'next/link';
import ProductSellerCard from '@/components/product/ProductSellerCard';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import Image from 'next/image';
import ProductCard from './ProductCard';
import temp from '@/../public/placeholder200.jpeg';
import { Seller } from '@/types/user';
import { Review } from '@/types/review';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { updateCart } from '@/utils/buyer';
import { getAllProducts } from '@/utils/product';

export default function ProductPanel({
  product,
  seller,
  reviews,
}: {
  product: Product;
  seller: Seller;
  reviews: Review[];
}) {
  const { user } = useAuth();
  const toast = useToast();
  const [count, setCount] = useState(1);
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res: Product[] | null = await getAllProducts();
        setProducts(res?.filter((p) => p.amount > 0) ?? []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async () => {
    if (user?.userType !== 'buyer') {
      toast?.setToast('error', 'Seller cannot access this!');
      return;
    }
    const res = await updateCart(product.productID, count);
    if (res) {
      toast?.setToast('success', 'Successfully added a product to your cart!');
      router.push('/buyer/cart');
    } else {
      toast?.setToast(
        'error',
        'There is an error occurred, Please try again later!'
      );
      router.push('/home');
    }
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
          <Image
            src={product.image && product.image !== '' ? product.image : temp}
            alt="product image"
            className="w-full h-auto rounded-md"
            width={50}
            height={50}
            sizes="lg"
          />
        </div>
        <div className="flex flex-col lg:w-2/5 lg:max-w-2/5">
          <p className="text-lg md:text-xl lg:text-2xl font-bold pb-12">
            {product.productName}
          </p>
          <div className="flex gap-2 align-text-bottom pb-4">
            <p className="text-xl font-medium">฿{product.price}</p>
          </div>
          <p className="leading-tight font-light text-sm pb-8">
            {product.description}
          </p>
          <ProductSellerCard
            seller={seller}
            reviews={reviews}
          />
          {product.amount === 0 ? (
            <p className="text-red-500 pt-12">Out of stock.</p>
          ) : (
            <div className="flex pt-12 pb-12 gap-4">
              <div className="flex items-center justify-between w-28 h-10 border rounded-lg bg-gray-100">
                <button
                  data-testid="decrease-button"
                  className="w-1/3 h-full flex items-center justify-center text-xl text-gray-700 hover:bg-gray-200"
                  onClick={() => setCount((prev) => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span
                  data-testid="count-value"
                  className="w-1/3 text-center text-lg"
                >
                  {count}
                </span>
                <button
                  data-testid="increase-button"
                  className="w-1/3 h-full flex items-center justify-center text-xl text-gray-700 hover:bg-gray-200"
                  onClick={() =>
                    setCount((prev) => Math.min(prev + 1, product.amount))
                  }
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
          )}
        </div>
      </div>
      <div className="flex font-semibold text-xl gap-2 pt-16 justify-center w-full">
        <h1>Related</h1>
        <h1 className="text-project-primary">Products</h1>
      </div>
      <div className="flex justify-center">
        <div className="flex overflow-x-auto gap-4 py-8 justify-start">
          {products
            ?.filter((p: Product) => p.productID !== product.productID)
            .map((product: Product) => (
              <ProductCard
                key={product.productID}
                pid={product.productID}
                category={
                  product.tag?.length
                    ? product.tag.join(', ')
                    : 'Not Categorized'
                }
                productName={product.productName}
                price={product.price}
                discountedPrice={product.price * 0.8}
                image={product.image}
              />
            ))}
        </div>
      </div>
      pid: {product.productID}
    </div>
  );
}
