// The product's prominent legal-help categories, in priority order.
// Single source for the Beranda grid and the Layanan list.
export type Feature = { href: string; icon: string; cls: string; color: string; label: string; desc: string };

export const features: Feature[] = [
  { href: "/anti-pinjol", icon: "shield", cls: "c1", color: "#dc2626", label: "Anti Pinjol", desc: "Teror penagihan & pinjol ilegal" },
  { href: "/tanah-properti", icon: "home", cls: "c2", color: "#ea7317", label: "Tanah & Properti", desc: "Sertifikat, girik, sewa, developer" },
  { href: "/keluarga", icon: "users", cls: "c3", color: "#059669", label: "Keluarga", desc: "Waris, KDRT, perceraian, hak asuh" },
  { href: "/ketenagakerjaan", icon: "briefcase", cls: "c4", color: "#2563eb", label: "Ketenagakerjaan", desc: "PHK, pesangon, kontrak kerja" },
  { href: "/penipuan-digital", icon: "alert", cls: "c5", color: "#7c3aed", label: "Penipuan & Kejahatan Digital", desc: "Scam online, UU ITE, kebocoran data" },
  { href: "/konsumen", icon: "cart", cls: "c6", color: "#0891b2", label: "Konsumen", desc: "Barang/jasa bermasalah, transaksi" },
  { href: "/pidana-ringan", icon: "scale", cls: "c7", color: "#4f46e5", label: "Pidana Ringan Sehari-hari", desc: "Pencemaran nama, cekcok, lalu lintas" },
];
