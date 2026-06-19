import { ArrowRight, CheckCircle2, Github, Layers, LockKeyhole, Sparkles, Store, Wand2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const benefits = [
  {
    icon: Sparkles,
    title: "AI untuk UMKM",
    description: "Ubah deskripsi usaha menjadi landing page siap pakai dengan copywriting yang jelas dan relevan.",
  },
  {
    icon: Store,
    title: "Siap jualan online",
    description: "Tampilkan produk, testimoni, kontak WhatsApp, dan informasi penting dalam satu halaman rapi.",
  },
  {
    icon: Layers,
    title: "Provider-ready",
    description: "Dibangun dengan konfigurasi yang bisa diganti: AI, storage, rate limit, dan queue punya boundary jelas.",
  },
];

const steps = [
  "Isi nama usaha dan kategori.",
  "Tambahkan deskripsi, gambar, dan kontak.",
  "AI menyusun halaman promosi yang bisa langsung dibagikan.",
];

const principles = [
  "PostgreSQL + Prisma untuk data yang tahan lama.",
  "Storage local atau S3-compatible via konfigurasi.",
  "Open-source, dokumentasi jelas, dan quality gate ketat.",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(68,147,248,0.26),_transparent_34rem)]" />
        <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
            <Image src="/logo.svg" alt="UMKM Cepat Logo" width={24} height={24} />
            <span>UMKM Cepat · AI website builder untuk jualan online</span>
          </div>

          <h1 className="max-w-5xl text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Buat landing page UMKM yang rapi, cepat, dan siap dibagikan.
          </h1>

          <p className="mt-6 max-w-2xl text-pretty text-base leading-8 text-white/70 sm:text-lg">
            UMKM Cepat membantu pemilik usaha membuat halaman promosi profesional tanpa proses teknis yang rumit. Fokus pada pesan, produk, dan pelanggan; platform mengurus struktur halaman.
          </p>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              <Link href="/create" aria-label="Mulai membuat landing page UMKM Cepat">
                Buat Landing Page
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 rounded-full border-white/15 bg-white/5 px-6 text-base text-white hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              <Link href="https://github.com/suryaelidanto/umkmcepat" target="_blank" rel="noreferrer" aria-label="Lihat source code UMKM Cepat di GitHub">
                <Github className="mr-2 h-5 w-5" aria-hidden="true" />
                Open Source
              </Link>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-sm text-white/60">
            {principles.map((item) => (
              <div key={item} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-2">
                <CheckCircle2 className="h-4 w-4 text-blue-400" aria-hidden="true" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="fitur" className="scroll-mt-24 mx-auto grid max-w-6xl gap-4 px-4 py-14 sm:px-6 lg:grid-cols-3 lg:px-8">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;
          return (
            <Card key={benefit.title} className="border-white/10 bg-white/[0.04] text-white shadow-none">
              <CardContent className="p-6">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-400/10 text-blue-300">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="text-xl font-semibold tracking-tight">{benefit.title}</h2>
                <p className="mt-3 text-sm leading-6 text-white/65">{benefit.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section id="alur" className="scroll-mt-24 border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-white/70">
              <Wand2 className="h-4 w-4 text-blue-300" aria-hidden="true" />
              Alur sederhana
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Dari ide usaha ke halaman promosi dalam beberapa langkah.
            </h2>
            <p className="mt-4 text-base leading-7 text-white/65">
              Dibuat untuk pemilik UMKM yang butuh halaman jelas, cepat, dan mudah dibagikan ke calon pelanggan.
            </p>
          </div>

          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={step} className="flex gap-4 rounded-3xl border border-white/10 bg-black/40 p-5">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-sm font-semibold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-base leading-7 text-white/75">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="open-source" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm text-white/70">
                <LockKeyhole className="h-4 w-4 text-blue-300" aria-hidden="true" />
                Dibangun untuk jangka panjang
              </div>
              <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Konfigurasi jelas sekarang, fleksibel untuk provider lain nanti.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/65">
                UMKM Cepat memakai satu sumber konfigurasi untuk provider. Hari ini sederhana; ke depan tetap siap diganti tanpa membongkar logic utama.
              </p>
            </div>
            <Button asChild size="lg" className="h-12 rounded-full px-6 text-base focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black">
              <Link href="/create">
                Mulai Sekarang
                <ArrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
