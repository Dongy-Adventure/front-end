import 'react-day-picker/style.css';
import { useState } from 'react';
import { CardProps } from './Card';
import { Star, CircleCheck } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { createReview } from '@/utils/review';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { getSellerById } from '@/utils/seller';

interface CreateReviewInfo {
  message: string;
  createAt: string;
  score: number;
}

export default function Review(prop: CardProps) {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const toast = useToast();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateReviewInfo>({
    defaultValues: {
      score: 0,
      message: '',
      createAt: '',
    },
  });

  const rating = watch('score');
  const onSubmit = async (data: CreateReviewInfo) => {
    const { message, score } = data;
    const sellerName = await getSellerById(prop.order.sellerID);
    const status = await createReview(
      message,
      score,
      prop.order.sellerID,
      sellerName?.name ?? ''
    );
    if (status) {
      toast?.setToast('success', 'Create review succeeded');
      setReviewSubmitted(true);
    } else {
      toast?.setToast('error', 'Create review failed');
    }
  };

  return (
    <div className="flex-col bg-white flex border-3 w-[500px] border-[30px] rounded-full border-white h-full">
      <div className="font-bold text-2xl mt-20">Thank you for your order!</div>
      <h2 className="text-lg font-bold mt-6">Add Seller Review</h2>
      {reviewSubmitted ? (
        <div className="flex flex-col items-center mt-14">
          <div className="bg-green-100 p-4 rounded-full">
            <CircleCheck />
          </div>
          <h2 className="text-lg font-bold mt-2">Your review added!</h2>
          <p className="text-sm text-gray-500 mb-12">
            We truly value your opinion, thanks.
          </p>
          <div className="mt-4 flex gap-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={() => router.push('buyer/review')}
            >
              See My Review
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6"
        >
          <div className="mt-2">
            <span className="text-sm font-medium">Rating</span>
            <div className="flex mt-1">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <Star
                    key={index}
                    className={`w-6 h-6 cursor-pointer ${
                      ratingValue <= (hover || rating)
                        ? 'text-orange-400'
                        : 'text-gray-300'
                    }`}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                    onClick={() => setValue('score', ratingValue)}
                    fill={
                      ratingValue <= (hover || rating) ? 'currentColor' : 'none'
                    }
                  />
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium">Comment</label>
            <textarea
              className="w-full border p-2 rounded-md mt-1 h-28"
              placeholder="Write your comment..."
              {...register('message', { required: 'Comment is required' })}
            />
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="bg-project-green font-bold hover:bg-project-green text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
