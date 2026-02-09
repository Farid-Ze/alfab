/**
 * Validation Schemas
 * 
 * Zod schemas for form validation and API requests.
 * Per paket-a.md lead capture requirements.
 */

import { z } from "zod";
import { VALIDATION } from "./constants";

// ============================================
// Base Schemas
// ============================================

/**
 * Name validation
 */
export const nameSchema = z
    .string()
    .min(VALIDATION.name.min, `Nama minimal ${VALIDATION.name.min} karakter`)
    .max(VALIDATION.name.max, `Nama maksimal ${VALIDATION.name.max} karakter`)
    .trim();

/**
 * Email validation
 */
export const emailSchema = z
    .string()
    .email("Masukkan alamat email yang valid")
    .toLowerCase()
    .trim();

/**
 * Phone validation (Indonesian format)
 */
export const phoneSchema = z
    .string()
    .regex(
        /^(\+62|62|0)[0-9]{9,12}$/,
        "Masukkan nomor telepon Indonesia yang valid"
    );

/**
 * Message/textarea validation
 */
export const messageSchema = z
    .string()
    .min(VALIDATION.message.min, `Pesan minimal ${VALIDATION.message.min} karakter`)
    .max(VALIDATION.message.max, `Pesan maksimal ${VALIDATION.message.max} karakter`)
    .trim();

// ============================================
// Form Schemas
// ============================================

/**
 * Lead/Contact form schema
 * Per paket-a.md ADR-0001
 */
export const leadFormSchema = z.object({
    // Contact info
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    whatsapp: phoneSchema.optional(),

    // Business info
    businessName: z.string().min(2, "Nama bisnis wajib diisi").trim(),
    // Per paket-a.md §5: salon_type enum
    businessType: z.enum(["salon", "barber", "bridal", "unisex", "other"]),
    city: z.string().min(2, "Kota wajib diisi").trim(),
    province: z.string().optional(),

    // Interest
    interestedProducts: z.array(z.string()).optional(),
    message: messageSchema.optional(),

    // Consent
    agreeToTerms: z.literal(true, {
        message: "Anda harus menyetujui syarat dan ketentuan",
    }),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

/**
 * Quick contact form (simpler)
 */
export const quickContactSchema = z.object({
    name: nameSchema,
    email: emailSchema,
    phone: phoneSchema,
    message: messageSchema,
});

export type QuickContactData = z.infer<typeof quickContactSchema>;

/**
 * Newsletter subscription
 */
export const newsletterSchema = z.object({
    email: emailSchema,
    name: z.string().optional(),
});

export type NewsletterData = z.infer<typeof newsletterSchema>;

/**
 * Search/filter
 */
export const searchSchema = z.object({
    query: z.string().min(1).max(100).trim(),
    category: z.string().optional(),
    page: z.number().int().positive().default(1),
    perPage: z.number().int().positive().max(100).default(12),
});

export type SearchData = z.infer<typeof searchSchema>;

// ============================================
// API Request Schemas
// ============================================

/**
 * Lead submission API request
 */
export const leadSubmissionSchema = leadFormSchema.extend({
    // Add tracking fields
    source: z.enum(["website", "whatsapp", "referral", "event", "other"]).default("website"),
    utmSource: z.string().optional(),
    utmMedium: z.string().optional(),
    utmCampaign: z.string().optional(),
});

export type LeadSubmissionData = z.infer<typeof leadSubmissionSchema>;
