import { Review } from '@/types/review';
import { apiClient } from './axios';
import { AxiosResponse } from 'axios';
import { ReviewDataDTO, ReviewDTO } from '@/dtos/reviewDTO';
import { getAccessToken } from './auth';

export const getReviews = async (id: string): Promise<Review[] | null> => {
  try {
    const userType = localStorage.getItem('userType');
    let res: AxiosResponse<ReviewDTO>;

    if (userType === 'seller') {
      res = await apiClient.get(`/review/seller/${id}`);
    } else {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return null;
      }
      res = await apiClient.get(`/review/buyer/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    const reviewData: ReviewDataDTO[] = res.data.data ?? [];

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

export const deleteReview = async (id: string): Promise<boolean> => {
  const accessToken = await getAccessToken();
  if (!accessToken) {
    return false;
  }

  try {
    const res = await apiClient.delete(`/review/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.data.status) {
      console.error(res.data.message);
      return false;
    }
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
