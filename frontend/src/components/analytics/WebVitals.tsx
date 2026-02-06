"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Web Vitals Component
 * 
 * Tracks Core Web Vitals metrics:
 * - LCP (Largest Contentful Paint) < 2.5s
 * - FID (First Input Delay) < 100ms  
 * - CLS (Cumulative Layout Shift) < 0.1
 * - TTFB (Time to First Byte)
 * - INP (Interaction to Next Paint)
 * 
 * Per paket-a.md A4-07: LCP < 2.5s, CLS < 0.1
 */

type Metric = {
    name: string;
    value: number;
    rating: "good" | "needs-improvement" | "poor";
    id: string;
};

// Thresholds per web.dev recommendations
const thresholds = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    TTFB: { good: 800, poor: 1800 },
    INP: { good: 200, poor: 500 },
};

function getRating(name: string, value: number): Metric["rating"] {
    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return "good";
    if (value <= threshold.good) return "good";
    if (value <= threshold.poor) return "needs-improvement";
    return "poor";
}

function sendToAnalytics(metric: Metric) {
    // Log in development
    if (process.env.NODE_ENV === "development") {
        const color = {
            good: "\x1b[32m", // green
            "needs-improvement": "\x1b[33m", // yellow
            poor: "\x1b[31m", // red
        }[metric.rating];

        console.log(
            `${color}[Web Vitals] ${metric.name}: ${metric.value.toFixed(2)} (${metric.rating})\x1b[0m`
        );
    }

    // Send to GA4 if available
    if (typeof window !== "undefined" && "gtag" in window) {
        const gtag = (window as unknown as { gtag: (...args: unknown[]) => void }).gtag;
        gtag("event", metric.name, {
            event_category: "Web Vitals",
            event_label: metric.id,
            value: Math.round(metric.name === "CLS" ? metric.value * 1000 : metric.value),
            non_interaction: true,
        });
    }

    // TODO: Send to custom analytics endpoint
    // fetch("/api/analytics/vitals", {
    //     method: "POST",
    //     body: JSON.stringify(metric),
    // });
}

export function WebVitals() {
    const pathname = usePathname();

    useEffect(() => {
        // Only load web-vitals in browser
        if (typeof window === "undefined") return;

        // Dynamic import to avoid SSR issues
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        import("web-vitals").then((webVitals) => {
            const handleMetric = (metric: { name: string; value: number; id: string }) => {
                sendToAnalytics({
                    ...metric,
                    rating: getRating(metric.name, metric.value),
                });
            };

            webVitals.onLCP(handleMetric);
            webVitals.onCLS(handleMetric);
            webVitals.onTTFB(handleMetric);
            webVitals.onINP(handleMetric);
        }).catch(() => {
            // Silently fail if web-vitals cannot be loaded
        });
    }, [pathname]);

    // This component renders nothing
    return null;
}

export default WebVitals;
