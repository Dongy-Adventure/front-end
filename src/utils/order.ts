import { ProductDTO } from '@/dtos/productDTO';
import { AxiosResponse } from 'axios';
import { getAccessToken } from './auth';
import { apiClient } from './axios';
import { getUserId } from './user';
import { Product } from '@/types/product';

export const createOrder = async (product: Product[]): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    console.error('Cannot Create Product.');
    return false;
  }
  try {
    const res: AxiosResponse<ProductDTO> = await apiClient.post(
      `/order/`,
      {
        products: product,
        buyerID: userId,
        sellerID: product[0].sellerID,
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
