import { z } from 'zod';
import { authSchema } from '@/lib/validations/auth';

const loginSchema = z.object({
  username: authSchema.shape.username,
  password: authSchema.shape.password,
});

const loginSchema = authSchema._def.schema.omit({ confirmPassword: true });
