'use client';

import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ProfileBadge from '@/components/ProfileBadge';
import { Order } from '@/types/order';
import Card from '@/components/order/Card';
import PendingPayment from '@/components/order/PendingPayment';
import { getOrder } from '@/utils/order';
import { useToast } from '@/context/ToastContext';

export default function Orders() {
  const { user } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isPopup, setIsPopup] = useState<number | null>(null);
  const [selecteOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const getUserOrders = async () => {
      const res = await getOrder();
      if (!res) {
        toast?.setToast('error', 'There is an error fetching the orders!');
      } else {
        setOrders(res);
      }
    };

    getUserOrders();
  }, []);
  const oo = getOrder();
  console.log("order");
  console.log(oo);
  return (
    <div className="p-12 md:px-20 md:pt-16 flex flex-col">
      {isPopup !== null && (
        <PendingPayment
          date={selecteOrder?.createdAt ?? '0000'}
          orderId={selecteOrder?.orderID ?? ''}
          products={selecteOrder?.products ?? []}
          buyerName={selecteOrder?.buyerName ?? ''}
          paymentMethod="PromtPay"
          price={selecteOrder?.totalPrice ?? 0}
          closeTab={() => setIsPopup(null)}
        />
      )}
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
                    products={order.products}
                    orderId={order.orderID}
                    orderDate={order.createdAt}
                    price={order.totalPrice}
                    status={0}
                    setState={(n) => setIsPopup(n)}
                    setOrder={() => setSelectedOrder(order)}
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
                    products={order.products}
                    status={order.status}
                    setState={(n) => setIsPopup(n)}
                    setOrder={() => setSelectedOrder(order)}
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
                    products={order.products}
                    status={3}
                    setState={(n) => setIsPopup(n)}
                    setOrder={() => setSelectedOrder(order)}
                  />
                ))}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
