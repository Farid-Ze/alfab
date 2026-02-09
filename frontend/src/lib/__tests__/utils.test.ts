import {
    cn,
    formatCurrency,
    formatDate,
    formatPhone,
    truncate,
    slugify,
    capitalize,
    isEmpty,
    isValidEmail,
    isValidPhone,
    compact,
    pick,
    omit,
} from "@/lib/utils";

describe("cn (classname merger)", () => {
    it("merges classes correctly", () => {
        expect(cn("foo", "bar")).toBe("foo bar");
    });

    it("handles conditional classes", () => {
        expect(cn("base", true && "active", false && "hidden")).toBe("base active");
    });

    it("handles undefined and null", () => {
        expect(cn("base", undefined, null)).toBe("base");
    });
});

describe("formatCurrency", () => {
    it("formats with default IDR", () => {
        const result = formatCurrency(1500000);
        expect(result).toContain("1.500.000");
    });

    it("formats without symbol", () => {
        const result = formatCurrency(1000, { showSymbol: false });
        expect(result).toBeTruthy();
    });
});

describe("formatDate", () => {
    it("formats date with medium format", () => {
        const date = new Date("2026-01-15");
        const result = formatDate(date);
        expect(result).toBeTruthy();
    });

    it("accepts string date", () => {
        const result = formatDate("2026-01-15");
        expect(result).toBeTruthy();
    });
});

describe("formatPhone", () => {
    it("formats Indonesian phone number", () => {
        const result = formatPhone("081234567890");
        expect(result).toBeTruthy();
    });

    it("handles +62 prefix", () => {
        const result = formatPhone("+6281234567890");
        expect(result).toBeTruthy();
    });
});

describe("truncate", () => {
    it("truncates long text", () => {
        expect(truncate("Hello World", 5)).toBe("Hello...");
    });

    it("keeps short text as is", () => {
        expect(truncate("Hi", 10)).toBe("Hi");
    });
});

describe("slugify", () => {
    it("converts to lowercase slug", () => {
        expect(slugify("Hello World")).toBe("hello-world");
    });

    it("removes special characters", () => {
        expect(slugify("Hello! World?")).toBe("hello-world");
    });

    it("handles multiple spaces", () => {
        expect(slugify("Hello   World")).toBe("hello-world");
    });
});

describe("capitalize", () => {
    it("capitalizes first letter", () => {
        expect(capitalize("hello")).toBe("Hello");
    });

    it("handles empty string", () => {
        expect(capitalize("")).toBe("");
    });
});

describe("isEmpty", () => {
    it("returns true for null", () => {
        expect(isEmpty(null)).toBe(true);
    });

    it("returns true for undefined", () => {
        expect(isEmpty(undefined)).toBe(true);
    });

    it("returns true for empty string", () => {
        expect(isEmpty("")).toBe(true);
    });

    it("returns true for empty array", () => {
        expect(isEmpty([])).toBe(true);
    });

    it("returns false for non-empty values", () => {
        expect(isEmpty("hello")).toBe(false);
        expect(isEmpty([1])).toBe(false);
    });
});

describe("isValidEmail", () => {
    it("validates correct email", () => {
        expect(isValidEmail("test@example.com")).toBe(true);
    });

    it("rejects invalid email", () => {
        expect(isValidEmail("invalid")).toBe(false);
        expect(isValidEmail("test@")).toBe(false);
    });
});

describe("isValidPhone", () => {
    it("validates Indonesian phone", () => {
        expect(isValidPhone("081234567890")).toBe(true);
        expect(isValidPhone("+6281234567890")).toBe(true);
    });

    it("rejects invalid phone", () => {
        expect(isValidPhone("123")).toBe(false);
    });
});

describe("compact", () => {
    it("removes falsy values from object", () => {
        const result = compact({ a: 1, b: null, c: 2, d: undefined });
        expect(result).toEqual({ a: 1, c: 2 });
    });
});

describe("pick", () => {
    it("picks specified keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(pick(obj, ["a", "c"])).toEqual({ a: 1, c: 3 });
    });
});

describe("omit", () => {
    it("omits specified keys", () => {
        const obj = { a: 1, b: 2, c: 3 };
        expect(omit(obj, ["b"])).toEqual({ a: 1, c: 3 });
    });
});
