import { getAccessToken, getUserId } from './auth';
import { apiClient } from './axios';

export const createBuyer = async (
  name: string,
  surname: string,
  payment: string,
  password: string,
  username: string,
  phoneNumber: string
): Promise<boolean | null> => {
  try {
    const res = await apiClient.post('/buyer', {
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
