import { Buyer } from '@/types/user';
import { getAccessToken } from './auth';
import { apiClient } from './axios';
import { BuyerDTO } from '@/dtos/userDTO';
import { AxiosResponse } from 'axios';
import { getUserId } from './user';

export const createBuyer = async (
  password: string,
  username: string
): Promise<boolean | null> => {
  try {
    const res = await apiClient.post('/buyer/', {
      name: 'John',
      surname: 'Doe',
      password: password,
      username: username,
    });
    if (!res.data.success) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const getBuyerById = async (id: string): Promise<Buyer | null> => {
  try {
    const res: AxiosResponse<BuyerDTO> = await apiClient.get(`/buyer/${id}`);
    if (!res.data.success) {
      return null;
    }
    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateBuyer = async (
  name: string,
  surname: string,
  phoneNumber: string,
  address: string,
  province: string,
  city: string,
  zip: string
): Promise<boolean | null> => {
  try {
    const accessToken = await getAccessToken();
    const id = await getUserId();

    const res = await apiClient.put(
      `/buyer/${id}`,
      {
        buuerID: id,
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        address: address,
        province: province,
        city: city,
        zip: zip,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!res.data.success) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateCart = async (
  pid: string,
  amount: number
): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    return false;
  }

  try {
    const res = await apiClient.post(
      `/buyer/${userId}/cart`,
      {
        productID: pid,
        amount: amount,
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

export const deleteCart = async (pid: string): Promise<boolean> => {
  const userId = await getUserId();
  const accessToken = await getAccessToken();

  if (!userId || !accessToken) {
    return false;
  }

  try {
    const res = await apiClient.delete(`/buyer/${userId}/cart/${pid}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.data.success) {
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
