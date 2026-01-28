import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx for conditional logic.
 * Solves the specific TOGAF architectural debt of "brittle string concatenation".
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
