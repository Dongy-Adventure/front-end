'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { deleteReview, getReviews } from '@/utils/review';
import { Review } from '@/types/review';
import ProfileBadge from '@/components/ProfileBadge';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import ReviewCard, { ReviewProps } from '@/components/ReviewCard';
import { useToast } from '@/context/ToastContext';
import { getUserId } from '@/utils/user';
import { useRouter } from 'next/navigation';

export default function Reviews() {
  const { user } = useAuth();
  const toast = useToast();
  const router = useRouter();
  const [reviews, setReview] = useState<ReviewProps[]>([]);

  useEffect(() => {
    const getBuyerReview = async () => {
      const userId = await getUserId();
      const res: Review[] | null = await getReviews(userId ?? '', 'buyer');
      if (!res) return;
      const rev: ReviewProps[] = res.map((r: Review) => ({
        reviewId: r.reviewId,
        name: r.reviewer,
        score: r.score,
        message: r.message,
        date: r.date,
      }));

      setReview(rev);
    };

    getBuyerReview();
  }, []);

  const removeReview = async (id: string) => {
    const res = await deleteReview(id);
    if (res) {
      toast?.setToast('success', 'Successfully deleted a review!');
      setReview((prev) => prev.filter((review) => review.reviewId !== id));
    } else {
      toast?.setToast('error', 'Something went wrong!');
    }
  };

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
        <p className="text-black font-semibold">My Review</p>
      </div>
      <ProfileBadge />
      <div className="flex pt-16 gap-16 text-black">
        <Sidebar state={4} />
        <div className="flex flex-col w-full">
          <h1 className="text-xl font-bold pb-4">My Review</h1>
          <div className="overflow-x-auto p-4">
            <table className="w-full">
              <thead className="border-b border-gray-300 p-3 font-semibold text-left">
                <tr>
                  <th>Date</th>
                  <th>
                    {user?.userType === 'seller' ? 'Reviewer' : 'Seller'}{' '}
                  </th>
                  <th>Rating</th>
                  <th>Message</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {reviews.map((review: ReviewProps) => (
                  <ReviewCard
                    key={review.reviewId}
                    {...review}
                    deleteReview={removeReview}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
