"use client";

import { useState } from "react";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Tabs, { tabId } from "@/components/Tabs";
import Icon from "@/components/Icon";
import { REVIEWED_BY, REVIEWED_DATE } from "@/lib/data";

const ID = "pen";
const TABS = ["Jenis Kasus", "Langkah & Lapor", "Hak Anda"];

const kasus: [string, string, string][] = [
  ["card", "Penipuan Transfer / Jual-Beli", "Uang sudah ditransfer tapi barang tidak dikirim, atau rekening penipu (scam)."],
  ["lock", "Akun Diretas / Dibajak", "Akun media sosial, e-wallet, atau email diambil alih pihak lain."],
  ["alert", "Pemerasan & Ancaman Online", "Sextortion, ancaman penyebaran data, atau love scamming."],
  ["file", "Pencemaran Nama & Hoaks", "Fitnah, ujaran kebencian, atau penyebaran berita bohong (UU ITE)."],
];

const kontak: { label: string; display: string; href: string }[] = [
  { label: "Patroli Siber Polri", display: "patrolisiber.id", href: "https://patrolisiber.id" },
  { label: "Cek rekening penipu", display: "cekrekening.id", href: "https://cekrekening.id" },
  { label: "Aduan konten (Komdigi)", display: "aduankonten.id", href: "https://aduankonten.id" },
  { label: "Lapor (kanal nasional)", display: "lapor.go.id", href: "https://lapor.go.id" },
];

const langkah = [
  "Amankan akun: ganti kata sandi & aktifkan 2FA",
  "Kumpulkan bukti: tangkapan layar, bukti transfer, nomor rekening/HP",
  "Blokir dana ke bank/e-wallet terkait secepatnya",
  "Laporkan ke Patroli Siber dan blokir rekening di cekrekening.id",
];

const hak = [
  "Penyebaran data pribadi tanpa izin melanggar UU No. 27/2022 (PDP)",
  "Anda berhak meminta penghapusan konten yang melanggar",
  "Ancaman & pemerasan adalah tindak pidana — dapat dilaporkan ke polisi",
  "Korban penipuan dapat menuntut ganti rugi secara perdata",
];

function Stamp() {
  return (
    <div className="stamp">
      <Icon name="check" size={13} />
      Ditinjau oleh {REVIEWED_BY} · {REVIEWED_DATE}
    </div>
  );
}

export default function PenipuanDigital() {
  const [tab, setTab] = useState(TABS[0]);
  return (
    <div className="view">
      <SubHeader title="Penipuan & Kejahatan Digital" subtitle="Scam online, UU ITE, kebocoran data" backHref="/" />
      <div className="nh" style={{ paddingTop: 0 }}>
        <p style={{ margin: 0 }}>Panduan menghadapi penipuan dan kejahatan siber</p>
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} idBase={ID} />

      <main className="scroll pad" id="main">
        <div role="tabpanel" id={`${ID}-panel`} aria-labelledby={tabId(ID, tab)} tabIndex={0}>
          {tab === "Jenis Kasus" && (
            <>
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
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <Link className="btn" href="/tanya">
                  Tanya BELA tentang kasus saya
                </Link>
              </div>
              <Stamp />
            </>
          )}

          {tab === "Langkah & Lapor" && (
            <>
              <div className="alert" style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Icon name="alert" size={18} />
                <div>
                  <b>Baru saja tertipu?</b> Segera amankan akun dan blokir dana. Kecepatan menentukan.
                </div>
              </div>
              <div className="card" style={{ marginTop: 12 }}>
                {langkah.map((x) => (
                  <div key={x} className="chk">
                    <i>✓</i>
                    {x}
                  </div>
                ))}
              </div>
              <div className="sec">
                <h2 style={{ fontSize: 14 }}>Kanal Pelaporan Resmi</h2>
              </div>
              <div className="card">
                {kontak.map((k) => (
                  <div key={k.label} className="row">
                    <span>{k.label}</span>
                    <a className="lnk" href={k.href} target="_blank" rel="noopener noreferrer">
                      {k.display}
                    </a>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <Link className="btn o" href="/surat">
                  Buat surat pengaduan — Rp25.000
                </Link>
              </div>
            </>
          )}

          {tab === "Hak Anda" && (
            <>
              <p style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>
                Berdasarkan UU No. 1/2024 (perubahan UU ITE) &amp; UU No. 27/2022 (PDP)
              </p>
              <div className="card">
                {hak.map((x) => (
                  <div key={x} className="chk">
                    <i>✓</i>
                    {x}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <Link className="btn o" href="/advokat">
                  Konsultasi Advokat — Rp150.000/30 menit
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
