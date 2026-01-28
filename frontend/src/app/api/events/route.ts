import { NextResponse } from "next/server";

export async function POST() {
    // Events endpoint - Best effort, always 204
    return new NextResponse(null, { status: 204 });
}
