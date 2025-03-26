import { Product } from './product';

export type OrderCart = {
  productID: string;
  amount: number;
};

export type Order = {
  appointmentID: string;
  buyerID: string;
  payment: string;
  createdAt: string;
  orderID: string;
  products: Product[];
  sellerID: string;
  status: number;
  totalPrice: number;
  buyerName: string;
  sellerName: string;
};

export interface CardData {
  number: string;
  name: string;
  expiryMonth: string;
  expiryYear: string;
  securityCode: string;
}
