"use client";

import { useState } from "react";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Tabs, { tabId } from "@/components/Tabs";
import Icon from "@/components/Icon";
import Sheet from "@/components/Sheet";
import { toast } from "@/lib/data";

const templateBody = (jenis: string) => `Kepada Yth.
Kepala Dinas Ketenagakerjaan setempat

Hal: ${jenis}

Dengan hormat, saya yang bertanda tangan di bawah ini:
Nama        : [Nama Anda]
Alamat      : [Alamat Anda]
No. HP      : [Nomor Anda]
Perusahaan  : [Nama Perusahaan]

Dengan ini menyampaikan ${jenis.toLowerCase()} yang saya alami, dengan kronologi sebagai berikut:
[Uraikan kronologi singkat — tanggal, kejadian, dan kerugian yang dialami].

Saya memohon Dinas Ketenagakerjaan dapat memanggil para pihak untuk mediasi dan menyelesaikan perkara ini sesuai peraturan ketenagakerjaan yang berlaku.

Demikian surat ini saya sampaikan. Atas perhatiannya saya ucapkan terima kasih.

Hormat saya,
[Nama Anda]`;

const ID = "kerja";
const TABS = ["Kalkulator Pesangon", "Telaah Kontrak", "Template Disnaker"];

const kontrakChecks = [
  "Klausul non-kompete yang membatasi kebebasan kerja",
  "Pasal pelepasan hak pesangon yang tersembunyi",
  "Ketentuan lembur yang tidak sesuai UU",
  "Klausul penalti resign yang tidak wajar",
  "Masa percobaan melebihi 3 bulan",
];

const disnakerTemplates = [
  "Pengaduan PHK tanpa prosedur",
  "Pengaduan pesangon tidak dibayar",
  "Pengaduan pemotongan gaji sepihak",
  "Pengaduan kontrak kerja tidak sah",
];

