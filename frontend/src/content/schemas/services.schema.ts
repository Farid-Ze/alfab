import { z } from "zod";

export const serviceSchema = z.object({
    id: z.string(),
    slug: z.string(),
    number: z.string(),
    name: z.object({ en: z.string(), id: z.string() }),
    tagline: z.object({ en: z.string(), id: z.string() }),
    description: z.object({ en: z.string(), id: z.string() }),
    cta: z.object({
        label: z.object({ en: z.string(), id: z.string() }),
        href: z.string(),
    }),
    video: z.object({
        webm: z.string(),
        mp4: z.string(),
        poster: z.string(),
        duration: z.number(),
    }),
    accentColor: z.string(),
});

export const servicesPageSchema = z.object({
    meta: z.object({
        en: z.object({ kicker: z.string(), title: z.string(), ariaLabel: z.string(), keyboardHint: z.string() }),
        id: z.object({ kicker: z.string(), title: z.string(), ariaLabel: z.string(), keyboardHint: z.string() }),
    }),
    services: z.array(serviceSchema),
});

export type ServicesPageData = z.infer<typeof servicesPageSchema>;
