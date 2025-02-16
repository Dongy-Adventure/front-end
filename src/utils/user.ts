import { Buyer, Seller } from '@/types/user';
import { getAccessToken } from './auth';
import {
  SellerDTO,
  convertSellerDTOToSeller,
  BuyerDTO,
  convertBuyerDTOToBuyer,
} from '@/dtos/userDTO';
import { AxiosResponse } from 'axios';
import { apiClient } from './axios';

export const getUserId = async (id?: string): Promise<string | null> => {
  let userId: string | null;
  if (!id) {
    userId = localStorage.getItem('userId');
  } else {
    userId = id;
  }
  if (!userId) {
    return null;
  }
  return userId;
};

export const getUser = async (): Promise<Buyer | Seller | null> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    return null;
  }

  try {
    const userType = localStorage.getItem('userType');

    if (userType === 'seller') {
      const res: AxiosResponse<SellerDTO> = await apiClient.get(
        `/seller/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return convertSellerDTOToSeller(res.data);
    } else {
      const res: AxiosResponse<BuyerDTO> = await apiClient.get(
        `/buyer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return convertBuyerDTOToBuyer(res.data);
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
