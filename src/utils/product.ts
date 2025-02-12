import { getAccessToken, getUserId } from './auth';
import { AxiosResponse } from 'axios';
import { ProductDTO } from '@/dtos/productDTO';
import { apiClient } from './axios';

export const createProduct = async (
  name: string,
  price: number,
  description: string,
  image: string,
  color: string,
  tag: string[]
): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    console.error('Cannot Create Product.');
    return false;
  }
  try {
    const res: AxiosResponse<ProductDTO> = await apiClient.post(
      `/product/`,
      {
        sellerID: userId,
        productName: name,
        price: price,
        description: description,
        image: image,
        tag: tag,
        color: color,
        createdAt: new Date().toISOString(),
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
