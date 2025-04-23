import { z } from 'zod';

const thaiPhoneRegex = /^(0[689]{1})\d{8}$/;

export const PaymentSchema = (sellerBalance: number) =>
  z.object({
    paymentMethod: z.string().min(1, 'Please select a payment method'),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({
        message: 'You must agree to the terms and conditions',
      }),
    }),
    amount: z
      .number({ invalid_type_error: 'Amount must be a number' })
      .min(1, 'Amount must be at least 1 THB')
      .max(
        sellerBalance,
        `Amount cannot exceed ${sellerBalance.toFixed(2)} THB`
      ),
    phoneNumber: z.string().regex(thaiPhoneRegex, 'Invalid phone number'),
  });

export type PaymentFormValues = z.infer<ReturnType<typeof PaymentSchema>>;
