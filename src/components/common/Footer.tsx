import { Coffee, Github, Linkedin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#fitur", label: "Fitur" },
  { href: "/#alur", label: "Alur" },
  { href: "/#open-source", label: "Open Source" },
];

const socialLinks = [
  {
    href: "https://github.com/suryaelidanto/umkmcepat",
    label: "GitHub",
    icon: Github,
  },
  {
    href: "https://www.linkedin.com/in/cintarasuryaelidanto/",
    label: "LinkedIn",
    icon: Linkedin,
  },
  {
    href: "http://support.umkmcepat.com/",
    label: "Support",
    icon: Coffee,
  },
];

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              aria-label="UMKM Cepat beranda"
            >
              <Image src="/logo.svg" alt="" width={28} height={28} />
              <span className="font-semibold tracking-tight">UMKM Cepat</span>
            </Link>
            <p className="mt-4 text-sm leading-6 text-white/60">
              AI landing page builder open-source untuk membantu UMKM membuat halaman promosi yang rapi dan cepat dibagikan.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/65" aria-label="Navigasi footer">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} UMKM Cepat. Built for umkmcepat.com.</p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
