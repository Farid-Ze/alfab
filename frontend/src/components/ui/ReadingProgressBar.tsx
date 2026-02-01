"use client";

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { ProgressBar } from "@/components/ui/ProgressBar";

/**
 * ReadingProgressBar - Fixed header reading progress indicator
 * 
 * Uses the useScrollProgress hook to show page reading progress.
 * Appears at the top of the viewport below the header.
 * 
 * Design V2: Uses elegant transition and monochrome styling.
 */
export default function ReadingProgressBar() {
    const progress = useScrollProgress();

    // Only show when user has scrolled past the fold
    if (progress < 0.01) return null;

    return (
        <div className="fixed top-20 left-0 right-0 z-40">
            <ProgressBar
                value={progress}
                height={2}
                ariaLabel="Reading progress"
            />
        </div>
    );
}
