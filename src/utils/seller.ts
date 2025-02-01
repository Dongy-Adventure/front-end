import { apiClient } from './axios';

export const createSeller = async (
  name: string,
  surname: string,
  payment: string,
  password: string,
  username: string
): Promise<boolean | null> => {
  try {
    const res = await apiClient.post('/seller', {
      name: name,
      surname: surname,
      payment: payment,
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
