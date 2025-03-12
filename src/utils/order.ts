import { Order } from '@/types/order';
import { getAccessToken } from './auth';
import { apiClient } from './axios';
import { getUserId } from './user';
import { Product } from '@/types/product';
import { AxiosResponse } from 'axios';
import { OrderDTO } from '@/dtos/orderDTO';

export const getOrder = async (): Promise<Order[] | null> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();
  const userType = localStorage.getItem('userType') === 'buyer' ? 0 : 1;


  if (!accessToken || !userId) {
    return null;
  }

  try {
    const res: AxiosResponse<OrderDTO> = await apiClient.get(
      `/order/${userId}/${userType}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.status) {
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

export const createOrder = async (
  product: Product[],
  sellerId: string
): Promise<boolean> => {
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
        sellerID: sellerId,
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

export const changeOrderStatus = async (
  n: number,
  orderId: string
): Promise<boolean> => {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return false;
  }

  try {
    const res = await apiClient.patch(
      `/order/${orderId}`,
      {
        orderStatus: n,
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
