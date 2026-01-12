import type { ReactNode } from "react";

export default function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`border border-zinc-200 bg-white ${className}`.trim()}>
      {children}
    </div>
  );
}
