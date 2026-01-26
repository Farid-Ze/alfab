import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Lead Export API (CSV)
 * 
 * GET /api/leads/export
 * 
 * Requires admin authentication via X-Admin-Token header.
 * Returns leads as CSV file.
 * 
 * See Paket A UAT-12: Owner/PIC dapat mengunduh data lead sebagai file CSV
 */

const ADMIN_TOKEN = process.env.LEAD_API_ADMIN_TOKEN || "";

export async function GET(req: Request) {
    // Validate admin token
    const token =
        req.headers.get("x-admin-token") ||
        req.headers.get("authorization")?.replace("Bearer ", "");

    if (!ADMIN_TOKEN || token !== ADMIN_TOKEN) {
        return NextResponse.json(
            { error: "unauthorized" },
            { status: 401, headers: { "Cache-Control": "no-store" } }
        );
    }

    try {
        // Fetch all leads from Supabase
        const { data, error } = await supabaseAdmin()
            .from("leads")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("[leads/export] Supabase error:", error);
            return NextResponse.json(
                { error: "fetch_failed" },
                { status: 500, headers: { "Cache-Control": "no-store" } }
            );
        }

        // Convert to CSV
        const csv = convertToCSV(data || []);

        // Return as downloadable CSV
        return new NextResponse(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="leads-export-${getDateString()}.csv"`,
                "Cache-Control": "no-store",
            },
        });
    } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "internal_error";
        console.error("[leads/export] Handler error:", msg);
        return NextResponse.json(
            { error: "internal_error" },
            { status: 500, headers: { "Cache-Control": "no-store" } }
        );
    }
}

/**
 * Convert array of leads to CSV string
 */
function convertToCSV(leads: Record<string, unknown>[]): string {
    if (leads.length === 0) {
        return "id,name,phone,email,message,ip_address,created_at\n";
    }

    // Define columns to export
    const columns = [
        "id",
        "name",
        "phone",
        "email",
        "message",
        "ip_address",
        "page_url_initial",
        "page_url_current",
        "created_at",
    ];

    // Header row
    const header = columns.join(",");

    // Data rows
    const rows = leads.map((lead) => {
        return columns
            .map((col) => {
                const value = lead[col];
                if (value === null || value === undefined) return "";
                // Escape quotes and wrap in quotes if contains comma or quote
                const str = String(value);
                if (str.includes(",") || str.includes('"') || str.includes("\n")) {
                    return `"${str.replace(/"/g, '""')}"`;
                }
                return str;
            })
            .join(",");
    });

    return [header, ...rows].join("\n");
}

/**
 * Get current date as string for filename
 */
function getDateString(): string {
    const now = new Date();
    return now.toISOString().split("T")[0];
}
