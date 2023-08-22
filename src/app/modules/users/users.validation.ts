import { z } from 'zod';
import { role } from '../auth/auth.constants';

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().min(5).max(11).optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    password: z.string().min(6).max(100).optional(),
    name: z.object({
      firstName: z.string().min(2).max(100).optional(),
      lastName: z.string().min(2).max(100).optional(),
    }).optional(),
    address: z.string().min(5).max(100).optional(),
    budget: z.number().min(0).max(1000000).optional(),
    income: z.number().min(0).max(1000000).optional(),
  }),
});

export const UserValidator = {
  updateUserZodSchema,
};
