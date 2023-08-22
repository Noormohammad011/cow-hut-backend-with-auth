import { z } from 'zod';
import { role } from './auth.constants';

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().min(5).max(11),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'Role is required!',
    }),
    password: z.string().min(6).max(100),
    name: z.object({
      firstName: z.string().min(2).max(100),
      lastName: z.string().min(2).max(100).optional(),
    }),
    address: z.string().min(5).max(100),
    budget: z.number().min(0).max(1000000).optional(),
    income: z.number().min(0).max(1000000).optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({
      required_error: 'Phone number is required',
    }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});



export const UserValidator = {
  createUserZodSchema,
  loginZodSchema,
  refreshTokenZodSchema,
};
