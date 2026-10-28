// Shared data + helpers ported from the original single-file clone.

export const IMG = (n: number | string) =>
  `https://www.belahukum.com/figma/image-${n}.png`;

// Google sign-in is the planned auth, so the account is identified by email.
export const user = {
  name: "Nama Pengguna",
  ini: "NP",
  email: "nama.pengguna@gmail.com",
};

// [P1] Legal content governance — single reviewed-by/date stamp reused across
// Bekal Hukum, Panduan and Hak Anda so users can see content is maintained.
export const REVIEWED_BY = "Advokat JHP";
export const REVIEWED_DATE = "26 Okt 2026";

export type Article = {
  tag: string;
  g: number;
  t: string;
  d: string;
  date: string;
  read: string;
};

export const articles: Article[] = [
  {
    tag: "Umum",
    g: 0,
    t: "Somasi: kapan perlu dan kapan cukup teguran biasa?",
    d: "Somasi (teguran hukum formal) perlu bila: ada utang kewajiban yang diabaikan, Anda siap menuntut, atau butuh bukti itikad baik di pengadilan. Cukup teguran biasa bila urusan masih damai.",
    date: "19 Okt",
    read: "2 menit baca",
  },
  {
    // [P1] Fixed: NIB in land matters = Nomor Identifikasi Bidang (not "Nomor
    // Izin Berusaha", which is the business-licensing NIB).
    tag: "Tanah & Properti",
    g: 1,
    t: "NIB bukan sertifikat — apa bedanya?",
    d: "NIB (Nomor Identifikasi Bidang) adalah nomor identitas bidang tanah yang diterbitkan BPN — penanda letak dan batas bidang, bukan bukti kepemilikan. Kepemilikan penuh tetap dibuktikan dengan sertifikat (SHM/HGB), bukan NIB.",
    date: "18 Okt",
    read: "2 menit baca",
  },
];

// Demo-only toast — the original used a plain alert() to signal inert actions.
export const toast = (m: string) => {
  if (typeof window !== "undefined") {
    window.alert(m + "\n\n(Demo clone — fitur ini tidak aktif)");
  }
};
