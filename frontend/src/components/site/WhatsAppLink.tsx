import type { ComponentProps } from "react";

import { buildWhatsAppHref } from "@/lib/whatsapp";

type Props = ComponentProps<"a"> & {
  prefill?: string;
};

export default function WhatsAppLink({ prefill, href, ...props }: Props) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const fallbackEmail = process.env.NEXT_PUBLIC_FALLBACK_EMAIL;

  const finalHref =
    href ??
    buildWhatsAppHref({
      number,
      message: prefill,
      fallbackEmail,
    });

  return (
    <a
      {...props}
      href={finalHref}
      target="_blank"
      rel="noopener noreferrer"
    />
  );
}
