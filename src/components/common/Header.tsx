import Link from "next/link";

import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#templates", label: "Templates" },
  { href: "/#cara-kerja", label: "Cara kerja" },
  { href: "/#open-source", label: "Open source" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-foreground-primary/10 bg-surface-base/80 text-foreground-primary backdrop-blur-xl">
      <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_1fr_auto] items-center px-spacing-7 sm:px-spacing-9 lg:px-spacing-10">
        <Link
          href="/"
          className="justify-self-start whitespace-nowrap rounded-radius-md text-base font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base sm:text-lg"
          aria-label="UMKM Cepat beranda"
        >
          UMKM Cepat
        </Link>

        <nav className="hidden items-center justify-center gap-spacing-10 text-sm leading-[21px] text-text-secondary md:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="outline-none transition-colors hover:text-foreground-primary focus-visible:text-foreground-primary">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2">
          <Button asChild size="sm" className="rounded-radius-lg bg-action-primary px-spacing-8 text-surface-warm-white hover:bg-action-primary/90 focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base">
            <Link href="/create">Mulai</Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden rounded-radius-lg border-foreground-primary/12 bg-surface-warm-white px-spacing-8 text-foreground-primary hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base sm:inline-flex">
            <Link href="/my-pages">Halaman saya</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
