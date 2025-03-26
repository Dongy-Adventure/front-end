import { useAuth } from '@/context/AuthContext';
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
      <td className="py-3 flex items-center space-x-3">
        <span>{date.slice(0, 10)} {date.slice(11, 16)}</span>
      </td>
      <td className="py-3">{user?.userType === 'buyer' ? reviewee : name}</td>
      <td className="py-3">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={
                i < score ? 'fill-orange-500 text-orange-500' : 'text-gray-300'
              }
            />
          ))}
        </div>
      </td>
      <td className="py-3 items-center">{message}</td>
      {user?.userType === 'buyer' && (
        <td className="py-3 items-center flex gap-4">
          <button
            className="items-center"
            onClick={() => {
              setEdit?.();
              setReview?.();
            }}
          >
            <Icon
              icon="mdi-light:pencil"
              className="w-6 h-6"
            />
          </button>
          <button
            onClick={() => deleteReview?.(reviewId)}
            className="items-center"
          >
            <Icon
              icon="mdi-light:delete"
              className="w-6 h-6 text-red-500"
            />
          </button>
        </td>
      )}
    </tr>
  );
}
