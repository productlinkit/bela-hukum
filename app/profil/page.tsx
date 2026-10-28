"use client";

import { useState } from "react";
import Link from "next/link";
import BottomNav from "@/components/BottomNav";
import Icon from "@/components/Icon";
import Sheet from "@/components/Sheet";
import { user, toast } from "@/lib/data";
import { currentPlan, quota } from "@/lib/plans";

type SheetKey = "notif" | "privasi" | "bantuan" | "syarat" | "kebijakan" | "unreg";

const SHEET_TITLES: Record<SheetKey, string> = {
  notif: "Aktifkan Notifikasi",
  privasi: "Hapus Akun Permanen",
  bantuan: "Bantuan",
  syarat: "Syarat & Ketentuan",
  kebijakan: "Kebijakan Privasi",
  unreg: "Kelola Langganan",
};

const accountMenu: [string, string, string, SheetKey][] = [
  ["bell", "Notifikasi", "Izin & preferensi", "notif"],
  ["lock", "Privasi & Data", "Kelola data pribadi Anda", "privasi"],
  ["help", "Bantuan", "FAQ dan cara penggunaan", "bantuan"],
  ["file", "Syarat & Ketentuan", "", "syarat"],
  ["shield", "Kebijakan Privasi", "", "kebijakan"],
];

function SheetBody({ sheet }: { sheet: SheetKey }) {
  switch (sheet) {
    case "notif":
      return (
        <>
          <p>Izinkan notifikasi agar Anda tidak melewatkan hal penting:</p>
          <h5>Status konsultasi advokat</h5>
          <p>Kabar saat jadwal dikonfirmasi atau berubah.</p>
          <h5>Review dokumen selesai</h5>
          <p>Diberi tahu begitu analisis dokumen Anda siap.</p>
          <p style={{ marginTop: 12, color: "var(--muted)" }}>
            Notifikasi hanya berisi status dan pengingat — tidak pernah memuat isi percakapan atau dokumen hukum Anda.
          </p>
        </>
      );
    case "privasi":
      return (
        <>
          <p>
            Seluruh data Anda akan dihapus permanen: riwayat percakapan, dokumen yang diunggah, hasil review, draft
            surat, jadwal konsultasi, dan notifikasi. Tindakan ini tidak dapat dibatalkan.
          </p>
          <label htmlFor="hapus-konfirmasi">Ketik HAPUS untuk konfirmasi</label>
          <input id="hapus-konfirmasi" placeholder="HAPUS" />
          <button className="btn" style={{ marginTop: 12, background: "var(--danger)" }} onClick={() => toast("Hapus akun")}>
            Hapus Akun Saya
          </button>
        </>
      );
    case "bantuan":
      return (
        <>
          <h5>Cara pakai BELA</h5>
          <ul>
            <li>
              <b>Tanya BELA</b> — tulis pertanyaan hukum Anda, dijawab asisten AI BELA dengan rujukan hukum tervalidasi.
            </li>
            <li>
              <b>Review Dokumen</b> — unggah kontrak/surat (PDF, JPG, PNG, maks. 10MB), BELA menandai klausul berisiko.
            </li>
            <li>
              <b>Draft Surat</b> — pilih jenis surat, isi formulir, unduh PDF siap kirim.
            </li>
            <li>
              <b>Konsultasi Advokat</b> — pilih jadwal dengan mitra advokat Joseph Harianja &amp; Partners.
            </li>
            <li>
              <b>Bekal Hukum</b> — ringkasan hukum harian pukul 07.00.
            </li>
          </ul>
          <h5>Kuota pertanyaan</h5>
          <p>
            Paket harian mendapat kuota pertanyaan per hari. Kuota reset setiap hari dan hanya terpakai saat pertanyaan
            berhasil dijawab.
          </p>
          <h5>Masih butuh bantuan?</h5>
          <p>
            Hubungi tim dukungan BELA di{" "}
            <a className="lnk" href="mailto:bantuan@belahukum.com">
              bantuan@belahukum.com
            </a>{" "}
            atau lewat Pusat Bantuan di aplikasi.
          </p>
        </>
      );
    case "syarat":
      return (
        <>
          <h5>Ringkasan Layanan</h5>
          <p>
            BELA adalah aplikasi layanan informasi hukum digital: informasi hukum umum, telaah dokumen, pembuatan draft
            surat, dan rujukan ke advokat mitra.
          </p>
          <h5>Bukan Nasihat Hukum Mengikat</h5>
          <p>
            Jawaban BELA bersifat informasi hukum. Nasihat hukum yang mengikat hanya diberikan advokat berlisensi
            melalui sesi konsultasi.
          </p>
          <h5>Langganan &amp; Tagihan</h5>
          <p>
            Paket dan layanan berbayar dibayar melalui metode pembayaran yang Anda pilih di aplikasi (mis. e-wallet /
            virtual account / kartu). Berhenti kapan saja lewat Profil → Kelola Langganan. Sisa kuota tetap berlaku sampai
            periode berakhir.
          </p>
          <h5>Batasan Tanggung Jawab</h5>
          <p>BELA tidak menggantikan nasihat profesional untuk perkara spesifik Anda dan tidak menjamin hasil perkara.</p>
        </>
      );
    case "kebijakan":
      return (
        <>
          <h5>Data yang Kami Kumpulkan</h5>
          <p>
            Nomor HP, nama, dan data yang Anda kirimkan saat memakai layanan (pertanyaan, dokumen yang diunggah, draft
            surat).
          </p>
          <h5>Bagaimana Kami Memakai Data</h5>
          <p>
            Menjawab pertanyaan dan memproses layanan yang Anda minta. Telaah dokumen diproses server-side; dokumen
            disimpan privat dan dihapus otomatis maksimal 90 hari.
          </p>
          <h5>Notifikasi</h5>
          <p>Notifikasi hanya berisi status layanan — tidak pernah memuat isi percakapan atau dokumen Anda.</p>
          <h5>Hak Anda</h5>
          <p>
            Anda dapat meminta penghapusan akun dan seluruh data terkait kapan saja melalui Profil → Privasi &amp; Data →
            Hapus Akun. Penghapusan bersifat permanen.
          </p>
        </>
      );
    case "unreg":
      return (
        <>
          <p>
            Paket aktif Anda saat ini: <b>BELA Gratis</b>. Paket berbayar bisa dihentikan kapan saja dari sini —
            perpanjangan otomatis akan dimatikan dan sisa kuota tetap berlaku sampai periode berakhir.
          </p>
          <button className="btn o" style={{ marginTop: 12 }} onClick={() => toast("Matikan perpanjangan otomatis")}>
            Matikan Perpanjangan Otomatis
          </button>
          <p style={{ marginTop: 10, color: "var(--muted)" }}>(Demo — tidak ada langganan yang diubah.)</p>
        </>
      );
  }
}

