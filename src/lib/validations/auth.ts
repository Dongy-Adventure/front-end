import { z } from 'zod';

export const authSchema = z
  .object({
    username: z
      .string()
      .min(3, 'Username is too short')
      .max(16, 'Username is too long'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters long')
      .max(50, 'Password is too long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // This ensures the error appears for confirmPassword
  });

export type AuthSchema = z.infer<typeof authSchema>;
