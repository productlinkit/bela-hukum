"use client";

import { useState } from "react";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Tabs, { tabId } from "@/components/Tabs";
import Icon from "@/components/Icon";
import { REVIEWED_BY, REVIEWED_DATE } from "@/lib/data";

const ID = "klg";
const TABS = ["Waris", "KDRT", "Perceraian & Anak"];

const warisGuides: [string, string, string][] = [
  ["users", "Siapa Ahli Waris", "Pembagian warisan memerlukan persetujuan seluruh ahli waris yang sah."],
  ["clipboard", "Surat Keterangan Waris", "Dokumen wajib untuk mengurus aset warisan: tanah, rekening, kendaraan."],
  ["file", "Hibah & Wasiat", "Perbedaan hibah semasa hidup dan wasiat, serta batas bagian yang boleh diwasiatkan."],
];
const warisDocs = ["Akta kematian pewaris", "Kartu Keluarga terbaru", "KTP seluruh ahli waris", "Bukti kepemilikan aset", "Akta nikah pewaris"];

const kdrtKontak: { label: string; display: string; href: string }[] = [
  { label: "Hotline SAPA (PPPA)", display: "1500-454", href: "tel:1500454" },
  { label: "Darurat Nasional", display: "112", href: "tel:112" },
  { label: "Komnas Perempuan", display: "021-3903963", href: "tel:0213903963" },
  { label: "LBH APIK", display: "021-8714765", href: "tel:0218714765" },
];
const kdrtCards: [string, string, string][] = [
  ["shield", "Hak-hak korban KDRT", "UU No. 23/2004 tentang Penghapusan Kekerasan Dalam Rumah Tangga melindungi Anda."],
  ["clipboard", "Cara membuat laporan polisi", "Laporan bisa dibuat di Polsek/Polres terdekat. Dapat didampingi petugas perempuan."],
  ["activity", "Visum et Repertum", "Bukti medis yang diperlukan untuk proses hukum. Minta segera setelah kejadian."],
];

const ceraiGuides: [string, string, string][] = [
  ["file", "Cerai Gugat vs Cerai Talak", "Alur berbeda: gugatan diajukan ke Pengadilan Agama (muslim) atau Pengadilan Negeri."],
  ["users", "Hak Asuh Anak (Hadhanah)", "Pertimbangan utama adalah kepentingan terbaik anak; nafkah anak tetap kewajiban ayah."],
  ["card", "Nafkah & Pembagian Harta", "Harta bersama (gono-gini) dibagi; nafkah iddah dan mut'ah dapat dituntut."],
];

function Stamp() {
  return (
    <div className="stamp">
      <Icon name="check" size={13} />
      Ditinjau oleh {REVIEWED_BY} · {REVIEWED_DATE}
    </div>
  );
}

export default function Keluarga() {
  const [tab, setTab] = useState(TABS[0]);

  return (
    <div className="view">
      <SubHeader title="Keluarga" subtitle="Waris, KDRT, perceraian & hak asuh" backHref="/" />
      <div className="nh" style={{ paddingTop: 0 }}>
        <p style={{ margin: 0 }}>Perlindungan dan pendampingan untuk urusan keluarga</p>
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} idBase={ID} />

      <main className="scroll pad" id="main">
        <div role="tabpanel" id={`${ID}-panel`} aria-labelledby={tabId(ID, tab)} tabIndex={0}>
          {tab === "Waris" && (
            <>
              <div className="warn">
                Perkara waris dengan sengketa antar ahli waris memerlukan pendampingan advokat. BELA membantu triase dan
                dokumen.
              </div>
              {warisGuides.map(([e, h, d]) => (
                <div key={h} className="card" style={{ display: "flex", gap: 12, marginTop: 10 }}>
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
                {warisDocs.map((x) => (
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
              </div>
              <Stamp />
            </>
          )}

          {tab === "KDRT" && (
            <>
              <div className="emg">
                <Icon name="alert" size={18} />
                <div>
                  Jika Anda dalam bahaya langsung, segera hubungi{" "}
                  <a className="lnk" href="tel:112">
                    112
                  </a>{" "}
                  (darurat) atau{" "}
                  <a className="lnk" href="tel:1500454">
                    1500-454
                  </a>{" "}
                  (SAPA Kementerian PPPA).
                </div>
              </div>
              <p className="t" style={{ margin: "14px 0 8px" }}>
                Kontak Darurat &amp; Layanan
              </p>
              <div className="card">
                {kdrtKontak.map((k) => (
                  <div key={k.label} className="row">
                    <span>{k.label}</span>
                    <a className="lnk" href={k.href}>
                      {k.display}
                    </a>
                  </div>
                ))}
              </div>
              {kdrtCards.map(([e, h, d]) => (
                <div key={h} className="card" style={{ display: "flex", gap: 12, marginTop: 10 }}>
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
                <Link className="btn acc" href="/advokat">
                  Konsultasi Advokat Segera
                </Link>
              </div>
              <Stamp />
            </>
          )}

          {tab === "Perceraian & Anak" && (
            <>
              {ceraiGuides.map(([e, h, d]) => (
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
                <Link className="btn o" href="/advokat">
                  Konsultasi Advokat
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
