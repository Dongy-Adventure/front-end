import { z } from "zod";

export const PaymentSchema = (sellerBalance: number) =>
  z.object({
    paymentMethod: z.string().min(1, "Please select a payment method"),
    agreeToTerms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the terms and conditions" }),
    }),
    amount: z
      .number({ invalid_type_error: "Amount must be a number" })
      .min(1, "Amount must be at least 1 THB")
      .max(sellerBalance, `Amount cannot exceed ${sellerBalance.toFixed(2)} THB`),
    phoneNumber: z
      .string()
      .regex(/^\d{10,15}$/, "Phone number must be 10-15 digits"),
  });

export type PaymentFormValues = z.infer<ReturnType<typeof PaymentSchema>>;
