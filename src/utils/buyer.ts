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
  address: string
): Promise<boolean | null> => {
  try {
    const accessToken = await getAccessToken();
    const id = await getUserId();

    const res = await apiClient.put(
      `/buyer/${id}`,
      {
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        address: address,
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
