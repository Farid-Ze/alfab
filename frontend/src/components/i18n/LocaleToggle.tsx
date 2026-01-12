"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";

export default function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="inline-flex items-center border border-zinc-200 bg-white">
      <button
        type="button"
        onClick={() => setLocale("en")}
        className={`h-9 px-3 text-xs font-semibold tracking-tight ${
          locale === "en" ? "bg-zinc-950 text-white" : "text-zinc-700 hover:bg-zinc-50"
        }`}
        aria-pressed={locale === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale("id")}
        className={`h-9 px-3 text-xs font-semibold tracking-tight ${
          locale === "id" ? "bg-zinc-950 text-white" : "text-zinc-700 hover:bg-zinc-50"
        }`}
        aria-pressed={locale === "id"}
      >
        ID
      </button>
    </div>
  );
}
