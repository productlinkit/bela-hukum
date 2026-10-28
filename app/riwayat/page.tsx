"use client";

import { useMemo, useState } from "react";
import SubHeader from "@/components/SubHeader";
import BottomNav from "@/components/BottomNav";
import Tabs, { tabId } from "@/components/Tabs";
import Icon from "@/components/Icon";

const ID = "riw";
const TABS = ["Tanya BELA", "Review", "Draft", "Konsultasi", "Pembayaran"];

type Conv = { id: number; title: string; date: string };

const seed: Conv[] = [
  { id: 1, title: "Kontrak kerja tanpa pesangon", date: "19 Okt · 3 pertanyaan" },
  { id: 2, title: "Pinjol menyebarkan data kontak", date: "17 Okt · 5 pertanyaan" },
  { id: 3, title: "Tanah warisan dijual tanpa izin", date: "12 Okt · 2 pertanyaan" },
];

export default function Riwayat() {
  const [tab, setTab] = useState(TABS[0]);
  const [convs, setConvs] = useState<Conv[]>(seed);
  const [q, setQ] = useState("");

  const filtered = useMemo(
    () => convs.filter((c) => c.title.toLowerCase().includes(q.trim().toLowerCase())),
    [convs, q]
  );

  const rename = (c: Conv) => {
    const name = typeof window !== "undefined" ? window.prompt("Ubah nama percakapan", c.title) : null;
    if (name && name.trim()) setConvs((prev) => prev.map((x) => (x.id === c.id ? { ...x, title: name.trim() } : x)));
  };
  const remove = (c: Conv) => {
    if (typeof window !== "undefined" && window.confirm(`Hapus "${c.title}"?`))
      setConvs((prev) => prev.filter((x) => x.id !== c.id));
  };

  return (
    <div className="view">
      <SubHeader title="Riwayat" subtitle="Semua aktivitas hukum Anda" />
      <Tabs items={TABS} value={tab} onChange={setTab} idBase={ID} />
      <main className="scroll pad" id="main">
        <div role="tabpanel" id={`${ID}-panel`} aria-labelledby={tabId(ID, tab)} tabIndex={0}>
          {tab === "Tanya BELA" ? (
            <>
              <div className="search">
                <Icon name="search" size={16} />
                <label htmlFor="riw-search" className="visually-hidden">
                  Cari percakapan
                </label>
                <input
                  id="riw-search"
                  placeholder="Cari percakapan…"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                />
              </div>

              {filtered.length === 0 ? (
                <div className="empty">
                  <div>🔍</div>
                  {q ? "Tidak ada percakapan yang cocok" : "Belum ada riwayat"}
                </div>
              ) : (
                filtered.map((c) => (
                  <div key={c.id} className="hist">
                    <div className="hmain">
                      <b>{c.title}</b>
                      <small>{c.date}</small>
                    </div>
                    <div className="hact">
                      <button onClick={() => rename(c)} aria-label={`Ubah nama "${c.title}"`}>
                        <Icon name="pencil" size={15} />
                      </button>
                      <button onClick={() => remove(c)} aria-label={`Hapus "${c.title}"`}>
                        <Icon name="trash" size={15} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </>
          ) : (
            <div className="empty">
              <div>📋</div>
              Belum ada riwayat
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
