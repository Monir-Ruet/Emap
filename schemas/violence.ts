import z from 'zod';

export const ViolenceSchema = z.object({
    id: z.string().optional(),
    district: z.string().min(1, "District is required"),
    parliamentarySeat: z.string().min(1, "Parliamentary seat is required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    responsibleParty: z.array(z.string()).optional(),
    deathCount: z.number().int().nonnegative(),
    mild: z.string().optional(),
    moderate: z.string().optional(),
    extreme: z.string().optional(),
    reference: z.string().optional(),
    violenceDate: z.string().datetime().transform((val) => new Date(val)),
    gender: z.enum(["Male", "Female", "None"]).default("Male"),
    minority: z.array(z.string()).optional(),
});


export type Violence = z.infer<typeof ViolenceSchema>;