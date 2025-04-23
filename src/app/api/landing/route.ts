import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// Import the base schema for omit
// import { generateLandingPageContent } from '@/lib/ai'; // Removed
import { fileToBuffer, uploadImageToCloudinary } from '@/lib/cloudinary';
import { checkRateLimit } from '@/lib/rate-limit'; // Import rate limit checker
import { generateRandomString, slugify } from '@/lib/utils';
// Import the base schema to apply refinement after omit
import type { ColorThemeJson } from '@/lib/ai'; // Import types
import { auth } from '@/lib/auth'; // Import auth untuk cek sesi
import { baseLandingPageSchemaForOmit } from '@/lib/zod-schemas';
import { Client } from "@upstash/qstash"; // Correct import

// Define types for testimonials and social links
type Testimonial = {
  name: string;
  comment: string;
}

type SocialLink = {
  platform: string;
  url: string;
}

// Definisikan tema warna default (disamakan dengan di LandingPageDisplay - Attempt 2, careful syntax)
const defaultColorTheme: ColorThemeJson = {
  primary: "hsl(222.2 47.4% 11.2%)",
  "on-primary": "hsl(0 0% 100%)",
  secondary: "hsl(210 40% 96.1%)",
  "on-secondary": "hsl(222.2 47.4% 11.2%)",
  background: "hsl(0 0% 100%)",
  "on-background": "hsl(222.2 47.4% 11.2%)",
  surface: "hsl(0 0% 100%)",
  "on-surface": "hsl(222.2 47.4% 11.2%)",
  accent: "hsl(217.2 91.2% 59.8%)",
  muted: "hsl(210 40% 96.1%)",
  border: "hsl(214.3 31.8% 91.4%)",
  success: "hsl(142.1 70.6% 45.3%)",
  error: "hsl(0 84.2% 60.2%)",
  card: "hsl(0 0% 100%)",
  "on-card": "hsl(222.2 47.4% 11.2%)",
  popover: "hsl(0 0% 100%)",
  "on-popover": "hsl(222.2 47.4% 11.2%)",
  destructive: "hsl(0 84.2% 60.2%)",
  "on-destructive": "hsl(0 0% 100%)",
  input: "hsl(214.3 31.8% 91.4%)",
  ring: "hsl(215 20.2% 65.1%)",
  foreground: "hsl(222.2 47.4% 11.2%)",
  primary_foreground: "hsl(0 0% 100%)",
  secondary_foreground: "hsl(222.2 47.4% 11.2%)",
  muted_foreground: "hsl(215.4 16.3% 46.9%)",
  accent_foreground: "hsl(0 0% 100%)",
  destructive_foreground: "hsl(0 0% 100%)",
  card_foreground: "hsl(222.2 47.4% 11.2%)",
  popover_foreground: "hsl(222.2 47.4% 11.2%)",
};

// Inisialisasi QStash Client (pindahkan ke sini, sebelum export)
if (!process.env.QSTASH_TOKEN) {
  console.error("Missing QStash Token in environment variables");
  throw new Error("QStash Token is required");
}
const qstash = new Client({
  token: process.env.QSTASH_TOKEN,
});

