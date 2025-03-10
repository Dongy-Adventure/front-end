import { Order } from '@/types/order';

export type OrderDTO = {
  data: Order[];
  message: string;
  status: number;
  success: boolean;
};
