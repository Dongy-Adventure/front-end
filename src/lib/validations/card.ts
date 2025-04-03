import { z } from 'zod';

const currentYear = new Date().getFullYear() % 100; // Get last two digits of the year
const maxYear = currentYear + 10;

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
    .number()
    .min(1, 'Month should be at least 1')
    .max(12, 'Month should be at most 12'),

  expiryYear: z
    .number()
    .min(currentYear, `Year should be at least ${currentYear}`)
    .max(maxYear, `Year should be at most ${maxYear}`),

  securityCode: z
    .string()
    .min(3, 'Security code must be at least 3 digits')
    .max(4, 'Security code can be up to 4 digits')
    .regex(/^\d{3,4}$/, 'Invalid security code format'),
});