// POST /api/landing - Create a new landing page
export async function POST(request: Request) {
  try {
    // Apply rate limiting first
    const rateLimitResponse = await checkRateLimit(request, 'ai');
    if (rateLimitResponse) return rateLimitResponse;

    // Cek sesi user (tidak wajib login)
    const session = await auth();
    const userId = session?.user?.id; // Bisa null jika tidak login

    const formData = await request.formData();

    // Extract basic fields AND optional color theme
    const colorThemeJsonString = formData.get('colorThemeJson') as string | null;
    const rawData = {
      namaUsaha: formData.get('namaUsaha'),
      kategori: formData.get('kategori'),
      kategoriLainnya: formData.get('kategoriLainnya'),
      deskripsi_user: formData.get('deskripsi_user'),
      whatsapp: formData.get('whatsapp'),
      colorThemeJson: colorThemeJsonString, // Sertakan untuk validasi Zod
      // Images handled later
    };

    // Validate text fields including colorThemeJson
    const validationSchemaWithColor = baseLandingPageSchemaForOmit
      .omit({ images: true })
      .refine((data) => {
        if (data.kategori === 'Lainnya') {
          return !!data.kategoriLainnya && data.kategoriLainnya.trim().length > 0;
        }
        return true;
      }, {
        message: 'Nama kategori harus diisi jika memilih \'Lainnya\'',
        path: ['kategoriLainnya'],
      });

    // Gunakan skema baru untuk validasi
    const validationResult = validationSchemaWithColor.safeParse(rawData);

    if (!validationResult.success) {
      console.error("Validation Errors:", validationResult.error.flatten());
      return NextResponse.json(
        { message: 'Data tidak valid', errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Ambil data yang sudah divalidasi (termasuk colorThemeJson jika ada)
    const { namaUsaha, kategori, deskripsi_user, whatsapp, colorThemeJson } = validationResult.data;
    const finalKategori = kategori === 'Lainnya' ? formData.get('kategoriLainnya') as string : kategori;

    // Tentukan tema warna yang akan disimpan
    let resolvedTheme: ColorThemeJson = defaultColorTheme;
    if (colorThemeJson) {
      try {
        resolvedTheme = JSON.parse(colorThemeJson);
        // TODO: Lakukan validasi lebih ketat di sini bahwa semua key ada dan formatnya benar
      } catch (e) {
        console.error("Failed to parse colorThemeJson, using default:", e);
        // Jika gagal parse (meskipun Zod sudah cek), fallback ke default
        resolvedTheme = defaultColorTheme;
      }
    }

    // Handle Image Uploads to Cloudinary
    const imageFiles = formData.getAll('images') as File[];
    const uploadedImageData: { url: string; publicId: string }[] = [];

    if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
      // Validate image count/type/size again on the server (optional but recommended)
      if (imageFiles.length > 3) {
        return NextResponse.json({ message: 'Maksimal 3 gambar' }, { status: 400 });
      }
      // Add more server-side validation if needed (size, type)

      for (const file of imageFiles) {
        try {
          const buffer = await fileToBuffer(file);
          const uniqueFileName = `${slugify(namaUsaha)}-${generateRandomString(4)}-${Date.now()}`;
          // Get both url and publicId
          const { secure_url, public_id } = await uploadImageToCloudinary(buffer, uniqueFileName);
          uploadedImageData.push({ url: secure_url, publicId: public_id });
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          return NextResponse.json({ message: 'Gagal mengupload salah satu gambar.' }, { status: 500 });
        }
      }
    }

    // Generate unique slug
    let pageSlug = slugify(namaUsaha);
    let existingPage = await prisma.landingPage.findUnique({ where: { slug: pageSlug } });
    let attempts = 0;
    while (existingPage && attempts < 5) {
      pageSlug = `${slugify(namaUsaha)}-${generateRandomString(6)}`;
      existingPage = await prisma.landingPage.findUnique({ where: { slug: pageSlug } });
      attempts++;
    }
    if (existingPage) {
      throw new Error("Gagal membuat slug unik setelah beberapa percobaan.");
    }

    // === Get Optional Fields ===
    const testimonialsString = formData.get('testimonials') as string | null;
    const address = formData.get('address') as string | null;
    const socialLinksString = formData.get('socialLinks') as string | null;

    // Parse JSON strings into arrays
    let testimonials: Testimonial[] = [];
    try {
      testimonials = testimonialsString ? JSON.parse(testimonialsString) : [];
    } catch (e) {
      console.error("Failed to parse testimonials JSON:", e);
      // Handle error, maybe return bad request?
    }

    let socialLinks: SocialLink[] = [];
    try {
      socialLinks = socialLinksString ? JSON.parse(socialLinksString) : [];
    } catch (e) {
      console.error("Failed to parse socialLinks JSON:", e);
      // Handle error
    }

    // Add logging to check the userId value before saving
    console.log(`Attempting to create LandingPage with userId: ${userId ?? 'null'}`);

    // Save INITIAL Data to Database
    console.time("Initial Database Write");
    const newLandingPage = await prisma.landingPage.create({
      data: {
        slug: pageSlug,
        namaUsaha: namaUsaha,
        kategori: finalKategori,
        whatsapp: whatsapp || null,
        images: uploadedImageData.map(img => img.url),
        imagePublicIds: uploadedImageData.map(img => img.publicId),
        userId: userId,
        isClaimed: !!userId,
        tweaksLeft: 5,
        address: address || null,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        testimonials: testimonials as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        socialLinks: socialLinks as any,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        colorTheme: resolvedTheme as any,
      },
    });
    console.timeEnd("Initial Database Write");

    console.log("New Landing Page Created:", newLandingPage.id, "Slug:", pageSlug, "UserID:", userId);

    // Kirim job ke QStash untuk generate AI content

    // Construct the target URL robustly
    let targetBaseUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!targetBaseUrl && process.env.VERCEL_URL) {
      // VERCEL_URL does not include the protocol, add it
      targetBaseUrl = `https://${process.env.VERCEL_URL}`;
    }
    if (!targetBaseUrl) {
        console.error("Cannot determine base URL for QStash handler. Set NEXT_PUBLIC_APP_URL or ensure VERCEL_URL is available.");
        // Return error because we cannot proceed without a valid handler URL
        return NextResponse.json({ message: 'Konfigurasi server tidak lengkap untuk memproses permintaan.' }, { status: 500 });
    }
    const qstashUrl = `${targetBaseUrl}/api/queues/generate-ai-content`;

    console.log(`Publishing job to QStash: ${qstashUrl} for pageId: ${newLandingPage.id}`);
    try {
      // Gunakan objek qstash yang sudah diinisialisasi
      await qstash.publishJSON({ url: qstashUrl, /* ... body ... */ });
      console.log(`Successfully published job to QStash for pageId: ${newLandingPage.id}`);
    } catch (qstashError) {
      // ... (existing QStash error handling: log, mark FAILED, return 500)
      console.error("Failed to publish job to QStash:", qstashError);
      await prisma.landingPage.update({ where: { id: newLandingPage.id }, data: { generationStatus: 'FAILED' } })
          .catch(err => console.error("Failed to mark page as FAILED after QStash publish error", err));
      return NextResponse.json({ message: 'Gagal memulai proses pembuatan konten AI.' }, { status: 500 });
    }

    // Return response ke user bahwa proses sedang berjalan
    return NextResponse.json(
      { slug: pageSlug, message: 'Landing page sedang dibuat...', status: 'PROCESSING' },
      { status: 202 }
    );

  } catch (error) {
    console.error("Error creating landing page:", error);
    let message = 'Terjadi kesalahan saat membuat halaman.';
    if (error instanceof Error) {
      // Don't expose sensitive internal messages directly
      if (error.message.includes("Cloudinary")) {
        message = "Gagal mengupload gambar. Coba lagi.";
      } else if (error.message.includes("OpenAI") || error.message.includes("konten AI")) {
        message = "Gagal menghasilkan konten AI. Coba lagi nanti.";
      } else if (error.message.includes("slug unik")) {
        message = "Gagal membuat alamat unik untuk halaman Anda. Coba nama usaha yang sedikit berbeda.";
      }
      // Log full error server-side for debugging
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}

// Note: We might need a PUT/PATCH endpoint later for the /edit/[slug] page
// PUT /api/landing/[slug]?token=...
// OR handle edits via Server Actions 