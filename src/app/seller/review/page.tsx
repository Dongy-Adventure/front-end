'use client';
import NEXT from '@/../public/placeholder.png';
import { useEffect, useState } from 'react';
import Card from '@/components/seller/review/Card';
import Return from '@/components/Return';
import { useAuth } from '@/context/AuthContext';
import { getReviews } from '@/utils/review';
import { Review } from '@/types/review';

export default function Reviews() {
  const { user } = useAuth();
  const [reviews, setReview] = useState<Review[]>([]);

  useEffect(() => {
    const getAllReview = async () => {
      const reviews = await getReviews();
      setReview(reviews ?? []);
    };

    getAllReview();
  }, []);

  return (
    <section className="p-12 text-black">
      <Return />
      <div className="text-2xl font-bold pb-8 grid place-items-center">
        {user?.username ?? 'Seller'}&apos;s Review
      </div>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 overflow-scroll">
          {reviews?.map((review: Review) => (
            <Card
              key={review.reviewId}
              image={NEXT}
              username={review.username}
              message={review.message}
              score={review.score}
              date={review.date}
            />
          ))}
        </div>
      )}
    </section>
  );
}
