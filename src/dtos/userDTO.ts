import { Buyer, Seller } from '@/types/user';

export type BuyerDTO = {
  buyer_id: string;
  name: string;
  surname: string;
};

export type SellerDTO = {
  seller_id: string;
  name: string;
  surname: string;
  payment_info: string;
  role: string;
  score: number;
};

export const convertBuyerDTOToBuyer = (buyerDTO: BuyerDTO): Buyer => {
  return {
    buyerId: buyerDTO.buyer_id,
    name: buyerDTO.name,
    surname: buyerDTO.surname,
    userType: 'Buyer',
  };
};

export const convertSellerDTOToSeller = (sellerDTO: SellerDTO): Seller => {
  return {
    sellerId: sellerDTO.seller_id,
    name: sellerDTO.name,
    surname: sellerDTO.surname,
    paymentInfo: sellerDTO.payment_info,
    role: sellerDTO.role,
    score: sellerDTO.score,
    userType: 'Seller',
  };
};
