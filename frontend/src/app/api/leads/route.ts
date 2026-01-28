import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { rateLimit, rateLimitResponse } from "@/lib/rate-limit";

export async function POST(request: Request) {
    const ip = (await headers()).get("x-forwarded-for") || "unknown";

    // COBIT: Rate Limit for API Abuse Prevention (Task 14)
    // 5 requests per minute for Lead Submission is sufficient for humans.
    const limiter = rateLimit(ip, { limit: 5, windowMs: 60000 });

    if (!limiter.success) {
        return rateLimitResponse(limiter);
    }

    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
        return NextResponse.json(
            { error: "content_type_must_be_application_json" },
            { status: 415 }
        );
    }

    // Mock success for smoke tests
    return NextResponse.json({ success: true }, { status: 200 });
}
