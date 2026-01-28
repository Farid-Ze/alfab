import { renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { useScrollLock } from "./useScrollLock";

describe("useScrollLock", () => {
    let originalOverflow: string;
    let originalPaddingRight: string;

    beforeEach(() => {
        originalOverflow = document.body.style.overflow;
        originalPaddingRight = document.body.style.paddingRight;

        // Mock window innerWidth for scrollbar calculation
        Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
        // Mock document clientWidth
        Object.defineProperty(document.documentElement, 'clientWidth', { writable: true, configurable: true, value: 1000 });
    });

    afterEach(() => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
        vi.restoreAllMocks();
    });

    it("should lock scroll when locked is true", () => {
        renderHook(() => useScrollLock(true));

        expect(document.body.style.overflow).toBe("hidden");
        // 1024 - 1000 = 24px scrollbar
        expect(document.body.style.paddingRight).toBe("24px");
    });

    it("should unlock scroll when locked is false", () => {
        renderHook(() => useScrollLock(false));

        expect(document.body.style.overflow).not.toBe("hidden");
        expect(document.body.style.paddingRight).not.toBe("24px");
    });

    it("should restore original styles on unmount", () => {
        const { unmount } = renderHook(() => useScrollLock(true));

        expect(document.body.style.overflow).toBe("hidden");
        unmount();
        expect(document.body.style.overflow).toBe(originalOverflow);
        expect(document.body.style.paddingRight).toBe(originalPaddingRight);
    });
});
