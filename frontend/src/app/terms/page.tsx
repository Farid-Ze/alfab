import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms and conditions.",
};

export default function TermsPage() {
  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Terms</h1>
      <p className="text-zinc-700">
        Placeholder copy is acceptable for Paket A as long as the structure is present and links are not
        broken. Replace this with your approved terms before launch.
      </p>
    </div>
  );
}
