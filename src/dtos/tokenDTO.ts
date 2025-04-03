import { Token } from '@/types/token';
import { getExpireTime } from '@/utils/utils';

export type TokenDTO = {
  accessToken: string;
  accessTokenExpiredIn: number;
  message: string;
  status: number;
  success: boolean;
};

export const convertTokenDTOToToken = (
  tokenDTO: TokenDTO,
  refreshAccessToken: string
): Token => {
  return {
    accessToken: tokenDTO.accessToken,
    expiresIn: getExpireTime(tokenDTO.accessTokenExpiredIn),
    refreshToken: refreshAccessToken,
  };
};
