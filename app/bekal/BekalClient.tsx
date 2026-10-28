"use client";

import { useState } from "react";
import Link from "next/link";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import { articles, REVIEWED_BY, REVIEWED_DATE } from "@/lib/data";

export default function BekalClient({ initial }: { initial: number | null }) {
  const [active, setActive] = useState<number | null>(initial);

  if (active !== null && articles[active]) {
    const a = articles[active];
    return (
      <div className="view">
        <div className="nh">
          <div className="back">
            <button onClick={() => setActive(null)} aria-label="Kembali">
              ←
            </button>
            <h1>Bekal Hukum</h1>
          </div>
        </div>
        <main className="scroll pad" id="main">
          <span className={`tag ${a.g ? "g" : ""}`}>{a.tag}</span>
          <h2 style={{ fontSize: 19, fontWeight: 800, margin: "10px 0 4px", lineHeight: 1.35 }}>{a.t}</h2>
          <p style={{ fontSize: 12, color: "var(--faint)" }}>
            {a.date} · {a.read}
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: "var(--body)", marginTop: 16 }}>{a.d}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 18 }}>
            <Link className="btn" href="/tanya">
              Tanya BELA lebih lanjut
            </Link>
            <Link className="btn o" href="/advokat">
              Konsultasi Advokat
            </Link>
          </div>
          <div className="stamp">
            <Icon name="check" size={13} />
            Ditinjau oleh {REVIEWED_BY} · {REVIEWED_DATE}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="view">
      <SubHeader title="Bekal Hukum" subtitle="Satu bekal hukum setiap hari" backHref="/layanan" />
      <div className="nh" style={{ paddingTop: 0 }}>
        <p style={{ margin: 0 }}>Konten harian untuk semua pelanggan aktif BELA</p>
      </div>
      <main className="scroll pad" id="main">
        {articles.map((a, i) => (
          <button key={i} className="art" onClick={() => setActive(i)}>
            <div className="th">
              <Icon name="book" size={24} />
            </div>
            <div className="bd">
              <span className={`tag ${a.g ? "g" : ""}`}>
                {a.tag} · {a.read}
              </span>
              <h3>{a.t}</h3>
              <time>{a.date}</time>
            </div>
            <span className="go">›</span>
          </button>
        ))}
      </main>
    </div>
  );
}
