export const PROFILE_IMAGE_MAX_BYTES = 1_000_000;

const PROFILE_IMAGE_DATA_URL_PATTERN =
  /^data:(image\/(?:png|jpeg|webp));base64,([A-Za-z0-9+/=]+)$/;

export function normalizeProfileName(value: unknown) {
  return typeof value === "string"
    ? value.trim().replace(/\s+/g, " ").slice(0, 100)
    : "";
}

export function normalizeProfileImageDataUrl(
  value: unknown,
): { ok: true; value: string } | { message: string; ok: false } {
  if (typeof value !== "string") {
    return { message: "Foto profil tidak valid.", ok: false };
  }

  const compactValue = value.trim().replace(/\s/g, "");
  const match = compactValue.match(PROFILE_IMAGE_DATA_URL_PATTERN);

  if (!match) {
    return {
      message: "Foto profil harus berupa PNG, JPG, atau WebP.",
      ok: false,
    };
  }

  const [, contentType, base64] = match;
  const byteLength = Buffer.byteLength(base64, "base64");

  if (byteLength > PROFILE_IMAGE_MAX_BYTES) {
    return { message: "Ukuran foto maksimal 1 MB.", ok: false };
  }

  return { ok: true, value: `data:${contentType};base64,${base64}` };
}

export function parseStoredProfileImage(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const match = value.trim().match(PROFILE_IMAGE_DATA_URL_PATTERN);

  if (!match) {
    return null;
  }

  const [, contentType, base64] = match;

  return {
    body: Buffer.from(base64, "base64"),
    contentType,
  };
}

export function toPublicProfileImage(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  const image = value.trim();

  if (!image) {
    return "";
  }

  if (PROFILE_IMAGE_DATA_URL_PATTERN.test(image)) {
    return "/api/profile/avatar";
  }

  if (image.startsWith("https://")) {
    return image;
  }

  if (image.startsWith("/api/profile/avatar")) {
    return image;
  }

  return "";
}
