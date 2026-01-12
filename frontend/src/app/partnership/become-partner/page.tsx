import type { Metadata } from "next";

import BecomePartnerContent from "@/components/partnership/BecomePartnerContent";

export const metadata: Metadata = {
  title: "Become Partner",
  description: "Submit your details to become an Alfa Beauty partner.",
};

export default function BecomePartnerPage() {
  return <BecomePartnerContent />;
}
