'use client';
import NEXT from '@/../public/placeholder.png';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getReviews } from '@/utils/review';
import { Review } from '@/types/review';
import ProfileBadge from '@/components/ProfileBadge';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReview] = useState<Review[]>([]);

  useEffect(() => {
    const isSeller = user && 'sellerID' in user;
    const getAllReview = async () => {
      if (isSeller) {
        const reviews = await getReviews(user.sellerID as string);
        setReview(reviews ?? []);
      }
    };

    getAllReview();
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
        <p className="text-gray-400">My Account</p>
        <p className="text-gray-400">{'\u003E'}</p>
        <p className="text-black font-semibold">My Review</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={7} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-bold pb-4">My Review</h1>
          <div className="overflow-x-auto p-4">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th>Date</th>
                  <th>Reviewer</th>
                  <th>Rating</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {reviews.map((review: Review) => (
                  <tr
                    key={review.reviewId}
                    className="hover:bg-gray-50"
                  >
                    <td className="p-3 flex items-center space-x-3">
                      <span>{review.date}</span>
                    </td>
                    <td className="p-3">{review.reviewer}</td>
                    <td className="p-3">{review.score}</td>
                    <td className="p-3 items-center text-project-green font-bold">
                      {review.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
