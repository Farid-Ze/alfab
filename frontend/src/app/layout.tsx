import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { GoogleAnalytics } from "@next/third-parties/google";
import OfflineIndicator from "@/components/site/OfflineIndicator";
import ServiceWorkerRegister from "@/components/site/ServiceWorkerRegister";
import { env } from "@/lib/env";
import { fontSans, fontSerif, fontPrint } from "@/lib/fonts";
import "./globals.css";

// Metadata and Viewport omitted...

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const localeHeader = h.get("x-alfab-locale");
  // Security (Phase 5): Get CSP Nonce for inline scripts
  // Note: We don't strictly use it in <Script> here yet, but it's available for children.
  const nonce = h.get("x-nonce");
  const lang = localeHeader === "id" || localeHeader === "en" ? localeHeader : "en";

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`antialiased ${fontSans.variable} ${fontSerif.variable} ${fontPrint.variable}`}>
        {/* Offline Indicator (ITIL/UX) */}
        <OfflineIndicator />
        {/* Skip Link moved to [locale]/layout.tsx for localization */}
        {children}
        <ServiceWorkerRegister />
      </body>
      <GoogleAnalytics gaId={env.NEXT_PUBLIC_GA_ID ?? ""} />
    </html>
  );
}
