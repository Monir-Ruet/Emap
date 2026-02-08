import z from 'zod';

export const ViolanceSchema = z.object({
    district: z.string().min(1, "District is required"),
    parlamentarySeat: z.string().min(1, "Parliamentary seat is required"),
    title: z.string().min(3, "Title must be at least 3 characters"),
    responsibleParty: z.array(z.string().min(1)).min(1),
    violanceType: z.array(z.string().min(1)).min(1),
    violanceDate: z.string().datetime().transform((val) => new Date(val)),
    gender: z.array(z.string().min(1)).optional().default([]),
    minority: z.array(z.string().min(1)).optional().default([]),
});


export type Violance = z.infer<typeof ViolanceSchema>;