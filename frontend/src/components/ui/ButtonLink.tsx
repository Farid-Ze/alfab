import Link from "next/link";

import { getButtonClassName, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";

export default function ButtonLink({
  href,
  children,
  className = "",
  variant = "primary",
  size = "md",
  prefetch,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  prefetch?: boolean;
}) {
  return (
    <Link href={href} prefetch={prefetch} className={getButtonClassName({ variant, size, className })}>
      {children}
    </Link>
  );
}
