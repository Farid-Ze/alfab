import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

interface RateLimitConfig {
    limit: number;
    windowMs: number;
}

interface RateLimitResult {
    success: boolean;
    limit: number;
    remaining: number;
    reset: string;
}

// === Distributed Rate Limit Store Interface ===
interface RateLimitStore {
    get(key: string): Promise<{ count: number; expires: number } | null>;
    set(key: string, value: { count: number; expires: number }, ttlMs: number): Promise<void>;
}

// === In-Memory Store (Development Fallback) ===
declare global {
    // eslint-disable-next-line no-unused-vars
    var rateLimitMap: Map<string, { count: number; expires: number }> | undefined;
}

const memoryStore: RateLimitStore = {
    async get(key: string) {
        if (!globalThis.rateLimitMap) {
            globalThis.rateLimitMap = new Map();
        }
        return globalThis.rateLimitMap.get(key) || null;
    },
    async set(key: string, value: { count: number; expires: number }) {
        if (!globalThis.rateLimitMap) {
            globalThis.rateLimitMap = new Map();
        }
        // Cleanup: Prevent memory leaks
        if (globalThis.rateLimitMap.size > 10000) {
            globalThis.rateLimitMap.clear();
        }
        globalThis.rateLimitMap.set(key, value);
    }
};

// === Upstash Redis Store (Production) ===
// OWASP API4:2023: Distributed rate limiting for multi-instance deployments
const upstashStore: RateLimitStore | null = (() => {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const token = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !token) {
        return null;
    }

    return {
        async get(key: string) {
            try {
                const response = await fetch(`${url}/get/${encodeURIComponent(key)}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.result) {
                    return JSON.parse(data.result);
                }
                return null;
            } catch (err) {
                logger.warn("[RateLimit] Upstash GET failed, using memory fallback", { error: err });
                return memoryStore.get(key);
            }
        },
        async set(key: string, value: { count: number; expires: number }, ttlMs: number) {
            try {
                const ttlSec = Math.ceil(ttlMs / 1000);
                await fetch(`${url}/setex/${encodeURIComponent(key)}/${ttlSec}/${encodeURIComponent(JSON.stringify(value))}`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` }
                });
            } catch (err) {
                logger.warn("[RateLimit] Upstash SET failed, using memory fallback", { error: err });
                await memoryStore.set(key, value, ttlMs);
            }
        }
    };
})();

// Select store: prefer Upstash if configured, fallback to memory
const store: RateLimitStore = upstashStore || memoryStore;

/**
 * Rate Limiter (Token Bucket Strategy)
 * 
 * ITIL 4: Capacity Management
 * COBIT: DSS05.10 Network Security
 * OWASP API4:2023: Unrestricted Resource Consumption
 * 
 * Uses Upstash Redis if configured, falls back to in-memory.
 * For serverless (Vercel), Upstash provides true distributed limiting.
 */
export async function rateLimitAsync(
    ip: string,
    config: RateLimitConfig = { limit: 100, windowMs: 60000 }
): Promise<RateLimitResult> {
    const { limit, windowMs } = config;
    const now = Date.now();
    const key = `ratelimit:${ip}`;

    let record = await store.get(key);

    if (!record || now > record.expires) {
        record = { count: 0, expires: now + windowMs };
    }

    record.count++;
    await store.set(key, record, windowMs);

    const remaining = Math.max(0, limit - record.count);
    const reset = new Date(record.expires).toUTCString();

    return {
        success: record.count <= limit,
        limit,
        remaining,
        reset,
    };
}

/**
 * Synchronous Rate Limiter (In-Memory Only)
 * 
 * For backwards compatibility with existing code.
 * Note: Does NOT use distributed store.
 */
export function rateLimit(ip: string, config: RateLimitConfig = { limit: 100, windowMs: 60000 }): RateLimitResult {
    if (!globalThis.rateLimitMap) {
        globalThis.rateLimitMap = new Map();
    }

    const { limit, windowMs } = config;
    const now = Date.now();

    // Cleanup: Prevent memory leaks (ITIL stability)
    if (globalThis.rateLimitMap.size > 10000) {
        globalThis.rateLimitMap.clear();
    }

    const record = globalThis.rateLimitMap.get(ip) || { count: 0, expires: now + windowMs };

    // Reset if window expired
    if (now > record.expires) {
        record.count = 0;
        record.expires = now + windowMs;
    }

    record.count++;
    globalThis.rateLimitMap.set(ip, record);

    const remaining = Math.max(0, limit - record.count);
    const reset = new Date(record.expires).toUTCString();

    return {
        success: record.count <= limit,
        limit,
        remaining,
        reset,
    };
}

/**
 * Helper to generate 429 response
 */
export function rateLimitResponse(result: RateLimitResult) {
    return NextResponse.json(
        {
            success: false,
            error: {
                code: "RATE_LIMIT_EXCEEDED",
                message: "Too many requests, please try again later.",
            },
        },
        {
            status: 429,
            headers: {
                "X-RateLimit-Limit": result.limit.toString(),
                "X-RateLimit-Remaining": result.remaining.toString(),
                "X-RateLimit-Reset": result.reset,
                "Retry-After": String(Math.ceil((new Date(result.reset).getTime() - Date.now()) / 1000)),
            },
        }
    );
}

/**
 * Check if distributed rate limiting is enabled
 */
export function isDistributedRateLimitEnabled(): boolean {
    return upstashStore !== null;
}
