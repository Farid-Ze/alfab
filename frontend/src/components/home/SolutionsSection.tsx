"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { attachDragScroll } from "@/lib/horizontalRail";

type Pillar = {
  icon?: string;
  title: string;
  body?: string;
};

type SolutionsSectionProps = {
  pillars: Pillar[];
};

export default function SolutionsSection({ pillars }: SolutionsSectionProps) {
  const items = useMemo(() => pillars ?? [], [pillars]);
  const hasItems = items.length > 0;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const desktopStoryRef = useRef<HTMLDivElement | null>(null);
  const scrollRafRef = useRef<number | null>(null);
  const itemElsRef = useRef<Array<HTMLDivElement | null>>([]);
  const itemCentersRef = useRef<number[]>([]);
  const headerDesktopPxRef = useRef<number>(96);
  const spineFillRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [spineEntered, setSpineEntered] = useState(false);

  const illustrations = useMemo(
    () => [
      "/images/solutions/connect-line.svg",
      "/images/solutions/build-line.svg",
      "/images/solutions/support-line.svg",
    ],
    []
  );

  useEffect(() => {
    if (!hasItems) return;
    const el = trackRef.current;
    if (!el) return;
    return attachDragScroll(el);
  }, [hasItems]);

  useEffect(() => {
    const mq = window.matchMedia?.("(min-width: 1024px)");
    if (!mq) return;
    const update = () => setIsDesktop(Boolean(mq.matches));
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const raw = window.getComputedStyle(document.documentElement).getPropertyValue("--header-height-desktop");
    const parsed = Number.parseFloat(raw);
    headerDesktopPxRef.current = Number.isFinite(parsed) ? parsed : 96;
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    if (!hasItems) return;
    const el = desktopStoryRef.current;
    if (!el) return;

    const computeItemCenters = () => {
      const centers: number[] = [];
      const nodes = itemElsRef.current;
      for (const node of nodes) {
        if (!node) continue;
        const r = node.getBoundingClientRect();
        const centerDocY = window.scrollY + r.top + r.height / 2;
        centers.push(centerDocY);
      }
      itemCentersRef.current = centers;
    };

    const updateFromScroll = () => {
      const viewport = window.innerHeight || 1;
      const focusY = viewport * 0.45;
      const focusDocY = window.scrollY + focusY;

      const rect = el.getBoundingClientRect();
      const startLine = headerDesktopPxRef.current + 24;
      const entered = rect.top <= startLine;
      setSpineEntered((prev) => (prev === entered ? prev : entered));

      const centers = itemCentersRef.current;
      let progress = 0;
      if (centers.length >= 2) {
        const first = centers[0]!;
        const last = centers[centers.length - 1]!;
        if (focusDocY <= first) progress = 0;
        else if (focusDocY >= last) progress = 1;
        else {
          for (let i = 0; i < centers.length - 1; i += 1) {
            const a = centers[i]!;
            const b = centers[i + 1]!;
            if (focusDocY >= a && focusDocY <= b) {
              const t = (focusDocY - a) / Math.max(1, b - a);
              progress = (i + t) / Math.max(1, centers.length - 1);
              break;
            }
          }
        }
      }

      const fill = spineFillRef.current;
      if (fill) {
        fill.style.setProperty("--timeline-progress", String(Math.max(0, Math.min(1, progress)).toFixed(4)));
      }
    };

    const onScroll = () => {
      if (scrollRafRef.current != null) return;
      scrollRafRef.current = window.requestAnimationFrame(() => {
        scrollRafRef.current = null;
        updateFromScroll();
      });
    };

    computeItemCenters();
    updateFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => {
      computeItemCenters();
      onScroll();
    };
    window.addEventListener("resize", onResize);

    // Re-measure once after layout settles (fonts/images).
    const settleId = window.setTimeout(() => {
      computeItemCenters();
      updateFromScroll();
    }, 120);

    return () => {
      window.removeEventListener("scroll", onScroll as EventListener);
      window.removeEventListener("resize", onResize as EventListener);
      window.clearTimeout(settleId);
      if (scrollRafRef.current != null) {
        window.cancelAnimationFrame(scrollRafRef.current);
        scrollRafRef.current = null;
      }
    };
  }, [isDesktop, hasItems, items.length]);

  useEffect(() => {
    if (!isDesktop) return;
    if (!hasItems) return;
    const root = null;
    const elements = itemElsRef.current.filter(Boolean) as HTMLDivElement[];
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        const top = visible[0];
        if (!top) return;

        const idx = Number((top.target as HTMLElement).getAttribute("data-index") ?? "0");
        if (!Number.isFinite(idx)) return;
        setActiveIndex((prev) => (prev === idx ? prev : idx));
      },
      {
        root,
        threshold: [0.15, 0.25, 0.4, 0.55, 0.7, 0.85],
        rootMargin: "-35% 0px -45% 0px",
      }
    );

    for (const element of elements) io.observe(element);
    return () => io.disconnect();
  }, [isDesktop, hasItems, items.length]);

  const cardBase =
    "relative overflow-hidden ui-radius-card border border-border bg-[var(--accent)]/12 backdrop-blur-sm " +
    "p-8 md:p-9 min-h-card ui-shadow-elegant";

  const onCardKeyDown = (e: React.KeyboardEvent<HTMLDivElement>, idx: number) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setActiveIndex(idx);
    }
  };

  if (!hasItems) return null;

  return (
    <div>
      {/* Mobile: simple draggable rail (no pager/indicator) */}
      <div
        ref={trackRef}
        className="lg:hidden flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 cursor-grab active:cursor-grabbing ui-scrollbar-hidden"
      >
        {items.map((p, idx) => {
          const illustrationSrc = illustrations[idx % illustrations.length];
          return (
            <div key={p.title} className="shrink-0 snap-start snap-card-solutions sm:snap-card-solutions md:snap-card-solutions">
              <div
                className={cardBase}
                style={{
                  background:
                    "radial-gradient(520px circle at 50% 40%, var(--accent-fog), transparent 55%), var(--accent-halo)",
                }}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                  <div className="absolute -right-16 -top-16 h-56 w-56 ui-radius-card bg-[var(--accent)]/18 blur-2xl" />
                  <div className="absolute left-6 top-6 type-watermark-lg tracking-tight text-foreground/5">
                    0{idx + 1}
                  </div>
                  {illustrationSrc ? (
                    <Image
                      src={illustrationSrc}
                      alt=""
                      aria-hidden="true"
                      width={300}
                      height={300}
                      className="absolute -bottom-10 -right-12 w-[128%] max-w-none opacity-22"
                    />
                  ) : null}
                </div>

                <div className="relative">
                  <div className="type-ui-xs text-muted">0{idx + 1}</div>
                  <div className="mt-6 text-balance type-solutions-title text-foreground">
                    {p.title}
                  </div>
                  {p.body ? (
                    <p className="mt-6 type-body text-foreground-muted leading-relaxed max-w-solutions-body">{p.body}</p>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop: Discord-like timeline storytelling (scroll-driven). */}
      <div ref={desktopStoryRef} className="hidden lg:block relative">
        {/* Sticky center spine */}
        <div
          aria-hidden="true"
          className={
            "pointer-events-none absolute left-1/2 -translate-x-1/2 transition-[opacity,transform] duration-[var(--transition-elegant)] will-change-transform " +
            (spineEntered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2")
          }
          style={{
            top: "calc(var(--header-height-desktop) + 24px)",
            height: "calc(100% - (var(--header-height-desktop) + 24px))",
          }}
        >
          <div className="sticky" style={{ top: "calc(var(--header-height-desktop) + 24px)", height: "70vh" }}>
            <div className="relative h-full w-[3px] bg-border ui-radius-pill overflow-hidden">
              <div
                ref={spineFillRef}
                className="absolute left-0 top-0 w-full bg-foreground/70 origin-top will-change-transform"
                style={{
                  height: "100%",
                  transform: "scaleY(var(--timeline-progress, 0))",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl space-y-8">
          {items.map((p, idx) => {
            const isActive = idx === activeIndex;
            const isLeft = idx % 2 === 0;
            const illustrationSrc = illustrations[idx % illustrations.length];

            return (
              <div
                key={p.title}
                data-index={idx}
                ref={(node) => {
                  itemElsRef.current[idx] = node;
                }}
                className="relative grid grid-cols-[1fr_96px_1fr] gap-8 items-stretch"
              >
                {/* Left column */}
                <div className={isLeft ? "" : "opacity-0"} aria-hidden={!isLeft}>
                  {isLeft ? (
                    <div
                      tabIndex={0}
                      onFocus={() => setActiveIndex(idx)}
                      onClick={() => setActiveIndex(idx)}
                      onKeyDown={(e) => onCardKeyDown(e, idx)}
                      className={
                        "relative overflow-hidden ui-radius-card border border-border ui-shadow-elegant backdrop-blur-sm outline-none cursor-default max-w-solutions-card ml-auto " +
                        "transition-[transform,opacity,filter] duration-[var(--transition-elegant)] will-change-transform " +
                        (isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-85 translate-y-1")
                      }
                      style={{
                        background:
                          "radial-gradient(700px circle at 20% 30%, var(--accent-fog), transparent 55%), var(--accent-halo)",
                      }}
                    >
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute -left-16 -top-16 h-72 w-72 ui-radius-card bg-[var(--accent)]/16 blur-2xl" />
                        {illustrationSrc ? (
                          <Image
                            src={illustrationSrc}
                            alt=""
                            aria-hidden="true"
                            width={300}
                            height={300}
                            className={
                              "absolute -bottom-10 -right-12 w-[125%] max-w-none transition-opacity duration-[var(--transition-elegant)] " +
                              (isActive ? "opacity-22" : "opacity-10")
                            }
                          />
                        ) : null}
                      </div>

                      <div className="relative p-8">
                        <div className="type-ui-xs text-muted">0{idx + 1}</div>
                        <div
                          className={
                            "mt-7 text-balance font-semibold tracking-tight text-foreground transition-[letter-spacing,transform,opacity] duration-[var(--transition-elegant)] " +
                            (isActive
                              ? "type-solutions-card-active"
                              : "type-solutions-card-inactive")
                          }
                        >
                          {p.title}
                        </div>
                        {p.body ? (
                          <p
                            className={
                              "mt-6 type-body text-foreground-muted leading-relaxed transition-[opacity,transform] duration-[var(--transition-elegant)] " +
                              (isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-0")
                            }
                          >
                            {p.body}
                          </p>
                        ) : null}

                        <div className="mt-8">
                          <div className={"h-px w-full bg-border " + (isActive ? "opacity-100" : "opacity-60")} />
                          {isActive ? (
                            <div aria-hidden="true" className="mt-0.5 h-px w-full bg-border shimmer opacity-60" />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                {/* Center column: node */}
                <div className="relative flex items-start justify-center">
                  <div
                    aria-hidden="true"
                    className={
                      `mt-8 h-6 w-6 ui-radius-pill border border-border bg-background transition-transform duration-[var(--transition-elegant)] ` +
                      (isActive ? "scale-110 shadow-focus-active" : "scale-100")
                    }
                  />
                </div>

                {/* Right column */}
                <div className={!isLeft ? "" : "opacity-0"} aria-hidden={isLeft}>
                  {!isLeft ? (
                    <div
                      tabIndex={0}
                      onFocus={() => setActiveIndex(idx)}
                      onClick={() => setActiveIndex(idx)}
                      onKeyDown={(e) => onCardKeyDown(e, idx)}
                      className={
                        "relative overflow-hidden ui-radius-card border border-border ui-shadow-elegant backdrop-blur-sm outline-none cursor-default max-w-solutions-card " +
                        "transition-[transform,opacity,filter] duration-[var(--transition-elegant)] will-change-transform " +
                        (isActive
                          ? "opacity-100 translate-y-0"
                          : "opacity-85 translate-y-1")
                      }
                      style={{
                        background:
                          "radial-gradient(700px circle at 80% 30%, var(--accent-fog), transparent 55%), var(--accent-halo)",
                      }}
                    >
                      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                        <div className="absolute -right-16 -top-16 h-72 w-72 ui-radius-card bg-[var(--accent)]/16 blur-2xl" />
                        {illustrationSrc ? (
                          <Image
                            src={illustrationSrc}
                            alt=""
                            aria-hidden="true"
                            width={300}
                            height={300}
                            className={
                              "absolute -bottom-10 -left-12 w-[125%] max-w-none transition-opacity duration-[var(--transition-elegant)] " +
                              (isActive ? "opacity-22" : "opacity-10")
                            }
                          />
                        ) : null}
                      </div>

                      <div className="relative p-8">
                        <div className="type-ui-xs text-muted">0{idx + 1}</div>
                        <div
                          className={
                            "mt-7 text-balance font-semibold tracking-tight text-foreground transition-[letter-spacing,transform,opacity] duration-[var(--transition-elegant)] " +
                            (isActive
                              ? "type-solutions-card-active"
                              : "type-solutions-card-inactive")
                          }
                        >
                          {p.title}
                        </div>
                        {p.body ? (
                          <p
                            className={
                              "mt-6 type-body text-foreground-muted leading-relaxed transition-[opacity,transform] duration-[var(--transition-elegant)] " +
                              (isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-0")
                            }
                          >
                            {p.body}
                          </p>
                        ) : null}

                        <div className="mt-8">
                          <div className={"h-px w-full bg-border " + (isActive ? "opacity-100" : "opacity-60")} />
                          {isActive ? (
                            <div aria-hidden="true" className="mt-0.5 h-px w-full bg-border shimmer opacity-60" />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
