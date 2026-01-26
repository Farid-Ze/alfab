"use client";

import { useState, useEffect } from "react";
import { IconAlertCircle } from "@/components/ui/icons";

/**
 * Offline Indicator (ITIL/UX)
 * Shows a banner when the user loses network connectivity.
 * Uses the browser's online/offline events.
 */
export default function OfflineIndicator() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        // Initialize state from navigator
        setIsOffline(!navigator.onLine);

        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener("online", handleOnline);
        window.addEventListener("offline", handleOffline);

        return () => {
            window.removeEventListener("online", handleOnline);
            window.removeEventListener("offline", handleOffline);
        };
    }, []);

    if (!isOffline) return null;

    return (
        <div
            role="alert"
            className="fixed top-0 left-0 right-0 z-50 bg-warning text-warning-foreground px-4 py-2 text-center type-data-strong"
        >
            <div className="flex items-center justify-center gap-2">
                <IconAlertCircle className="h-4 w-4" />
                <span>You are offline. Some features may be unavailable.</span>
            </div>
        </div>
    );
}
