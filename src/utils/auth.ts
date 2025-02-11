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
    const res: AxiosResponse<TokenDTO> = await apiClient.post('/auth/refresh', {
      refreshToken: refToken,
    });
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

export const getUserId = async (id?: string): Promise<string | null> => {
  let userId: string | null;
  if (!id) {
    userId = localStorage.getItem('userId');
  } else {
    userId = id;
  }
  if (!userId) {
    return null;
  }
  return userId;
};

export const getUser = async (): Promise<Buyer | Seller | null> => {
  const accessToken = await getAccessToken();
  const userId = await getUserId();

  if (!accessToken || !userId) {
    return null;
  }

  try {
    const userType = localStorage.getItem('userType');

    if (userType === 'seller') {
      const res: AxiosResponse<SellerDTO> = await apiClient.get(
        `/seller/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      return convertSellerDTOToSeller(res.data);
    } else {
      const res: AxiosResponse<BuyerDTO> = await apiClient.get(
        `/buyer/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      return convertBuyerDTOToBuyer(res.data);
    }
  } catch (error) {
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

    const tokenStr = JSON.stringify({
      accessToken: accessToken,
      expiresIn: getExpireTime(accessTokenExpiredIn),
      refreshToken: refreshToken,
    });

    localStorage.setItem('userId', seller.sellerID);
    localStorage.setItem('token', tokenStr);
    localStorage.setItem('userType', 'seller');

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
