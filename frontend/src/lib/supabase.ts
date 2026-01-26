import { createClient, SupabaseClient } from "@supabase/supabase-js";

/**
 * Supabase Client Configuration
 * 
 * Build-time safety: Returns null/placeholder when env vars are missing
 * to prevent build failures. Runtime calls will throw if unconfigured.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

// Client for public access (auth, realtime, public schemas)
// Only create if URL and key are available
let _supabaseClient: SupabaseClient | null = null;

export const supabase = (): SupabaseClient => {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error("Missing Supabase client config (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY)");
    }
    if (!_supabaseClient) {
        _supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    return _supabaseClient;
};

/**
 * Service Role Client (SERVER-SIDE ONLY)
 * Use this for admin tasks like writing to protected tables (leads)
 * or triggering emails without RLS policies getting in the way.
 *
 * SECURITY: NEVER expose this to the client.
 */
let _supabaseAdminClient: SupabaseClient | null = null;

export const supabaseAdmin = (): SupabaseClient => {
    if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
        throw new Error(
            "Missing Supabase admin keys (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)"
        );
    }

    if (!_supabaseAdminClient) {
        _supabaseAdminClient = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY, {
            auth: {
                autoRefreshToken: false,
                persistSession: false,
            },
        });
    }

    return _supabaseAdminClient;
};

/**
 * Check if Supabase is configured (for conditional usage)
 */
export const isSupabaseConfigured = (): boolean => {
    return Boolean(SUPABASE_URL && SUPABASE_SERVICE_KEY);
};
