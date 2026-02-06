"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";

/**
 * ContactPageClient: Ineo-Sense inspired contact form
 */
export default function ContactPageClient() {
    const { locale } = useLocale();
    const tx = t(locale);
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    async function handleSubmit(formData: FormData) {
        startTransition(async () => {
            try {
                // Simple form submission - can be extended with actual action
                await new Promise(resolve => setTimeout(resolve, 1000));
                setStatus("success");
            } catch {
                setStatus("error");
            }
        });
    }

    const form = tx.contact?.form;

    return (
        <div className="max-w-2xl mx-auto">
            <motion.div
                className="text-center space-y-4 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <p className="type-ui-sm font-semibold text-secondary uppercase tracking-wide">
                    {tx.nav?.contact ?? "Contact"}
                </p>
                <h1 className="type-display text-brand font-bold">
                    {tx.contact?.title ?? "Get in touch"}
                </h1>
                <p className="type-body-lg text-muted">
                    {tx.contact?.body ?? "We'd love to hear from you"}
                </p>
            </motion.div>

            <motion.div
                className="bg-white rounded-3xl p-8 lg:p-12 border border-border/30"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {status === "success" ? (
                    <div className="text-center py-12">
                        <p className="type-h3 text-brand mb-2">
                            {tx.contact?.success?.title ?? "Thank you!"}
                        </p>
                        <p className="type-body text-muted">
                            {form?.success ?? "We'll get back to you soon."}
                        </p>
                    </div>
                ) : (
                    <form action={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block type-ui-sm font-medium text-brand mb-2">
                                    {form?.fields?.name ?? "Name"}
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full px-4 py-3 bg-surface-mint rounded-xl border-0 text-brand placeholder:text-muted focus:ring-2 focus:ring-secondary"
                                    placeholder={form?.fields?.namePlaceholder ?? "Your name"}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block type-ui-sm font-medium text-brand mb-2">
                                    {form?.fields?.email ?? "Email"}
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-4 py-3 bg-surface-mint rounded-xl border-0 text-brand placeholder:text-muted focus:ring-2 focus:ring-secondary"
                                    placeholder={form?.fields?.emailPlaceholder ?? "your@email.com"}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="message" className="block type-ui-sm font-medium text-brand mb-2">
                                {form?.fields?.message ?? "Message"}
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                rows={5}
                                required
                                className="w-full px-4 py-3 bg-surface-mint rounded-xl border-0 text-brand placeholder:text-muted focus:ring-2 focus:ring-secondary resize-none"
                                placeholder={form?.fields?.messagePlaceholder ?? "Your message..."}
                            />
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isPending}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-white rounded-full font-semibold hover:bg-secondary/90 transition-colors disabled:opacity-50"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="w-1.5 h-1.5 bg-white rounded-full" />
                            {isPending ? (form?.sending ?? "Sending...") : (form?.submit ?? "Send message")}
                        </motion.button>
                    </form>
                )}
            </motion.div>
        </div>
    );
}
