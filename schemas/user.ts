import z from 'zod';

export const signInZodSchema = z.object({
    email: z.string(),
    password: z.string(),
    redirectUrl: z.string().optional(),
});

export type signInSchema = z.infer<typeof signInZodSchema>;

export const UserSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export type User = z.infer<typeof UserSchema>;