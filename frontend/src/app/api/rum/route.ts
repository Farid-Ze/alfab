import { NextResponse } from "next/server";

export async function POST() {
    // Telemetry endpoint - Best effort, always 204
    return new NextResponse(null, { status: 204 });
}
