"use client";

import { useState } from "react";
import SubHeader from "@/components/SubHeader";
import Icon from "@/components/Icon";
import PaymentSheet from "@/components/PaymentSheet";
import Sheet from "@/components/Sheet";
import { IMG } from "@/lib/data";
import { plans, advocateFee, type Plan } from "@/lib/plans";

export default function Paket() {
  const [confirm, setConfirm] = useState<Plan | null>(null);
  const [pay, setPay] = useState<Plan | null>(null);
  return (
    <div className="view">
      <SubHeader title="Paket BELA" backHref="/layanan" />
      <div className="nh" style={{ paddingTop: 0 }}>
        <div className="sub2" style={{ marginTop: 0 }}>
          Pilih Paket BELA Anda
        </div>
        <p>Bayar via aplikasi pembayaran favorit Anda. Aktif otomatis setelah bayar.</p>
      </div>
      <main className="scroll pad" id="main" style={{ paddingTop: 18 }}>
        {plans.map((p) => (
          <div key={p.code} className={`plan col ${p.featured ? "pop" : ""} ${p.current ? "cur" : ""}`}>
            {/* [P2] current plan marked so users don't re-buy; featured flagged */}
            {p.current && (
              <span className="badge now">
                <Icon name="check" size={12} /> Paket Anda
              </span>
            )}
            {!p.current && p.featured && (
              <span className="badge">
                <Icon name="star" size={12} /> Paling Populer
              </span>
            )}

            <div className="prow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG(p.img)} alt="" />
              <div>
                <b>{p.name}</b>
                <br />
                <span className="q">{p.quota}</span>
                {p.perDay && <small className="perday">{p.perDay}</small>}
              </div>
              <div className="pr">
                <strong>{p.price}</strong>
                <small>{p.period}</small>
              </div>
            </div>

            <div className="benefits">
              {p.benefits.map((b) => (
                <span key={b}>
                  <i>
                    <Icon name="check" size={13} />
                  </i>
                  {b}
                </span>
              ))}
            </div>

            {p.current ? (
              <div style={{ marginTop: 10 }}>
                <span className="curtag">Sedang aktif</span>
              </div>
            ) : (
              <button
                className={`btn ${p.featured ? "" : "o"}`}
                style={{ marginTop: 12 }}
                onClick={() => setConfirm(p)}
              >
                Pilih {p.name}
              </button>
            )}
          </div>
        ))}

        <div className="note">
          <Icon name="info" size={16} />
          <span>
            Sesi advokat tidak termasuk dalam paket mana pun. Konsultasi advokat selalu dirujuk dan ditagih terpisah —{" "}
            {advocateFee}.
          </span>
        </div>
      </main>

      {/* [UX Error Prevention] Confirm the plan + price before paying */}
      {confirm && (
        <Sheet title="Konfirmasi Paket" onClose={() => setConfirm(null)}>
          <p>Anda akan membeli paket berikut:</p>
          <div className="price" style={{ marginTop: 12 }}>
            <span>
              <b style={{ fontSize: 14 }}>{confirm.name}</b>
              <br />
              <small style={{ color: "var(--muted)" }}>{confirm.quota}</small>
            </span>
            <b>
              {confirm.price}
              {confirm.period}
            </b>
          </div>
          <p style={{ fontSize: 12, color: "var(--muted)" }}>
            Pembayaran diproses lewat metode yang Anda pilih di aplikasi. Paket aktif otomatis setelah pembayaran
            berhasil.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
            <button
              className="btn"
              onClick={() => {
                const c = confirm;
                setConfirm(null);
                setPay(c);
              }}
            >
              Konfirmasi &amp; Bayar
            </button>
            <button className="btn o" onClick={() => setConfirm(null)}>
              Batal
            </button>
          </div>
        </Sheet>
      )}

      {pay && (
        <PaymentSheet
          amount={`${pay.price}${pay.period}`}
          title={`Bayar ${pay.name}`}
          onClose={() => setPay(null)}
        />
      )}
    </div>
  );
}
