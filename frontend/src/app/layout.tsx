/**
 * Root Layout (Shell)
 * 
 * Minimal root layout - the actual html/body rendering happens in [locale]/layout.tsx
 * This file exists as required by Next.js App Router structure
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
