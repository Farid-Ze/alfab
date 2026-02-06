import { NextResponse } from "next/server";
import { z, ZodError, ZodSchema } from "zod";

/**
 * API Utilities
 * 
 * Standardized API response format and helpers for:
 * - Consistent success/error responses
 * - Request validation with Zod
 * - Error handling wrapper
 */

// Standard API response types
export interface ApiSuccessResponse<T> {
    success: true;
    data: T;
    meta?: {
        timestamp: string;
        requestId?: string;
    };
}

export interface ApiErrorResponse {
    success: false;
    error: {
        code: string;
        message: string;
        details?: unknown;
    };
    meta?: {
        timestamp: string;
        requestId?: string;
    };
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Create successful API response
 */
export function successResponse<T>(
    data: T,
    status: number = 200,
    requestId?: string
): NextResponse<ApiSuccessResponse<T>> {
    return NextResponse.json(
        {
            success: true,
            data,
            meta: {
                timestamp: new Date().toISOString(),
                requestId,
            },
        },
        { status }
    );
}

/**
 * Create error API response
 */
export function errorResponse(
    code: string,
    message: string,
    status: number = 400,
    details?: unknown,
    requestId?: string
): NextResponse<ApiErrorResponse> {
    return NextResponse.json(
        {
            success: false,
            error: {
                code,
                message,
                details,
            },
            meta: {
                timestamp: new Date().toISOString(),
                requestId,
            },
        },
        { status }
    );
}

/**
 * Validate request body with Zod schema
 */
export async function validateBody<T>(
    request: Request,
    schema: ZodSchema<T>
): Promise<{ data: T; error: null } | { data: null; error: NextResponse<ApiErrorResponse> }> {
    try {
        const body = await request.json();
        const data = schema.parse(body);
        return { data, error: null };
    } catch (err) {
        if (err instanceof ZodError) {
            const zodErr = err as ZodError<T>;
            return {
                data: null,
                error: errorResponse(
                    "VALIDATION_ERROR",
                    "Invalid request body",
                    400,
                    zodErr.issues.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message,
                    }))
                ),
            };
        }

        if (err instanceof SyntaxError) {
            return {
                data: null,
                error: errorResponse("PARSE_ERROR", "Invalid JSON body", 400),
            };
        }

        return {
            data: null,
            error: errorResponse("UNKNOWN_ERROR", "An error occurred", 500),
        };
    }
}

/**
 * Common error codes
 */
export const ErrorCodes = {
    VALIDATION_ERROR: "VALIDATION_ERROR",
    NOT_FOUND: "NOT_FOUND",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    RATE_LIMITED: "RATE_LIMITED",
    INTERNAL_ERROR: "INTERNAL_ERROR",
} as const;

/**
 * Generate unique request ID
 */
export function generateRequestId(): string {
    return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`;
}
