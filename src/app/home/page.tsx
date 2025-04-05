'use client';

import Carousel from '@/components/product/Carousel';
import ProductCard from '@/components/product/ProductCard';
import { Product } from '@/types/product';
import { getAllProducts } from '@/utils/product';
import { useEffect, useState } from 'react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

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

  return (
    <div className="pt-8 flex flex-col">
      <div className="w-full">
        <Carousel />
      </div>
      <div className="p-12">
        <div>
          <p className="text-xl lg:text-2xl font-semibold">
            Recommended Products
          </p>
          <p className="text-md lg:text-md font-light">
            Don&apos;t wait. The time will never be just right.
          </p>
          <div className="flex overflow-scroll gap-4 py-8">
            {products.map((product: Product) => (
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
                discountedPrice={product.price * 0.9}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
