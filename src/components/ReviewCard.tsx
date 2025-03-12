import { useAuth } from '@/context/AuthContext';
import trash from '@/../public/trash.png';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Star } from 'lucide-react';

export interface ReviewProps {
  reviewId: string;
  name: string;
  score: number;
  message: string;
  date: string;
  reviewee?: string;
  deleteReview?: (id: string) => void;
  setEdit?: () => void;
  setReview?: () => void;
}

export default function ReviewCard(props: ReviewProps) {
  const { user } = useAuth();
  const {
    reviewId,
    name,
    score,
    message,
    date,
    reviewee,
    deleteReview,
    setEdit,
    setReview,
  } = props;
  return (
    <tr
      key={reviewId}
      className="hover:bg-gray-50"
    >
      <td className="p-3 flex items-center space-x-3">
        <span>{date}</span>
      </td>
      <td className="p-3">{user?.userType === 'buyer' ? reviewee : name}</td>
      <td className="p-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < score ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
              }
            />
          ))}
        </div>
      </td>
      <td className="p-3 items-center">{message}</td>
      {user?.userType === 'buyer' && (
        <td className="p-3 items-center flex gap-4">
          <button
            className="px-1"
            onClick={() => {
              setEdit?.();
              setReview?.();
            }}
          >
            <Icon
              icon="pepicons-pencil:color-picker"
              className="w-5 h-5"
            />
          </button>
          <button
            onClick={() => deleteReview?.(reviewId)}
            className="items-center"
          >
            <Image
              src={trash}
              alt="Delete"
              width={20}
              height={20}
            />
          </button>
        </td>
      )}
    </tr>
  );
}
