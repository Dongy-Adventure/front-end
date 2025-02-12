import { Product } from '@/types/product';
import { getAccessToken, getUser, getUserId } from './auth';
import { AxiosResponse } from 'axios';
import { ProductDTO } from '@/dtos/productDTO';
import { apiClient } from './axios';

export const createProduct = async (
  name: string,
  price: number,
  amount: number,
  description: string,
  image: string
): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const uesrId = await getUserId();

  if (!accessToken || !uesrId) {
    console.error('Fuck you');
    return false;
  }

  try {
    const res: AxiosResponse<ProductDTO> = await apiClient.post(
      `/product/${uesrId}`,
      {
        name: name,
        price: price,
        amount: amount,
        description: description,
        image: image,
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
