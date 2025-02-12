import { apiClient } from './axios';

export const createSeller = async (
  password: string,
  username: string,
): Promise<boolean | null> => {
  try {
    const res = await apiClient.post('/seller/', {
      name: 'John',
      surname: 'Doe',
      payment: '',
      password: password,
      username: username,
      phoneNumber: ''
    });
    if (!res.data.success) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
