"use client";

import { useState } from "react";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import Sheet from "@/components/Sheet";
import PaymentSheet from "@/components/PaymentSheet";
import { IMG } from "@/lib/data";

const profil: [string, string][] = [
  ["check", "Advokat berlisensi resmi — terdaftar PERADI"],
  ["clipboard", "Penanggung jawab hukum atas seluruh perkara BELA"],
  ["lock", "Identitas dan nomor izin ditampilkan sebelum sesi dimulai"],
  ["briefcase", "Berpengalaman di bidang ketenagakerjaan, properti, dan sengketa keluarga"],
];

const DATES = ["Hari ini", "Besok", "Kam, 30 Okt", "Jum, 31 Okt"];
const SLOTS = [
  { t: "09.00", open: true },
  { t: "10.30", open: true },
  { t: "13.00", open: false },
  { t: "15.30", open: true },
  { t: "19.00", open: true },
];

export default function Advokat() {
  const [sched, setSched] = useState(false);
  const [pay, setPay] = useState(false);
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const submit = () => {
    if (!topic.trim()) return setErr("Topik konsultasi wajib diisi.");
    if (!date) return setErr("Pilih tanggal konsultasi.");
    if (!slot) return setErr("Pilih waktu konsultasi.");
    setErr(null);
    setSched(false);
    setPay(true);
  };

  return (
    <div className="view">
      <SubHeader title="Konsultasi Advokat" backHref="/" />
      <main className="scroll pad" id="main">
        <div className="card" style={{ textAlign: "center" }}>
          <small style={{ fontSize: 11, fontWeight: 800, color: "var(--accent-ink)", letterSpacing: ".08em" }}>
            MITRA ADVOKAT RESMI BELA
          </small>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG(32)} width={64} style={{ margin: "10px auto 6px", display: "block" }} alt="" />
          <h2 style={{ fontSize: 17, fontWeight: 800 }}>Joseph Harianja &amp; Partners</h2>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>Advocates &amp; Legal Consultant · Bekasi Selatan</p>
        </div>

        <p className="t" style={{ margin: "16px 0 8px" }}>
          Profil &amp; Wewenang
        </p>
        <div className="card">
          {profil.map(([e, t]) => (
            <div key={t} className="chk">
              <span style={{ color: "var(--primary)", display: "grid", placeItems: "center" }}>
                <Icon name={e} size={16} />
              </span>
              {t}
            </div>
          ))}
        </div>

        <div className="warn" style={{ marginTop: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <Icon name="scale" size={18} />
          <div>
            <b>Catatan penting</b>
            <br />
            Nasihat hukum yang mengikat hanya keluar dari advokat JHP, dengan identitas dan nomor izin ditampilkan.
            Keluaran AI BELA dilabeli tegas sebagai informasi hukum, bukan nasihat hukum.
          </div>
        </div>

        <div className="price">
          <span>
            per sesi 30 menit
            <br />
            <small style={{ color: "var(--muted)" }}>
              Pembayaran online via aplikasi BELA · metode pembayaran dipilih saat transaksi
            </small>
          </span>
          <b>Rp 150.000</b>
        </div>
        <button className="btn" onClick={() => setSched(true)}>
          Jadwalkan Konsultasi
        </button>
      </main>

      {sched && (
        <Sheet title="Jadwalkan Konsultasi" onClose={() => setSched(false)}>
          <label htmlFor="adv-topic">Topik konsultasi</label>
          <textarea
            id="adv-topic"
            rows={3}
            placeholder="Ceritakan singkat masalah hukum Anda…"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setErr(null);
            }}
            aria-invalid={!!err && !topic.trim()}
          />

          <label htmlFor="adv-date">Tanggal</label>
          <select id="adv-date" value={date ?? ""} onChange={(e) => setDate(e.target.value || null)}>
            <option value="">Pilih tanggal…</option>
            {DATES.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>

          <label style={{ display: "block" }}>Waktu tersedia</label>
          <div className="slots" role="group" aria-label="Pilih waktu">
            {SLOTS.map((s) => (
              <button
                key={s.t}
                type="button"
                className={`slot ${slot === s.t ? "on" : ""}`}
                disabled={!s.open}
                aria-pressed={slot === s.t}
                onClick={() => {
                  setSlot(s.t);
                  setErr(null);
                }}
              >
                {s.t}
              </button>
            ))}
          </div>

          {err && (
            <p className="ferr" role="alert">
              <Icon name="help" size={13} /> {err}
            </p>
          )}

          <button className="btn" style={{ marginTop: 16 }} onClick={submit}>
            Lanjut ke Pembayaran — Rp 150.000
          </button>
        </Sheet>
      )}

      {pay && (
        <PaymentSheet
          amount="Rp 150.000"
          title="Pembayaran Konsultasi"
          onClose={() => setPay(false)}
        />
      )}
    </div>
  );
}
