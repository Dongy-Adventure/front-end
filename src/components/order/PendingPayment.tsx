'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import WristWatch from '@/../public/wrist-watch.png';
import { Product } from '@/types/product';
import { changeOrderStatus } from '@/utils/order';
import { useToast } from '@/context/ToastContext';

interface PendingPaymentProps {
  date: string;
  orderId: string;
  paymentMethod: string;
  price: number;
  products: Product[];
  buyerName: string;
  closeTab: () => void;
}

export default function PendingPayment(props: PendingPaymentProps) {
  const { date, orderId, buyerName, paymentMethod, price, products, closeTab } =
    props;
  const toast = useToast();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const changeStatus = async () => {
    const res = await changeOrderStatus(1, orderId);
    if (res) {
      toast?.setToast('success', 'The order has been paid!');
      window.location.href = '/order';
    } else {
      toast?.setToast('error', 'There is an error occurred!');
    }
  };

  return (
    <div className="sticky top-0 left-0 -translate-x-20 w-screen h-screen grid place-items-center z-40 bg-black/30 backdrop-blur-sm">
      <main className="max-w-lg h-[450px] overflow-scroll mx-auto p-6 border rounded-lg shadow-md bg-white">
        <div className="p-4 bg-project-lightpink gap-2 rounded-md flex justify-between items-center">
          <h1 className="text-lg font-bold">
            Order #{orderId.substring(0, 7)}
          </h1>
          <span className="bg-pink-200 text-pink-600 px-3 py-1 rounded text-sm">
            Pending payment
          </span>
          <div
            className="bg-project-pink text-white font-bold px-2 rounded-full"
            onClick={() => closeTab()}
          >
            x
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">Order Date</span>
            <span className="text-sm">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Buyer</span>
            <span className="text-sm font-bold">{buyerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Payment Method</span>
            <span className="text-sm">{paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm font-medium">Total</span>
            <span className="text-sm font-bold">${price}</span>
          </div>
        </div>

        <div className="mt-4 border-t pt-2">
          <div className="flex justify-between text-sm font-medium">
            <span>Product</span>
            <span>Quantity</span>
          </div>
          {products.map((product, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b py-2"
            >
              <div className="flex items-center">
                <Image
                  src={WristWatch}
                  alt={product.productName}
                  className="w-12 h-12 mr-2"
                />
                <span className="text-sm">{product.productName}</span>
              </div>
              <span className="text-sm font-bold">{product.amount}</span>
            </div>
          ))}
          <div className="grid place-items-center mt-6">
            <button
              className="bg-project-pink text-white font-bold hover:bg-project-pinkred w-16 h-8 rounded-lg"
              onClick={changeStatus}
            >
              Pay
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
