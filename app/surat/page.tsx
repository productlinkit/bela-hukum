"use client";

import { useState } from "react";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import PaymentSheet from "@/components/PaymentSheet";
import { toast } from "@/lib/data";

const types: [string, string, string][] = [
  ["scale", "Surat Somasi", "Teguran resmi sebelum tindakan hukum"],
  ["briefcase", "Keberatan PHK", "Keberatan atas pemutusan hubungan kerja"],
  ["shield", "Pengaduan Pinjol", "Laporan ke Satgas PASTI / OJK"],
  ["cart", "Keberatan Konsumen", "Sengketa produk atau layanan"],
  ["lock", "Permintaan Hapus Data", "Hak penghapusan data pribadi (UU PDP)"],
  ["file", "Surat Teguran Lainnya", "Surat teguran untuk keperluan lain"],
];

type Errs = { f1?: string; f4?: string };

export default function Surat() {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<string | null>(null);
  const [f, setF] = useState({ f1: "", f2: "", f3: "", f4: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [pay, setPay] = useState(false);

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setF((prev) => ({ ...prev, [k]: e.target.value }));
    setErrs((prev) => ({ ...prev, [k]: undefined }));
  };

  // [3.3.1] Validate required fields with identifiable, text errors.
  const toPreview = () => {
    const next: Errs = {};
    if (!f.f1.trim()) next.f1 = "Nama lengkap wajib diisi.";
    if (!f.f4.trim()) next.f4 = "Uraian singkat masalah wajib diisi.";
    setErrs(next);
    if (Object.keys(next).length === 0) setStep(3);
  };

  const letter = `Kepada Yth.
${f.f2 || "[Pihak yang dituju]"}

Hal: ${type}

Dengan hormat,
Saya, ${f.f1 || "[Nama Anda]"}, dengan ini menyampaikan ${(type || "").toLowerCase()} terkait kejadian pada ${f.f3 || "[tanggal]"}.

${f.f4 || "[Uraian masalah]"}

Demikian surat ini kami sampaikan.

Hormat saya,
${f.f1 || "[Nama Anda]"}`;

  return (
    <div className="view">
      <SubHeader title="Draft Surat" backHref="/layanan" />
      <div className="nh" style={{ paddingTop: 0, marginTop: -1 }}>
        <div className="sub2" style={{ marginTop: 0 }}>
          Draft Surat Somasi
        </div>
        <p>Penyusunan surat resmi siap kirim — Rp25.000/surat</p>
      </div>

      <div className="step" aria-label={`Langkah ${step} dari 3`}>
        <span className={step >= 1 ? "on" : ""}>1</span>
        Pilih<u />
        <span className={step >= 2 ? "on" : ""}>2</span>
        Isi<u />
        <span className={step >= 3 ? "on" : ""}>3</span>
        Preview
      </div>

      <main className="scroll pad" id="main">
        {step === 1 && (
          <>
            <p className="t">Pilih Jenis Surat</p>
            <p style={{ fontSize: 12, color: "var(--muted)", margin: "3px 0 12px" }}>
              Rp25.000 / surat — metode pembayaran dipilih saat transaksi
            </p>
            {types.map(([e, t, d]) => (
              <button
                key={t}
                className={`opt ${type === t ? "on" : ""}`}
                onClick={() => {
                  setType(t);
                  setStep(2);
                }}
              >
                <span className="cico sm" aria-hidden="true">
                  <Icon name={e} size={18} />
                </span>
                <div>
                  <b>{t}</b>
                  <small>{d}</small>
                </div>
              </button>
            ))}
          </>
        )}

        {step === 2 && (
          <>
            <p className="t">{type}</p>
            <label htmlFor="f1">Nama lengkap Anda</label>
            <input
              id="f1"
              placeholder="Nama sesuai KTP"
              value={f.f1}
              onChange={set("f1")}
              aria-invalid={!!errs.f1}
              aria-describedby={errs.f1 ? "f1-err" : undefined}
            />
            {errs.f1 && (
              <p className="ferr" id="f1-err">
                <Icon name="help" size={13} /> {errs.f1}
              </p>
            )}

            <label htmlFor="f2">Nama pihak yang dituju</label>
            <input id="f2" placeholder="Nama orang / perusahaan" value={f.f2} onChange={set("f2")} />

            <label htmlFor="f3">Tanggal kejadian</label>
            <input id="f3" type="date" value={f.f3} onChange={set("f3")} />

            <label htmlFor="f4">Uraian singkat masalah</label>
            <textarea
              id="f4"
              rows={4}
              placeholder="Ceritakan kronologi singkat..."
              value={f.f4}
              onChange={set("f4")}
              aria-invalid={!!errs.f4}
              aria-describedby={errs.f4 ? "f4-err" : undefined}
            />
            {errs.f4 && (
              <p className="ferr" id="f4-err">
                <Icon name="help" size={13} /> {errs.f4}
              </p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              <button className="btn" onClick={toPreview}>
                Lanjut ke Preview
              </button>
              <button className="btn o" onClick={() => setStep(1)}>
                Kembali
              </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <p className="t">Preview {type}</p>
            <div className="letter" style={{ marginTop: 10 }}>
              {letter}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
              <button className="btn" onClick={() => setPay(true)}>
                Bayar &amp; Unduh PDF — Rp25.000
              </button>
              <button className="btn o" onClick={() => setStep(2)}>
                Ubah Isian
              </button>
            </div>
          </>
        )}
      </main>

      {pay && (
        <PaymentSheet
          amount="Rp25.000"
          title="Pembayaran Draft Surat"
          onClose={() => setPay(false)}
          paidCtaLabel="Unduh PDF"
          onPaidCta={() => toast("Mengunduh PDF surat Anda")}
        />
      )}
    </div>
  );
}
