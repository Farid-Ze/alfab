import { expect, test } from "vitest";
import { cn } from "./utils";

test("cn merges class names correctly", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
});

test("cn handles conditional classes", () => {
    expect(cn("foo", true && "bar", false && "baz")).toBe("foo bar");
});

test("cn merges Tailwind classes (tailwind-merge behavior)", () => {
    // px-2 should be overridden by px-4
    const result1 = cn("px-2 py-1", "px-4");
    expect(result1).toContain("px-4");
    expect(result1).toContain("py-1");
    expect(result1).not.toContain("px-2");

    // text-red-500 should be overridden by text-blue-500
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
});

test("cn handles arrays and objects", () => {
    expect(cn(["foo", "bar"])).toBe("foo bar");
    expect(cn({ foo: true, bar: false, baz: true })).toBe("foo baz");
});
