"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import Sheet from "@/components/Sheet";

type Msg = {
  id: number;
  me: boolean;
  text: string;
  time: string;
  thinking?: boolean;
  source?: string;
  error?: boolean;
  retry?: string;
};

const chips = ["Masalah pinjol", "PHK & pesangon", "Waris & tanah"];
const faqs = [
  "Gaji saya dipotong tanpa surat, boleh?",
  "Kontrak kerja saya tidak ada pesangon",
  "Pinjol menyebarkan data saya",
  "Tanah warisan dijual tanpa ijin",
];

const DEMO_REPLY =
  "Ini hanya tampilan demo, jadi BELA tidak benar-benar menjawab. Di aplikasi asli, jawaban AI dengan rujukan pasal akan muncul di sini.";
const DEMO_SOURCE = "UU No. 13/2003 tentang Ketenagakerjaan — Pasal 156 (uang pesangon)";

export default function Tanya() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const [source, setSource] = useState<string | null>(null);
  const [welcomeTime, setWelcomeTime] = useState("");
  const chatRef = useRef<HTMLElement>(null);
  const idRef = useRef(0);
  const started = msgs.length > 0;

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  // [UX] Live welcome timestamp (set after mount to stay hydration-safe)
  useEffect(() => {
    const d = new Date();
    setWelcomeTime(`${String(d.getHours()).padStart(2, "0")}.${String(d.getMinutes()).padStart(2, "0")}`);
  }, []);

  const ask = (q: string, isRetry = false) => {
    const question = q.trim();
    if (!question) return;
    if (!isRetry) setMsgs((prev) => [...prev, { id: ++idRef.current, me: true, text: question, time: "" }]);
    const botId = ++idRef.current;

    // [UX Error Recovery] offline → failed-answer state with retry
    if (typeof navigator !== "undefined" && navigator.onLine === false) {
      setMsgs((prev) => [
        ...prev,
        { id: botId, me: false, text: "Gagal mengirim pertanyaan — periksa koneksi internet Anda.", time: "", error: true, retry: question },
      ]);
      return;
    }

    // [UX] visible thinking state, then the answer with an openable source.
    setMsgs((prev) => [...prev, { id: botId, me: false, text: "", time: "", thinking: true }]);
    setTimeout(() => {
      setMsgs((prev) =>
        prev.map((m) =>
          m.id === botId ? { ...m, text: DEMO_REPLY, time: "sekarang", thinking: false, source: DEMO_SOURCE } : m
        )
      );
    }, 700);
  };

  const retry = (botId: number, question: string) => {
    setMsgs((prev) => prev.filter((m) => m.id !== botId));
    ask(question, true);
  };

  return (
    <div className="view">
      <SubHeader title="Tanya BELA" backHref="/" />
      <div className="disc">
        Jawaban BELA adalah informasi hukum, bukan nasihat hukum mengikat. Nasihat mengikat hanya dari advokat
        berlisensi.
      </div>

      <main className="chat" id="main" ref={chatRef}>
        <div className="msg">
          <div className="av" aria-hidden="true">
            B
          </div>
          <div className="bub">
            <b>BELA</b>
            <br />
            Halo! Saya BELA, asisten hukum digital Anda. Saya bisa bantu menjawab pertanyaan hukum, memandu langkah awal,
            dan jika dibutuhkan, menghubungkan Anda dengan advokat berlisensi.
            <br />
            <br />
            Apa yang ingin Anda tanyakan hari ini?
            <time suppressHydrationWarning>{welcomeTime}</time>
          </div>
        </div>

        {/* [UX] Starter chips + FAQ retire once the conversation begins */}
        {!started && (
          <>
            <div className="chips">
              {chips.map((c) => (
                <button key={c} className="chip" onClick={() => ask(c)}>
                  {c}
                </button>
              ))}
            </div>
            <div className="faq">Pertanyaan yang sering ditanyakan</div>
            {faqs.map((q) => (
              <button key={q} className="faqi" onClick={() => ask(q)}>
                {q}
              </button>
            ))}
          </>
        )}

        {/* [P1 A11y] Answers announced to assistive tech */}
        <div role="log" aria-live="polite" aria-label="Percakapan dengan BELA">
          {msgs.map((m) => (
            <div key={m.id}>
              <div className="msg">
                {!m.me && (
                  <div className="av" aria-hidden="true">
                    B
                  </div>
                )}
                <div
                  className={`bub ${m.me ? "me" : ""} ${m.error ? "err" : ""}`}
                  aria-busy={m.thinking || undefined}
                  aria-label={m.thinking ? "BELA sedang mengetik" : undefined}
                  role={m.error ? "alert" : undefined}
                >
                  {m.thinking ? (
                    <span className="dots" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </span>
                  ) : (
                    m.text
                  )}
                  {m.time && <time>{m.time}</time>}
                  {m.error && m.retry && (
                    <button className="retry" onClick={() => retry(m.id, m.retry!)}>
                      <Icon name="refresh" size={14} /> Coba lagi
                    </button>
                  )}
                </div>
              </div>
              {m.source && (
                <button className="srcchip" onClick={() => setSource(m.source!)}>
                  <Icon name="file" size={13} />
                  <span className="lbl">Dasar hukum: {m.source}</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </main>

      <form
        className="compose"
        onSubmit={(e) => {
          e.preventDefault();
          ask(draft);
          setDraft("");
        }}
      >
        <Link className="send" href="/dokumen" aria-label="Lampirkan dokumen untuk direview" style={{ background: "var(--line2)", color: "var(--primary)" }}>
          <Icon name="paperclip" size={18} />
        </Link>
        <label htmlFor="chat-input" className="visually-hidden">
          Pertanyaan hukum Anda
        </label>
        <input
          id="chat-input"
          name="q"
          aria-label="Pertanyaan hukum Anda"
          placeholder="Tulis pertanyaan hukum Anda..."
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button className="send" aria-label="Kirim pertanyaan">
          ➤
        </button>
      </form>

      {source && (
        <Sheet title="Dasar Hukum" onClose={() => setSource(null)}>
          <h5>{source}</h5>
          <p>
            Ini kutipan rujukan versi demo. Di aplikasi asli, chip ini membuka bunyi pasal lengkap beserta tautan ke
            sumber resmi (mis. peraturan.go.id) sehingga Anda bisa memverifikasi sendiri.
          </p>
          <p style={{ marginTop: 10 }}>
            <a className="lnk" href="https://peraturan.go.id" target="_blank" rel="noopener noreferrer">
              Buka sumber resmi ↗
            </a>
          </p>
          <button className="btn" style={{ marginTop: 16 }} onClick={() => setSource(null)}>
            Tutup
          </button>
        </Sheet>
      )}
    </div>
  );
}
