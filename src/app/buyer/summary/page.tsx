'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import Summary from '@/components/buyer/cart/Summary';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProductById } from '@/utils/product';
import Card from '@/components/buyer/summary/Cart';
import Order from '@/components/buyer/summary/Order';

export default function SummaryCart() {
  const { user } = useAuth();
  const { totalPrice, resetContext } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productIds = localStorage.getItem('selectedProduct');
    const productIdsObj = productIds ? JSON.parse(productIds) : [];

    const fetchSelectedProducts = async () => {
      if (!user || !('cart' in user)) return;

      const productList = await Promise.all(
        productIdsObj.map(async (productId: string) => {
          const product = await getProductById(productId);
          return product;
        })
      );

      setProducts(productList.filter((p): p is Product => p !== null));
    };

    fetchSelectedProducts();
  }, []);

  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Order Summary</p>
      </div>
      <div className="flex gap-16 text-black">
        <div className="flex flex-col w-full">
          <h1 className="text-3xl font-bold pb-4 text-project-primary">
            Order Summary
          </h1>
          <main className="overflow-x-auto p-8 flex gap-8">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {products.map((cart: Product) => (
                  <Card
                    key={cart.productID}
                    product={cart}
                  />
                ))}
              </tbody>
            </table>
            <Order total={totalPrice} />
          </main>
        </div>
      </div>
    </div>
  );
}
