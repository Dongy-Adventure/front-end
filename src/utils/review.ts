import { Review } from '@/types/review';
import { getAccessToken, getUserId } from './auth';
import { apiClient } from './axios';
import { AxiosResponse } from 'axios';
import { ReviewDataDTO, ReviewDTO } from '@/dtos/reviewDTO';
import { getBuyerById } from './buyer';
import { Buyer } from '@/types/user';

export const getReviews = async (): Promise<Review[] | null> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) return null;

  try {
    const res: AxiosResponse<ReviewDTO> = await apiClient.get(
      `/review/seller/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    const reviewData: ReviewDataDTO[] = res.data.data;

    const reviews: Review[] = reviewData.map((r: ReviewDataDTO) => {
      return {
        reviewId: r.reviewID,
        reviewer: r.buyerName === '' ? 'Unknown' : r.buyerName,
        reviewee: r.sellerName,
        date: r.date,
        message: r.message,
        score: r.score,
        image: r.image,
      };
    });

    return reviews;
  } catch (err) {
    console.error(err);
    return null;
  }
};
