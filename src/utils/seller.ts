import { getAccessToken, getUserId } from './auth';
import { apiClient } from './axios';

export const createSeller = async (
  name: string,
  surname: string,
  payment: string,
  password: string,
  username: string,
  phoneNumber: string
): Promise<boolean | null> => {
  try {
    const res = await apiClient.post('/seller', {
      name: name,
      surname: surname,
      payment: payment,
      password: password,
      username: username,
      phoneNumber: phoneNumber,
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
  address: string
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
