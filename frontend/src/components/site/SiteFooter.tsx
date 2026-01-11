import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <div className="space-y-2">
          <p className="font-semibold">Alfa Beauty Cosmetica</p>
          <p className="text-sm text-zinc-700">
            Professional beauty distribution for salons and barbershops in Indonesia.
          </p>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Explore</p>
          <ul className="space-y-1 text-sm text-zinc-700">
            <li>
              <Link href="/products" className="hover:underline">
                Products
              </Link>
            </li>
            <li>
              <Link href="/education" className="hover:underline">
                Education
              </Link>
            </li>
            <li>
              <Link href="/partnership" className="hover:underline">
                Partnership
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-2">
          <p className="text-sm font-semibold">Legal</p>
          <ul className="space-y-1 text-sm text-zinc-700">
            <li>
              <Link href="/privacy" className="hover:underline">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-zinc-200 py-6">
        <p className="mx-auto max-w-6xl px-4 text-xs text-zinc-600 sm:px-6">
          © {new Date().getFullYear()} Alfa Beauty Cosmetica. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
