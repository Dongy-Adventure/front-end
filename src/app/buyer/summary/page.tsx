'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProductById } from '@/utils/product';
import Card from '@/components/buyer/summary/Cart';
import Order from '@/components/buyer/summary/Order';
import { createOrder } from '@/utils/order';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';

export default function SummaryCart() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const { totalPrice, resetContext } = useCart();
  const [products, setProducts] = useState<Product[]>([]);

  const postOrder = async (products: Product[]) => {
    const ordersBySeller = products.reduce(
      (acc, product) => {
        if (!acc[product.sellerID]) acc[product.sellerID] = [];
        acc[product.sellerID].push(product);
        return acc;
      },
      {} as Record<string, Product[]>
    );

    try {
      await Promise.all(
        Object.entries(ordersBySeller).map(
          async ([sellerID, sellerProducts]) => {
            const res = await createOrder(sellerProducts, sellerID);
            console.log(sellerID);

            if (res) {
              toast?.setToast(
                'success',
                `Order for seller ${sellerID} has been placed!`
              );
            } else {
              toast?.setToast(
                'error',
                `Failed to create order for seller ${sellerID}.`
              );
            }
          }
        )
      );

      router.push('/buyer/summary/complete');
    } catch (error) {
      console.error('Error placing orders:', error);
      toast?.setToast('error', 'There was an error processing your order.');
    } finally {
      resetContext();
    }
  };

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
            <Order
              total={totalPrice}
              handleSubmit={postOrder}
              products={products}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
