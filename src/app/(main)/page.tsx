import Link from "next/link";

import { Button } from "@/components/ui/button";

const templates = [
  {
    name: "Kuliner rumahan",
    label: "Sambal Sore",
    tone: "Hangat",
    layout: "hero-menu",
  },
  {
    name: "Jasa lokal",
    label: "Bersih Cepat",
    tone: "Praktis",
    layout: "service",
  },
  {
    name: "Produk handmade",
    label: "Kain Tangan",
    tone: "Craft",
    layout: "catalog",
  },
  {
    name: "Kelas online",
    label: "Belajar Foto HP",
    tone: "Edu",
    layout: "course",
  },
  {
    name: "Event kecil",
    label: "Kopi Akhir Pekan",
    tone: "Event",
    layout: "event",
  },
  {
    name: "Toko katalog",
    label: "Ruang Tanaman",
    tone: "Katalog",
    layout: "shop",
  },
];

const steps = [
  {
    title: "Tulis cerita usaha",
    description: "Mulai dari kalimat biasa. Nama usaha, produk, harga, gaya bahasa, dan nomor WhatsApp sudah cukup.",
  },
  {
    title: "Pilih arah halaman",
    description: "Gunakan struktur yang cocok untuk jualan, jasa, kelas, event, atau katalog sederhana.",
  },
  {
    title: "Edit lalu bagikan",
    description: "Perbaiki copy, simpan halaman, lalu pakai link untuk bio, broadcast, atau katalog pelanggan.",
  },
];

const marks = ["PostgreSQL", "Prisma", "OpenRouter", "S3 compatible", "NextAuth", "Open source"];

