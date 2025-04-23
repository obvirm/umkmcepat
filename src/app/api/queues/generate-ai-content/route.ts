import { generateLandingPageContent } from '@/lib/ai';
import { prisma } from '@/lib/prisma';
// Impor wrapper verifikasi untuk App Router (sesuai hint IDE)
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";
import { NextResponse } from 'next/server';

// Definisikan tipe data payload
interface QstashPayload {
    pageId: string;
    namaUsaha: string;
    finalKategori: string;
    deskripsi_user?: string;
    hasWhatsApp: boolean;
    whatsapp?: string | null;
}

// Fungsi handler asli
async function handler(request: Request) {
    let pageIdForErrorHandling: string | undefined;

    try {
        // ASUMSI: Wrapper sudah melakukan verifikasi.
        // Coba dapatkan body JSON langsung dari request.
        const body = await request.json() as QstashPayload;
        pageIdForErrorHandling = body.pageId; // Simpan pageId segera

        const { pageId, namaUsaha, finalKategori, deskripsi_user, hasWhatsApp, whatsapp } = body;

        // Validasi Payload
        if (!pageIdForErrorHandling || !namaUsaha || !finalKategori) {
            console.error("QStash Handler: Missing required fields in payload", body);
            if (pageIdForErrorHandling) {
                 await prisma.landingPage.update({ where: { id: pageIdForErrorHandling }, data: { generationStatus: 'FAILED' } });
                 console.error(`QStash Handler: Marked pageId ${pageIdForErrorHandling} as FAILED due to missing fields.`);
            } else { 
                 console.error("QStash Handler: Cannot mark page as FAILED (missing fields, pageId unknown).");
             }
            return NextResponse.json({ message: "Job failed due to missing fields" }, { status: 200 });
        }

        console.log(`QStash Handler: Received job for pageId: ${pageIdForErrorHandling}`);

        // --- Mulai logika bisnis ---
        await prisma.landingPage.update({ where: { id: pageIdForErrorHandling }, data: { generationStatus: 'PROCESSING' }});
        console.time(`AI Generation Job ${pageIdForErrorHandling}`);
        const aiContent = await generateLandingPageContent(
            namaUsaha,
            finalKategori,
            deskripsi_user,
            hasWhatsApp
        );
        console.timeEnd(`AI Generation Job ${pageIdForErrorHandling}`);

        // Koreksi WA
        if (aiContent.whatsappCTA && hasWhatsApp && whatsapp) {
            aiContent.whatsappNumber = whatsapp;
        } else if (aiContent.whatsappCTA && !hasWhatsApp) {
            aiContent.whatsappCTA = false;
            delete aiContent.whatsappNumber;
        } else {
            delete aiContent.whatsappNumber;
        }

        await prisma.landingPage.update({ where: { id: pageIdForErrorHandling }, data: { aiContent: aiContent as any, generationStatus: 'COMPLETED' }});
        // --- Akhir logika bisnis ---

        console.log(`QStash Handler: Successfully processed job for pageId: ${pageIdForErrorHandling}`);
        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: unknown) {
        console.error(`QStash Handler: Error processing job for pageId (${pageIdForErrorHandling ?? 'unknown'}):`, error);
        if (pageIdForErrorHandling) {
            try {
                await prisma.landingPage.update({
                    where: { id: pageIdForErrorHandling },
                    data: { generationStatus: 'FAILED' },
                });
                console.error(`QStash Handler: Marked pageId ${pageIdForErrorHandling} as FAILED.`);
            } catch (updateError) {
                console.error(`QStash Handler: Failed to mark page ${pageIdForErrorHandling} as FAILED after initial error`, updateError);
            }
        } else {
             // Error kemungkinan terjadi saat request.json(), pageId tidak diketahui
             console.error("QStash Handler: Error likely during body parsing. Cannot identify pageId.");
        }

        // Return 500 ke QStash agar bisa di-retry
        return NextResponse.json({ message: "Internal Server Error processing job" }, { status: 500 });
    }
}

// Bungkus handler dengan verifikasi signature untuk App Router
export const POST = verifySignatureAppRouter(handler);

// Konfigurasi Edge Runtime
export const runtime = 'edge'; 