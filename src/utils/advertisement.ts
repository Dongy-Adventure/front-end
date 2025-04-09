import { Advertisement } from '@/types/advertisement';
import { AxiosResponse } from 'axios';
import {
  AdvertisementDTO,
  AdvertisementDataDTO,
  AdvertisementsDTO,
} from '@/dtos/advertisementDTO';
import { getAccessToken } from './auth';
import { apiClient } from './axios';
import { getUserId } from './user';

export const createAdvertisement = async (
  amount: number,
  imageURL: File,
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
      formData.append('imageURL', imageURL);
    }
    console.log([...formData.entries()]);
    console.log('productID: ', userId);
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

export const getSellerAdvertisements = async (): Promise<
  Advertisement[] | null
> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();
  console.log(userId);

  try {
    const res: AxiosResponse<AdvertisementsDTO> = await apiClient.get(
      `/advertisement/seller/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    const advertisementData: AdvertisementDataDTO[] = res.data.data;

    if (!advertisementData) return [];
    console.group(res.data);
    const advertisements: Advertisement[] = advertisementData.map(
      (ad: AdvertisementDataDTO) => {
        return {
          advertisementID: ad.advertisementID,
          amount: ad.amount,
          createdAt: ad.createdAt,
          imageURL: ad.imageURL,
          payment: ad.payment,
          productID: ad.productID,
          sellerID: ad.sellerID,
        };
      }
    );

    return advertisements;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getRandomAdvertisements = async (): Promise<
  Advertisement[] | null
> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();
  console.log(userId);

  try {
    const res: AxiosResponse<AdvertisementsDTO> = await apiClient.get(
      `/advertisement/random`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    const advertisementData: AdvertisementDataDTO[] = res.data.data;

    if (!advertisementData) return [];
    console.group(res.data);
    const advertisements: Advertisement[] = advertisementData.map(
      (ad: AdvertisementDataDTO) => {
        return {
          advertisementID: ad.advertisementID,
          amount: ad.amount,
          createdAt: ad.createdAt,
          imageURL: ad.imageURL,
          payment: ad.payment,
          productID: ad.productID,
          sellerID: ad.sellerID,
        };
      }
    );

    return advertisements;
  } catch (err) {
    console.error(err);
    return null;
  }
};
