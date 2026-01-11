import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-zinc-700">
        The page you’re looking for doesn’t exist. Please use the navigation or go back home.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-5 text-sm font-semibold text-white hover:bg-zinc-800"
      >
        Back to Home
      </Link>
    </div>
  );
}
