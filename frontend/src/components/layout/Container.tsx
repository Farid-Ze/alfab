import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerSize = "default" | "narrow" | "wide";

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: ContainerSize;
};

const sizeClass: Record<ContainerSize, string> = {
  default: "",
  narrow: "max-w-3xl",
  wide: "max-w-[80rem]",
};

export default function Container({
  children,
  size = "default",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={cn("container mx-auto px-6 lg:px-12", sizeClass[size], className)}
    >
      {children}
    </div>
  );
}
