import { z } from 'zod';

export const withdrawSchema = z.object({
  method: z.enum(['PromptPay', 'AccountNumber']),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9]+$/, 'Invalid phone number format'),
  amount: z.string()
    .regex(/^[0-9]+(\.[0-9]{1,2})?$/, 'Invalid amount format'),
  bankName: z.string().min(1, 'Bank name cannot be empty').optional(),
});

export type WithdrawFormData = z.infer<typeof withdrawSchema>;