function TemplatePreview({ template, index }: { template: (typeof templates)[number]; index: number }) {
  return (
    <article className="group overflow-hidden rounded-[28px] border border-foreground-primary/10 bg-surface-warm-white lovable-shadow-subtle transition duration-300 hover:-translate-y-0.5">
      <div className="aspect-[4/3] bg-surface-base p-3 sm:p-4">
        <div className="flex h-full flex-col rounded-[20px] border border-foreground-primary/10 bg-surface-warm-white p-4">
          <div className="flex items-center justify-between text-[11px] text-text-secondary">
            <span>{template.label}</span>
            <span>{template.tone}</span>
          </div>

          <div className="mt-4 grid flex-1 grid-cols-[1.1fr_0.9fr] gap-3">
            <div className="flex flex-col">
              <div className="h-8 rounded-xl bg-black/12" />
              <div className="mt-2 h-3 w-3/4 rounded-full bg-black/10" />
              <div className="mt-1.5 h-3 w-1/2 rounded-full bg-black/8" />
              <div className="mt-auto h-8 w-24 rounded-xl bg-action-primary" />
            </div>
            <div className="grid grid-rows-2 gap-2">
              <div className="rounded-2xl bg-black/10" />
              <div className="grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-black/8" />
                <div className="rounded-2xl bg-black/8" />
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-8 rounded-xl border border-foreground-primary/10 bg-surface-warm-white" />
            <div className="h-8 rounded-xl border border-foreground-primary/10 bg-surface-warm-white" />
            <div className="h-8 rounded-xl border border-foreground-primary/10 bg-surface-warm-white" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-5">
        <h3 className="font-medium tracking-tight">{template.name}</h3>
        <span className="font-mono text-xs text-text-secondary">0{index + 1}</span>
      </div>
    </article>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-surface-base text-foreground-primary">
      <section className="lovable-aurora px-4 pb-12 pt-14 sm:px-6 sm:pb-16 sm:pt-16 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
          <h1 className="max-w-5xl text-balance text-[clamp(3.6rem,9.4vw,8.25rem)] font-semibold leading-[0.86] tracking-[-0.075em]">
            Buat asdasddlanding page UMKM dengan AI
          </h1>
          <p className="mt-6 max-w-2xl text-balance text-lg leading-8 text-text-secondary sm:text-xl">
            Ceritakan usahamu. UMKM Cepat menyusun halaman promosi yang rapi, siap diedit, dan mudah dibagikan.
          </p>

          <div className="mt-8 w-full max-w-4xl rounded-[28px] border border-foreground-primary/12 bg-surface-warm-white p-2 lovable-shadow-subtle">
            <div className="grid overflow-hidden rounded-[22px] border border-foreground-primary/10 bg-surface-warm-white text-left lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-5 sm:p-6">
                <label htmlFor="hero-prompt" className="sr-only">
                  Contoh prompt usaha
                </label>
                <textarea
                  id="hero-prompt"
                  readOnly
                  value="Saya jual sambal rumahan. Buat halaman promosi yang sederhana, hangat, dan punya tombol WhatsApp."
                  className="h-28 w-full resize-none bg-transparent text-base leading-7 text-black outline-none sm:text-lg lg:h-32"
                  aria-label="Contoh prompt usaha"
                />
                <div className="flex flex-col gap-3 border-t border-foreground-primary/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-text-secondary">AI siap menyusun struktur halamanmu</span>
                  <Button asChild className="h-11 rounded-[14px] bg-action-primary px-5 text-surface-warm-white hover:bg-action-primary/90 focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm-white">
                    <Link href="/create">Buat halaman</Link>
                  </Button>
                </div>
              </div>

              <div className="border-t border-foreground-primary/10 bg-surface-warm-white/72 p-5 lg:border-l lg:border-t-0 sm:p-6">
                <p className="text-sm text-text-secondary">Preview hasil</p>
                <div className="mt-4 rounded-[18px] border border-foreground-primary/10 bg-[#f7f7f3] p-4">
                  <div className="h-4 w-28 rounded-full bg-black/14" />
                  <div className="mt-5 h-10 rounded-xl bg-black/12" />
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    <div className="h-14 rounded-xl bg-black/8" />
                    <div className="h-14 rounded-xl bg-black/8" />
                    <div className="h-14 rounded-xl bg-black/8" />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="h-3 w-24 rounded-full bg-black/10" />
                    <div className="h-8 w-20 rounded-xl bg-action-primary" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[11px] text-text-secondary">
                  <span>Hero</span>
                  <span>Produk</span>
                  <span>CTA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Teknologi dan prinsip" className="border-y border-foreground-primary/10 bg-surface-warm-white/45 px-4 py-5 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-text-secondary">
          {marks.map((mark) => (
            <span key={mark}>{mark}</span>
          ))}
        </div>
      </section>

      <section id="templates" className="scroll-mt-24 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="max-w-3xl text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Mulai dari pola halaman yang terasa nyata.
            </h2>
            <p className="max-w-sm text-base leading-7 text-text-secondary">
              Bukan skeleton kosong. Setiap pola punya arah konten untuk jenis usaha berbeda.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((template, index) => (
              <TemplatePreview key={template.name} template={template} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section id="cara-kerja" className="scroll-mt-24 px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl border-t border-foreground-primary/10 pt-14 sm:pt-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Tanpa builder rumit, tetap bisa rapi.
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {steps.map((step, index) => (
                <article key={step.title} className="border-t border-foreground-primary/10 pt-5">
                  <span className="font-mono text-xs text-text-secondary">0{index + 1}</span>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">{step.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-text-secondary">{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="open-source" className="scroll-mt-24 px-4 pb-20 sm:px-6 sm:pb-28 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 rounded-[28px] border border-foreground-primary/10 bg-surface-warm-white p-6 lovable-shadow-subtle sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm text-text-secondary">Open source untuk dikembangkan sendiri</p>
            <h2 className="text-4xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-5xl">
              Provider jelas, fondasi tetap fleksibel.
            </h2>
            <p className="mt-4 text-base leading-7 text-text-secondary">
              UMKM Cepat memakai boundary untuk AI, storage, auth, rate limit, dan queue agar mudah dipelajari, diganti, atau di-self-host.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Button asChild className="h-11 rounded-[14px] bg-action-primary px-5 text-surface-warm-white hover:bg-action-primary/90 focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm-white">
              <Link href="/create">Mulai</Link>
            </Button>
            <Button asChild variant="outline" className="h-11 rounded-[14px] border-foreground-primary/12 bg-surface-warm-white px-5 text-foreground-primary hover:bg-surface-muted focus-visible:ring-2 focus-visible:ring-action-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface-warm-white">
              <Link href="https://github.com/suryaelidanto/umkmcepat" target="_blank" rel="noreferrer">
                GitHub
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
