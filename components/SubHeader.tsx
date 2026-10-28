"use client";

import { useRouter } from "next/navigation";

// Renders a <header> landmark. One <h1> per screen lives here.
export default function SubHeader({
  title,
  subtitle,
  backHref,
}: {
  title: string;
  subtitle?: string;
  backHref?: string;
}) {
  const router = useRouter();
  return (
    <header className="nh">
      <div className="back">
        {backHref !== undefined && (
          <button onClick={() => router.push(backHref)} aria-label="Kembali">
            ←
          </button>
        )}
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}
