"use client";

import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { buildWhatsAppHref } from "@/lib/whatsapp";

interface WhatsAppLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    phone?: string;
    message?: string;
    prefill?: string; // Alias for message
    children?: React.ReactNode;
}

export default function WhatsAppLink({
    phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
    message,
    prefill,
    className,
    children,
    href, // Allow overriding href if needed
    ...props
}: WhatsAppLinkProps) {
    const text = message || prefill || "";

    // Construct URL
    // Using universal link which works on both mobile and desktop
    const url = useMemo(() => {
        if (href) return href;
        if (!phone) return "";
        const generated = buildWhatsAppHref({ number: phone, message: text });
        return generated === "#" ? "" : generated;
    }, [href, phone, text]);

    if (!url) return null;

    return (
        <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("inline-flex items-center justify-center", className)}
            {...props}
        >
            {children || "Chat on WhatsApp"}
        </a>
    );
}
