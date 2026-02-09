"use client";

import { useTransition, useDeferredValue, useState, useCallback } from "react";

/**
 * useOptimizedTransition - INP Optimization Hook
 * 
 * Wraps state updates in React's useTransition to prevent
 * blocking the main thread during heavy updates.
 * 
 * Usage:
 * const { isPending, startTransition } = useOptimizedTransition();
 * startTransition(() => setExpensiveState(value));
 */
export function useOptimizedTransition() {
    const [isPending, startTransition] = useTransition();

    const wrappedTransition = useCallback(
        (callback: () => void) => {
            startTransition(() => {
                callback();
            });
        },
        [startTransition]
    );

    return { isPending, startTransition: wrappedTransition };
}

/**
 * useDeferredFilter - Deferred Search/Filter Hook
 * 
 * Defers expensive filter operations to prevent input lag.
 * The immediate value updates instantly, deferred value
 * updates when the browser is idle.
 * 
 * Usage:
 * const { value, deferredValue, setValue } = useDeferredFilter("");
 * <input value={value} onChange={(e) => setValue(e.target.value)} />
 * <FilteredList filter={deferredValue} />
 */
export function useDeferredFilter<T>(initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);
    const deferredValue = useDeferredValue(value);

    return {
        value,
        deferredValue,
        setValue,
        isStale: value !== deferredValue,
    };
}

/**
 * useIdleCallback - Run expensive operations when idle
 * 
 * Schedules work during browser idle periods to avoid
 * blocking interaction.
 */
export function useIdleCallback() {
    const scheduleIdleWork = useCallback((callback: () => void) => {
        if (typeof window !== "undefined" && "requestIdleCallback" in window) {
            window.requestIdleCallback(callback, { timeout: 2000 });
        } else {
            // Fallback for Safari
            setTimeout(callback, 1);
        }
    }, []);

    return { scheduleIdleWork };
}
