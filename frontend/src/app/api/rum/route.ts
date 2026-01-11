import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const baseUrl = process.env.LEAD_API_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Lead API is not configured" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  const body = await req.text();
  if (!body) {
    return NextResponse.json(
      { error: "Empty body" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/v1/rum`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
    // Telemetry should be best-effort and fast.
    signal: AbortSignal.timeout(2000),
  }).catch((err: unknown) => {
    const msg = err instanceof Error ? err.message : "upstream_error";
    return new Response(JSON.stringify({ error: "Lead API unreachable", detail: msg }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  });

  if (upstream.status === 204) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const text = await upstream.text();
  const contentType = upstream.headers.get("Content-Type") ?? "application/json; charset=utf-8";
  return new Response(text, {
    status: upstream.status,
    headers: {
      "Content-Type": contentType,
      "Cache-Control": "no-store",
    },
  });
}
