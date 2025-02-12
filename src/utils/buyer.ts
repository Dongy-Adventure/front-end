import { apiClient } from './axios';

export const createBuyer = async (
  password: string,
  username: string,
): Promise<boolean | null> => {
  try {
    const res = await apiClient.post('/buyer/', {
      name: "John",
      surname: "Doe",
      payment: '',
      password: password,
      username: username,
      phoneNumber: ''
    }
    
    );
    if (!res.data.success) return false;

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};