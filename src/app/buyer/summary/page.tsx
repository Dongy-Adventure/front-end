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
import useOmise from '@/hooks/useOmise';
import { CardData } from '@/types/order';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cardSchema } from '@/lib/validations/card';
import { apiClient } from '@/utils/axios';

export default function SummaryCart() {
  const toast = useToast();
  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<ItemCart[]>([]);
  const [paymentType, setPaymentType] = useState<string>('Credit/Debit Card');
  const totalAmount = products
    .filter((c) =>
      JSON.parse(localStorage.getItem('selectedProduct') ?? '').includes(
        c.product.productID
      )
    )
    .reduce((sum, c) => sum + c.product.price * c.amount, 0);
  const cardForm = useForm<CardData>({
    resolver:
      paymentType === 'Debit/Credit Card' ? zodResolver(cardSchema) : undefined,
  });
  const { token, error, loading, createToken } = useOmise();
  const c: CardData = {
    number: '4242424242424242', // Test card number
    name: 'Somchai Prasert', // Test cardholder name
    expiryMonth: '10', // Test expiry month
    expiryYear: '25', // Test expiry year
    securityCode: '123', // Test security code
  };

  const waitForPaymentStatus = (chargeID: string) => {
    return new Promise<boolean>((resolve, reject) => {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}payment/sse/${chargeID}`;

      const eventSource = new EventSource(url);

      eventSource.onmessage = (event) => {
        console.log('SSE Message:', event);
        const paymentStatus = event.data;

        if (paymentStatus === 'successful') {
          eventSource.close();
          resolve(true);
        } else if (paymentStatus === 'failed' || paymentStatus === 'canceled') {
          eventSource.close();
          resolve(false);
        }
      };

      eventSource.onerror = (error) => {
        console.error('❌ SSE Error:', error);
        eventSource.close();
        reject(new Error('Error with SSE connection.'));
      };
    });
  };

  const handlePayment = async (cardData: CardData) => {
    try {
      await createToken(cardData); // Wait for token
      if (!token) {
        return;
      }
      const userId = localStorage.getItem('userId');
      const response = await apiClient.post(
        '/payment/',
        {
          amount: totalAmount + 2000,
          buyerID: userId,
          paymentMethod: paymentType,
          createdAt: new Date(),
          token: token,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response) {
        return response;
      } else {
        toast?.setToast('error', 'Failed to send payment request.');
      }
    } catch (error: any) {
      toast?.setToast('error', `Error sending payment request: ${error}`);
    }
  };
  const postOrder = async (products: Product[], cardData?: CardData) => {
    if (paymentType === 'Debit/Credit') {
      if (!cardData) {
        toast?.setToast('error', 'No card is provided.');
        return;
      }
      const paymentResponse = await handlePayment(cardData);
      if (!paymentResponse) return;

      const chargeID = paymentResponse.data.data.id;
      const isPaymentSuccessful = await waitForPaymentStatus(chargeID);
      if (!isPaymentSuccessful) {
        toast?.setToast('error', 'Payment failed or timeout.');
        return;
      }
    }
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

            if (res) {
              toast?.setToast(
                'success',
                `Order for seller ${sellerID} has been placed!`
              );
              for (const product of updatedSellerProducts) {
                await deleteCart(product.productID);
              }
              router.push('/buyer/summary/complete');
            } else {
              toast?.setToast(
                'error',
                `Failed to create order for seller ${sellerID}.`
              );
            }
          }
        )
      );
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
          <h1 className="text-3xl font-semibold pb-4 text-project-primary">
            Order Summary
          </h1>
          <main className="overflow-x-auto p-8 flex gap-8 items-start">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th className="font-medium">Product</th>
                  <th className="font-medium">Price</th>
                  <th className="font-medium">Quantity</th>
                  <th className="font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y h-1 divide-gray-300">
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
              total={totalAmount}
              handleSubmit={postOrder}
              cardForm={cardForm}
              totalAmount={totalAmount}
              products={products.map((p: ItemCart) => p.product)}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
