"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

/**
 * ClosingStatement - Final statement section
 * 
 * Follows project patterns:
 * - Uses CSS variables and utility classes
 * - Uses ScrollReveal
 * - Uses type-closing-statement typography class
 */

interface ClosingStatementProps {
    text: string;
}

export default function ClosingStatement({ text }: ClosingStatementProps) {
    return (
        <section className="py-28 lg:py-36 bg-panel">
            <div className="ui-container">
                <ScrollReveal>
                    <p className="max-w-closing mx-auto text-center text-balance type-closing-statement text-foreground-muted">
                        {text}
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}
