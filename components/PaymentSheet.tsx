"use client";

import { useState } from "react";
import Sheet from "./Sheet";
import Icon from "./Icon";

type Method = { code: string; name: string; group: string; icon: string };

const METHODS: Method[] = [
  { code: "gopay", name: "GoPay", group: "E-Wallet", icon: "card" },
  { code: "ovo", name: "OVO", group: "E-Wallet", icon: "card" },
  { code: "dana", name: "DANA", group: "E-Wallet", icon: "card" },
  { code: "bca_va", name: "Virtual Account BCA", group: "Virtual Account", icon: "box" },
  { code: "mandiri_va", name: "Virtual Account Mandiri", group: "Virtual Account", icon: "box" },
  { code: "card", name: "Kartu Debit / Kredit", group: "Kartu", icon: "card" },
];

export default function PaymentSheet({
  amount,
  title = "Pilih Metode Pembayaran",
  onClose,
  onPaid,
  paidCtaLabel,
  onPaidCta,
}: {
  amount: string;
  title?: string;
  onClose: () => void;
  onPaid?: () => void;
  paidCtaLabel?: string;
  onPaidCta?: () => void;
}) {
  const [sel, setSel] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <Sheet title="Pembayaran Berhasil" onClose={onClose}>
        <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
          <div className="cico green" style={{ width: 56, height: 56, borderRadius: "50%", margin: "0 auto 12px" }}>
            <Icon name="check" size={30} />
          </div>
          <p style={{ fontSize: 14, fontWeight: 700 }}>Pembayaran {amount} berhasil</p>
          <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>
            Bukti pembayaran telah dikirim ke email Anda.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
          {paidCtaLabel && (
            <button
              className="btn"
              onClick={() => {
                onPaidCta?.();
                onClose();
              }}
            >
              {paidCtaLabel}
            </button>
          )}
          <button className={paidCtaLabel ? "btn o" : "btn"} onClick={onClose}>
            Selesai
          </button>
        </div>
      </Sheet>
    );
  }

  const groups = Array.from(new Set(METHODS.map((m) => m.group)));

  return (
    <Sheet title={title} onClose={onClose}>
      <div className="price" style={{ marginTop: 2 }}>
        <span>Total pembayaran</span>
        <b>{amount}</b>
      </div>
      <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
        <legend className="visually-hidden">Metode pembayaran</legend>
        {groups.map((g) => (
          <div key={g}>
            <p className="paygrp">{g}</p>
            {METHODS.filter((m) => m.group === g).map((m) => (
              <label key={m.code} className={`paymethod ${sel === m.code ? "on" : ""}`}>
                <span className="pm-ic" aria-hidden="true">
                  <Icon name={m.icon} size={18} />
                </span>
                <span className="pm-name">{m.name}</span>
                <input
                  type="radio"
                  name="paymethod"
                  value={m.code}
                  checked={sel === m.code}
                  onChange={() => setSel(m.code)}
                />
                <span className="pm-radio" aria-hidden="true" />
              </label>
            ))}
          </div>
        ))}
      </fieldset>
      <button
        className="btn"
        style={{ marginTop: 16 }}
        disabled={!sel}
        onClick={() => {
          setPaid(true);
          onPaid?.();
        }}
      >
        Bayar {amount}
      </button>
    </Sheet>
  );
}
