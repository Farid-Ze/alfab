import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";
import WhatsAppStickyCTA from "@/components/site/WhatsAppStickyCTA";
import WebVitalsReporter from "@/components/analytics/WebVitalsReporter";
import StructuredData from "@/components/seo/StructuredData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Alfa Beauty Cosmetica — Professional Beauty Distribution",
    template: "%s — Alfa Beauty Cosmetica",
  },
  description:
    "Professional beauty distribution for salons and barbershops in Indonesia — products, education, and technical support.",
  openGraph: {
    type: "website",
    title: "Alfa Beauty Cosmetica",
    description:
      "Professional beauty distribution for salons and barbershops in Indonesia — products, education, and technical support.",
    url: "/",
    siteName: "Alfa Beauty Cosmetica",
    locale: "en_ID",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Alfa Beauty Cosmetica",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alfa Beauty Cosmetica — Professional Beauty Distribution",
    description:
      "Professional beauty distribution for salons and barbershops in Indonesia — products, education, and technical support.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-dvh bg-white text-zinc-950">
          <StructuredData />
          <SiteHeader />
          <WebVitalsReporter />
          <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
            {children}
          </main>
          <SiteFooter />
          <WhatsAppStickyCTA />
        </div>
      </body>
    </html>
  );
}