export default function Ketenagakerjaan() {
  const [tab, setTab] = useState(TABS[0]);
  const [gaji, setGaji] = useState("");
  const [tunj, setTunj] = useState("");
  const [tahun, setTahun] = useState("");
  const [jenis, setJenis] = useState("Efisiensi");
  const [hasil, setHasil] = useState<React.ReactNode>(null);
  const [tpl, setTpl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const hitung = () => {
    const g = +gaji || 0;
    const tj = +tunj || 0;
    const th = +tahun || 0;
    const base = g + tj;
    const mult = th < 1 ? 1 : Math.min(9, Math.floor(th) + 1);
    const upmk =
      th < 3 ? 0 : th < 6 ? 2 : th < 9 ? 3 : th < 12 ? 4 : th < 15 ? 5 : th < 18 ? 6 : th < 21 ? 7 : th < 24 ? 8 : 10;
    const f = ({ Efisiensi: 0.5, Perampingan: 1, "PHK Biasa": 1, Pensiun: 1.75, "Penutupan Perusahaan": 0.5 } as Record<string, number>)[
      jenis
    ];
    const pes = base * mult * f;
    const up = base * upmk;
    const hak = (pes + up) * 0.15;
    const tot = pes + up + hak;
    const r = (n: number) => "Rp " + Math.round(n).toLocaleString("id-ID");
    setHasil(
      <div className="res">
        <div>Uang pesangon: {r(pes)}</div>
        <div>Uang penghargaan masa kerja: {r(up)}</div>
        <div>Penggantian hak (15%): {r(hak)}</div>
        <strong>Estimasi total {r(tot)}</strong>
        <small style={{ color: "#166534" }}>Perhitungan ilustrasi untuk demo, bukan hitungan resmi.</small>
      </div>
    );
  };

  return (
    <div className="view">
      <SubHeader title="Ketenagakerjaan" subtitle="Pendampingan Hukum Ketenagakerjaan" backHref="/" />
      <div className="nh" style={{ paddingTop: 0 }}>
        <p style={{ margin: 0 }}>PHK, pesangon, kontrak kerja, pengaduan Disnaker</p>
      </div>
      <Tabs items={TABS} value={tab} onChange={setTab} idBase={ID} />

      <main className="scroll pad" id="main">
        <div role="tabpanel" id={`${ID}-panel`} aria-labelledby={tabId(ID, tab)} tabIndex={0}>
          {tab === "Kalkulator Pesangon" && (
            <>
              <div className="warn">
                Hasil ini adalah estimasi berdasarkan UU No. 13/2003 jo. PP No. 35/2021. Angka pasti bergantung pada
                ketentuan perusahaan Anda.
              </div>
              <label htmlFor="k1">Gaji Pokok (Rp)</label>
              <input id="k1" type="number" placeholder="5000000" value={gaji} onChange={(e) => setGaji(e.target.value)} />
              <label htmlFor="k2">Tunjangan Tetap (Rp)</label>
              <input id="k2" type="number" placeholder="1000000" value={tunj} onChange={(e) => setTunj(e.target.value)} />
              <label htmlFor="k3">Masa Kerja (tahun)</label>
              <input id="k3" type="number" placeholder="4" value={tahun} onChange={(e) => setTahun(e.target.value)} />
              <label htmlFor="k4">Jenis PHK</label>
              <select id="k4" value={jenis} onChange={(e) => setJenis(e.target.value)}>
                <option>Efisiensi</option>
                <option>Perampingan</option>
                <option>PHK Biasa</option>
                <option>Pensiun</option>
                <option>Penutupan Perusahaan</option>
              </select>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <button className="btn" onClick={hitung}>
                  Hitung Pesangon Saya
                </button>
              </div>
              {hasil}
            </>
          )}

          {tab === "Telaah Kontrak" && (
            <>
              <p style={{ fontSize: 12.5, color: "var(--body)", marginBottom: 10 }}>
                Unggah kontrak kerja Anda untuk ditelaah klausul-klausulnya.
              </p>
              <div className="card">
                {kontrakChecks.map((x) => (
                  <div key={x} className="chk">
                    <Icon name="search" size={15} />
                    {x}
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
                <Link className="btn" href="/dokumen">
                  Review Kontrak Kerja — Rp 15.000
                </Link>
              </div>
            </>
          )}

          {tab === "Template Disnaker" && (
            <>
              <p style={{ fontSize: 12.5, color: "var(--body)", marginBottom: 10 }}>
                Template pengaduan resmi ke Dinas Ketenagakerjaan (Disnaker).
              </p>
              <p className="t" style={{ marginBottom: 8 }}>
                Pilih jenis pengaduan:
              </p>
              {disnakerTemplates.map((x) => (
                <button key={x} className="opt" onClick={() => { setTpl(x); setCopied(false); }}>
                  <span className="cico sm" aria-hidden="true">
                    <Icon name="file" size={18} />
                  </span>
                  <div>
                    <b>{x}</b>
                    <small>Lihat &amp; unduh template</small>
                  </div>
                </button>
              ))}
            </>
          )}
        </div>
      </main>

      {tpl && (
        <Sheet title={tpl} onClose={() => setTpl(null)}>
          <div className="letter" style={{ marginTop: 4 }}>{templateBody(tpl)}</div>
          <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
            <button
              className="btn o"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}
              onClick={() => {
                navigator.clipboard?.writeText(templateBody(tpl)).then(() => setCopied(true), () => setCopied(false));
                setTimeout(() => setCopied(false), 2000);
              }}
            >
              <Icon name={copied ? "check" : "copy"} size={16} />
              {copied ? "Tersalin" : "Salin"}
            </button>
            <button className="btn" onClick={() => toast(`Mengunduh template: ${tpl}`)}>
              Unduh .docx
            </button>
          </div>
        </Sheet>
      )}
    </div>
  );
}
