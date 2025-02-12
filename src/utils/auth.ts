import { Token } from '@/types/token';
import { AxiosResponse } from 'axios';
import { apiClient } from './axios';
import { Seller } from '@/types/user';
import { Buyer } from '@/types/user';
import { SellerDTO } from '@/dtos/userDTO';
import { BuyerDTO } from '@/dtos/userDTO';

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const refToken = localStorage.getItem('refreshToken');

    const res: AxiosResponse<Token> = await apiClient.post('/auth/refresh', {
      accessToken: refToken,
    });
    const { accessToken, message, status, success } = res.data;
    if (!success) return message;
    const tokenStr = JSON.stringify({
      accessToken: accessToken,
      status: status,
    });

    localStorage.setItem('token', tokenStr);

    return accessToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const sellerAuth = async (
  username: string,
  password: string
): Promise<Seller | null> => {
  try {
    const res: AxiosResponse<SellerDTO> = await apiClient.post('/auth/seller', {
      username: username,
      password: password,
    });

    if (!res.data.success) return null;
    const { data, accessToken, refreshToken } = res.data;

    const sellerStr = JSON.stringify(data);

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', sellerStr);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const buyerAuth = async (
  username: string,
  password: string
): Promise<Buyer | null> => {
  try {
    const res: AxiosResponse<BuyerDTO> = await apiClient.post('/auth/buyer', {
      username: username,
      password: password,
    });

    if (!res.data.success) return null;
    const { data, accessToken, refreshToken } = res.data;

    const buyerStr = JSON.stringify(data);

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('user', buyerStr);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
