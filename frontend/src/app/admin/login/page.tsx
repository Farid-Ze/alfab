"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(formData: FormData) {
        setError(null);

        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            setError("Email dan password wajib diisi");
            return;
        }

        startTransition(async () => {
            try {
                const { loginAction } = await import("@/actions/auth");
                const result = await loginAction(formData);

                if (result?.error) {
                    setError(result.error);
                }
                // If successful, loginAction will redirect to /admin
            } catch {
                setError("Terjadi kesalahan. Silakan coba lagi.");
            }
        });
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center pad-content">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-content">
                    <h1 className="type-admin-h1">Alfa CMS</h1>
                    <p className="text-muted mt-2">Login untuk manage konten</p>
                </div>

                {/* Login Form */}
                <div className="bg-surface border border-border rounded-2xl pad-content-lg shadow-lg">
                    <form action={handleSubmit} className="space-y-content-sm">
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                                {error}
                            </div>
                        )}

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                className="ui-input focus:ring-2 focus:ring-accent focus:border-transparent"
                                placeholder="admin@example.com"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-foreground mb-2"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                className="ui-input focus:ring-2 focus:ring-accent focus:border-transparent"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full py-3 px-4 bg-accent text-accent-foreground type-ui-strong rounded-lg hover:bg-accent/90 ui-focus-ring transition-all-elegant disabled:opacity-50"
                        >
                            {isPending ? "Loading..." : "Login"}
                        </button>
                    </form>
                </div>

                {/* Back Link */}
                <p className="text-center mt-6 text-muted text-sm">
                    <Link href="/" className="hover:text-foreground transition-colors">
                        ← Kembali ke website
                    </Link>
                </p>
            </div>
        </div>
    );
}
