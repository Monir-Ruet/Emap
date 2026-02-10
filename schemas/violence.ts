import z from 'zod';

export const ViolenceSchema = z.object({
    district: z.string().min(1, "District is required"),
    parliamentarySeat: z.string().min(1, "Parliamentary seat is required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    responsibleParty: z.array(z.string().min(1)).min(1),
    deathCount: z.number().int().nonnegative(),
    violenceType: z.array(z.string().min(1)).min(1),
    violenceDate: z.string().datetime().transform((val) => new Date(val)),
    gender: z.array(z.string().min(1)).optional().default([]),
    minority: z.array(z.string().min(1)).optional().default([]),
});


export type Violence = z.infer<typeof ViolenceSchema>;