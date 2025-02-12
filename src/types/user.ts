import { Transaction } from './wallet';

export type Buyer = {
  buyerID: string;
  name: string;
  surname: string;
  username: string;
  phoneNumber: string;
  address: string;
  userType: 'buyer';
};

export type Seller = {
  address: string;
  name: string;
  payment: string;
  phoneNumber: string;
  score: number;
  sellerID: string;
  surname: string;
  transaction: Transaction[];
  username: string;
  userType: 'seller';
};
