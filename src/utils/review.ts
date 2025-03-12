import { Review } from '@/types/review';
import { apiClient } from './axios';
import { AxiosResponse } from 'axios';
import { ReviewDataDTO, ReviewDTO } from '@/dtos/reviewDTO';
import { getAccessToken } from './auth';
import { getUser, getUserId } from './user';

export const getReviews = async (
  id: string,
  userType: string
): Promise<Review[] | null> => {
  try {
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

export const updateReview = async (
  rid: string,
  message: string,
  score: number
): Promise<boolean> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return false;
  }

  try {
    const res = await apiClient.put(
      `/review/${rid}`,
      {
        image: '',
        message: message,
        score: score,
        createdAt: new Date().toISOString(),
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const createReview = async (
  message: string,
  score: number,
  sellerId: string,
  sellerName: string
): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const user = await getUser();
  const userId = await getUserId();

  if (!accessToken || !user) {
    return false;
  }
  try {
    const res = await apiClient.post(
      '/review/',
      {
        message: message,
        score: score,
        createdAt: new Date().toISOString(),
        buyerID: userId,
        buyerName: user.username,
        sellerID: sellerId,
        sellerName: sellerName,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      console.error(res.data.message);
      return false;
    }

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
