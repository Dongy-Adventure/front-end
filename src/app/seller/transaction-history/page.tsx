'use client';

import ProfileBadge from '@/components/ProfileBadge';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';
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
            <table className="table-fixed w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th className="font-medium w-50">Date</th>
                  <th className="font-medium w-80">Order ID</th>
                  <th className="font-medium w-50">Payment Method</th>
                  <th className="font-medium">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {hasTransactions ? (
                  user.transaction.map(
                    (transaction: Transaction, index: number) => (
                      <tr
                        key={transaction.orderID + index}
                        className="hover:bg-gray-50"
                        onClick={() => {}}
                      >
                        <td className="py-3 flex items-center space-x-3">
                          <span>
                            {transaction.date.slice(0, 10)}{' '}
                            {transaction.date.slice(11, 16)}
                          </span>
                        </td>
                        <td className="py-3">
                          {transaction.amount > 0 ? transaction.orderID : '-'}
                        </td>
                        <td className="py-3">{transaction.payment}</td>
                        <td
                          className={cn(
                            `py-3 items-center font-semibold`,
                            transaction.amount > 0
                              ? 'text-project-green'
                              : 'text-red-600'
                          )}
                        >
                          ฿{transaction.amount}
                        </td>
                      </tr>
                    )
                  )
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
