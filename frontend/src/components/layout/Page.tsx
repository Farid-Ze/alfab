import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function Page({ children, className, ...props }: PageProps) {
  return (
    <div {...props} className={cn("min-h-screen pt-24 pb-16", className)}>
      {children}
    </div>
  );
}
