"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/i18n";

interface LanguageSwitcherProps {
    locale: Locale;
    /** Override path (already stripped of locale prefix). Auto-derived if omitted. */
    pathWithoutLocale?: string;
    /** "full" = Indonesia | English, "compact" = ID / EN, "footer" = dark theme */
    variant?: "full" | "compact" | "footer";
}

/**
 * Reusable language switcher used in the header (utility row + compact mode)
 * and the footer bottom bar. Derives the current path automatically when
 * pathWithoutLocale is not provided.
 */
export function LanguageSwitcher({
    locale,
    pathWithoutLocale: pathProp,
    variant = "full",
}: LanguageSwitcherProps) {
    const pathname = usePathname();
    const path = pathProp ?? (pathname.replace(/^\/(en|id)/, "") || "/");
    const isId = locale === "id";
    const isEn = locale === "en";

    if (variant === "footer") {
        return (
            <div className="flex items-center gap-4 text-xs text-neutral-500">
                <Link
                    href={`/id${path}`}
                    className={isId ? "text-neutral-300" : "text-neutral-500 hover:text-neutral-300 transition-colors"}
                    aria-current={isId ? "true" : undefined}
                >
                    Indonesia
                </Link>
                <span className="text-neutral-600" aria-hidden="true">|</span>
                <Link
                    href={`/en${path}`}
                    className={isEn ? "text-neutral-300" : "text-neutral-500 hover:text-neutral-300 transition-colors"}
                    aria-current={isEn ? "true" : undefined}
                >
                    English
                </Link>
            </div>
        );
    }

    if (variant === "compact") {
        return (
            <div className="flex items-center gap-2 text-xs text-neutral-600">
                <Link
                    href={`/id${path}`}
                    className={cn(
                        "hover:text-neutral-900 transition-colors",
                        isId && "text-neutral-900 font-medium"
                    )}
                >
                    ID
                </Link>
                <span className="text-neutral-300" aria-hidden="true">/</span>
                <Link
                    href={`/en${path}`}
                    className={cn(
                        "hover:text-neutral-900 transition-colors",
                        isEn && "text-neutral-900 font-medium"
                    )}
                >
                    EN
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 text-xs text-neutral-600">
            <Link
                href={`/id${path}`}
                className={cn(
                    "hover:text-neutral-900 transition-colors",
                    isId && "text-neutral-900 font-medium"
                )}
            >
                Indonesia
            </Link>
            <span className="text-neutral-300" aria-hidden="true">|</span>
            <Link
                href={`/en${path}`}
                className={cn(
                    "hover:text-neutral-900 transition-colors",
                    isEn && "text-neutral-900 font-medium"
                )}
            >
                English
            </Link>
        </div>
    );
}
