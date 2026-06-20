import Link from "next/link";

const links = [
  { href: "/#templates", label: "Templates" },
  { href: "/#cara-kerja", label: "Cara kerja" },
  { href: "/#open-source", label: "Open source" },
  { href: "https://github.com/suryaelidanto/umkmcepat", label: "GitHub", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-foreground-primary/10 bg-surface-base text-foreground-primary">
      <div className="mx-auto flex max-w-7xl flex-col gap-spacing-10 px-4 py-10 sm:px-6 lg:px-spacing-10">
        <div className="flex flex-col gap-spacing-9 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="rounded-radius-lg text-lg font-semibold tracking-tight outline-none focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-base">
              UMKM Cepat
            </Link>
            <p className="mt-2 max-w-md text-sm leading-6 text-text-secondary">
              Buat landing page promosi untuk usaha kecil dengan bantuan AI.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-text-secondary" aria-label="Navigasi footer">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="outline-none transition-colors hover:text-foreground-primary focus-visible:text-foreground-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <p className="border-t border-foreground-primary/10 pt-6 text-sm text-text-secondary">
          © {new Date().getFullYear()} UMKM Cepat. umkmcepat.com
        </p>
      </div>
    </footer>
  );
}
