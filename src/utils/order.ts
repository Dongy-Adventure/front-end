import { Order } from '@/types/order';
import { getAccessToken } from './auth';
import { apiClient } from './axios';
import { getUserId } from './user';
import { Product } from '@/types/product';

// export const getOrder = async (): Promise<Order[] | null> => {
//   const accessToken = await getAccessToken();
//   const userId = await getUserId();

//   if (!accessToken || !userId) {
//     return null;
//   }

//   try {
//     const res = await apiClient.get(`/order/`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!res.data.status) {
//       console.error(res.data.message);
//       return false;
//     }

//     return true;
//   } catch (err) {
//     console.error(err);
//     return null;
//   }
// };

export const createOrder = async (product: Product[]): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    console.error('Cannot Create Product.');
    return false;
  }
  try {
    const res = await apiClient.post(
      `/order/`,
      {
        products: product,
        buyerID: userId,
        sellerID: '67ac79f76eaaa6f91afc0425',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

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
