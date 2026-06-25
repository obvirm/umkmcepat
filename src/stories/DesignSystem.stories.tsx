import { useState } from "react";

import { LoginConsentDialog } from "@/components/common/LoginConsentDialog";
import { ProjectList } from "@/components/projects/ProjectList";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  title: "UMKM Cepat/Design System",
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Foundations: Story = {
  render: () => (
    <DesignFrame
      title="Foundations"
      subtitle="Tokens from DESIGN.md, loaded through app CSS."
    >
      <section className="grid gap-spacing-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-radius-3xl bg-surface-warm-white p-spacing-9">
          <p className="text-sm font-medium text-text-secondary">Typography</p>
          <div className="mt-spacing-6 space-y-spacing-5 text-foreground-primary">
            <h1 className="text-[60px] font-[480] leading-[60px] tracking-[-0.05em]">
              Buat website usahamu.
            </h1>
            <h2 className="text-4xl font-semibold leading-tight tracking-[-0.04em]">
              Website UMKM yang rapi, cepat, dan jelas.
            </h2>
            <p className="max-w-xl text-lg leading-7 text-text-secondary">
              Pakai Plus Jakarta Sans, warna hangat, radius besar, dan satu aksi
              utama per area.
            </p>
            <p className="text-sm font-medium">Label emphasis</p>
          </div>
        </div>

        <div className="grid gap-spacing-5 sm:grid-cols-2">
          {colorTokens.map((token) => (
            <div
              key={token.name}
              className="rounded-radius-2xl border border-foreground-primary/10 bg-surface-warm-white p-spacing-5"
            >
              <div
                className="h-24 rounded-radius-xl border border-foreground-primary/10"
                style={{ backgroundColor: token.value }}
              />
              <p className="mt-spacing-4 font-medium">{token.name}</p>
              <p className="text-sm text-text-secondary">{token.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-spacing-5 rounded-radius-3xl bg-surface-warm-white p-spacing-9 md:grid-cols-4">
        {radiusTokens.map((token) => (
          <div key={token.name}>
            <div
              className="h-24 border border-foreground-primary/12 bg-surface-muted"
              style={{ borderRadius: token.value }}
            />
            <p className="mt-spacing-3 text-sm font-medium">{token.name}</p>
            <p className="text-xs text-text-secondary">{token.value}</p>
          </div>
        ))}
      </section>
    </DesignFrame>
  ),
};

export const ButtonsAndSurfaces: Story = {
  render: () => (
    <DesignFrame
      title="Buttons & surfaces"
      subtitle="Primary action is near-black. Depth comes from borders, not heavy shadows."
    >
      <section className="grid gap-spacing-7 rounded-radius-3xl bg-surface-warm-white p-spacing-9 md:grid-cols-2">
        <div className="space-y-spacing-5">
          <p className="text-sm font-medium text-text-secondary">
            Button variants
          </p>
          <div className="flex flex-wrap gap-spacing-4">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
        <div className="grid gap-spacing-4">
          <div className="rounded-radius-lg border border-foreground-primary/10 bg-surface-warm-white p-spacing-6">
            radius-lg input/button surface
          </div>
          <div className="rounded-radius-2xl border border-foreground-primary/10 bg-surface-muted p-spacing-6">
            radius-2xl muted card
          </div>
          <div className="rounded-radius-3xl border border-foreground-primary/10 bg-[#151515] p-spacing-6 text-surface-warm-white">
            dark workspace card
          </div>
        </div>
      </section>
    </DesignFrame>
  ),
};

export const DialogsAndLogin: Story = {
  render: () => <DialogGallery />,
};

export const ProductDarkSurfaces: Story = {
  parameters: {
    backgrounds: { default: "Dark workspace" },
  },
  render: () => (
    <DarkFrame
      title="Product dark surfaces"
      subtitle="Used by profile, project list, and workspace. Same warm font, restrained borders."
    >
      <section className="grid gap-spacing-7 lg:grid-cols-[0.85fr_1.15fr]">
        <article className="rounded-radius-3xl border border-surface-warm-white/10 bg-surface-warm-white/[0.055] p-spacing-8">
          <div className="flex items-center gap-spacing-6">
            <div className="grid size-24 place-items-center overflow-hidden rounded-full border border-surface-warm-white/12 bg-surface-warm-white/8 text-3xl font-semibold">
              S
            </div>
            <div>
              <p className="text-sm text-surface-warm-white/58">Profil</p>
              <h3 className="mt-spacing-2 text-2xl font-semibold tracking-[-0.04em]">
                Surya Elidanto
              </h3>
              <p className="mt-spacing-2 text-sm text-surface-warm-white/58">
                Avatar full-bleed circle, no white shell.
              </p>
            </div>
          </div>
          <label className="mt-spacing-8 block text-sm font-medium">Nama</label>
          <input
            value="Surya Elidanto"
            readOnly
            className="mt-spacing-3 w-full rounded-radius-lg border border-surface-warm-white/10 bg-[#1b1b19] px-spacing-6 py-spacing-5 text-surface-warm-white outline-none"
          />
          <div className="mt-spacing-7 flex justify-end">
            <Button className="bg-surface-warm-white text-foreground-primary hover:bg-surface-warm-white/86">
              Simpan profil
            </Button>
          </div>
        </article>

        <ProjectList
          projects={mockProjects}
          deleteProject={async () => undefined}
        />
      </section>
    </DarkFrame>
  ),
};

export const WorkspaceStates: Story = {
  parameters: {
    backgrounds: { default: "Dark workspace" },
  },
  render: () => (
    <DarkFrame
      title="Workspace states"
      subtitle="Chat-first builder: guided cards, compact busy state, code/preview shell."
    >
      <section className="grid min-h-[42rem] overflow-hidden rounded-[30px] border border-surface-warm-white/10 bg-[#1a1a18] lg:grid-cols-[minmax(320px,0.42fr)_1fr]">
        <aside className="flex flex-col border-r border-surface-warm-white/10 bg-[#151515]">
          <div className="border-b border-surface-warm-white/10 p-spacing-6">
            <p className="text-xs uppercase tracking-[0.18em] text-surface-warm-white/40">
              Diskusi
            </p>
            <h3 className="mt-spacing-3 text-xl font-semibold tracking-[-0.04em]">
              Landing page kopi rumahan
            </h3>
          </div>
          <div className="flex-1 space-y-spacing-5 overflow-hidden p-spacing-6">
            <div className="max-w-[88%] rounded-radius-2xl bg-surface-warm-white/8 px-spacing-5 py-spacing-4 text-sm leading-6 text-surface-warm-white/78">
              Saya jual kopi susu rumahan dan ingin pelanggan pesan lewat
              WhatsApp.
            </div>
            <div className="ml-auto max-w-[88%] rounded-radius-2xl bg-surface-warm-white px-spacing-5 py-spacing-4 text-sm leading-6 text-foreground-primary">
              Aku bantu rapikan dulu. Target pelanggan utamanya siapa?
            </div>
            <QuestionCard />
          </div>
          <div className="border-t border-surface-warm-white/10 p-spacing-5">
            <div className="rounded-radius-2xl border border-surface-warm-white/12 bg-surface-warm-white/[0.055] p-spacing-4">
              <p className="text-sm text-surface-warm-white/58">
                AI sedang menyusun brief...
              </p>
              <div className="mt-spacing-4 h-2 overflow-hidden rounded-full bg-surface-warm-white/8">
                <div className="h-full w-2/3 rounded-full bg-surface-warm-white/72" />
              </div>
            </div>
          </div>
        </aside>

        <main className="flex flex-col bg-[#20201e]">
          <div className="flex items-center justify-between border-b border-surface-warm-white/10 p-spacing-5">
            <div className="flex gap-spacing-3">
              <Button className="bg-surface-warm-white text-foreground-primary hover:bg-surface-warm-white/86">
                Preview
              </Button>
              <Button
                variant="outline"
                className="border-surface-warm-white/12 bg-surface-warm-white/8 text-surface-warm-white hover:bg-surface-warm-white/12"
              >
                Kode
              </Button>
            </div>
            <span className="rounded-full border border-surface-warm-white/10 px-spacing-4 py-spacing-2 text-sm text-surface-warm-white/58">
              Desktop
            </span>
          </div>
          <div className="grid flex-1 place-items-center p-spacing-8">
            <div className="w-full max-w-3xl overflow-hidden rounded-radius-3xl bg-surface-warm-white text-foreground-primary">
              <div className="bg-[radial-gradient(circle_at_top_left,#ee4f9b_0,#7867ff_32%,#ff7a59_78%)] p-spacing-10 text-surface-warm-white">
                <p className="text-sm opacity-80">Kopi Rumahan</p>
                <h2 className="mt-spacing-5 max-w-xl text-5xl font-semibold leading-none tracking-[-0.06em]">
                  Kopi susu segar, siap antar hari ini.
                </h2>
              </div>
              <div className="grid gap-spacing-5 p-spacing-8 md:grid-cols-3">
                {["Menu jelas", "Pesan WhatsApp", "Area sekitar"].map(
                  (item) => (
                    <div
                      key={item}
                      className="rounded-radius-2xl bg-surface-muted p-spacing-5 text-sm font-medium"
                    >
                      {item}
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </main>
      </section>
    </DarkFrame>
  ),
};

function DialogGallery() {
  const [loginOpen, setLoginOpen] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <DesignFrame
      title="Dialogs & login"
      subtitle="Google login is gated by Turnstile/dev check and canonical legal links."
    >
      <div className="flex flex-wrap gap-spacing-4">
        <Button onClick={() => setLoginOpen(true)}>Open login modal</Button>
        <Button variant="outline" onClick={() => setDialogOpen(true)}>
          Open basic dialog
        </Button>
      </div>
      <LoginConsentDialog open={loginOpen} onOpenChange={setLoginOpen} />
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Hapus website?</DialogTitle>
            <DialogDescription>
              Website ini akan dihapus permanen dan tidak bisa dikembalikan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-spacing-4">
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Batal
            </Button>
            <Button className="bg-[#9f1d1d] hover:bg-[#8b1717]">Hapus</Button>
          </div>
        </DialogContent>
      </Dialog>
    </DesignFrame>
  );
}

function QuestionCard() {
  return (
    <div className="rounded-radius-2xl border border-surface-warm-white/10 bg-surface-warm-white/[0.045] p-spacing-5">
      <div className="flex items-center justify-between gap-spacing-4">
        <p className="text-sm font-medium text-surface-warm-white">Saran AI</p>
        <span className="rounded-full bg-surface-warm-white/8 px-spacing-3 py-spacing-1 text-xs text-surface-warm-white/54">
          1/3
        </span>
      </div>
      <p className="mt-spacing-4 text-sm leading-6 text-surface-warm-white/72">
        Siapa pembeli utama yang ingin kamu kejar?
      </p>
      <div className="mt-spacing-5 grid gap-spacing-3">
        {["Pekerja kantor sekitar", "Mahasiswa", "Tetangga dekat"].map(
          (option) => (
            <button
              key={option}
              type="button"
              className="rounded-radius-xl border border-surface-warm-white/10 bg-surface-warm-white/[0.045] px-spacing-4 py-spacing-3 text-left text-sm text-surface-warm-white/78 hover:bg-surface-warm-white/9"
            >
              {option}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

function DesignFrame({
  children,
  subtitle,
  title,
}: {
  children: React.ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-surface-base p-spacing-8 text-foreground-primary sm:p-spacing-12">
      <div className="mx-auto max-w-7xl space-y-spacing-8">
        <header>
          <p className="text-sm font-medium text-text-secondary">
            UMKM Cepat Storybook
          </p>
          <h1 className="mt-spacing-4 text-5xl font-semibold tracking-[-0.06em]">
            {title}
          </h1>
          <p className="mt-spacing-4 max-w-2xl text-lg leading-7 text-text-secondary">
            {subtitle}
          </p>
        </header>
        {children}
      </div>
    </main>
  );
}

function DarkFrame({
  children,
  subtitle,
  title,
}: {
  children: React.ReactNode;
  subtitle: string;
  title: string;
}) {
  return (
    <main className="min-h-screen bg-[#151515] p-spacing-8 text-surface-warm-white sm:p-spacing-12">
      <div className="mx-auto max-w-7xl space-y-spacing-8">
        <header>
          <p className="text-sm font-medium text-surface-warm-white/52">
            UMKM Cepat Storybook
          </p>
          <h1 className="mt-spacing-4 text-5xl font-semibold tracking-[-0.06em]">
            {title}
          </h1>
          <p className="mt-spacing-4 max-w-2xl text-lg leading-7 text-surface-warm-white/58">
            {subtitle}
          </p>
        </header>
        {children}
      </div>
    </main>
  );
}

const colorTokens = [
  { name: "surface-base", value: "#eceae4" },
  { name: "surface-muted", value: "#f7f4ed" },
  { name: "surface-warm-white", value: "#fcfbf8" },
  { name: "action-primary", value: "#1c1c1c" },
  { name: "text-secondary", value: "#5f5f5d" },
  { name: "destructive", value: "#9f1d1d" },
];

const radiusTokens = [
  { name: "radius-sm", value: "6px" },
  { name: "radius-lg", value: "12px" },
  { name: "radius-2xl", value: "24px" },
  { name: "radius-3xl", value: "28px" },
];

const mockProjects = [
  {
    id: "kopi-rumahan",
    title: "Landing page Kopi Sore Bu Rina",
    updatedAt: new Date("2026-06-25T08:00:00Z"),
  },
  {
    id: "laundry-kilat",
    title: "Website Laundry Kilat Antapani",
    updatedAt: new Date("2026-06-24T09:30:00Z"),
  },
  {
    id: "katering-sehat",
    title: "Katalog Katering Sehat Harian",
    updatedAt: new Date("2026-06-23T11:15:00Z"),
  },
  {
    id: "bengkel-motor",
    title: "Profil Bengkel Motor Pak Dedi",
    updatedAt: new Date("2026-06-22T07:45:00Z"),
  },
];
