"use client";

import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { type Locale, t } from "@/lib/i18n";
import { isValidEmail } from "@/lib/utils";

export function NewsletterSignup({ locale }: { locale: Locale }) {
    const translations = t(locale);
    const footer = translations.footer as Record<string, unknown>;
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !isValidEmail(email)) {
            setStatus("error");
            return;
        }

        setStatus("loading");
        // Future: call API endpoint
        await new Promise((resolve) => setTimeout(resolve, 500));
        setStatus("success");
        setEmail("");

        // Clear any existing timer before setting a new one
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setStatus("idle"), 3000);
    };

    if (status === "success") {
        return (
            <p className="text-sm text-secondary-500" role="status">
                {(footer?.subscribeSuccess as string) || "Thank you for subscribing."}
            </p>
        );
    }

    const emailLabel = (footer?.emailPlaceholder as string) || "Email address";
    const subscribeLabel = (footer?.subscribeLabel as string) || "Subscribe";
    const errorMessage = (footer?.emailError as string) || "Please enter a valid email address.";

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full" noValidate>
            <div className="flex w-full">
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setStatus("idle");
                    }}
                    placeholder={emailLabel}
                    className={`flex-1 px-4 py-3 text-sm text-white placeholder-neutral-500 bg-transparent border focus:outline-none transition-colors duration-200 ${
                        status === "error"
                            ? "border-red-500 focus:border-red-400"
                            : "border-neutral-600 focus:border-neutral-400"
                    }`}
                    required
                    aria-label={emailLabel}
                    aria-invalid={status === "error" ? "true" : undefined}
                    aria-describedby={status === "error" ? "newsletter-error" : undefined}
                />
                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="px-5 py-3 bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-100 transition-colors duration-200 disabled:opacity-50"
                    aria-label={subscribeLabel}
                >
                    {status === "loading" ? (
                        <span className="inline-block w-[18px] h-[18px] border-2 border-neutral-900/30 border-t-neutral-900 rounded-full animate-spin" />
                    ) : (
                        <ArrowRight size={18} strokeWidth={1.5} />
                    )}
                </button>
            </div>
            {status === "error" && (
                <p id="newsletter-error" className="text-xs text-red-400" role="alert">
                    {errorMessage}
                </p>
            )}
        </form>
    );
}
