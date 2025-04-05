import { OrderCart } from './order';
import { Transaction } from './wallet';

export type Buyer = {
  address: string;
  city: string;
  province: string;
  zip: string;
  name: string;
  phoneNumber: string;
  buyerID: string;
  surname: string;
  username: string;
  cart: OrderCart[];
  userType: 'buyer';
  profilePic: string;
};

export type Seller = {
  address: string;
  city: string;
  province: string;
  zip: string;
  name: string;
  payment: string;
  phoneNumber: string;
  score: number;
  sellerID: string;
  surname: string;
  transaction: Transaction[];
  username: string;
  userType: 'seller';
  profilePic: string;
};
