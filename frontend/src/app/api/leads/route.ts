import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type LeadRequest = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  page_url_initial?: string;
  page_url_current?: string;
  company?: string; // honeypot
};

export async function POST(req: Request) {
  const baseUrl = process.env.LEAD_API_BASE_URL;
  if (!baseUrl) {
    return NextResponse.json(
      { error: "Lead API is not configured" },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }

  let payload: LeadRequest;
  try {
    payload = (await req.json()) as LeadRequest;
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400, headers: { "Cache-Control": "no-store" } },
    );
  }

  // Forward to Lead API Option B.
  const url = `${baseUrl.replace(/\/$/, "")}/api/v1/leads`;
  const idempotencyKey = req.headers.get("Idempotency-Key") || randomUUID();

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(payload),
    // Keep a reasonable timeout so UI can show actionable feedback.
    signal: AbortSignal.timeout(8000),
  }).catch((err: unknown) => {
    const msg = err instanceof Error ? err.message : "upstream_error";
    return new Response(JSON.stringify({ error: "Lead API unreachable", detail: msg }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  });

  // Pass through status + JSON body, but always no-store.
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
