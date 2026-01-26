/**
 * Email Notification Utility
 * 
 * Sends lead notification emails via SMTP or compatible service.
 * Configured via environment variables.
 * 
 * See Paket A §9 DoD: Email notifikasi terkirim ke inbox internal
 */

type LeadRecord = Record<string, unknown>;

const SMTP_ENABLED = process.env.SMTP_ENABLED === "true";
const SMTP_HOST = process.env.SMTP_HOST || "";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || "noreply@alfabeautycosmetica.com";
const SMTP_TO = process.env.SMTP_TO || "";

/**
 * Simple email sender using fetch to a compatible SMTP relay or email API
 * For production, use nodemailer or a service like Resend/SendGrid
 */
export async function sendLeadNotification(lead: LeadRecord): Promise<void> {
    if (!SMTP_ENABLED) {
        console.log("[email] SMTP not enabled, skipping notification");
        return;
    }

    if (!SMTP_TO) {
        console.warn("[email] No recipient configured (SMTP_TO is empty)");
        return;
    }

    const subject = `New Lead: ${lead.name || "Unknown"}`;
    const body = formatLeadEmail(lead);

    // For now, log the email content (replace with actual SMTP implementation)
    // In production, use nodemailer:
    // 
    // import nodemailer from 'nodemailer';
    // const transporter = nodemailer.createTransport({
    //   host: SMTP_HOST,
    //   port: SMTP_PORT,
    //   secure: SMTP_PORT === 465,
    //   auth: { user: SMTP_USER, pass: SMTP_PASS }
    // });
    // await transporter.sendMail({ from: SMTP_FROM, to: SMTP_TO, subject, text: body });

    console.log("[email] Would send notification:", {
        from: SMTP_FROM,
        to: SMTP_TO,
        subject,
        host: SMTP_HOST,
        port: SMTP_PORT,
    });

    // Simulate async operation for API compatibility
    await Promise.resolve();

    console.log("[email] Lead notification logged (SMTP implementation pending)");
}

/**
 * Format lead data into email body
 */
function formatLeadEmail(lead: LeadRecord): string {
    const lines: string[] = [
        "=== New Lead Notification ===",
        "",
        `Name: ${lead.name || "-"}`,
        `Phone: ${lead.phone || "-"}`,
        `Email: ${lead.email || "-"}`,
        `Message: ${lead.message || "-"}`,
        "",
        "--- Additional Info ---",
        `IP: ${lead.ip_address || "-"}`,
        `Source: ${lead.page_url_current || "-"}`,
        `Initial Page: ${lead.page_url_initial || "-"}`,
        "",
        "--- Raw Data ---",
        JSON.stringify(lead.raw, null, 2),
    ];

    return lines.join("\n");
}
