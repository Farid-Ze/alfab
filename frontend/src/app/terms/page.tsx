import type { Metadata } from "next";

import TermsPageContent from "@/components/legal/TermsPageContent";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms and conditions.",
};

export default function TermsPage() {
  return <TermsPageContent />;
}
