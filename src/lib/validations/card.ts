import { z } from 'zod';

export const cardSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name is too long'),

  number: z
    .string()
    .min(1, 'Card number is required')
    .max(50, 'Card number is too long')
    .transform((val) => val.replace(/\s/g, ''))
    .superRefine((val, ctx) => {
      if (!/^\d{13,19}$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Invalid card number format',
        });
      }
    }),

  expiryMonth: z
    .string()
    .length(2, 'Expiry month should be 2 digits')
    .regex(/^(0[1-9]|1[0-2])$/, 'Invalid month format'),

  expiryYear: z
    .string()
    .length(2, 'Expiry year should be 2 digits')
    .regex(/^\d{2}$/, 'Invalid expiry year format'),

  securityCode: z
    .string()
    .min(3, 'Security code must be at least 3 digits')
    .max(4, 'Security code can be up to 4 digits')
    .regex(/^\d{3,4}$/, 'Invalid security code format'),
});
