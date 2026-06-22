import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { isProfane } from "@/lib/profanity-filter";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ banned: false }, { status: 400 });
    }

    if (isProfane(prompt)) {
      // Dapatkan IP address pengguna
      const headerStore = await headers();
      const ip = headerStore.get("x-forwarded-for") || "127.0.0.1";

      // Ambil IP asli jika ada multiple IP
      const realIp = ip.split(",")[0].trim();

      // Set blokir di Redis untuk 24 Jam (24 * 60 * 60 = 86400 detik)
      await redis.setex(`banned_ip:${realIp}`, 86400, "true");

      return NextResponse.json({ banned: true }, { status: 200 });
    }

    return NextResponse.json({ banned: false }, { status: 200 });
  } catch (error) {
    console.error("Profanity Check Error:", error);
    return NextResponse.json({ banned: false }, { status: 500 });
  }
}
