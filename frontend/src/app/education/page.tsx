import type { Metadata } from "next";

import EducationHub from "@/components/education/EducationHub";

export const metadata: Metadata = {
  title: "Education",
  description: "Training and events highlights for salon and barbershop professionals.",
};

export default function EducationPage() {
  return <EducationHub />;
}
