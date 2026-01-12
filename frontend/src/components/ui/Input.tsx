import type { InputHTMLAttributes } from "react";

const base =
  "block border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-950 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

export default function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} rounded-[2px] ${className}`.trim()} />;
}
