import { z } from 'zod';

export const AdvertisementSchema = z.object({
  amount: z.number().min(1, 'Amount must be greater than 0'),
  imageURL: z.string().url('Invalid image URL'),
  payment: z.string().min(1, 'Please select a payment method'),
  productID: z.string().min(1, 'Please select a product'),
});

export type AdvertisementFormValues = z.infer<typeof AdvertisementSchema>;
