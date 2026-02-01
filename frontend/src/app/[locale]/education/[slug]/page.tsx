import { notFound } from "next/navigation";

/**
 * Legacy placeholder route removed in favor of /education/events/[slug] and /education/articles/[slug].
 */
export default function EducationLegacySlugPage() {
    notFound();
}
