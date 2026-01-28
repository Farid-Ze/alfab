import { NextResponse } from "next/server";

export async function POST(request: Request) {
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
