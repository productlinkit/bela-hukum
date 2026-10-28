// [P2 UX] Single source of truth for plan naming / pricing / benefits.
// The baseline app described the same plan three different ways (Profil
// "gratis", Paket "Rp1.000/hari", Beranda "500 pertanyaan + 3x review").
// Everything that mentions a plan now reads from here.

export type Plan = {
  code: string;
  name: string;
  price: string;
  period: string; // e.g. "/hari"
  quota: string; // human-readable quota, one phrasing everywhere
  benefits: string[];
  current?: boolean;
  featured?: boolean;
  img: number;
};

export const plans: Plan[] = [
  {
    code: "gratis",
    name: "BELA Gratis",
    price: "Rp0",
    period: "/hari",
    quota: "10 pertanyaan / hari",
    benefits: ["Tanya BELA (AI)", "Bekal Hukum harian", "Panduan Anti-Pinjol & Hak Anda"],
    current: true,
    img: 13,
  },
  {
    code: "harian",
    name: "BELA Harian",
    price: "Rp1.000",
    period: "/hari",
    quota: "50 pertanyaan / hari",
    benefits: ["Semua fitur BELA Gratis", "50 pertanyaan per hari"],
    img: 14,
  },
  {
    code: "mingguan",
    name: "BELA Mingguan",
    price: "Rp9.900",
    period: "/minggu",
    quota: "150 pertanyaan / minggu",
    benefits: ["Semua fitur BELA Gratis", "150 pertanyaan per minggu", "1× review dokumen"],
    img: 15,
  },
  {
    code: "bulanan",
    name: "BELA Bulanan",
    price: "Rp29.000",
    period: "/bulan",
    quota: "500 pertanyaan / bulan",
    benefits: ["Semua fitur BELA Gratis", "500 pertanyaan per bulan", "3× review dokumen"],
    featured: true,
    img: 16,
  },
];

export const currentPlan = plans.find((p) => p.current)!;
export const upgradeTarget = plans.find((p) => p.featured)!;

// Daily free quota shown on the Beranda pill and Profil meter.
export const quota = { left: 10, total: 10, unit: "hari" as const };

// Advocate sessions are billed separately from any plan.
export const advocateFee = "Rp 150.000 / 30 menit";
