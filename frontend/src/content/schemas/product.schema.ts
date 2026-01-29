import { z } from "zod";

export const productSchema = z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    brand: z.string(),
    categories: z.array(z.enum(["shampoo", "styling", "treatment", "color", "grooming"])).optional(),
    functions: z.array(z.string()),
    audience: z.array(z.enum(["SALON", "BARBER"])),
    image: z.object({
        // TOGAF: Support both Internal Assets (local path) and External URLs (CDN)
        url: z.string(),
        alt: z.string().min(5),
        caption: z.string().optional(),
    }),
    summary: z.string(),
    benefits: z.array(z.string()),
    howToUse: z.string(),
});

export const productsDBSchema = z.array(productSchema);

export type ProductData = z.infer<typeof productSchema>;
