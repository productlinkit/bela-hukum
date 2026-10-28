"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "./Icon";
import { IMG } from "@/lib/data";

// Desktop-only left navigation (hidden on mobile, where BottomNav is used).
const items = [
  { href: "/", label: "Beranda", icon: "home" },
  { href: "/layanan", label: "Layanan", icon: "grid" },
  { href: "/riwayat", label: "Riwayat", icon: "clock" },
  { href: "/notifikasi", label: "Notifikasi", icon: "bell" },
  { href: "/paket", label: "Paket BELA", icon: "box" },
  { href: "/profil", label: "Profil", icon: "user" },
];

export default function Sidebar() {
  const path = usePathname();
  // No app chrome on the login screen.
  if (path === "/masuk") return null;
  return (
    <aside className="sidebar" aria-label="Navigasi utama">
      <Link href="/" className="brand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={IMG(10)} alt="BELA — Teman Hukum Kamu" />
      </Link>
      <nav>
        {items.map((it) => {
          const on = it.href === "/" ? path === "/" : path.startsWith(it.href);
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`snav ${on ? "on" : ""}`}
              aria-current={on ? "page" : undefined}
            >
              <Icon name={it.icon} size={20} />
              {it.label}
            </Link>
          );
        })}
      </nav>
      <div className="spacer" />
      <div className="side-foot">
        BELA — Teman Hukum Kamu
        <br />
        Layanan hukum oleh JHP · v4.0
      </div>
    </aside>
  );
}
