import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import { REVIEWED_BY, REVIEWED_DATE } from "@/lib/data";

const guides: [string, string, string][] = [
  ["file", "Girik & Sertifikasi Tanah", "Girik/Letter C bukan bukti kepemilikan penuh. Pelajari cara mensertifikasi dan langkah bila disengketakan."],
  ["lock", "Blokir Tanah Sengketa", "Jika tanah akan dialihkan pihak lain tanpa izin, Anda bisa mengajukan pemblokiran ke BPN."],
  ["home", "Sengketa Sewa & Developer", "Kontrak sewa dilanggar, unit tak kunjung selesai, atau DP tidak dikembalikan."],
  ["clipboard", "Balik Nama & AJB", "Peralihan hak lewat Akta Jual Beli (AJB) di hadapan PPAT dan proses balik nama di BPN."],
];

const docs = [
  "Sertifikat / Girik / Letter C asli",
  "SPPT PBB tahun terakhir",
  "KTP & KK para pihak",
  "AJB / PPJB (jika ada)",
  "Bukti pembayaran / kwitansi",
  "IMB / PBG untuk bangunan",
];

export default function TanahProperti() {
  return (
    <div className="view">
      <SubHeader title="Tanah & Properti" subtitle="Sertifikat, girik, sewa, developer" backHref="/" />
      <main className="scroll pad" id="main">
        <div className="warn">
          Sengketa tanah yang melibatkan banyak pihak memerlukan pendampingan advokat berlisensi. BELA membantu triase
          dan persiapan dokumen.
        </div>

        <p className="t" style={{ margin: "16px 0 8px" }}>
          Panduan Hukum
        </p>
        {guides.map(([e, h, d]) => (
          <div key={h} className="card" style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <div className="cico" aria-hidden="true">
              <Icon name={e} size={22} />
            </div>
            <div>
              <div className="t">{h}</div>
              <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 3, lineHeight: 1.5 }}>{d}</p>
            </div>
          </div>
        ))}

        <p className="t" style={{ margin: "16px 0 8px", display: "inline-flex", alignItems: "center", gap: 7 }}>
          <Icon name="folder" size={16} /> Dokumen yang Perlu Disiapkan
        </p>
        <div className="card">
          {docs.map((x) => (
            <div key={x} className="chk">
              <i>✓</i>
              {x}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          <Link className="btn" href="/advokat">
            Konsultasi Advokat — Rp150.000
          </Link>
          <Link className="btn o" href="/tanya">
            Tanya BELA dulu
          </Link>
        </div>
        <div className="stamp">
          <Icon name="check" size={13} />
          Ditinjau oleh {REVIEWED_BY} · {REVIEWED_DATE}
        </div>
      </main>
    </div>
  );
}
