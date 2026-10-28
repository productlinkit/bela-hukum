"use client";

import { useRef, useState } from "react";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import PaymentSheet from "@/components/PaymentSheet";

const checks = [
  "Klausul pelepasan hak yang merugikan",
  "Ketentuan yang tidak sesuai UU Ketenagakerjaan",
  "Pasal tersembunyi yang membatasi hak Anda",
  "Estimasi hak dan kewajiban berdasarkan isi dokumen",
];

export default function Dokumen() {
  const [file, setFile] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [pay, setPay] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const start = () => {
    if (!file) {
      setErr("Unggah dokumen terlebih dahulu.");
      return;
    }
    setErr(null);
    setPay(true);
  };

  return (
    <div className="view">
      <SubHeader title="Review Dokumen" backHref="/layanan" />
      <main className="scroll pad" id="main">
        <div className="card">
          <h2 style={{ fontSize: 16, fontWeight: 800 }}>Review Dokumen Hukum</h2>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 6, lineHeight: 1.5 }}>
            Unggah kontrak atau surat Anda. BELA akan mengidentifikasi klausul berisiko dan memberikan catatan yang perlu
            Anda perhatikan.
          </p>
        </div>

        <p className="t" style={{ margin: "16px 0 4px" }}>
          Yang akan dianalisis:
        </p>
        <div className="card">
          {checks.map((t) => (
            <div key={t} className="chk">
              <i>✓</i>
              {t}
            </div>
          ))}
        </div>

        {/* Real file picker */}
        <label className={`drop ${file ? "has" : ""}`} style={{ marginTop: 14 }}>
          <span className="drop-ic" aria-hidden="true">
            <Icon name={file ? "check" : "file"} size={26} />
          </span>
          {file ? (
            <>
              <b style={{ fontSize: 13 }}>{file}</b>
              <span style={{ fontSize: 11.5, color: "var(--muted)" }}>Ketuk untuk ganti dokumen</span>
            </>
          ) : (
            <>
              <b style={{ fontSize: 13, color: "var(--ink)" }}>Unggah dokumen</b>
              <span>PDF, JPG, PNG · maks. 10MB</span>
            </>
          )}
          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                setFile(f.name);
                setErr(null);
              }
            }}
          />
        </label>
        {err && (
          <p className="ferr" role="alert">
            <Icon name="help" size={13} /> {err}
          </p>
        )}

        <div className="warn" style={{ marginTop: 14 }}>
          Review BELA bersifat informatif. Untuk penilaian mengikat, lanjutkan ke konsultasi advokat.
        </div>

        <div className="price">
          <span>
            Biaya layanan
            <br />
            <small style={{ color: "var(--muted)" }}>Per dokumen — metode pembayaran dipilih saat transaksi</small>
          </span>
          <b>Rp15.000</b>
        </div>
        <button className="btn" onClick={start}>
          Mulai Review Dokumen
        </button>
      </main>

      {pay && (
        <PaymentSheet
          amount="Rp15.000"
          title="Pembayaran Review Dokumen"
          onClose={() => setPay(false)}
          paidCtaLabel="Lihat Status Review"
        />
      )}
    </div>
  );
}
