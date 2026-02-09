/**
 * Utility Functions
 * 
 * Shared helper functions for the application.
 */

import { clsx, type ClassValue } from "clsx";

// ============================================
// Class Names
// ============================================

/**
 * Merge class names with clsx
 */
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}

// ============================================
// Formatters
// ============================================

/**
 * Format currency in Indonesian Rupiah
 */
export function formatCurrency(
    amount: number,
    options?: { showSymbol?: boolean; decimals?: number }
): string {
    const { showSymbol = true, decimals = 0 } = options || {};

    const formatted = new Intl.NumberFormat("id-ID", {
        style: showSymbol ? "currency" : "decimal",
        currency: "IDR",
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(amount);

    return formatted;
}

/**
 * Format date in Indonesian locale
 */
export function formatDate(
    date: Date | string,
    options?: { format?: "short" | "medium" | "long" | "full" }
): string {
    const { format = "medium" } = options || {};
    const d = typeof date === "string" ? new Date(date) : date;

    const formatOptionsMap: Record<string, Intl.DateTimeFormatOptions> = {
        short: { day: "numeric", month: "numeric", year: "2-digit" },
        medium: { day: "numeric", month: "short", year: "numeric" },
        long: { day: "numeric", month: "long", year: "numeric" },
        full: { weekday: "long", day: "numeric", month: "long", year: "numeric" },
    };

    return new Intl.DateTimeFormat("id-ID", formatOptionsMap[format]).format(d);
}

/**
 * Format phone number for display
 */
export function formatPhone(phone: string): string {
    // Remove non-digits
    const digits = phone.replace(/\D/g, "");

    // Format Indonesian phone: +62 812-3456-7890
    if (digits.startsWith("62")) {
        const local = digits.slice(2);
        return `+62 ${local.slice(0, 3)}-${local.slice(3, 7)}-${local.slice(7)}`;
    }

    // Format with leading 0: 0812-3456-7890
    if (digits.startsWith("0")) {
        return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8)}`;
    }

    return phone;
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
export function formatRelativeTime(date: Date | string, locale: "en" | "id" = "id"): string {
    const d = typeof date === "string" ? new Date(date) : date;
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

    if (diffDay > 0) return rtf.format(-diffDay, "day");
    if (diffHour > 0) return rtf.format(-diffHour, "hour");
    if (diffMin > 0) return rtf.format(-diffMin, "minute");
    return rtf.format(-diffSec, "second");
}

// ============================================
// String Utilities
// ============================================

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + "...";
}

/**
 * Generate URL-safe slug
 */
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/[\s_-]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

/**
 * Capitalize first letter
 */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * Title case
 */
export function titleCase(text: string): string {
    return text
        .toLowerCase()
        .split(" ")
        .map((word) => capitalize(word))
        .join(" ");
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Check if value is empty (null, undefined, empty string, empty array)
 */
export function isEmpty(value: unknown): boolean {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Validate Indonesian phone number
 */
export function isValidPhone(phone: string): boolean {
    const digits = phone.replace(/\D/g, "");
    return /^(62|0)[0-9]{9,12}$/.test(digits);
}

// ============================================
// Object Utilities
// ============================================

/**
 * Remove undefined/null values from object
 */
export function compact<T extends Record<string, unknown>>(obj: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
    ) as Partial<T>;
}

/**
 * Pick specific keys from object
 */
export function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> {
    return keys.reduce(
        (acc, key) => {
            if (key in obj) acc[key] = obj[key];
            return acc;
        },
        {} as Pick<T, K>
    );
}

/**
 * Omit specific keys from object
 */
export function omit<T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> {
    const result = { ...obj };
    keys.forEach((key) => delete result[key]);
    return result as Omit<T, K>;
}

// ============================================
// Async Utilities
// ============================================

/**
 * Sleep/delay helper
 */
export function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Debounce function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    fn: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
