import { z } from 'zod';
import { breed, category, label, location } from './cow.constants';

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100),
    age: z.number().min(0).max(100),
    price: z.number().min(0).max(1000000),
    location: z.enum([...location] as [string, ...string[]], {
      required_error: 'Location is required!',
    }),
    breed: z.enum([...breed] as [string, ...string[]], {
      required_error: 'Breed is required!',
    }),
    weight: z.number().min(0).max(1000000),
    label: z.enum([...label] as [string, ...string[]], {
      required_error: 'Label is required!',
    }),
    category: z.enum([...category] as [string, ...string[]], {
      required_error: 'Category is required!',
    }),
    seller: z.string({
      required_error: 'Seller is required!',
    }),
  }),
});

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    age: z.number().min(0).max(100).optional(),
    price: z.number().min(0).max(1000000).optional(),
    location: z.enum([...location] as [string, ...string[]], {}).optional(),
    breed: z.enum([...breed] as [string, ...string[]], {}).optional(),
    weight: z.number().min(0).max(1000000).optional(),
    label: z.enum([...label] as [string, ...string[]], {}).optional(),
    category: z.enum([...category] as [string, ...string[]], {}).optional(),
  }),
});

export const CowValidator = {
  createCowZodSchema,
  updateCowZodSchema,
};
