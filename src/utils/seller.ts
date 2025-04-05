import { Seller } from '@/types/user';
import { getAccessToken } from './auth';
import { apiClient } from './axios';
import { SellerDTO } from '@/dtos/userDTO';
import { AxiosResponse } from 'axios';
import { getUserId } from './user';

export const createSeller = async (
  profilePic: File | null,
  name: string,
  surname: string,
  password: string,
  username: string
): Promise<boolean | null> => {
  try {
    // Create a new FormData instance to append the data
    const formData = new FormData();
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }
    formData.append('name', name);
    formData.append('surname', surname);
    formData.append('password', password);
    formData.append('username', username);

    console.log([...formData.entries()]);

    const res = await apiClient.post('/seller/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (!res.data.success) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const updateSeller = async (
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
      `/seller/${id}`,
      {
        sellerID: id,
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

export const getSellerBalance = async (): Promise<number | null> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  try {
    if (!accessToken || !userId) {
      return null;
    }

    const res = await apiClient.get(`/seller/${userId}/balance`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getSellerById = async (sid: string): Promise<Seller | null> => {
  try {
    const res: AxiosResponse<SellerDTO> = await apiClient.get(`/seller/${sid}`);

    if (!res.data.success) {
      console.error(res.data.message);
      return null;
    }

    return res.data.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const withdrawMoney = async (amount: number): Promise<boolean> => {
  const userId = await getUserId();
  const accessToken = await getAccessToken();

  try {
    const res = await apiClient.post(
      `/seller/${userId}/withdraw`,
      {
        amount: amount,
        payment: 'Cash',
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.success) {
      console.error(res.data.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
