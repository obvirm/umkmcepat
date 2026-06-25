import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseStoredProfileImage } from "@/lib/profile";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new Response(null, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { image: true },
  });
  const image = parseStoredProfileImage(user?.image);

  if (!image) {
    return new Response(null, { status: 404 });
  }

  return new Response(image.body, {
    headers: {
      "Cache-Control": "private, no-store",
      "Content-Type": image.contentType,
    },
  });
}
