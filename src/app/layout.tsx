import { Plus_Jakarta_Sans } from "next/font/google";
import { headers } from "next/headers";

import { AppProviders } from "@/components/providers/AppProviders";
import { Toaster } from "@/components/ui/sonner";
import { redis } from "@/lib/redis";
import { cn } from "@/lib/utils";

import type { Metadata } from "next";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "UMKM Cepat - AI Website untuk UMKM",
  description:
    "Buat website promosi untuk UMKM dari cerita usahamu dalam bahasa Indonesia.",
  openGraph: {
    title: "UMKM Cepat - AI Builder untuk UMKM",
    description:
      "Buat website promosi untuk UMKM dari cerita usahamu dalam bahasa Indonesia.",
    url: "https://umkmcepat.com",
    siteName: "UMKM Cepat",
    images: [
      {
        url: "https://umkmcepat.com/logo.svg",
        alt: "Logo UMKM Cepat",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Cek apakah IP pengguna sedang diblokir
  const headerStore = await headers();
  const ip = headerStore.get("x-forwarded-for") || "127.0.0.1";
  const realIp = ip.split(",")[0].trim();

  let isBanned = false;
  try {
    const bannedStatus = await redis.get(`banned_ip:${realIp}`);
    if (bannedStatus) {
      isBanned = true;
    }
  } catch (error) {
    console.error("Redis Check Error:", error);
  }

  if (isBanned) {
    return (
      <html lang="id">
        <body className="flex min-h-screen flex-col items-center justify-center bg-black p-4 text-center font-sans antialiased">
          <div className="rounded-3xl border border-red-500/20 bg-red-950/30 p-8 shadow-2xl backdrop-blur-xl">
            <h1 className="text-4xl font-bold tracking-tight text-red-500 md:text-5xl">
              Akses Ditolak
            </h1>
            <p className="mx-auto mt-6 max-w-lg text-lg text-red-200/80">
              Alamat IP Anda telah <strong>diblokir sementara (24 Jam)</strong>{" "}
              karena sistem kami mendeteksi permintaan pembuatan website yang
              melanggar kebijakan (Perjudian, Pornografi, atau Konten Ilegal).
            </p>
          </div>
        </body>
      </html>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "UMKM Cepat",
    url: "https://umkmcepat.com",
    description: "AI Builder khusus untuk UMKM di Indonesia",
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "min-h-screen bg-surface-warm-white font-sans antialiased",
          plusJakartaSans.variable,
        )}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <AppProviders>{children}</AppProviders>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
