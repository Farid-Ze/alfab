import { z } from "zod";

/**
 * Environment Variables Schema
 * 
 * Type-safe environment variable validation using Zod
 * Validates at build/startup time to catch misconfigurations early
 */

// Server-side environment variables (not exposed to browser)
const serverEnvSchema = z.object({
    // Supabase
    SUPABASE_URL: z.string().url().optional(),
    SUPABASE_ANON_KEY: z.string().min(1).optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),

    // Email
    EMAIL_FROM: z.string().email().optional(),
    EMAIL_TO: z.string().email().optional(),

    // Node environment
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
});

// Client-side environment variables (exposed to browser via NEXT_PUBLIC_ prefix)
const clientEnvSchema = z.object({
    NEXT_PUBLIC_SITE_URL: z
        .string()
        .url()
        .default("https://alfabeauty.co.id/"),

    NEXT_PUBLIC_WHATSAPP_NUMBER: z
        .string()
        .regex(/^\+?[0-9]{10,15}$/, "Invalid WhatsApp number format")
        .optional(),

    NEXT_PUBLIC_WHATSAPP_MESSAGE: z.string().optional(),

    NEXT_PUBLIC_GA4_MEASUREMENT_ID: z
        .string()
        .regex(/^G-[A-Z0-9]+$/, "Invalid GA4 measurement ID")
        .optional(),
});

// Combined schema
const envSchema = serverEnvSchema.merge(clientEnvSchema);

// Type exports
export type ServerEnv = z.infer<typeof serverEnvSchema>;
export type ClientEnv = z.infer<typeof clientEnvSchema>;
export type Env = z.infer<typeof envSchema>;

/**
 * Validated environment variables
 * 
 * Access via: import { env } from "@/lib/env"
 */
function validateEnv(): Env {
    // In development, we're more lenient with missing vars
    const isDev = process.env.NODE_ENV === "development";

    const parsed = envSchema.safeParse({
        // Server
        SUPABASE_URL: process.env.SUPABASE_URL,
        SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
        EMAIL_FROM: process.env.EMAIL_FROM,
        EMAIL_TO: process.env.EMAIL_TO,
        NODE_ENV: process.env.NODE_ENV,

        // Client
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
        NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
        NEXT_PUBLIC_WHATSAPP_MESSAGE: process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE,
        NEXT_PUBLIC_GA4_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
    });

    if (!parsed.success) {
        const errors = parsed.error.flatten().fieldErrors;
        const errorMessages = Object.entries(errors)
            .map(([key, value]) => `  ${key}: ${value?.join(", ")}`)
            .join("\n");

        // In production, throw error for invalid env
        if (!isDev) {
            throw new Error(
                `❌ Invalid environment variables:\n${errorMessages}\n\nPlease check your .env file.`
            );
        }

        // In development, log warning but continue
        console.warn(
            `⚠️ Environment variable issues (non-blocking in dev):\n${errorMessages}`
        );
    }

    return parsed.data ?? ({} as Env);
}

export const env = validateEnv();

/**
 * Type-safe access to client environment variables
 * Safe to use in client components
 */
export const clientEnv: ClientEnv = {
    NEXT_PUBLIC_SITE_URL: env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: env.NEXT_PUBLIC_WHATSAPP_NUMBER,
    NEXT_PUBLIC_WHATSAPP_MESSAGE: env.NEXT_PUBLIC_WHATSAPP_MESSAGE,
    NEXT_PUBLIC_GA4_MEASUREMENT_ID: env.NEXT_PUBLIC_GA4_MEASUREMENT_ID,
};
