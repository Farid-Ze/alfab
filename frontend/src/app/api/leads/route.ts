import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { submitLead } from "@/actions/submit-lead";
import { rateLimitAsync } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

const MAX_BODY_BYTES = 100 * 1024; // 100 KB

function jsonResponse(body: Record<string, unknown>, status: number, extraHeaders?: HeadersInit) {
    return NextResponse.json(body, {
        status,
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            "Cache-Control": "no-store",
            ...extraHeaders,
        },
    });
}

export async function POST(request: Request) {
    const ip = (await headers()).get("x-forwarded-for") || "unknown";

    // COBIT: Rate Limit for API Abuse Prevention (Task 14)
    // 5 requests per minute for Lead Submission is sufficient for humans.
    const limiter = await rateLimitAsync(ip, { limit: 5, windowMs: 60000 });

    if (!limiter.success) {
        return jsonResponse(
            { success: false, error: "rate_limited" },
            429,
            {
                "X-RateLimit-Limit": limiter.limit.toString(),
                "X-RateLimit-Remaining": limiter.remaining.toString(),
                "X-RateLimit-Reset": limiter.reset,
                "Retry-After": String(Math.ceil((new Date(limiter.reset).getTime() - Date.now()) / 1000)),
            }
        );
    }

    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
        return jsonResponse(
            { error: "content_type_must_be_application_json" },
            415
        );
    }

    const contentLength = request.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
        return jsonResponse({ error: "payload_too_large" }, 413);
    }

    let payload: unknown;
    try {
        payload = await request.json();
    } catch (err) {
        logger.warn("[api/leads] Invalid JSON", { ip, error: String(err) });
        return jsonResponse({ error: "invalid_json" }, 400);
    }

    const result = await submitLead(payload as any);

    if (result.success) {
        return jsonResponse({ success: true }, 200);
    }

    if (result.error === "rate_limited") {
        return jsonResponse({ error: "rate_limited" }, 429);
    }

    if (result.error === "validation_error") {
        return jsonResponse(
            { error: "validation_error", details: result.details ?? {} },
            400
        );
    }

    if (result.error === "persistence_failed_critical") {
        return jsonResponse({ error: "persistence_failed" }, 503);
    }

    return jsonResponse({ error: result.error ?? "internal_error" }, 500);
}
