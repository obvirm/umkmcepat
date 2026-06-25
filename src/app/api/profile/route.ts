import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { message: "Masuk dulu untuk mengubah profil." },
      { status: 401 },
    );
  }

  const body = (await request.json().catch(() => ({}))) as { name?: unknown };
  const name = normalizeName(body.name);

  if (!name) {
    return Response.json(
      { message: "Nama tidak boleh kosong." },
      { status: 400 },
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
    select: { name: true },
  });

  return Response.json({ user });
}

function normalizeName(value: unknown) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, 100)
    : "";
}
