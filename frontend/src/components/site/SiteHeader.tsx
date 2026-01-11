import Link from "next/link";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/education", label: "Education" },
  { href: "/partnership", label: "Partnership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-semibold tracking-tight">
          Alfa Beauty
        </Link>
        <nav className="hidden gap-6 text-sm text-zinc-700 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-zinc-950 hover:underline">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/partnership/become-partner"
            className="inline-flex h-9 items-center justify-center rounded-full bg-zinc-900 px-4 text-xs font-semibold text-white hover:bg-zinc-800"
          >
            Become Partner
          </Link>
        </div>
      </div>
    </header>
  );
}
