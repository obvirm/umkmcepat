import OpenAI from 'openai';

if (!process.env.OPENAI_API_KEY) {
  console.warn("Missing OPENAI_API_KEY environment variable. AI features will fail.");
  // throw new Error("Missing OPENAI_API_KEY environment variable");
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the expected structure of the AI-generated JSON
// This should EXACTLY match the prompt requirements
export interface AiGeneratedContent {
  headline: string;
  subheadline: string;
  description: string;
  features: string[]; // Array of feature strings
  primaryColor: string; // Hex color code (e.g., "#3B82F6")
  ctaText: string; // Text for the main Call to Action button
  layoutStyle: 'standard' | 'minimal' | string; // Predefined or custom
  tone: 'professional' | 'friendly' | 'persuasive' | string; // Predefined or custom
  font: 'Inter' | 'Poppins' | string; // Font name or class
  whatsappCTA: boolean; // True if CTA should link to WhatsApp
  whatsappNumber?: string; // WhatsApp number (only if whatsappCTA is true)
}

// === Interface for Color Theme ===
export interface ColorThemeJson {
  primary: string;        // Hex color (e.g., "#2563eb")
  "on-primary": string;   // Hex color (e.g., "#ffffff")
  secondary: string;
  "on-secondary": string;
  background: string;
  "on-background": string;
  surface: string;
  "on-surface": string;
  accent: string;
  muted: string;
  border: string;
  success: string;
  error: string;
}

// Function to generate landing page content using GPT-4o-mini
export async function generateLandingPageContent(
  namaUsaha: string,
  kategori: string,
  deskripsi_user?: string,
  hasWhatsApp?: boolean
): Promise<AiGeneratedContent> {

  const systemPrompt = `
    You are an expert landing page copywriter and designer for Indonesian SMEs (UMKM).
    Generate content for a simple promotional landing page based on the user's input.
    Output ONLY a valid JSON object matching the AiGeneratedContent interface, with no extra text or markdown formatting.
    Interface: { headline: string; subheadline: string; description: string; features: string[]; primaryColor: string; ctaText: string; layoutStyle: string; tone: string; font: string; whatsappCTA: boolean; whatsappNumber?: string; }
    Constraints:
    - headline: Compelling, short (max 10 words).
    - subheadline: Supportive, slightly longer (max 20 words).
    - description: Persuasive, highlighting benefits (3-5 sentences).
    - features: 3-5 bullet points of key features/benefits (string array).
    - primaryColor: Choose an attractive hex color code suitable for the business category (e.g., food=orange/red, tech=blue, beauty=pink/purple).
    - ctaText: Generate a strong Call to Action text specifically inviting users to contact via WhatsApp (e.g., "Hubungi via WhatsApp", "Chat Sekarang di WA", "Kontak via WhatsApp"). Avoid generic phrases like "Pesan Sekarang" unless the context *only* makes sense for ordering (like food). If the user didn't provide a WhatsApp number, generate a relevant non-WhatsApp CTA (e.g., "Lihat Produk", "Pelajari Lebih Lanjut").
    - layoutStyle: Suggest 'standard' or 'minimal'.
    - tone: Suggest 'professional', 'friendly', or 'persuasive'.
    - font: Suggest 'Inter' (preferred) or 'Poppins'.
    - whatsappCTA: Set to true ONLY if the user provided a WhatsApp number (indicated by 'Has WhatsApp Number: Yes' in the user message), otherwise false.
    - whatsappNumber: Include the user's provided number ONLY if whatsappCTA is true, otherwise omit this field.
    Be creative and tailor the content to the Indonesian market and the business category.
  `;

  const userMessage = `
    Business Name: ${namaUsaha}
    Category: ${kategori}
    User Description (Optional): ${deskripsi_user || '-'}
    Has WhatsApp Number: ${hasWhatsApp ? 'Yes' : 'No'}
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Use the specified model
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.7, // Adjust temperature for creativity vs consistency
      response_format: { type: "json_object" }, // Ensure JSON output
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("OpenAI response content is empty.");
    }

    // Attempt to parse the JSON content
    const parsedContent: AiGeneratedContent = JSON.parse(content);

    // Basic validation (can be enhanced)
    if (
      !parsedContent.headline ||
      !parsedContent.subheadline ||
      !parsedContent.description ||
      !parsedContent.features ||
      !parsedContent.primaryColor ||
      !parsedContent.ctaText
      // ... add more checks if needed
    ) {
      throw new Error("Generated JSON is missing required fields.");
    }

    // Ensure whatsappNumber is only present if whatsappCTA is true
    if (!parsedContent.whatsappCTA && parsedContent.whatsappNumber) {
        delete parsedContent.whatsappNumber;
    }
    if (parsedContent.whatsappCTA && !hasWhatsApp) {
        // If AI hallucinated whatsappCTA=true without input, correct it
        parsedContent.whatsappCTA = false;
        delete parsedContent.whatsappNumber;
    }


    console.log("AI Generated Content:", parsedContent);
    return parsedContent;

  } catch (error) {
    console.error("Error generating landing page content:", error);
    // Provide a fallback or throw a more specific error
    throw new Error("Gagal menghasilkan konten AI. Coba lagi nanti.");
  }
}

// Function to tweak landing page content using AI
export async function tweakLandingPageContent(
  currentContent: AiGeneratedContent,
  userInstruction: string
): Promise<AiGeneratedContent> {

 const systemPrompt = `
    You are an expert landing page editor.
    The user wants to modify their existing landing page content based on their instruction.
    Current content (JSON): ${JSON.stringify(currentContent)}
    User's instruction: ${userInstruction}
    Modify the current JSON based *only* on the user's instruction.
    Maintain the original structure and fields unless specifically asked to change them.
    Output ONLY the modified, valid JSON object matching the AiGeneratedContent interface, with no extra text or markdown formatting.
    Interface: { headline: string; subheadline: string; description: string; features: string[]; primaryColor: string; ctaText: string; layoutStyle: string; tone: string; font: string; whatsappCTA: boolean; whatsappNumber?: string; }
  `;

  try {
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: systemPrompt },
            // No user message needed here as instruction is in system prompt
        ],
        temperature: 0.5, // Lower temperature for more predictable edits
        response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("OpenAI tweak response content is empty.");
    }

    const parsedContent: AiGeneratedContent = JSON.parse(content);

    // Add validation similar to the generation function
    if (!parsedContent.headline /* ... etc */) {
        throw new Error("Tweaked JSON is missing required fields.");
    }

     // Ensure whatsappNumber consistency remains after tweak
     if (!parsedContent.whatsappCTA && parsedContent.whatsappNumber) {
        delete parsedContent.whatsappNumber;
    }
    // We trust the AI to not add whatsappCTA if it wasn't there and wasn't asked for
    // but if whatsappCTA becomes true, ensure number exists if possible from original
    if (parsedContent.whatsappCTA && !parsedContent.whatsappNumber && currentContent.whatsappNumber) {
        parsedContent.whatsappNumber = currentContent.whatsappNumber;
    }


    console.log("AI Tweaked Content:", parsedContent);
    return parsedContent;

  } catch (error) {
      console.error("Error tweaking landing page content:", error);
      throw new Error("Gagal melakukan tweak AI. Coba lagi nanti.");
  }
}

// === NEW FUNCTION for Generating Description ===
export async function generateBusinessDescription(
  namaUsaha: string,
  kategori: string
): Promise<string> {
  const systemPrompt = `
    Anda adalah copywriter AI yang ahli membuat deskripsi singkat (maksimal 3-4 kalimat atau sekitar 400 karakter) untuk landing page UMKM Indonesia.
    Fokus pada manfaat utama bagi calon pelanggan dan gunakan gaya bahasa yang persuasif namun profesional.
    Hindari penggunaan list/bullet point.
    Output HANYA teks deskripsi saja, tanpa kalimat pembuka/penutup atau format tambahan.
  `;

  const userMessage = `
    Nama Usaha: ${namaUsaha}
    Kategori Usaha: ${kategori}
    Buatkan deskripsi landing page yang menarik.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.8, // Slightly higher temp for more creative descriptions
      max_tokens: 150, // Limit output length
      // No response_format needed as we expect plain text
    });

    const description = response.choices[0]?.message?.content?.trim();

    if (!description) {
      throw new Error("OpenAI response for description is empty.");
    }

    console.log("AI Generated Description:", description);
    return description;

  } catch (error) {
    console.error("Error generating business description:", error);
    throw new Error("Gagal menghasilkan deskripsi AI.");
  }
}

