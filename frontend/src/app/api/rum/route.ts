export const runtime = "nodejs";

export async function POST(req: Request) {
  const baseUrl = process.env.LEAD_API_BASE_URL;
  // RUM is best-effort. The frontend must not error if the Lead API is not configured
  // (e.g., local dev) or temporarily unreachable.
  if (!baseUrl) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const ct = req.headers.get("content-type") ?? "";
  // Accept only JSON beacons. If the content type is missing or unexpected, treat as no-op.
  if (!ct.toLowerCase().startsWith("application/json")) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const body = await req.text();
  if (!body) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const url = `${baseUrl.replace(/\/$/, "")}/api/v1/rum`;

  // Forward selected client context headers so the Lead API can apply IP/user-agent
  // signals correctly when TRUSTED_PROXIES is configured.
  const ua = req.headers.get("user-agent");
  const xff = req.headers.get("x-forwarded-for");
  const xri = req.headers.get("x-real-ip");

  const upstream = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(ua ? { "User-Agent": ua } : {}),
      ...(xff ? { "X-Forwarded-For": xff } : {}),
      ...(xri ? { "X-Real-IP": xri } : {}),
    },
    body,
    // Telemetry should be best-effort and fast.
    signal: AbortSignal.timeout(2000),
  }).catch((err: unknown) => {
    // Intentionally swallow errors so the client never sees 5xx for telemetry.
    // (We still keep this handler as a hook point for future server-side logging.)
    void err;
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  });

  if (upstream.status === 204) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  // Any non-204 response from upstream is treated as success for the client.
  // This avoids repeated noisy errors from beacons and CWV reporters.
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
