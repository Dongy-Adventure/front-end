import { Review } from '@/types/review';
import { apiClient } from './axios';
import { AxiosResponse } from 'axios';
import { ReviewDataDTO, ReviewDTO } from '@/dtos/reviewDTO';


export const getReviews = async (id: string): Promise<Review[] | null> => {

  try {
    const res: AxiosResponse<ReviewDTO> = await apiClient.get(
      `/review/seller/${id}`
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
