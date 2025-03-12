import 'react-day-picker/style.css';
import { useState } from 'react';
import { CardProps } from './Card';
import { Star, CircleCheck } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { createReview } from '@/utils/review';
import { useForm } from 'react-hook-form';

interface CreateReviewInfo {
    message: string;
    createAt: string;
    score: number;
  }

export default function CompletedOrder(prop: CardProps) {
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const toast = useToast();
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
    const status = await createReview(message, score);
    if (status) {
      toast?.setToast('success', 'Create review succeeded');
      window.location.href = '/buyer/review';
      setReviewSubmitted(true);
    } else {
      toast?.setToast('error', 'Create review failed');
    }
  };

  return (
    <div className="flex-col bg-white flex border-3 w-[500px] border-[30px] border-white h-full">
      <div className={"flex flex-col h-fit justify-center w-full gap-[10px] px-[18px] py-[20px] rounded-xl border-[2px] border-green-600 mt-8"}>
        <div className="font-bold text-[24px]-">Thank you for your order!</div>
      </div>
      <h2 className="text-lg font-bold mt-6">Add Seller Review</h2>
      {reviewSubmitted ? (
        <div className="flex flex-col items-center mt-14">
          <div className="bg-green-100 p-4 rounded-full">
            <CircleCheck />
          </div>
          <h2 className="text-lg font-bold mt-2">Your review added!</h2>
          <p className="text-sm text-gray-500 mb-12">We truly value your opinion, thanks.</p>
          <div className="mt-4 flex gap-2">
            <button className="bg-green-500 text-white px-4 py-2 rounded-md">Edit review</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-md">Delete review</button>
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
                        ratingValue <= (hover || rating)
                          ? 'currentColor'
                          : 'none'
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
