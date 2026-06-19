import { Github, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { AuthButton } from "@/components/auth/AuthComponents";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#fitur", label: "Fitur" },
  { href: "/#alur", label: "Alur" },
  { href: "/#open-source", label: "Open Source" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 text-white backdrop-blur-xl supports-[backdrop-filter]:bg-black/65">
      <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mr-6 flex items-center gap-2 rounded-full outline-none transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label="UMKM Cepat beranda"
        >
          <Image src="/logo.svg" alt="" width={28} height={28} priority />
          <span className="font-semibold tracking-tight">UMKM Cepat</span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/65 md:flex" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden rounded-full text-white/75 hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:inline-flex">
            <Link href="https://github.com/suryaelidanto/umkmcepat" target="_blank" rel="noreferrer" aria-label="Source code UMKM Cepat di GitHub">
              <Github className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>

          <Button asChild size="sm" className="rounded-full px-4 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
            <Link href="/create">
              <Sparkles className="h-4 w-4 sm:mr-1" aria-hidden="true" />
              <span className="hidden sm:inline">Buat Halaman</span>
            </Link>
          </Button>

          <AuthButton />
        </div>
      </div>
    </header>
  );
}
