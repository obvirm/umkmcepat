import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectSitePreview } from "@/components/projects/renderer/ProjectSitePreview";

import type { ProjectSiteSchema } from "@/lib/projects/site-schema";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const meta = {
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
  title: "Organisms/Product Components",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProjectListFull: Story = {
  parameters: { backgrounds: { default: "Dark workspace" } },
  render: () => (
    <DarkCanvas>
      <ProjectList
        projects={mockProjects}
        deleteProject={async () => undefined}
      />
    </DarkCanvas>
  ),
};

export const ProjectListSingle: Story = {
  parameters: { backgrounds: { default: "Dark workspace" } },
  render: () => (
    <DarkCanvas>
      <ProjectList
        projects={[mockProjects[0]]}
        deleteProject={async () => undefined}
      />
    </DarkCanvas>
  ),
};

export const GeneratedPreviewDesktop: Story = {
  render: () => (
    <WarmCanvas>
      <ProjectSitePreview siteSchema={mockSiteSchema} viewport="desktop" />
    </WarmCanvas>
  ),
};

export const GeneratedPreviewMobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => (
    <WarmCanvas>
      <ProjectSitePreview siteSchema={mockSiteSchema} viewport="mobile" />
    </WarmCanvas>
  ),
};

function DarkCanvas({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#151515] p-spacing-8 text-surface-warm-white">
      {children}
    </main>
  );
}

function WarmCanvas({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-surface-base p-spacing-8">{children}</main>
  );
}

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

const mockSiteSchema = {
  audience: "Pekerja kantor sekitar Antapani",
  businessName: "Kopi Sore Bu Rina",
  eyebrow: "Kopi susu rumahan",
  headline: "Kopi segar siap antar sore ini.",
  offer: "Paket kopi susu 1 liter dan botol sekali minum untuk kantor kecil.",
  primaryCta: "Pesan lewat WhatsApp",
  secondaryCta: "Lihat menu",
  sections: [
    {
      title: "Menu ringkas",
      body: "Pelanggan bisa melihat pilihan kopi, ukuran, dan harga tanpa bertanya ulang.",
    },
    {
      title: "Pesan cepat",
      body: "CTA langsung mengarah ke WhatsApp agar pesanan sore bisa diproses cepat.",
    },
    {
      title: "Area antar",
      body: "Tampilkan area pengantaran agar pembeli tahu apakah alamatnya masuk jangkauan.",
    },
    {
      title: "Bukti sosial",
      body: "Sisipkan testimoni pelanggan tetap atau foto produksi harian yang nyata.",
    },
  ],
  subheadline:
    "Bantu pelanggan kantor memilih menu, cek area antar, dan pesan tanpa bolak-balik chat panjang.",
  theme: {
    accent: "#ee4f9b",
    background: "#fcfbf8",
    foreground: "#1c1c1c",
    muted: "#5f5f5d",
  },
  trustPoints: [
    "Dibuat segar harian",
    "Antar area dekat",
    "Pesan via WhatsApp",
  ],
  version: 1,
} satisfies ProjectSiteSchema;
