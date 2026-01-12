"use client";

import { usePathname, useRouter } from "next/navigation";

import { useLocale } from "@/components/i18n/LocaleProvider";

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function navigate(nextLocale: "en" | "id") {
    if (nextLocale === locale) return;

    // Update state first (persists to storage/cookie), then navigate.
    setLocale(nextLocale);

    const qs = typeof window !== "undefined" ? window.location.search.replace(/^\?/, "") : "";
    const current = pathname || "/";
    let nextPath = current;

    if (current === "/en" || current.startsWith("/en/")) {
      nextPath = current.replace(/^\/en(?=\/|$)/, `/${nextLocale}`);
    } else if (current === "/id" || current.startsWith("/id/")) {
      nextPath = current.replace(/^\/id(?=\/|$)/, `/${nextLocale}`);
    } else {
      nextPath = `/${nextLocale}${current}`;
    }

    router.push(qs ? `${nextPath}?${qs}` : nextPath);
  }

  const baseBtn =
    "h-8 px-2 text-xs font-medium tracking-wide underline-offset-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2";

  return (
    <div className="inline-flex items-center gap-2 bg-transparent">
      <button
        type="button"
        onClick={() => navigate("en")}
        className={`${baseBtn} ${
          locale === "en" ? "text-zinc-950 underline" : "text-zinc-700 hover:text-zinc-950"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <span className="select-none text-zinc-400" aria-hidden="true">
        /
      </span>
      <button
        type="button"
        onClick={() => navigate("id")}
        className={`${baseBtn} ${
          locale === "id" ? "text-zinc-950 underline" : "text-zinc-700 hover:text-zinc-950"
        }`}
        aria-pressed={locale === "id"}
      >
        ID
      </button>
    </div>
  );
}
