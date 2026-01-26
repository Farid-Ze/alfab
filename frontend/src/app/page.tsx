import { redirect } from "next/navigation";

/**
 * Root Page Redirect
 * 
 * Fixes critical UX failure (404 at /).
 * Redirects to default locale (ID) until suffix strategy is fully implemented.
 */
export default function RootPage() {
    redirect("/id");
}
