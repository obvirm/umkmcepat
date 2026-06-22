export const BAD_WORDS = [
  // Judi Online / Perjudian
  "judol",
  "judi",
  "slot",
  "gacor",
  "maxwin",
  "zeus",
  "pragmatic",
  "togel",
  "sbobet",
  "casino",
  "poker",
  "taruhan",
  "parlay",
  "bola88",
  "rtp",
  // Pornografi / Asusila
  "porno",
  "bokep",
  "bugil",
  "jav",
  "hentai",
  "mesum",
  "lonte",
  "open bo",
  "vcs",
  "onlyfans",
];

export function isProfane(text: string): boolean {
  if (!text) {
    return false;
  }
  const lowerText = text.toLowerCase();

  // Deteksi jika salah satu kata terlarang muncul utuh (menggunakan regex boundary)
  // Atau untuk kata yang unik (seperti judol), cukup include saja
  return BAD_WORDS.some((word) => lowerText.includes(word));
}
