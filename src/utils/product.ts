import { getAccessToken, getUserId } from './auth';
import { AxiosResponse } from 'axios';
import { ProductDTO } from '@/dtos/productDTO';
import { apiClient } from './axios';
import { Product } from '@/types/product';

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

export const getProductById = async (pid: string): Promise<Product | null> => {
  try {
    const res: AxiosResponse<ProductDTO> = await apiClient.get(
      `/product/${pid}`,
    );
  
    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }
    
    console.log(res.data.data);

    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;

  }
};
