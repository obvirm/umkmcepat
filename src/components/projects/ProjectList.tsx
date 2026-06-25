"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createProjectMark } from "./project-mark";

type Project = {
  id: string;
  title: string;
  updatedAt: Date;
  status: string;
  buildStatus: string;
  builtAt: Date | null;
};

type ProjectListProps = {
  projects: Project[];
  deleteProject: (formData: FormData) => Promise<void>;
};

export function ProjectList({ projects, deleteProject }: ProjectListProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [latestProject, ...otherProjects] = projects;
  const visibleOtherProjects = showAll
    ? otherProjects
    : otherProjects.slice(0, 5);
  const hiddenProjectCount = Math.max(
    otherProjects.length - visibleOtherProjects.length,
    0,
  );

  function handleDelete() {
    if (!selectedProject) {
      return;
    }

    const formData = new FormData();
    formData.set("projectId", selectedProject.id);

    startTransition(async () => {
      try {
        await deleteProject(formData);
        toast.success("Website dihapus.");
        setSelectedProject(null);
      } catch {
        toast.error("Website belum berhasil dihapus.");
      }
    });
  }

  if (!latestProject) {
    return null;
  }

  return (
    <>
      <div className="grid gap-spacing-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
        <FeaturedProject
          project={latestProject}
          onDelete={setSelectedProject}
        />

        <div className="rounded-radius-2xl border border-surface-warm-white/10 bg-surface-warm-white/[0.06]">
          <div className="flex items-center justify-between gap-spacing-5 border-b border-surface-warm-white/10 px-spacing-7 py-spacing-6">
            <div>
              <h3 className="text-base font-semibold tracking-[-0.03em] text-surface-warm-white">
                Website lain
              </h3>
              <p className="mt-spacing-1 text-sm text-surface-warm-white/58">
                {otherProjects.length
                  ? `${otherProjects.length} website tersimpan`
                  : "Belum ada website lain"}
              </p>
            </div>
          </div>

          {visibleOtherProjects.length ? (
            <div className="divide-y divide-surface-warm-white/10">
              {visibleOtherProjects.map((project) => (
                <ProjectRow
                  key={project.id}
                  project={project}
                  onDelete={setSelectedProject}
                />
              ))}
            </div>
          ) : (
            <p className="px-spacing-7 py-spacing-8 text-sm leading-6 text-surface-warm-white/58">
              Website berikutnya yang kamu buat akan muncul di sini.
            </p>
          )}

          {hiddenProjectCount ? (
            <div className="border-t border-surface-warm-white/10 px-spacing-7 py-spacing-6">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="text-sm font-medium text-surface-warm-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-warm-white"
              >
                Lihat lainnya
              </button>
            </div>
          ) : showAll && otherProjects.length > 5 ? (
            <div className="border-t border-surface-warm-white/10 px-spacing-7 py-spacing-6">
              <button
                type="button"
                onClick={() => setShowAll(false)}
                className="text-sm font-medium text-surface-warm-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-warm-white"
              >
                Ringkas daftar
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <Dialog
        open={Boolean(selectedProject)}
        onOpenChange={(open) => {
          if (!open && !isPending) {
            setSelectedProject(null);
          }
        }}
      >
        <DialogContent showCloseButton={!isPending}>
          <DialogHeader>
            <DialogTitle>Hapus website?</DialogTitle>
            <DialogDescription>
              Website ini akan dihapus permanen dan tidak bisa dikembalikan.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-spacing-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setSelectedProject(null)}
              disabled={isPending}
            >
              Batal
            </Button>
            <Button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              className="bg-[#9f1d1d] text-surface-warm-white hover:bg-[#8b1717]"
            >
              {isPending ? "Menghapus..." : "Hapus"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function FeaturedProject({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (project: Project) => void;
}) {
  return (
    <article className="overflow-hidden rounded-radius-3xl border border-surface-warm-white/10 bg-surface-warm-white/[0.06]">
      <div className="grid gap-0 md:grid-cols-[0.92fr_1.08fr]">
        <ProjectMark seed={project.id} className="min-h-56 md:min-h-full" />
        <div className="flex min-h-72 flex-col p-spacing-8 sm:p-spacing-10">
          <p className="text-sm text-surface-warm-white/58">
            Terakhir dikerjakan
          </p>
          <h3 className="mt-spacing-4 text-3xl font-semibold leading-tight tracking-[-0.055em] text-surface-warm-white sm:text-4xl">
            <Link
              href={`/projects/${project.id}`}
              className="rounded-radius-sm outline-none focus-visible:ring-2 focus-visible:ring-surface-warm-white"
            >
              {project.title}
            </Link>
          </h3>
          <div className="mt-spacing-7 flex flex-wrap items-center gap-spacing-4 text-sm text-surface-warm-white/58">
            <span>{getProjectStatusLabel(project)}</span>
            <span aria-hidden="true">/</span>
            <span>Diubah {formatDate(project.updatedAt)}</span>
          </div>
          <div className="mt-auto flex flex-wrap items-center gap-spacing-4 pt-spacing-10">
            <Button
              asChild
              className="rounded-radius-lg bg-surface-warm-white text-foreground-primary hover:bg-surface-warm-white/90"
            >
              <Link href={`/projects/${project.id}`}>Buka</Link>
            </Button>
            <button
              type="button"
              onClick={() => onDelete(project)}
              className="rounded-radius-lg px-spacing-5 py-spacing-3 text-sm font-medium text-surface-warm-white/58 hover:bg-surface-warm-white/8 hover:text-surface-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-warm-white"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectRow({
  project,
  onDelete,
}: {
  project: Project;
  onDelete: (project: Project) => void;
}) {
  return (
    <div className="grid grid-cols-[56px_1fr] gap-spacing-5 px-spacing-7 py-spacing-5 sm:grid-cols-[64px_1fr_auto] sm:items-center">
      <ProjectMark
        seed={project.id}
        className="h-14 rounded-radius-xl sm:h-16"
      />
      <div className="min-w-0">
        <Link
          href={`/projects/${project.id}`}
          className="line-clamp-1 text-base font-semibold tracking-[-0.03em] text-surface-warm-white outline-none hover:underline focus-visible:ring-2 focus-visible:ring-surface-warm-white"
        >
          {project.title}
        </Link>
        <p className="mt-spacing-2 text-sm text-surface-warm-white/58">
          {getProjectStatusLabel(project)} / Diubah{" "}
          {formatDate(project.updatedAt)}
        </p>
      </div>
      <div className="col-start-2 flex items-center gap-spacing-3 sm:col-start-auto">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="rounded-radius-lg border-surface-warm-white/12 bg-surface-warm-white/8 text-surface-warm-white hover:bg-surface-warm-white/12"
        >
          <Link href={`/projects/${project.id}`}>Buka</Link>
        </Button>
        <button
          type="button"
          onClick={() => onDelete(project)}
          className="rounded-radius-lg px-spacing-4 py-spacing-2 text-sm font-medium text-surface-warm-white/58 hover:bg-surface-warm-white/8 hover:text-surface-warm-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-surface-warm-white"
        >
          Hapus
        </button>
      </div>
    </div>
  );
}

function ProjectMark({
  seed,
  className = "",
}: {
  seed: string;
  className?: string;
}) {
  const mark = useMemo(() => createProjectMark(seed), [seed]);

  return (
    <div
      className={`overflow-hidden bg-surface-warm-white/[0.06] ${className}`}
      aria-hidden="true"
    >
      <svg className="h-full w-full" viewBox="0 0 600 400" role="img">
        <rect width="600" height="400" fill={mark.background} />
        {mark.shapes.map((shape, index) => (
          <rect
            key={`${shape.x}-${shape.y}-${index}`}
            width={shape.size}
            height={shape.size}
            x={shape.x}
            y={shape.y}
            rx={shape.radius}
            fill={shape.color}
            opacity={index === 0 ? 0.92 : 0.72}
            transform={`rotate(${shape.rotate} ${shape.x + shape.size / 2} ${shape.y + shape.size / 2})`}
          />
        ))}
      </svg>
    </div>
  );
}

function getProjectStatusLabel(project: Project) {
  if (project.buildStatus === "failed") {
    return "Build gagal";
  }

  if (project.builtAt || project.buildStatus === "built") {
    return "Sudah dibuat";
  }

  if (project.buildStatus === "building" || project.status === "building") {
    return "Sedang dibuat";
  }

  return "Draft";
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
