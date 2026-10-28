import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import { REVIEWED_BY, REVIEWED_DATE } from "@/lib/data";

const cards: [string, string, string][] = [
  ["cart", "Belanja Online Bermasalah", "Barang tidak sesuai, tidak dikirim, atau penjual tidak bisa dihubungi setelah pembayaran."],
  ["card", "Transaksi Tidak Sah", "Tagihan yang tidak Anda lakukan, biaya tersembunyi, atau auto-subscribe tanpa izin."],
  ["activity", "Produk & Jasa Cacat", "Barang cacat, garansi tidak dipenuhi, atau jasa tidak sesuai perjanjian."],
  ["home", "Sengketa Properti/Sewa", "Developer wanprestasi atau DP tidak dikembalikan (lihat juga Tanah & Properti)."],
];

const langkah = [
  "Kumpulkan bukti: invoice, chat, foto, bukti transfer",
  "Ajukan komplain tertulis ke penjual/penyedia (somasi)",
  "Lapor ke BPSK atau Ditjen PKTN Kemendag bila tak ada tanggapan",
  "Gugatan kecil (small claim court) untuk nilai tertentu",
];

export default function Konsumen() {
  return (
    <div className="view">
      <SubHeader title="Konsumen" subtitle="Perlindungan Konsumen" backHref="/" />
      <main className="scroll pad" id="main">
        <p style={{ fontSize: 11.5, color: "var(--muted)", marginBottom: 10 }}>
          Dilindungi oleh UU No. 8/1999 tentang Perlindungan Konsumen
        </p>
        {cards.map(([e, h, d]) => (
          <div key={h} className="card" style={{ display: "flex", gap: 12, marginBottom: 10 }}>
            <div className="cico" aria-hidden="true">
              <Icon name={e} size={22} />
            </div>
            <div>
              <div className="t">{h}</div>
              <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 3, lineHeight: 1.5 }}>{d}</p>
            </div>
          </div>
        ))}

        <p className="t" style={{ margin: "16px 0 8px" }}>
          Langkah yang Bisa Anda Ambil
        </p>
        <div className="card">
          {langkah.map((x) => (
            <div key={x} className="chk">
              <i>✓</i>
              {x}
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
          <Link className="btn" href="/surat">
            Buat Surat Keberatan Konsumen
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
