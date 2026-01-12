import type { ReactNode } from "react";

export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[80rem] px-4 sm:px-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
