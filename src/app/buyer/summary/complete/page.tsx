'use client';

import Link from 'next/link';

export default function OrderCompletedPage() {

  return (
    <div className="pt-12 flex flex-col min-h-screen">
        <div className="px-20 pb-6 gap-2 flex">
            <Link
                href="/home"
                className="text-gray-400"
            >
                Home
            </Link>
            <p className="text-gray-400">{'\u003E'}</p>
            <p className="text-black font-semibold">Order Summary</p>
        </div>
        <div className="flex-1 w-full flex flex-col items-center justify-center bg-purple-100">
            <h1 className="text-3xl font-bold text-black mt-4">Your Order Is Completed!</h1>
            <p className="text-l text-gray-600 mt-2">
                Thank you for your order! Your order is being processed and will be completed within 3-6 hours. 
            </p>
            <p className="text-l text-gray-600 mt-2">
                You will receive an email confirmation when your order is completed.
            </p>
            <div className="gap-8 flex justify-center mt-6">
                <Link href="/home">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                        Back to shopping
                    </button>
                </Link>
                <Link href="/buyer/summary">
                    <button className="border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition">
                        View your order
                    </button>
                </Link>
            </div>
        </div>
    </div>
  );
}