// === NEW FUNCTION for Generating Color Theme ===
export async function generateColorTheme(
  namaUsaha: string,
  kategori: string
): Promise<ColorThemeJson> {
  const systemPrompt = `
    You are an expert UI/UX designer specializing in color theory for Indonesian SMEs.
    Generate a harmonious and accessible 13-token color theme based on the user's business name and category.
    Output ONLY a valid JSON object matching the ColorThemeJson interface, with no extra text or markdown formatting.
    Interface: { primary: string; "on-primary": string; secondary: string; "on-secondary": string; background: string; "on-background": string; surface: string; "on-surface": string; accent: string; muted: string; border: string; success: string; error: string; }
    Constraints & Guidelines:
    - All colors MUST be lowercase hex codes (e.g., "#ffffff").
    - primary: Choose a compelling main color suitable for the category (e.g., food=orange/red, tech=blue, beauty=pink/purple, eco=green). Avoid overly bright/neon colors unless category is very playful.
    - on-primary: MUST be either "#ffffff" or "#111827" (near black) providing high contrast (WCAG AA+) against the chosen primary color. Choose white for dark primary, black for light primary.
    - secondary: Choose a complementary or analogous color to primary, slightly less dominant.
    - on-secondary: MUST be either "#ffffff" or "#111827" providing high contrast against the secondary color.
    - background: Choose a light neutral color, typically near-white (e.g., "#f8fafc", "#f9fafb", "#ffffff").
    - on-background: MUST be a dark, highly readable color (e.g., "#1f2937", "#111827") contrasting with background.
    - surface: Choose a color for cards/containers, usually same as background or slightly different neutral (e.g., "#ffffff", "#f1f5f9").
    - on-surface: MUST be a dark, highly readable color (e.g., "#334155", "#1f2937") contrasting with surface.
    - accent: Choose an optional, distinct color for highlights or decorative elements. Can be brighter.
    - muted: Choose a light gray for subtle text/borders (e.g., "#e5e7eb", "#f1f5f9").
    - border: Choose a slightly darker gray than muted for UI borders (e.g., "#d1d5db", "#e2e8f0").
    - success: Standard green (e.g., "#10b981", "#22c55e").
    - error: Standard red (e.g., "#ef4444", "#f43f5e").
    - Ensure overall theme harmony and professional feel appropriate for Indonesian SMEs.
  `;

  const userMessage = `
    Nama Usaha: ${namaUsaha}
    Kategori Usaha: ${kategori}
    Generate the color theme JSON.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.6,
      response_format: { type: "json_object" },
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("OpenAI response for color theme is empty.");
    }

    const parsedContent: ColorThemeJson = JSON.parse(content);

    // TODO: Add validation here to ensure all 13 keys exist and values are hex codes
    // Example basic check:
    if (!parsedContent.primary || !parsedContent["on-primary"] /* ... check all keys */) {
       throw new Error("Generated color theme JSON is missing required fields.");
    }

    console.log("AI Generated Color Theme:", parsedContent);
    return parsedContent;

  } catch (error) {
    console.error("Error generating color theme:", error);
    throw new Error("Gagal menghasilkan skema warna AI.");
  }
} 