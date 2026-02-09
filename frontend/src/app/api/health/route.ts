import { NextResponse } from "next/server";

/**
 * Health Check Endpoint
 * 
 * Returns 200 OK with system information for:
 * - Uptime monitoring (UptimeRobot, Pingdom, etc.)
 * - Load balancer health checks
 * - Kubernetes liveness/readiness probes
 * - Vercel deployment verification
 */

interface HealthCheck {
    status: "healthy" | "degraded" | "unhealthy";
    timestamp: string;
    version: string;
    environment: string;
    uptime: number;
    checks: {
        name: string;
        status: "pass" | "fail";
        message?: string;
    }[];
}

// Track server start time
const startTime = Date.now();

export async function GET(): Promise<NextResponse<HealthCheck>> {
    const checks: HealthCheck["checks"] = [];

    // Check 1: Environment variables
    const hasRequiredEnv = Boolean(process.env.NODE_ENV);
    checks.push({
        name: "environment",
        status: hasRequiredEnv ? "pass" : "fail",
        message: hasRequiredEnv ? undefined : "Missing NODE_ENV",
    });

    // Check 2: Memory usage (warning if > 80%)
    const memoryUsage = process.memoryUsage();
    const heapUsedPercent = (memoryUsage.heapUsed / memoryUsage.heapTotal) * 100;
    checks.push({
        name: "memory",
        status: heapUsedPercent < 80 ? "pass" : "fail",
        message: `Heap: ${heapUsedPercent.toFixed(1)}%`,
    });

    // Determine overall status
    const allPass = checks.every((c) => c.status === "pass");
    const status: HealthCheck["status"] = allPass ? "healthy" : "degraded";

    const response: HealthCheck = {
        status,
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || "1.0.0",
        environment: process.env.NODE_ENV || "development",
        uptime: Math.floor((Date.now() - startTime) / 1000),
        checks,
    };

    // Return appropriate status code
    const statusCode = status === "healthy" ? 200 : 503;

    return NextResponse.json(response, { status: statusCode });
}

// Also support HEAD for simple ping checks
export async function HEAD(): Promise<NextResponse> {
    return new NextResponse(null, { status: 200 });
}
