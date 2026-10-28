import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import { features } from "@/lib/features";

// Paid / cross-cutting services (not legal categories)
type Svc = [string, string, string, string, string];
const services: Svc[] = [
  ["message", "Tanya BELA", "AI legal assistant — triase & langkah pertama", "Termasuk semua paket", "/tanya"],
  ["file", "Review Dokumen", "Analisis kontrak & surat, penandaan klausul berisiko", "Rp15.000 / dokumen", "/dokumen"],
  ["clipboard", "Draft Surat", "Somasi & surat resmi siap kirim", "Rp25.000 / surat", "/surat"],
  ["calendar", "Konsultasi Advokat", "Sesi 30 menit dengan advokat berlisensi", "Rp150.000 · ditagih terpisah", "/advokat"],
  ["book", "Bekal Hukum", "Satu bekal hukum setiap hari", "Termasuk semua paket", "/bekal"],
];

export default function Layanan() {
  return (
    <div className="view">
      <SubHeader title="Layanan BELA" subtitle="Dukungan hukum lengkap dalam satu aplikasi" />
      <main className="scroll pad" id="main">
        <p className="t" style={{ margin: "4px 0 10px" }}>
          Kategori Hukum
        </p>
        {features.map((f) => (
          <Link key={f.href} className="li" href={f.href}>
            <div className="ic img3d" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.img} alt="" />
            </div>
            <div>
              <b>{f.label}</b>
              <span className="pill k">Panduan</span>
              <small>{f.desc}</small>
              <strong>Termasuk semua paket</strong>
            </div>
            <span className="chev">›</span>
          </Link>
        ))}

        <p className="t" style={{ margin: "18px 0 10px" }}>
          Layanan &amp; Alat
        </p>
        {services.map(([icon, t, d, pr, h]) => (
          <Link key={h} className="li" href={h}>
            <div className="ic" aria-hidden="true">
              <Icon name={icon} size={24} />
            </div>
            <div>
              <b>{t}</b>
              <small>{d}</small>
              <strong>{pr}</strong>
            </div>
            <span className="chev">›</span>
          </Link>
        ))}

        <Link className="li" href="/paket" style={{ background: "var(--primary)", color: "#fff" }}>
          <div className="ic" style={{ background: "rgba(255,255,255,.12)", color: "#fff" }} aria-hidden="true">
            <Icon name="box" size={24} />
          </div>
          <div>
            <b>Lihat Paket BELA</b>
            <small style={{ color: "var(--soft)" }}>Paket harian, mingguan, dan bulanan — mulai Rp1.000/hari</small>
          </div>
          <span className="chev" style={{ color: "#fff" }}>
            ›
          </span>
        </Link>
      </main>
      <BottomNav />
    </div>
  );
}
