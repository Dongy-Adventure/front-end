import { Product } from './product';

export type Order = {
  appointmentID: string;
  buyerID: string;
  createdAt: string;
  orderID: string;
  products: Product[];
  sellerID: string;
  status: number;
  totalPrice: number;
  buyerName: string;
  sellerName: string;
};
