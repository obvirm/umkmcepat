import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo Lab Finalists | UMKM Cepat",
  description: "Top 5 final logo candidates for UMKM Cepat after iterative curation.",
};

type Finalist = {
  rank: number;
  name: string;
  reason: string;
  svg: string;
};

const finalists: Finalist[] = [
  {
    rank: 1,
    name: "Open U Gateway",
    reason: "Paling kuat karena U terbaca sebagai gerbang digital, simetris, favicon-safe, dan punya makna UMKM naik kelas tanpa terlihat seperti icon generik.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 128 128" role="img" aria-label="Open U Gateway"><rect width="128" height="128" rx="32" fill="#fcfbf8"/><path d="M32 36v39c0 20 13 34 32 34s32-14 32-34V36H82v39c0 12-7 20-18 20s-18-8-18-20V36H32Z" fill="#1c1c1c"/><path d="M55 36h18v43c0 5-4 9-9 9s-9-4-9-9V36Z" fill="#fcfbf8"/><path d="M64 46v27" stroke="#d97706" stroke-width="8" stroke-linecap="round"/><path d="M52 58l12-12 12 12" fill="none" stroke="#d97706" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    rank: 2,
    name: "UC Hidden Path",
    reason: "UC tersembunyi membuatnya ownable sebagai brand, bentuknya stabil, dan jalur tengah memberi rasa cepat tanpa petir atau gimmick AI.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 128 128" role="img" aria-label="UC Hidden Path"><rect width="128" height="128" rx="32" fill="#f7f3ea"/><path d="M30 36v38c0 22 14 36 34 36h4V96h-4c-12 0-20-8-20-22V36H30Z" fill="#12372a"/><path d="M98 36H66c-20 0-34 14-34 36s14 36 34 36h32V94H66c-12 0-20-9-20-22s8-22 20-22h32V36Z" fill="#12372a"/><path d="M62 64h30" stroke="#16a34a" stroke-width="10" stroke-linecap="round"/><circle cx="92" cy="64" r="6" fill="#16a34a"/></svg>`,
  },
  {
    rank: 3,
    name: "Page Door Mark",
    reason: "Paling relevan ke produk karena menggabungkan halaman dan pintu usaha online dalam satu bentuk yang bersih dan mudah dipakai lintas media.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 128 128" role="img" aria-label="Page Door Mark"><rect width="128" height="128" rx="32" fill="#f8fafc"/><path d="M34 24h60v80H34V24Z" fill="#172554"/><path d="M70 24l24 24H70V24Z" fill="#2563eb"/><path d="M48 104V67c0-10 7-17 16-17s16 7 16 17v37H66V68c0-2-1-4-2-4s-2 2-2 4v36H48Z" fill="#f8fafc"/><path d="M48 40h16" stroke="#f8fafc" stroke-width="8" stroke-linecap="round"/></svg>`,
  },
  {
    rank: 4,
    name: "Modular Market U",
    reason: "Empat modul terasa seperti banyak UMKM dalam satu platform, tetap simetris, simple, dan punya siluet kuat untuk favicon kecil.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 128 128" role="img" aria-label="Modular Market U"><rect width="128" height="128" rx="32" fill="#fbf7ff"/><rect x="28" y="28" width="28" height="28" rx="10" fill="#2b1742"/><rect x="72" y="28" width="28" height="28" rx="10" fill="#2b1742"/><rect x="28" y="72" width="28" height="28" rx="10" fill="#2b1742"/><rect x="72" y="72" width="28" height="28" rx="10" fill="#2b1742"/><path d="M42 42v26c0 14 9 24 22 24s22-10 22-24V42" fill="none" stroke="#fbf7ff" stroke-width="10" stroke-linecap="round"/><circle cx="64" cy="64" r="7" fill="#7c3aed"/></svg>`,
  },
  {
    rank: 5,
    name: "Verified Local Page",
    reason: "Masuk top lima karena membawa rasa trust dan publish-ready, walau sedikit lebih fungsional dibanding empat kandidat di atas.",
    svg: `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 128 128" role="img" aria-label="Verified Local Page"><rect width="128" height="128" rx="32" fill="#fff7ed"/><rect x="34" y="24" width="60" height="80" rx="18" fill="#3b2417"/><path d="M50 60l10 10 20-24" fill="none" stroke="#fff7ed" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/><path d="M50 88h28" stroke="#fff7ed" stroke-width="8" stroke-linecap="round"/><circle cx="88" cy="34" r="9" fill="#ea580c"/></svg>`,
  },
];

