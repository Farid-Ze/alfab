import type { Metadata } from "next";

import PartnershipContent from "@/components/partnership/PartnershipContent";

export const metadata: Metadata = {
  title: "Partnership",
  description: "Become a partner and get professional distribution support.",
};

export default function PartnershipPage() {
  return <PartnershipContent />;
}
