"use client";

import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function ProfileNameForm({ initialName }: { initialName: string }) {
  const router = useRouter();
  const { update } = useSession();
  const [savedName, setSavedName] = useState(normalizeName(initialName));
  const [name, setName] = useState(normalizeName(initialName));
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const normalizedName = normalizeName(name);
  const isChanged = normalizedName !== savedName;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!normalizedName) {
      setError("Nama tidak boleh kosong.");
      return;
    }

    if (isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: normalizedName }),
      });
      const result = (await response.json().catch(() => ({}))) as {
        message?: string;
        user?: { name?: string | null };
      };

      if (!response.ok || !result.user?.name) {
        setError(result.message || "Nama belum berhasil disimpan.");
        return;
      }

      const nextName = normalizeName(result.user.name);
      setSavedName(nextName);
      setName(nextName);
      toast.success("Nama profil disimpan.");

      await update({ name: nextName });
      router.refresh();
    } catch {
      setError("Nama belum berhasil disimpan.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-spacing-8 space-y-spacing-6">
      <div>
        <label
          htmlFor="profile-name"
          className="text-sm font-medium text-foreground-primary"
        >
          Nama
        </label>
        <input
          id="profile-name"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={100}
          autoComplete="name"
          className="mt-spacing-3 w-full rounded-radius-lg border border-foreground-primary/10 bg-surface-warm-white px-spacing-6 py-spacing-5 text-base text-foreground-primary outline-none transition placeholder:text-text-secondary/70 focus:border-foreground-primary/30 focus:ring-2 focus:ring-foreground-primary/12"
          placeholder="Nama kamu"
        />
        <p className="mt-spacing-3 text-sm leading-6 text-text-secondary">
          Nama ini dipakai untuk sapaan di beranda.
        </p>
      </div>

      {error ? <p className="text-sm text-[#9f1d1d]">{error}</p> : null}

      <div className="flex flex-col-reverse gap-spacing-3 sm:flex-row sm:items-center sm:justify-end">
        <Button
          type="submit"
          disabled={!isChanged || isSaving}
          className="rounded-radius-lg bg-action-primary px-spacing-8 text-surface-warm-white hover:bg-action-primary/88 disabled:opacity-45"
        >
          {isSaving ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Menyimpan
            </>
          ) : (
            "Simpan nama"
          )}
        </Button>
      </div>
    </form>
  );
}

function normalizeName(value: string) {
  return value.trim().replace(/\s+/g, " ").slice(0, 100);
}
