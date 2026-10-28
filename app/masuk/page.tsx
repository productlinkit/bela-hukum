import Link from "next/link";
import { IMG } from "@/lib/data";

export const metadata = { title: "Masuk — BELA" };

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.4 5.4 2.5 13.2l7.8 6.1C12.2 13.3 17.6 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.6c0-1.6-.1-3.1-.4-4.6H24v9.1h12.4c-.5 2.9-2.2 5.3-4.6 7l7.1 5.5c4.2-3.9 6.6-9.6 6.6-16.9z" />
      <path fill="#FBBC05" d="M10.3 28.3c-.5-1.5-.8-3-.8-4.3s.3-2.9.8-4.3l-7.8-6.1C.9 16.9 0 20.3 0 24s.9 7.1 2.5 10.4l7.8-6.1z" />
      <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.1-5.5c-2 1.3-4.6 2.1-8.1 2.1-6.4 0-11.8-3.8-13.7-9.3l-7.8 6.1C6.4 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export default function Masuk() {
  return (
    <div className="view">
      <main className="auth-wrap" id="main">
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={IMG(10)} alt="BELA — Teman Hukum Kamu" style={{ height: 44, margin: "0 auto 18px", display: "block" }} />
          <h1 style={{ fontSize: 22, fontWeight: 800 }}>Teman Hukum Kamu</h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8, lineHeight: 1.55, maxWidth: 320, marginInline: "auto" }}>
            Tanya hukum, telaah dokumen, dan konsultasi advokat berlisensi — semua dalam satu aplikasi.
          </p>
        </div>

        {/* Future: wires to Google OAuth. For now it enters the app. */}
        <Link href="/" className="gbtn">
          <GoogleG />
          Masuk dengan Google
        </Link>

        <p style={{ fontSize: 12, color: "var(--faint)", textAlign: "center", marginTop: 16, lineHeight: 1.6, maxWidth: 320, marginInline: "auto" }}>
          Dengan masuk, Anda menyetujui <b>Syarat &amp; Ketentuan</b> dan <b>Kebijakan Privasi</b> BELA.
        </p>
      </main>
    </div>
  );
}
