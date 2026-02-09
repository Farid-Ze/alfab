/**
 * i18n Type Definitions
 * 
 * Type-safe translation key paths.
 */

import type en from "../../messages/en.json";

// ============================================
// Translation Types
// ============================================

/**
 * Messages structure from JSON
 */
export type Messages = typeof en;

/**
 * Dot notation path for nested objects
 * e.g., "home.hero.title" | "nav.products"
 */
export type NestedKeyOf<T, Prefix extends string = ""> = T extends object
    ? {
        [K in keyof T & string]: T[K] extends object
        ? NestedKeyOf<T[K], `${Prefix}${K}.`>
        : `${Prefix}${K}`;
    }[keyof T & string]
    : never;

/**
 * All translation key paths
 */
export type TranslationKey = NestedKeyOf<Messages>;

/**
 * Namespace keys (top-level)
 */
export type Namespace = keyof Messages;

/**
 * Get value type at nested path
 */
export type TranslationValue<T, K extends string> = K extends `${infer First}.${infer Rest}`
    ? First extends keyof T
    ? TranslationValue<T[First], Rest>
    : never
    : K extends keyof T
    ? T[K]
    : never;

// ============================================
// Translation Context
// ============================================

/**
 * Translation function type
 */
export type TranslateFunction = (key: TranslationKey) => string;

/**
 * Namespace translation function
 */
export type NamespaceTranslateFunction<N extends Namespace> = (
    key: NestedKeyOf<Messages[N]>
) => string;
