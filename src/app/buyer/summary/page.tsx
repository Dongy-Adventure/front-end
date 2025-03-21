'use client';

import Link from 'next/link';
import { Product } from '@/types/product';
import { ItemCart, useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import Card from '@/components/buyer/summary/Cart';
import Order from '@/components/buyer/summary/Order';
import { createOrder } from '@/utils/order';
import { useToast } from '@/context/ToastContext';
import { useRouter } from 'next/navigation';
import { deleteCart } from '@/utils/buyer';
import { getSellerById } from '@/utils/seller';

export default function SummaryCart() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<ItemCart[]>([]);
  const [paymentType, setPaymentType] = useState<string>('');

  const postOrder = async (products: Product[]) => {
    const ordersBySeller = products.reduce(
      (acc, product) => {
        if (!acc[product.sellerID]) acc[product.sellerID] = [];
        acc[product.sellerID].push(product);
        return acc;
      },
      {} as Record<string, Product[]>
    );

    const cartObj: ItemCart[] = JSON.parse(
      localStorage.getItem('cartProduct') ?? '[]'
    );

    try {
      await Promise.all(
        Object.entries(ordersBySeller).map(
          async ([sellerID, sellerProducts]) => {
            const updatedSellerProducts = sellerProducts.map((product) => {
              const cartItem = cartObj.find(
                (item) => item.product.productID === product.productID
              );
              return {
                ...product,
                amount: cartItem ? cartItem.amount : 1,
              };
            });

            const seller = await getSellerById(sellerID);

            const res = await createOrder(
              updatedSellerProducts,
              paymentType,
              sellerID,
              seller?.username ?? '',
              user?.username ?? ''
            );
            for (const product of updatedSellerProducts) {
              await deleteCart(product.productID);
            }

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
    }
  };

  useEffect(() => {
    const productIds = localStorage.getItem('selectedProduct');
    const cartProducts = localStorage.getItem('cartProduct');

    const productIdsObj: string[] = productIds ? JSON.parse(productIds) : [];
    const cartObj: ItemCart[] = cartProducts ? JSON.parse(cartProducts) : [];

    const fetchSelectedProducts = async () => {
      if (!user || !('cart' in user)) return;

      const cartProductLists = cartObj.filter((cartItem) =>
        productIdsObj.includes(cartItem.product.productID)
      );

      setProducts(cartProductLists);
    };

    fetchSelectedProducts();
  }, [user]);

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
                {products.map((cart: ItemCart) => (
                  <Card
                    key={cart.product.productID}
                    product={cart.product}
                    amount={cart.amount}
                  />
                ))}
              </tbody>
            </table>
            <Order
              total={products
                .filter((c) =>
                  JSON.parse(
                    localStorage.getItem('selectedProduct') ?? ''
                  ).includes(c.product.productID)
                )
                .reduce((sum, c) => sum + c.product.price * c.amount, 0)}
              handleSubmit={postOrder}
              products={products.map((p: ItemCart) => p.product)}
              payBy={paymentType}
              setPayBy={(s: string) => setPaymentType(s)}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
