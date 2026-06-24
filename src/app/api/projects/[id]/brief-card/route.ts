import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseProjectBrief } from "@/lib/projects/brief";
import { getNextWorkspaceCard } from "@/lib/projects/brief-flow";

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json(
      { message: "Masuk dulu untuk melanjutkan." },
      { status: 401 },
    );
  }

  const { id } = await params;
  const project = await prisma.project.findFirst({
    where: { id, userId: session.user.id },
    select: { prompt: true, brief: true, workspaceCard: true },
  });

  if (!project) {
    return Response.json(
      { message: "Proyek tidak ditemukan." },
      { status: 404 },
    );
  }

  const brief = parseProjectBrief(project.brief, project.prompt);
  return Response.json({
    brief,
    workspaceCard: project.workspaceCard || getNextWorkspaceCard(brief),
  });
}
