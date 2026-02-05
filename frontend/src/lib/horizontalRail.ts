"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type HorizontalRailApi = {
  trackRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  pageLabel: string;
  scrollToIndex: (index: number, behavior?: ScrollBehavior) => void;
  prev: () => void;
  next: () => void;
};

function clampIndex(index: number, length: number) {
  if (length <= 0) return 0;
  return Math.max(0, Math.min(index, length - 1));
}

export function useHorizontalRail(length: number): HorizontalRailApi {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndexState] = useState(0);

  const pageCount = Math.max(1, length);
  const pageLabel = `${Math.min(activeIndex + 1, pageCount)} • ${pageCount}`;

  const setActiveIndex = useCallback(
    (index: number) => {
      setActiveIndexState(clampIndex(index, length));
    },
    [length]
  );

  const scrollToIndex = useCallback(
    (index: number, behavior: ScrollBehavior = "smooth") => {
      const nextIndex = clampIndex(index, length);
      setActiveIndexState(nextIndex);

      const track = trackRef.current;
      if (!track) return;
      const el = track.querySelector<HTMLElement>(`[data-rail-index="${nextIndex}"]`);
      if (!el) return;
      el.scrollIntoView({ behavior, block: "nearest", inline: "start" });
    },
    [length]
  );

  const prev = useCallback(() => scrollToIndex(activeIndex - 1), [activeIndex, scrollToIndex]);
  const next = useCallback(() => scrollToIndex(activeIndex + 1), [activeIndex, scrollToIndex]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const children = Array.from(track.querySelectorAll<HTMLElement>("[data-rail-index]"));
        if (!children.length) return;

        const left = track.scrollLeft;
        let best = 0;
        let bestDist = Number.POSITIVE_INFINITY;

        for (const node of children) {
          const idx = Number(node.dataset.railIndex ?? 0);
          const dist = Math.abs(node.offsetLeft - left);
          if (dist < bestDist) {
            bestDist = dist;
            best = idx;
          }
        }

        setActiveIndexState(clampIndex(best, length));
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [length]);

  return {
    trackRef,
    activeIndex,
    setActiveIndex,
    pageLabel,
    scrollToIndex,
    prev,
    next,
  };
}

export function attachDragScroll(
  el: HTMLDivElement,
  opts?: {
    ignore?: (target: HTMLElement | null) => boolean;
    suppressClick?: boolean;
  }
) {
  let isDown = false;
  let startX = 0;
  let startScrollLeft = 0;
  let hasDragged = false;

  const ignore = opts?.ignore;
  const suppressClick = opts?.suppressClick ?? false;

  const onDown = (e: PointerEvent) => {
    const target = e.target as HTMLElement | null;
    if (ignore?.(target)) return;

    isDown = true;
    hasDragged = false;
    startX = e.clientX;
    startScrollLeft = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
  };

  const onMove = (e: PointerEvent) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) hasDragged = true;
    el.scrollLeft = startScrollLeft - dx;
  };

  const onUp = (e: PointerEvent) => {
    if (!isDown) return;
    isDown = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch {
      // no-op
    }
  };

  const onClickCapture = (e: MouseEvent) => {
    if (!suppressClick) return;
    if (!hasDragged) return;
    e.preventDefault();
    e.stopPropagation();
    hasDragged = false;
  };

  el.addEventListener("pointerdown", onDown);
  el.addEventListener("pointermove", onMove);
  el.addEventListener("pointerup", onUp);
  el.addEventListener("pointercancel", onUp);

  if (suppressClick) {
    el.addEventListener("click", onClickCapture, true);
  }

  return () => {
    el.removeEventListener("pointerdown", onDown);
    el.removeEventListener("pointermove", onMove);
    el.removeEventListener("pointerup", onUp);
    el.removeEventListener("pointercancel", onUp);
    if (suppressClick) {
      el.removeEventListener("click", onClickCapture, true);
    }
  };
}
