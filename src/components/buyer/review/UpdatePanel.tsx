import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Star } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { updateReview } from '@/utils/review';

interface UpdateReviewInfo {
  message: string;
  createAt: string;
  score: number;
}
interface CurrentDataReview {
  sellerName: string;
  comment: string;
  createdAt: string;
  ratings: number;
  reviewId: string;
}

export default function UpdatePanel(props: CurrentDataReview) {
  const { sellerName, comment, createdAt, ratings, reviewId } = props;
  const toast = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateReviewInfo>({
    defaultValues: {
      score: ratings,
      message: comment,
      createAt: createdAt,
    },
  });

  const [hover, setHover] = useState<number | null>(null);
  const rating = watch('score');

  const onSubmit = async (data: UpdateReviewInfo) => {
    const { message, score } = data;
    const status = await updateReview(reviewId, message, score);
    if (status) {
      toast?.setToast('success', 'Edit product succeeded');
      window.location.href = '/buyer/review';
    } else {
      toast?.setToast('error', 'Post product failed');
    }
  };

  return (
    <div className="absolute top-0 left-0 w-screen h-screen grid place-items-center z-50 bg-black/30 backdrop-blur-sm">
      <div className="flex items-center justify-center min-w-96 rounded-xl bg-white p-4">
        <div className="w-full border rounded-xl shadow-lg p-6 border-purple-500">
          <div className="border p-4 rounded-md">
            <h1 className="text-xl font-bold">Review #{reviewId}</h1>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Review Date</span>
              <span className="text-sm">{createdAt.slice(0, 10)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm font-medium">Seller</span>
              <span className="text-sm font-bold">{sellerName}</span>
            </div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6"
          >
            <h2 className="text-lg font-bold">Edit Review</h2>

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
                className="bg-project-primary font-bold hover:bg-project-dark text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
