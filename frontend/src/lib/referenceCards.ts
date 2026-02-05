import { cn } from "@/lib/utils";

/**
 * Reference-style list cards (ineo-sense inspired).
 * Centralize classnames here so sections stay visually consistent.
 */

export const REF_SECTION = {
  headerWrap: "flex items-start justify-between gap-8",
  headerTitle: "text-balance text-[clamp(1.75rem,3.2vw,2.75rem)] leading-[1.04] font-semibold tracking-tight text-foreground",
  headerAction: "w-12 h-12 ui-radius-input border border-border bg-background/70 backdrop-blur flex items-center justify-center",
  eyebrow: "type-ui-sm-strong text-muted",
};

export const REF_LIST = {
  wrap: "space-y-7 md:space-y-9",
};

export const REF_RAIL = {
  wrap: "relative",
  track:
    "flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing",
  item: "shrink-0 snap-start",
  mobileControls: "hidden",
  desktopControls:
    "hidden md:flex items-center gap-2 absolute left-4 bottom-4 z-10",
  pager:
    "px-4 h-10 bg-background/70 backdrop-blur border border-border ui-radius-pill flex items-center justify-center",
  pagerText: "type-ui-xs text-foreground",
  btnCol: "flex items-center gap-2",
  btn:
    "w-10 h-10 bg-background/70 backdrop-blur border border-border ui-radius-input flex items-center justify-center disabled:opacity-40",
  btnMobile: "hidden",
};

export function refListCardClassName(className?: string) {
  return cn(
    "ui-radius-card ui-shadow-elegant border border-border bg-background overflow-hidden",
    "grid gap-6 p-5 md:p-6 lg:grid-cols-[minmax(0,420px),80px,1fr] lg:gap-8 items-start",
    className
  );
}

export const REF_CARD = {
  mediaWrap:
    "ui-radius-card overflow-hidden bg-subtle aspect-[16/9] flex items-center justify-center",
  mediaImg: "w-full h-full object-cover",

  logoWrap:
    "w-14 h-14 md:w-16 md:h-16 ui-radius-input border border-border bg-background flex items-center justify-center shrink-0",
  logoText: "type-ui-sm-strong text-foreground",

  title:
    "text-balance text-[clamp(1.45rem,2.4vw,2.05rem)] leading-[1.06] font-semibold tracking-tight text-foreground",
  body: "mt-3 type-body text-foreground-muted leading-relaxed max-w-[60ch]",

  metaRow: "mt-5 flex items-center gap-3 flex-wrap",
  tag: "type-ui-xs text-muted",
  actionRow: "mt-5 flex items-center gap-4",
  actionDot: "w-1.5 h-1.5 rounded-full bg-foreground",
  actionText: "type-ui-sm-strong text-foreground",
};
