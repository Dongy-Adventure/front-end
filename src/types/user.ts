import { Transaction } from './wallet';

export type Buyer = {
  buyerID: string;
  name: string;
  surname: string;
  username: string;
  userType: 'Buyer';
};

export type Seller = {
  address: string;
  name: string;
  payment: string;
  phoneNumber: string;
  score: number;
  sellerID: string;
  surname: string;
  transaction: Transaction;
  username: string;
  userType: 'Seller';
};
