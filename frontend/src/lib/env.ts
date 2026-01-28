import { z } from "zod";

const envSchema = z.object({
    // Core
    NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
    NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),

    // Supabase (Service Role is optional for client, mandatory for admin)
    NEXT_PUBLIC_SUPABASE_URL: z.string().optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().optional(),
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

    // Email (SMTP) - Optional (Fail-Open)
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.string().optional(),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    SMTP_FROM: z.string().optional(),
    SMTP_TO: z.string().optional(),

    // Features / Security
    // COBIT DSS05.04: Admin Token must be strong (min 12 chars) if configured
    LEAD_API_ADMIN_TOKEN: z.string().min(12, "Admin token must be at least 12 characters").optional(),
    NEXT_PUBLIC_GA_ID: z.string().optional(),

    // Observability (OPS-01 ITIL4)
    NEXT_PUBLIC_SENTRY_DSN: z.string().url().optional(),
});

// Parse and validate process.env
// In Next.js, process.env contains all loaded env vars.
// We use safeParse to avoid crashing the build if some non-critical vars are missing,
// but for critical ones (like SITE_URL), we want to know.
const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("❌ Invalid environment variables:", _env.error.format());
    throw new Error("Invalid environment variables");
}

export const env = _env.data;
