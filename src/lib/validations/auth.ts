import { z } from 'zod';

export const authSchema = z
  .object({
    profilePic: z
      .any()
      .refine(
        (files) => {
          if (!files || files.length === 0) return true;
          const allowedExtensions = ['jpg', 'jpeg', 'png'];
          const fileName = files[0].name.toLowerCase();
          const ext = fileName.split('.').pop();
          return ext && allowedExtensions.includes(ext);
        },

        'Invalid file type'
      )
      .optional(),
    name: z.string().nonempty('Name is required'),
    surname: z.string().nonempty('Surname is required'),
    username: z
      .string()
      .min(3, 'Username is too short')
      .max(16, 'Username is too long'),
    password: z
      .string()
      .min(8, 'Password must be at last 8 characters long')
      .max(50, 'Password is too long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/\d/, 'Password must contain at least one number')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type AuthSchema = z.infer<typeof authSchema>;
