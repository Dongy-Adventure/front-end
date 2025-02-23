import { useAuth } from '@/context/AuthContext';
import trash from '@/../public/trash.png';
import Image from 'next/image';
import { Icon } from '@iconify/react/dist/iconify.js';

export interface ReviewProps {
  reviewId: string;
  name: string;
  score: number;
  message: string;
  date: string;
  deleteReview?: (id: string) => void;
}

export default function ReviewCard(props: ReviewProps) {
  const { user } = useAuth();
  const { reviewId, name, score, message, date, deleteReview } = props;
  return (
    <tr
      key={reviewId}
      className="hover:bg-gray-50"
    >
      <td className="p-3 flex items-center space-x-3">
        <span>{date}</span>
      </td>
      <td className="p-3">{name}</td>
      <td className="p-3">{score}</td>
      <td className="p-3 items-center">{message}</td>
      {user?.userType === 'buyer' && (
        <td className="p-3 items-center flex gap-4">
          <Icon
            icon="mdi:pencil"
            width={20}
            height={20}
          />
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
