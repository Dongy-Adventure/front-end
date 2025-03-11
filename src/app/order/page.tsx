'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import { Order } from '@/types/order';
import Card from '@/components/order/Card';
import { getOrder } from '@/utils/order';

export const dummyOrders: Order[] = [
  {
    appointmentID: 'AID001',
    buyerID: 'BID001',
    createdAt: '2025-03-10T10:00:00Z',
    orderID: 'OID001',
    products: [
      {
        sellerID: 'SID001',
        color: 'Red',
        createdAt: '2025-03-09T12:30:00Z',
        description: 'A stylish red jacket',
        imageURL: 'https://example.com/red-jacket.jpg',
        price: 49.99,
        productID: 'PID001',
        productName: 'Red Jacket',
        tag: ['clothing', 'jacket', 'fashion'],
      },
    ],
    sellerID: 'SID001',
    status: 0,
    totalPrice: 49.99,
  },
  {
    appointmentID: 'AID002',
    buyerID: 'BID002',
    createdAt: '2025-03-10T11:00:00Z',
    orderID: 'OID002',
    products: [
      {
        sellerID: 'SID002',
        color: 'Blue',
        createdAt: '2025-03-09T13:00:00Z',
        description: 'A comfortable blue hoodie',
        imageURL: 'https://example.com/blue-hoodie.jpg',
        price: 39.99,
        productID: 'PID002',
        productName: 'Blue Hoodie',
        tag: ['clothing', 'hoodie', 'casual'],
      },
    ],
    sellerID: 'SID002',
    status: 0,
    totalPrice: 39.99,
  },

  {
    appointmentID: 'AID003',
    buyerID: 'BID003',
    createdAt: '2025-03-11T09:00:00Z',
    orderID: 'OID003',
    products: [
      {
        sellerID: 'SID003',
        color: 'Black',
        createdAt: '2025-03-10T15:00:00Z',
        description: 'A premium black leather wallet',
        imageURL: 'https://example.com/black-wallet.jpg',
        price: 29.99,
        productID: 'PID003',
        productName: 'Black Wallet',
        tag: ['accessories', 'wallet', 'leather'],
      },
    ],
    sellerID: 'SID003',
    status: 1,
    totalPrice: 29.99,
  },
  {
    appointmentID: 'AID004',
    buyerID: 'BID004',
    createdAt: '2025-03-11T10:30:00Z',
    orderID: 'OID004',
    products: [
      {
        sellerID: 'SID004',
        color: 'White',
        createdAt: '2025-03-10T16:00:00Z',
        description: 'A classic white sneaker',
        imageURL: 'https://example.com/white-sneaker.jpg',
        price: 59.99,
        productID: 'PID004',
        productName: 'White Sneaker',
        tag: ['shoes', 'sneakers', 'fashion'],
      },
    ],
    sellerID: 'SID004',
    status: 1,
    totalPrice: 59.99,
  },

  {
    appointmentID: 'AID005',
    buyerID: 'BID005',
    createdAt: '2025-03-12T08:45:00Z',
    orderID: 'OID005',
    products: [
      {
        sellerID: 'SID005',
        color: 'Yellow',
        createdAt: '2025-03-11T14:00:00Z',
        description: 'A bright yellow backpack',
        imageURL: 'https://example.com/yellow-backpack.jpg',
        price: 45.99,
        productID: 'PID005',
        productName: 'Yellow Backpack',
        tag: ['bags', 'backpack', 'travel'],
      },
    ],
    sellerID: 'SID005',
    status: 2,
    totalPrice: 45.99,
  },
  {
    appointmentID: 'AID006',
    buyerID: 'BID006',
    createdAt: '2025-03-12T09:15:00Z',
    orderID: 'OID006',
    products: [
      {
        sellerID: 'SID006',
        color: 'Green',
        createdAt: '2025-03-11T15:30:00Z',
        description: 'A stylish green dress',
        imageURL: 'https://example.com/green-dress.jpg',
        price: 69.99,
        productID: 'PID006',
        productName: 'Green Dress',
        tag: ['clothing', 'dress', 'fashion'],
      },
    ],
    sellerID: 'SID006',
    status: 2,
    totalPrice: 69.99,
  },

  {
    appointmentID: 'AID007',
    buyerID: 'BID007',
    createdAt: '2025-03-13T07:30:00Z',
    orderID: 'OID007',
    products: [
      {
        sellerID: 'SID007',
        color: 'Gray',
        createdAt: '2025-03-12T12:00:00Z',
        description: 'A warm gray wool scarf',
        imageURL: 'https://example.com/gray-scarf.jpg',
        price: 19.99,
        productID: 'PID007',
        productName: 'Gray Scarf',
        tag: ['accessories', 'scarf', 'winter'],
      },
    ],
    sellerID: 'SID007',
    status: 3,
    totalPrice: 19.99,
  },
  {
    appointmentID: 'AID008',
    buyerID: 'BID008',
    createdAt: '2025-03-13T08:00:00Z',
    orderID: 'OID008',
    products: [
      {
        sellerID: 'SID008',
        color: 'Purple',
        createdAt: '2025-03-12T13:30:00Z',
        description: 'A soft purple blanket',
        imageURL: 'https://example.com/purple-blanket.jpg',
        price: 34.99,
        productID: 'PID008',
        productName: 'Purple Blanket',
        tag: ['home', 'blanket', 'cozy'],
      },
    ],
    sellerID: 'SID008',
    status: 3,
    totalPrice: 34.99,
  },
];

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(dummyOrders);
  }, []);
  const oo = getOrder();
  console.log("order");
  console.log(oo);
  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col bg-white">
      <div className="flex gap-2 pb-12">
        <Link
          href="/home"
          className="text-gray-400"
        >
          Home
        </Link>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">Profile</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={user?.userType === 'seller' ? 2 : 3} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-semibold pb-4">
            {user?.userType === 'seller' ? 'Manage Order' : 'My Order'}
          </h1>

          <div className="flex overflow-x-scroll gap-4 h-full w-full mb-12 font-bold">
            <section>
              <div className="bg-white mb-8 w-full min-w-72 max-w-72 h-28 border-gray-300 border-2 rounded-2xl px-8">
                <p className="pt-10 font-semibold">Pending Payment</p>
                <p className="font-semibold text-2xl">
                  {orders.filter((order) => order.status === 0).length}
                </p>
              </div>
              {orders
                .filter((order: Order) => order.status === 0)
                .map((order: Order) => (
                  <Card
                    key={order.orderID}
                    orderId={order.orderID}
                    orderDate={order.createdAt}
                    price={order.totalPrice}
                    status={0}
                  />
                ))}
            </section>
            <section>
              <div className="w-full mb-8 min-w-72 max-w-72 h-28 rounded-2xl border-gray-300 border-2 px-8">
                <p className="pt-10 font-semibold">Prepare for delivery</p>
                <p className="font-semibold text-2xl">
                  {
                    orders.filter(
                      (order) => order.status === 1 || order.status === 2
                    ).length
                  }
                </p>
              </div>
              {orders
                .filter(
                  (order: Order) => order.status === 1 || order.status === 2
                )
                .map((order: Order) => (
                  <Card
                    key={order.orderID}
                    orderId={order.orderID}
                    orderDate={order.createdAt}
                    price={order.totalPrice}
                    status={order.status}
                  />
                ))}
            </section>
            <section>
              <div className="w-full mb-8 min-w-72 max-w-72 h-28 rounded-2xl border-gray-300 border-2 px-8">
                <p className="pt-10 font-semibold">Completed</p>
                <p className="font-semibold text-2xl">
                  {orders.filter((order) => order.status === 3).length}
                </p>
              </div>
              {orders
                .filter((order: Order) => order.status === 3)
                .map((order: Order) => (
                  <Card
                    key={order.orderID}
                    orderId={order.orderID}
                    orderDate={order.createdAt}
                    price={order.totalPrice}
                    status={3}
                  />
                ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
