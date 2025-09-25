import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
});

export const RegisterSchema = z.object({
    email: z.string().email({
        message: 'Please enter a valid email address.',
    }),
    password: z.string().min(6, {
        message: 'Password must be at least 6 characters.',
    }),
});

export const EnrollmentSchema = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    surname: z.string().min(1, { message: 'Surname is required.' }),
    phone: z.string().min(1, { message: 'Phone number is required.' }),
    address: z.string().min(1, { message: 'Address is required.' }),
    kitSerialNumber: z.string().min(1, { message: 'Kit serial number is required.' }),
});
