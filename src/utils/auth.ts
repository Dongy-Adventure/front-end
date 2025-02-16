import { AxiosResponse } from 'axios';
import { apiClient } from './axios';
import { Buyer, Seller } from '@/types/user';
import {
  BuyerDTO,
  convertBuyerDTOToBuyer,
  convertSellerDTOToSeller,
  SellerDTO,
} from '@/dtos/userDTO';
import { convertTokenDTOToToken, TokenDTO } from '@/dtos/tokenDTO';
import { Token } from '@/types/token';
import { getExpireTime } from './time';

export const refreshAccessToken = async (
  refToken: string
): Promise<string | null> => {
  try {
    const res: AxiosResponse<TokenDTO> = await apiClient.post(
      '/auth/refresh',
      {},
      {
        headers: {
          Authorization: `Bearer ${refToken}`,
        },
      }
    );
    const tokenDTO: TokenDTO = res.data;

    if (!tokenDTO.success) return tokenDTO.message;

    const token: Token = convertTokenDTOToToken(tokenDTO, refToken);

    const tokenStr = JSON.stringify({
      accessToken: token.accessToken,
      expiresIn: token.expiresIn,
      refreshToken: token.refreshToken,
    });

    localStorage.setItem('token', tokenStr);

    return token.accessToken;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  const tokenStr = localStorage.getItem('token');

  if (!tokenStr) return null;

  const token: Token = JSON.parse(tokenStr);
  const now = new Date();
  const expire = new Date(token.expiresIn);

  if (now > expire) {
    const newAccessToken = await refreshAccessToken(token.refreshToken);
    if (!newAccessToken) return null;
    return newAccessToken;
  }

  return token.accessToken;
};

export const logOut = async (): Promise<boolean> => {
  const accessToken = await getAccessToken();
  const tokenStr = localStorage.getItem('token');

  if (!tokenStr) return false;

  const token: Token = JSON.parse(tokenStr);
  const refreshToken = await refreshAccessToken(token.refreshToken);

  try {
    const res = await apiClient.post(
      '/auth/logout/',
      {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!res.data.status) {
      console.error(res.data.message);
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
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

    const {
      data,
      accessToken,
      accessTokenExpiredIn,
      message,
      status,
      refreshToken,
    } = res.data;

    if (!status) {
      console.error(message);
      return null;
    }
    const seller: Seller = convertSellerDTOToSeller(res.data);
    const sellerStr = JSON.stringify(seller);

    const tokenStr = JSON.stringify({
      accessToken: accessToken,
      expiresIn: getExpireTime(accessTokenExpiredIn),
      refreshToken: refreshToken,
    });

    localStorage.setItem('userId', seller.sellerID);
    localStorage.setItem('token', tokenStr);
    localStorage.setItem('userType', 'seller');
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
    const res: AxiosResponse<BuyerDTO> = await apiClient.post('/auth/buyer/', {
      username: username,
      password: password,
    });

    if (!res.data.success) return null;
    const { data, accessToken, refreshToken } = res.data;

    const buyerStr = JSON.stringify(data);

    localStorage.setItem('token', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('userType', 'buyer');
    localStorage.setItem('user', buyerStr);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
