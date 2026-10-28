"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items: { href: string; label: string; icon: React.ReactNode }[] = [
  {
    href: "/",
    label: "Beranda",
    icon: <path d="M12 3 2 12h3v8h5v-6h4v6h5v-8h3z" />,
  },
  {
    href: "/layanan",
    label: "Layanan",
    icon: (
      <>
        <rect x="4" y="4" width="7" height="7" rx="1.5" />
        <rect x="13" y="4" width="7" height="7" rx="1.5" />
        <rect x="4" y="13" width="7" height="7" rx="1.5" />
        <rect x="13" y="13" width="7" height="7" rx="1.5" />
      </>
    ),
  },
  {
    href: "/riwayat",
    label: "Riwayat",
    icon: <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 5v5.2l4 2.4-.8 1.3L11 13V7z" />,
  },
  {
    href: "/profil",
    label: "Profil",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7z" />
      </>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();
  return (
    <nav className="nav" aria-label="Navigasi utama">
      {items.map(({ href, label, icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`tab ${active ? "on" : ""}`}
            aria-current={active ? "page" : undefined}
          >
            <svg viewBox="0 0 24 24">{icon}</svg>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
