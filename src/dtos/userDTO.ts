import { Buyer, Seller } from '@/types/user';

export type BuyerDTO = {
  accessToken: string;
  data: Buyer;
  message: string;
  refreshToken: string;
  status: number;
  success: boolean;
};

export type SellerDTO = {
  accessToken: string;
  accessTokenExpiredIn: number;
  data: Seller;
  message: string;
  refreshToken: string;
  refreshTokenExpiredin: number;
  status: number;
  success: boolean;
};

export const convertBuyerDTOToBuyer = (buyerDTO: BuyerDTO): Buyer => {
  return {
    ...buyerDTO.data,
    userType: 'buyer',
  };
};

export const convertSellerDTOToSeller = (sellerDTO: SellerDTO): Seller => {
  return {
    ...sellerDTO.data,
    userType: 'seller',
  };
};
