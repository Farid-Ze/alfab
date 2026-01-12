"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { t } from "@/lib/i18n";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

type PromoItem = {
  message: string;
  detailsTitle: string;
  detailsBody: string;
};

function getFocusable(root: HTMLElement | null): HTMLElement[] {
  if (!root) return [];
  const nodes = root.querySelectorAll<HTMLElement>(
    [
      "a[href]",
      "button:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(","),
  );
  return Array.from(nodes).filter((n) => !n.hasAttribute("disabled") && n.tabIndex !== -1);
}

function IconClose(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M18 6 6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export default function HeaderPromo() {
  const { locale } = useLocale();
  const tx = t(locale);

  const prefersReducedMotion = usePrefersReducedMotion();

  const items = tx.header.promo.items as readonly PromoItem[];
  const rotateMs = tx.header.promo.rotateMs;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [pageHidden, setPageHidden] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const current = useMemo(() => items[Math.min(index, items.length - 1)], [index, items]);

  useEffect(() => {
    function onVis() {
      setPageHidden(document.visibilityState === "hidden");
    }

    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  useEffect(() => {
    if (items.length <= 1) return;
    if (paused) return;
    if (pageHidden) return;
    if (prefersReducedMotion) return;

    const id = window.setInterval(() => {
      setIndex((v) => (v + 1) % items.length);
    }, rotateMs);

    return () => window.clearInterval(id);
  }, [items.length, pageHidden, paused, prefersReducedMotion, rotateMs]);

  useEffect(() => {
    if (!modalOpen) return;

    const prev = document.activeElement as HTMLElement | null;
    const openerEl = openerRef.current;
    const t0 = window.setTimeout(() => closeBtnRef.current?.focus(), 0);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setModalOpen(false);
        return;
      }

      if (e.key !== "Tab") return;

      const focusables = getFocusable(modalRef.current);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      const active = document.activeElement as HTMLElement | null;
      if (!active) return;

      if (e.shiftKey) {
        if (active === first || active === modalRef.current) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t0);
      document.removeEventListener("keydown", onKeyDown);
      // Restore focus to opener if possible.
      (openerEl ?? prev)?.focus?.();
    };
  }, [modalOpen]);

  if (!current) return null;

  return (
    <div className="border-b border-black bg-black text-white">
      <div
        className="flex h-9 w-full items-center justify-center gap-3 px-4 text-xs tracking-wide sm:px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <span className="line-clamp-1">{current.message}</span>
        <button
          ref={openerRef}
          type="button"
          className="whitespace-nowrap underline underline-offset-2 hover:no-underline"
          onClick={() => setModalOpen(true)}
        >
          {tx.header.promo.actions.details}
        </button>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label={current.detailsTitle}>
          <div className="absolute inset-0 bg-black/50" onClick={() => setModalOpen(false)} aria-hidden="true" />
          <div
            ref={modalRef}
            className="absolute left-1/2 top-1/2 w-[min(38rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[2px] border border-zinc-200 bg-white p-6 text-zinc-950"
          >
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="text-2xl font-semibold tracking-tight">{current.detailsTitle}</p>
              </div>
              <button
                ref={closeBtnRef}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-[2px] text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900"
                aria-label={tx.header.promo.actions.close}
                onClick={() => setModalOpen(false)}
              >
                <IconClose className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-4 text-sm leading-6 text-zinc-700">
              <p>{current.detailsBody}</p>
            </div>

            <div className="mt-6">
              <button
                type="button"
                className="rounded-[2px] bg-zinc-950 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-900"
                onClick={() => setModalOpen(false)}
              >
                {tx.header.promo.actions.close}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
