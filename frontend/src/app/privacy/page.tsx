import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy.",
};

export default function PrivacyPage() {
  return (
    <div className="space-y-4 max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">Privacy Policy</h1>
      <p className="text-zinc-700">
        Placeholder copy is acceptable for Paket A as long as the structure is present and links are not
        broken. Replace this with your approved privacy policy before launch.
      </p>
    </div>
  );
}
