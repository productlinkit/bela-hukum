"use client";

import { useState } from "react";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";

type Notif = { id: number; icon: string; title: string; body: string; time: string; unread?: boolean };

// [P2 UX] Real, status-only notifications — no "tes"/"twss" test data, and
// (per the privacy copy) nothing that reveals conversation or document content.
const seed: Notif[] = [
  {
    id: 1,
    icon: "calendar",
    title: "Jadwal konsultasi dikonfirmasi",
    body: "Sesi dengan Joseph Harianja & Partners dikonfirmasi untuk 28 Okt, 10.00 WIB.",
    time: "Hari ini · 09.12",
    unread: true,
  },
  {
    id: 2,
    icon: "file",
    title: "Review dokumen selesai",
    body: "Analisis kontrak kerja Anda sudah siap dilihat.",
    time: "Hari ini · 08.40",
    unread: true,
  },
  {
    id: 3,
    icon: "book",
    title: "Bekal Hukum hari ini",
    body: "Somasi: kapan perlu dan kapan cukup teguran biasa?",
    time: "Kemarin · 07.00",
  },
];

export default function Notifikasi() {
  const [items, setItems] = useState<Notif[]>(seed);

  return (
    <div className="view">
      <SubHeader title="Notifikasi" subtitle="Status layanan & pengingat" backHref="/" />
      <main className="scroll pad" id="main">
        {items.length === 0 ? (
          <div className="empty">
            <div>🔔</div>
            Tidak ada notifikasi
          </div>
        ) : (
          items.map((n) => (
            <div key={n.id} className={`notif ${n.unread ? "unread" : ""}`}>
              <div className="ndot">
                <Icon name={n.icon} size={18} className="ic-line" />
              </div>
              <div>
                <b>{n.title}</b>
                <p>{n.body}</p>
                <time>{n.time}</time>
              </div>
              <button
                className="del"
                aria-label={`Hapus notifikasi: ${n.title}`}
                onClick={() => setItems((prev) => prev.filter((x) => x.id !== n.id))}
              >
                <Icon name="trash" size={15} />
              </button>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
