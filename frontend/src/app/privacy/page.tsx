import type { Metadata } from "next";

import PrivacyPageContent from "@/components/legal/PrivacyPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy.",
};

export default function PrivacyPage() {
  return <PrivacyPageContent />;
}
