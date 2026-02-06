/**
 * @jest-environment jsdom
 */

import { renderHook, act } from "@testing-library/react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// Mock localStorage
const mockLocalStorage = (() => {
    let store: Record<string, string> = {};
    return {
        getItem: jest.fn((key: string) => store[key] || null),
        setItem: jest.fn((key: string, value: string) => {
            store[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
            delete store[key];
        }),
        clear: jest.fn(() => {
            store = {};
        }),
    };
})();

Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
});

describe("useLocalStorage", () => {
    beforeEach(() => {
        mockLocalStorage.clear();
        jest.clearAllMocks();
    });

    it("returns initial value when no stored value", () => {
        const { result } = renderHook(() =>
            useLocalStorage("testKey", "initial")
        );

        expect(result.current[0]).toBe("initial");
    });

    it("updates value and localStorage", () => {
        const { result } = renderHook(() =>
            useLocalStorage("testKey", "initial")
        );

        act(() => {
            result.current[1]("updated");
        });

        expect(result.current[0]).toBe("updated");
        expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
            "testKey",
            JSON.stringify("updated")
        );
    });

    it("removes value from localStorage", () => {
        const { result } = renderHook(() =>
            useLocalStorage("testKey", "initial")
        );

        act(() => {
            result.current[2](); // removeValue
        });

        expect(result.current[0]).toBe("initial");
        expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("testKey");
    });

    it("handles objects correctly", () => {
        const { result } = renderHook(() =>
            useLocalStorage("testKey", { name: "test" })
        );

        act(() => {
            result.current[1]({ name: "updated" });
        });

        expect(result.current[0]).toEqual({ name: "updated" });
    });
});
