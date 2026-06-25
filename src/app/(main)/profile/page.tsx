import { redirect } from "next/navigation";

import { ProfileNameForm } from "@/components/profile/ProfileNameForm";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toPublicProfileImage } from "@/lib/profile";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true, name: true },
  });

  if (!user) {
    redirect("/");
  }

  return (
    <main className="min-h-[calc(100dvh-4rem)] bg-[#151515] px-4 py-spacing-12 text-surface-warm-white sm:px-spacing-9 lg:px-spacing-10">
      <section className="mx-auto w-full max-w-2xl">
        <div className="rounded-[32px] border border-surface-warm-white/10 bg-[#232321] p-spacing-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] sm:p-spacing-8">
          <ProfileNameForm
            initialImage={toPublicProfileImage(
              user.image || session.user.image,
            )}
            initialName={user.name || session.user.name || ""}
          />
        </div>
      </section>
    </main>
  );
}
