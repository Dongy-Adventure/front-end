import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),
  surname: z
    .string()
    .min(1, 'Surname is required')
    .max(50, 'Surname is too long'),
  tel: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^\+?[0-9]+$/, 'Invalid phone number format'),
  address: z.string().min(5, 'Address is too short'),
  city: z.string().min(1, 'City is required'),
  province: z.string().min(1, 'Province is required'),
  zip: z
    .string()
    .length(5, 'Zip code must be exactly 5 digits')
    .regex(/^[0-9]+$/, 'Zip code must contain only numbers'),
  image: z.string().optional(), // ✅ Add this line
});

export type ProfileFormData = z.infer<typeof profileSchema>;
