import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Header, Footer, WhatsAppButton } from "@/components/layout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AlfaBeauty - Professional Beauty Distribution Indonesia",
    template: "%s | AlfaBeauty",
  },
  description: "Premium B2B distributor for professional hair and beauty products in Indonesia. Partner with elite salon brands.",
  openGraph: {
    title: "AlfaBeauty - Professional Beauty Distribution",
    description: "Premium products, education, and technical support for salons in Indonesia.",
    url: "https://alfabeauty.co.id",
    siteName: "Alfa Beauty",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfair.variable} ${lato.variable}`}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
