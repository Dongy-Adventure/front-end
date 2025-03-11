'use client';

import ProfileBadge from '@/components/ProfileBadge';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { Transaction } from '@/types/wallet';
import Link from 'next/link';

export default function TransactionHistory() {
  const { user } = useAuth();

  const hasTransactions =
    user && 'transaction' in user && Array.isArray(user.transaction);

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
        <p className="text-black font-semibold">Transaction History</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={4} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-bold pb-4">Transaction History</h1>
          <div className="overflow-x-auto p-4">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th>Date</th>
                  <th>Order ID</th>
                  <th>Payment Method</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {hasTransactions ? (
                  user.transaction.map((transaction: Transaction) => (
                    <tr
                      key={transaction.orderId}
                      className="hover:bg-gray-50"
                    >
                      <td className="p-3 flex items-center space-x-3">
                        <span>{transaction.date}</span>
                      </td>
                      <td className="p-3">{transaction.orderId}</td>
                      <td className="p-3">{transaction.paymentMethod}</td>
                      <td className="p-3 items-center text-project-green font-bold">
                        ${transaction.total}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center p-3 text-gray-500"
                    >
                      No transactions found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