export default function Profil() {
  const [sheet, setSheet] = useState<SheetKey | null>(null);

  return (
    <div className="view">
      <header className="pf">
        <h1>Profil</h1>
        <div className="pfu">
          <div className="pfa">{user.ini}</div>
          <div>
            <b>{user.name}</b>
            <small>{user.email}</small>
            <small>Akun Google</small>
          </div>
        </div>
      </header>

      <main className="scroll" id="main" style={{ background: "var(--app)" }}>
        <div className="pc">
          <div className="r">
            <span>Paket Aktif</span>
            <Link href="/paket" style={{ fontWeight: 700, color: "var(--primary)", fontSize: 12 }}>
              Upgrade
            </Link>
          </div>
          {/* Clean flex layout (replaces the clone's overlapping negative margins) */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 10 }}>
            <div>
              <h2 style={{ margin: 0 }}>{currentPlan.name}</h2>
              <div className="metasm" style={{ color: "var(--muted)", marginTop: 2 }}>
                Kuota harian gratis
              </div>
            </div>
            <div style={{ textAlign: "right", lineHeight: 1 }}>
              <div style={{ fontSize: 24, fontWeight: 800 }}>{quota.left}</div>
              <div className="metasm" style={{ color: "var(--muted)", marginTop: 2 }}>
                tersisa
              </div>
            </div>
          </div>
          <div className="bar">
            <i />
          </div>
          <div style={{ fontSize: 12, color: "var(--faint)", marginTop: 6 }}>
            {quota.left} dari {quota.total} pertanyaan tersisa hari ini
          </div>
        </div>

        <div className="grp">PAKET &amp; KUOTA</div>
        <div className="menu">
          <Link className="mi" href="/paket">
            <span className="e">
              <Icon name="box" className="ic-line" />
            </span>
            <div>
              <b>Paket Aktif</b>
              <small>
                {currentPlan.name} · {quota.left} pertanyaan tersisa
              </small>
            </div>
            <span className="c">›</span>
          </Link>
          <Link className="mi" href="/riwayat">
            <span className="e">
              <Icon name="chart" className="ic-line" />
            </span>
            <div>
              <b>Riwayat Penggunaan</b>
              <small>Lihat detail kuota</small>
            </div>
            <span className="c">›</span>
          </Link>
        </div>

        <div className="grp">LAYANAN</div>
        <div className="menu">
          <Link className="mi" href="/tanya">
            <span className="e">
              <Icon name="message" className="ic-line" />
            </span>
            <div>
              <b>Tanya BELA</b>
              <small>Mulai sesi baru</small>
            </div>
            <span className="c">›</span>
          </Link>
          <Link className="mi" href="/advokat">
            <span className="e">
              <Icon name="calendar" className="ic-line" />
            </span>
            <div>
              <b>Konsultasi Advokat</b>
              <small>Joseph Harianja &amp; Partners</small>
            </div>
            <span className="c">›</span>
          </Link>
        </div>

        <div className="grp">AKUN &amp; PENGATURAN</div>
        <div className="menu">
          {accountMenu.map(([icon, t, s, k]) => (
            <button key={k} className="mi" onClick={() => setSheet(k)}>
              <span className="e">
                <Icon name={icon} className="ic-line" />
              </span>
              <div>
                <b>{t}</b>
                {s && <small>{s}</small>}
              </div>
              <span className="c">›</span>
            </button>
          ))}
        </div>

        <button className="dg" onClick={() => setSheet("unreg")}>
          Kelola Langganan
        </button>
        <Link
          className="dg"
          style={{ color: "var(--muted)", marginTop: -4, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}
          href="/masuk"
        >
          <Icon name="logout" size={16} /> Keluar dari Akun
        </Link>

        <div className="ft">
          BELA — Teman Hukum Kamu
          <br />
          Layanan hukum oleh Joseph Harianja &amp; Partners
          <br />
          Versi 4.0
        </div>
      </main>

      <BottomNav />

      {sheet && (
        <Sheet title={SHEET_TITLES[sheet]} onClose={() => setSheet(null)}>
          <SheetBody sheet={sheet} />
          <button className="btn" style={{ marginTop: 16 }} onClick={() => setSheet(null)}>
            Tutup
          </button>
        </Sheet>
      )}
    </div>
  );
}
