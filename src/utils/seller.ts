import { getUserId } from './auth';
import { apiClient } from './axios';

export const createSeller = async (
  name: string,
  surname: string,
  payment: string,
  password: string,
  username: string,
  phoneNumber: string,
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
  address: string,
): Promise<boolean | null> => {
  try {
    console.log("Received tel:", phoneNumber);
    console.log("Received address:", address);
    const id = await getUserId();
    const res = await apiClient.put(`/seller/${id}`, {
      name: name,
      surname: surname,
      phoneNumber: phoneNumber,
      address: address,
    }, {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzkxMjI1OTV9.NS2qzjsUO9iTPa-M1NZnJlco_DAOhJCvUKsojAF3KHs`,
      },
    });
    if (!res.data.success) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};