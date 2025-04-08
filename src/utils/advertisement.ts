import { Advertisement } from '@/types/advertisement';
import { AxiosResponse } from 'axios';
import { AdvertisementDTO } from '@/dtos/advertisementDTO';
import { getAccessToken } from './auth';
import { apiClient } from './axios';
import { getUserId } from './user';

export const createAdvertisement = async (
  amount: number,
  imageURL: string,
  payment: string,
  productID: string
): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    console.error('Cannot Create Advertisement.');
    return false;
  }
  try {
    const formData = new FormData();
    formData.append('amount', amount.toString());
    formData.append('payment', payment);
    formData.append('productID', productID);
    formData.append('sellerID', userId);
    formData.append('createdAt', new Date().toISOString());
    if (imageURL) {
      formData.append('imageURL', 'x');
    }
    console.log([...formData.entries()]);
    const res: AxiosResponse<AdvertisementDTO> = await apiClient.post(
      `/advertisement/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
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
