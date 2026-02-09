import { redirect } from "next/navigation";
import { defaultLocale } from "@/lib/i18n";

/**
 * Root Homepage
 * 
 * Redirects to default locale
 */
export default function HomePage() {
  redirect(`/${defaultLocale}`);
}
