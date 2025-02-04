'use client';
import NEXT from '@/../public/placeholder.png';
import { useEffect, useState } from 'react';
import { StaticImageData } from 'next/image';
import Card from '@/components/seller/review/Card';
import Return from '@/components/Return';
import { useAuth } from '@/context/AuthContext';

export interface Review {
  id: string;
  image?: StaticImageData;
  username: string;
  message: string;
  score: number;
  date: string;
}

const reviewDummy = [
  {
    id: '123',
    image: NEXT,
    username: 'FU',
    message: 'Good',
    score: 2,
    date: '2025-02-02T00:00:00Z',
  },
  {
    id: '456',
    image: NEXT,
    username: 'FU2',
    message: 'Good2',
    score: 2,
    date: '2025-02-02T00:00:00Z',
  },
  {
    id: '789',
    image: NEXT,
    username: 'FU3',
    message: 'Good3',
    score: 4,
    date: '2025-02-02T00:00:00Z',
  },
  {
    id: '10112',
    image: NEXT,
    username: 'FU4',
    message: 'Gooafdsdafajsfdjasfasdflhadflhadsufahsdfilasdhud',
    score: 6,
    date: '2025-02-02T00:00:00Z',
  },
];

export default function Review() {
  const { user } = useAuth();
  const [reviews, setReview] = useState<Review[]>([]);

  useEffect(() => {
    setReview(reviewDummy);
  }, []);

  return (
    <section className="p-12 text-black">
      <Return />
      <div className="text-2xl font-bold pb-8 grid place-items-center">
        {user?.username ?? 'Seller'}'s Review
      </div>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-4 overflow-scroll">
          {reviews?.map((review: Review) => (
            <Card
              key={review.id}
              image={review.image}
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
