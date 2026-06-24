import {
  type BriefQuestion,
  type ProjectBrief,
  type WorkspaceCard,
  getMissingBriefFields,
  isBriefReady,
} from "@/lib/projects/brief";

const questionBank: Record<BriefQuestion["id"], BriefQuestion> = {
  businessType: {
    id: "businessType",
    question: "Usaha kamu paling dekat dengan kategori apa?",
    options: [
      { label: "Fashion", description: "Baju, thrift, aksesoris, sepatu." },
      { label: "Kuliner", description: "Makanan, minuman, katering, kue." },
      { label: "Jasa", description: "Laundry, bengkel, desain, konsultasi." },
      { label: "Toko produk", description: "Produk fisik non-fashion." },
    ],
  },
  offer: {
    id: "offer",
    question: "Apa produk atau jasa utama yang mau ditampilkan?",
    options: [
      {
        label: "Katalog produk",
        description: "Banyak produk dengan detail singkat.",
      },
      {
        label: "Layanan utama",
        description: "Beberapa layanan dengan penjelasan.",
      },
      {
        label: "Menu dan harga",
        description: "Daftar menu, paket, atau price list.",
      },
      {
        label: "Portofolio",
        description: "Galeri hasil kerja atau contoh proyek.",
      },
    ],
  },
  targetCustomer: {
    id: "targetCustomer",
    question: "Siapa target pelanggan utamanya?",
    options: [
      {
        label: "Anak muda",
        description: "Bahasa santai, visual lebih berani.",
      },
      { label: "Keluarga", description: "Ramah, jelas, mudah dipercaya." },
      { label: "Pekerja kantor", description: "Rapi, praktis, profesional." },
      {
        label: "Pembeli premium",
        description: "Lebih kurasi, tenang, dan elegan.",
      },
    ],
  },
  contactOrCta: {
    id: "contactOrCta",
    question: "Aksi utama yang kamu mau dari pengunjung apa?",
    options: [
      {
        label: "Chat WA",
        description: "Pengunjung langsung diarahkan ke WhatsApp.",
      },
      { label: "DM Instagram", description: "Cocok kalau jualan aktif di IG." },
      { label: "Lihat katalog", description: "Fokus browsing produk dulu." },
      { label: "Booking", description: "Untuk jasa atau reservasi." },
    ],
  },
  stylePreference: {
    id: "stylePreference",
    question: "Arah tampilan yang paling cocok?",
    options: [
      { label: "Clean modern", description: "Rapi, terang, mudah dibaca." },
      {
        label: "Bold gelap",
        description: "Kontras, kuat, cocok fashion/thrift.",
      },
      {
        label: "Hangat lokal",
        description: "Dekat, ramah, tidak terlalu formal.",
      },
      {
        label: "Premium",
        description: "Lebih minimal, tenang, dan percaya diri.",
      },
    ],
  },
};

export function updateBriefFromAnswer(
  brief: ProjectBrief,
  text: string,
): ProjectBrief {
  const answer = text.trim();

  if (!answer) {
    return brief;
  }

  const next = { ...brief, notes: [...brief.notes] };
  const missing = getMissingBriefFields(next);
  const target = missing[0];

  if (target) {
    next[target] = normalizeAnswerForField(target, answer);
  } else {
    next.notes = [...next.notes, answer].slice(-12);
  }

  inferFromText(next, answer);
  return next;
}

export function getNextWorkspaceCard(brief: ProjectBrief): WorkspaceCard {
  if (isBriefReady(brief)) {
    return {
      type: "build_recommendation",
      title: "Brief sudah cukup jelas",
      summary: [
        brief.businessType,
        brief.offer,
        brief.targetCustomer,
        brief.contactOrCta,
        brief.stylePreference,
      ].filter(Boolean),
    };
  }

  return {
    type: "questions",
    questions: getMissingBriefFields(brief)
      .slice(0, 2)
      .map((field) => questionBank[field]),
  };
}

function normalizeAnswerForField(field: BriefQuestion["id"], answer: string) {
  const option = questionBank[field].options.find((item) =>
    answer.toLowerCase().includes(item.label.toLowerCase()),
  );
  return option?.label || answer;
}

function inferFromText(brief: ProjectBrief, text: string) {
  const value = text.toLowerCase();

  if (!brief.businessType) {
    if (/baju|thrift|fashion|sepatu|jaket|kaos/.test(value)) {
      brief.businessType = "Fashion";
    } else if (/makan|minum|kue|kopi|bakso|ayam|kuliner/.test(value)) {
      brief.businessType = "Kuliner";
    } else if (/laundry|cuci|service|jasa|bengkel/.test(value)) {
      brief.businessType = "Jasa";
    }
  }

  if (!brief.contactOrCta) {
    if (/wa|whatsapp/.test(value)) {
      brief.contactOrCta = "Chat WA";
    } else if (/instagram|ig|dm/.test(value)) {
      brief.contactOrCta = "DM Instagram";
    }
  }

  if (!brief.stylePreference) {
    if (/gelap|dark|hitam|bold/.test(value)) {
      brief.stylePreference = "Bold gelap";
    } else if (/modern|clean|minimal/.test(value)) {
      brief.stylePreference = "Clean modern";
    }
  }
}