const iterations = [
  "Gen 1: 100 broad icons dibuat, lalu mayoritas dieliminasi karena terlalu literal seperti icon library.",
  "Gen 2: 40 text/monogram ideas diuji, lalu dieliminasi karena banyak yang cuma wordmark biasa.",
  "Gen 3: 25 geometric concepts diuji dengan aturan simetri, safe zone, dan monochrome-first.",
  "Gen 4: 10 finalist concepts dipadatkan, lalu dipilih 5 yang paling kuat sebagai brand jangka panjang.",
];

function dataUri(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export default function LogoLabPage() {
  return (
    <div className="min-h-screen bg-surface-base px-4 py-10 text-foreground-primary sm:px-6 lg:px-spacing-10">
      <section className="mx-auto max-w-7xl">
        <div className="rounded-radius-3xl border border-foreground-primary/10 bg-surface-warm-white p-spacing-9 lovable-shadow-subtle sm:p-spacing-10">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-text-secondary">Logo Lab Final</p>
          <h1 className="mt-3 max-w-4xl text-balance text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
            Top 5 logo UMKM Cepat setelah iterasi kurasi
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-text-secondary sm:text-lg">
            Dipilih dengan prinsip: simetris, favicon-first, monochrome kuat, tidak literal, tidak trend-driven, dan cocok dipakai 10 tahun.
          </p>
        </div>

        <div className="mt-8 grid gap-spacing-7 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-radius-3xl border border-foreground-primary/10 bg-surface-warm-white p-spacing-8 lovable-shadow-subtle">
            <h2 className="text-xl font-semibold tracking-tight">Iterasi eliminasi</h2>
            <ol className="mt-5 space-y-4 text-sm leading-6 text-text-secondary">
              {iterations.map((item) => (
                <li key={item} className="rounded-radius-xl bg-surface-base p-4">{item}</li>
              ))}
            </ol>
          </div>

          <div className="grid gap-spacing-7 sm:grid-cols-2 xl:grid-cols-3">
            {finalists.map((logo) => (
              <article key={logo.rank} className="rounded-radius-3xl border border-foreground-primary/10 bg-surface-warm-white p-4 lovable-shadow-subtle">
                <div className="grid gap-3">
                  <div className="flex aspect-square items-center justify-center rounded-radius-2xl bg-surface-base p-spacing-9">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={dataUri(logo.svg)} alt={logo.name} className="h-full w-full" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 rounded-radius-xl bg-surface-base p-2">
                    {[16, 32, 64].map((size) => (
                      <div key={size} className="flex flex-col items-center gap-1 text-[10px] text-text-secondary">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={dataUri(logo.svg)} alt="" style={{ width: size, height: size }} />
                        <span>{size}px</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 rounded-radius-xl bg-surface-base p-2">
                    <div className="h-8 w-8 shrink-0 overflow-hidden rounded-radius-md">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={dataUri(logo.svg)} alt="" className="h-full w-full" />
                    </div>
                    <span className="text-sm font-semibold tracking-tight">UMKM Cepat</span>
                  </div>
                </div>

                <div className="mt-4 flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-medium">{logo.name}</h2>
                    <p className="mt-1 font-mono text-xs text-text-secondary">Rank #{String(logo.rank).padStart(3, "0")}</p>
                    <p className="mt-2 max-w-52 text-xs leading-5 text-text-secondary">{logo.reason}</p>
                  </div>
                  <a
                    href={dataUri(logo.svg)}
                    download={`umkmcepat-final-logo-${String(logo.rank).padStart(3, "0")}.svg`}
                    className="rounded-full border border-foreground-primary/10 px-3 py-1.5 text-xs font-medium transition hover:bg-foreground-primary hover:text-surface-warm-white"
                  >
                    Download
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
