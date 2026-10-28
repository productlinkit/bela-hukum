// The product's prominent legal-help categories, in priority order.
// Single source for the Beranda grid and the Layanan list.
export type Feature = { href: string; img: string; label: string; desc: string };

export const features: Feature[] = [
  { href: "/anti-pinjol", img: "/icons/anti-pinjol.png", label: "Anti Pinjol", desc: "Teror penagihan & pinjol ilegal" },
  { href: "/tanah-properti", img: "/icons/tanah-properti.png", label: "Tanah & Properti", desc: "Sertifikat, girik, sewa, developer" },
  { href: "/keluarga", img: "/icons/keluarga.png", label: "Keluarga", desc: "Waris, KDRT, perceraian, hak asuh" },
  { href: "/ketenagakerjaan", img: "/icons/ketenagakerjaan.png", label: "Ketenagakerjaan", desc: "PHK, pesangon, kontrak kerja" },
  { href: "/penipuan-digital", img: "/icons/penipuan-digital.png", label: "Penipuan & Kejahatan Digital", desc: "Scam online, UU ITE, kebocoran data" },
  { href: "/konsumen", img: "/icons/konsumen.png", label: "Konsumen", desc: "Barang/jasa bermasalah, transaksi" },
  { href: "/pidana-ringan", img: "/icons/pidana-ringan.png", label: "Pidana Ringan Sehari-hari", desc: "Pencemaran nama, cekcok, lalu lintas" },
];
