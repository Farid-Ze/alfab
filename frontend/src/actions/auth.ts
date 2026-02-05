"use server";

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";

/**
 * Create Supabase server client for auth operations
 */
function createClient() {
    const url = env.NEXT_PUBLIC_SUPABASE_URL;
    const key = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!url || !key) {
        throw new Error("Missing Supabase configuration for auth");
    }

    const cookieStore = cookies();

    return createServerClient(url, key, {
        cookies: {
            async getAll() {
                return (await cookieStore).getAll();
            },
            async setAll(cookiesToSet) {
                const store = await cookieStore;
                cookiesToSet.forEach(({ name, value, options }) => {
                    store.set(name, value, options);
                });
            },
        },
    });
}

/**
 * Login with email and password
 */
export async function loginAction(formData: FormData) {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
        return { error: "Email dan password wajib diisi" };
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return { error: "Email atau password salah" };
    }

    redirect("/admin");
}

/**
 * Logout
 */
export async function logoutAction() {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
}

/**
 * Get current session (for server components)
 */
export async function getSession() {
    const supabase = createClient();
    const { data: { session } } = await supabase.auth.getSession();
    return session;
}

/**
 * Check if user is authenticated, redirect to login if not
 */
export async function requireAuth() {
    const session = await getSession();
    if (!session) {
        redirect("/admin/login");
    }
    return session;
}
