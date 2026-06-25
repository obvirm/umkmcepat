import { redirect } from "next/navigation";

import { ProfileNameForm } from "@/components/profile/ProfileNameForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { name: true },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-surface-base px-4 py-spacing-13 text-foreground-primary sm:px-spacing-9 lg:px-spacing-10">
      <section className="mx-auto w-full max-w-2xl">
        <div className="rounded-[28px] border border-foreground-primary/10 bg-surface-warm-white p-spacing-8 shadow-[0_18px_60px_rgba(28,28,28,0.08)] sm:p-spacing-10">
          <p className="text-sm font-medium text-text-secondary">Profil</p>
          <h1 className="mt-spacing-3 text-4xl font-semibold leading-[1.04] tracking-[-0.055em] sm:text-5xl">
            Nama yang dipakai UMKM Cepat untuk menyapa kamu.
          </h1>
          <p className="mt-spacing-5 max-w-xl text-base leading-7 text-text-secondary">
            Buat sekarang, profil cukup sederhana. Simpan nama yang ingin kamu
            lihat di beranda.
          </p>

          <ProfileNameForm initialName={user.name || ""} />
        </div>
      </section>
    </main>
  );
}
