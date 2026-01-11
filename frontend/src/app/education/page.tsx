import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Education",
  description: "Training and events highlights for salon and barbershop professionals.",
};

export default function EducationPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Education & Events</h1>
        <p className="text-zinc-700">
          We support professionals with education and technical knowledge. Upcoming trainings and events
          will be listed here.
        </p>
      </header>

      <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
        <p className="text-sm text-zinc-700">
          This section is intentionally lightweight in Paket A (showcase, not an LMS). If you’d like to
          request training or product education, contact us via WhatsApp.
        </p>
      </div>
    </div>
  );
}
