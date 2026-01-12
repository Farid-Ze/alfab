import type { Metadata } from "next";

import AboutContent from "@/components/about/AboutContent";

export const metadata: Metadata = {
  title: "About",
  description: "About PT Alfa Beauty Cosmetica.",
};

export default function AboutPage() {
  return <AboutContent />;
}
