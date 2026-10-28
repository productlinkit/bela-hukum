import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import { REVIEWED_BY, REVIEWED_DATE } from "@/lib/data";

const kasus: [string, string, string][] = [
  ["alert", "Penganiayaan Ringan / Cekcok", "Perkelahian atau keributan antar tetangga tanpa luka berat."],
  ["file", "Pencemaran Nama Baik", "Hinaan atau tuduhan di lingkungan sekitar maupun media sosial."],
  ["cart", "Pencurian / Perusakan Ringan", "Nilai kerugian kecil — kerap bisa diselesaikan lewat tipiring atau damai."],
  ["scale", "Pelanggaran Lalu Lintas", "Tilang, kecelakaan ringan, dan penyelesaian ganti rugi."],
];

const hakProses = [
  "Berhak didampingi penasihat hukum sejak pemeriksaan",
  "Berhak diam dan tidak menandatangani BAP yang tidak sesuai",
  "Tahanan tipiring umumnya dapat ditangguhkan/ tidak ditahan",
  "Berhak atas praperadilan bila penangkapan tidak sah",
];

export default function PidanaRingan() {
  return (
    <div className="view">
      <SubHeader title="Pidana Ringan Sehari-hari" subtitle="Tipiring, damai & restorative justice" backHref="/" />
      <main className="scroll pad" id="main">
        <div className="warn">
          Banyak perkara ringan bisa diselesaikan lewat perdamaian (restorative justice) tanpa ke pengadilan. BELA bantu
          memetakan pilihan Anda.
        </div>

        <p className="t" style={{ margin: "16px 0 8px" }}>
          Jenis Perkara
        </p>
        {kasus.map(([e, h, d]) => (
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

        <p className="t" style={{ margin: "16px 0 8px" }}>
          Hak Anda Saat Diperiksa
        </p>
        <div className="card">
          {hakProses.map((x) => (
            <div key={x} className="chk">
              <i>✓</i>
              {x}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          <Link className="btn" href="/tanya">
            Tanya BELA tentang kasus saya
          </Link>
          <Link className="btn o" href="/advokat">
            Konsultasi Advokat — Rp150.000
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
