"use client";

import { useEffect } from "react";
import { onCLS, onINP, onLCP } from "web-vitals";

import { postTelemetry } from "@/lib/telemetry";

export default function WebVitalsReporter() {
  useEffect(() => {
    const report = (metric: {
      id: string;
      name: string;
      value: number;
      delta: number;
      rating?: string;
      navigationType?: string;
    }) => {
      postTelemetry("/api/rum", {
        metric_id: metric.id,
        metric_name: metric.name,
        value: metric.value,
        delta: metric.delta,
        rating: metric.rating,
        navigation_type: metric.navigationType,
      });
    };

    // Minimal CWV set per Paket A UAT-16 / ADR-0002.
    onLCP(report);
    onCLS(report);
    onINP(report);
  }, []);

  return null;
}
