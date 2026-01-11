import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About PT Alfa Beauty Cosmetica.",
};

export default function AboutPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-semibold tracking-tight">About</h1>
      <p className="text-zinc-700 leading-7">
        PT Alfa Beauty is a professional beauty distribution company dedicated to providing products,
        education, and technical support for salons and barbershops in Indonesia. We represent carefully
        selected international brands and work as a strategic partner to professionals.
      </p>
    </div>
  );
}
