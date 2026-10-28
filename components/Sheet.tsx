"use client";

import { useEffect, useRef } from "react";

// Accessible bottom-sheet dialog: role=dialog, aria-modal, Esc to close,
// overlay-click to close, initial focus moved inside.
export default function Sheet({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Remember the trigger so focus returns to it when the dialog closes.
    const opener = document.activeElement as HTMLElement | null;
    const el = ref.current;
    const first = el?.querySelector<HTMLElement>(
      'button,input,select,textarea,a[href],[tabindex]:not([tabindex="-1"])'
    );
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="ov"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="sheet" ref={ref}>
        <div className="sheet-head">
          <h3>{title}</h3>
          <button className="sheet-x" aria-label="Tutup" onClick={onClose}>
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
