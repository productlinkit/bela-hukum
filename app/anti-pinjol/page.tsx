"use client";

import { useState } from "react";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Tabs, { tabId } from "@/components/Tabs";
import Icon from "@/components/Icon";
import { REVIEWED_BY, REVIEWED_DATE } from "@/lib/data";

const ID = "anti";
const TABS = ["Panduan", "Template Laporan", "Hak Anda"];

const steps: [string, string, string][] = [
  ["camera", "Kumpulkan Bukti", "Tangkapan layar chat, rekaman telepon, daftar kontak yang dihubungi. Jangan dihapus."],
  ["ban", "Blokir, Bukan Hapus", "Blokir nomor penagih tapi simpan riwayat percakapan sebagai barang bukti."],
  ["clipboard", "Lapor ke Satgas PASTI", "Satuan Tugas Pemberantasan Aktivitas Keuangan Ilegal — OJK. Laporan online tersedia 24 jam."],
  ["scale", "Lapor ke Bareskrim", "Jika ada ancaman kekerasan atau tindak pidana, buat laporan ke Bareskrim Polri."],
];

// [P3] Tappable official contacts (tel: / https:)
const kontak: { label: string; display: string; href: string }[] = [
  { label: "Satgas PASTI (OJK)", display: "157 · waspadainvestasi.id", href: "tel:157" },
  { label: "Bareskrim Polri", display: "patroli-siber.id", href: "https://patrolisiber.id" },
  // [P1] "Kominfo" → "Komdigi" (Kementerian Komunikasi dan Digital)
  { label: "Komdigi (UU ITE)", display: "aduankonten.id", href: "https://aduankonten.id" },
];

const hakList = [
  "Penagih hanya boleh menghubungi penjamin, bukan kontak lain",
  "Penagih dilarang mengancam, mempermalukan, atau menyebarkan data",
  "Penagih hanya boleh menghubungi antara 08.00–20.00",
  "Penyebaran data kontak tanpa izin melanggar UU No. 27/2022 (PDP)",
  "Anda berhak meminta penghapusan data setelah pinjaman lunas",
];

const templateLaporan = `Kepada Yth.
Satgas Pemberantasan Aktivitas Keuangan Ilegal
c.q. Otoritas Jasa Keuangan (OJK)

Hal: Pengaduan Penagihan Ilegal

Dengan hormat, saya yang bertanda tangan di bawah ini:
Nama: [Nama Anda]
No. HP: [Nomor Anda]

Melaporkan tindakan penagihan ilegal oleh [Nama Pinjol/Penagih] yang terjadi pada [tanggal]. Tindakan tersebut berupa: penyebaran data kontak, pengancaman, dan/atau penagihan di luar waktu yang diizinkan.

Bukti terlampir: [tangkapan layar / rekaman].`;

function Stamp() {
  return (
    <div className="stamp">
      <Icon name="check" size={13} />
      Ditinjau oleh {REVIEWED_BY} · {REVIEWED_DATE}
    </div>
  );
}

export default function AntiPinjol() {
  const [tab, setTab] = useState(TABS[0]);
  const [copied, setCopied] = useState(false);

  return (
    <div className="view">
      <SubHeader title="Anti Pinjol" subtitle="Perlindungan dari Pinjol Ilegal" backHref="/" />
      <div className="nh" style={{ paddingTop: 0 }}>
        <p style={{ margin: 0 }}>Panduan + template laporan Satgas PASTI / OJK</p>
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} idBase={ID} />

      <main className="scroll pad" id="main">
        <div role="tabpanel" id={`${ID}-panel`} aria-labelledby={tabId(ID, tab)} tabIndex={0}>
          {tab === "Panduan" && (
            <>
              <div className="alert" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Icon name="alert" size={18} />
                <div>
                  <b>Sedang diteror sekarang? Jangan panik.</b> Ikuti langkah berikut.
                </div>
              </div>
              {steps.map(([e, h, d], i) => (
                <div key={h} className="card" style={{ display: "flex", gap: 12, marginTop: 12 }}>
                  <div className="cico" aria-hidden="true">
                    <Icon name={e} size={22} />
                  </div>
                  <div>
                    <small style={{ color: "var(--accent-ink)", fontWeight: 800 }}>LANGKAH {i + 1}</small>
                    <div className="t">{h}</div>
                    <p style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 3, lineHeight: 1.5 }}>{d}</p>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <Link className="btn" href="/tanya">
                  Tanya BELA tentang kasus saya
                </Link>
              </div>
              <Stamp />
            </>
          )}

          {tab === "Template Laporan" && (
            <>
              <button
                className="btn o"
                style={{ marginBottom: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                onClick={() => {
                  navigator.clipboard?.writeText(templateLaporan).then(
                    () => setCopied(true),
                    () => setCopied(false)
                  );
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <Icon name={copied ? "check" : "copy"} size={16} />
                {copied ? "Template disalin" : "Salin template (gratis)"}
              </button>
              <div className="letter">{templateLaporan}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <Link className="btn" href="/surat">
                  Buat surat pengaduan lengkap — Rp 25.000
                </Link>
              </div>
              <div className="sec">
                <h2 style={{ fontSize: 14 }}>Kontak Pengaduan Resmi</h2>
              </div>
              <div className="card">
                {kontak.map((k) => (
                  <div key={k.label} className="row">
                    <span>{k.label}</span>
                    <a
                      className="lnk"
                      href={k.href}
                      target={k.href.startsWith("http") ? "_blank" : undefined}
                      rel={k.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      {k.display}
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === "Hak Anda" && (
            <>
              {/* [P1] Citation corrected to the fintech-lending rule */}
              <p style={{ fontSize: 11, color: "var(--muted)", marginBottom: 10 }}>
                Berdasarkan POJK No. 10/POJK.05/2022 (LPBBTI) &amp; UU No. 27/2022 (PDP)
              </p>
              <div className="card">
                {hakList.map((x) => (
                  <div key={x} className="chk">
                    <i>✓</i>
                    {x}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <Link className="btn o" href="/advokat">
                  Konsultasi Advokat — Rp 150.000/30 menit
                </Link>
              </div>
              <Stamp />
            </>
          )}
        </div>
      </main>
    </div>
  );
}
