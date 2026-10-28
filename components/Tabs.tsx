"use client";

import { useRef } from "react";

// [P2 A11y 4.1.2 + 2.4.3] WAI-ARIA Tabs pattern: role="tablist"/"tab",
// aria-selected, roving tabindex and arrow-key navigation. Pages wrap their
// content in a matching role="tabpanel" (id `${idBase}-panel`).

export const tabId = (base: string, t: string) =>
  `${base}-tab-${t.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`;

export default function Tabs({
  items,
  value,
  onChange,
  idBase,
}: {
  items: string[];
  value: string;
  onChange: (t: string) => void;
  idBase: string;
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKey = (e: React.KeyboardEvent, i: number) => {
    let n = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % items.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + items.length) % items.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = items.length - 1;
    if (n >= 0) {
      e.preventDefault();
      const t = items[n];
      onChange(t);
      refs.current[t]?.focus();
    }
  };

  return (
    <div className="tabs" role="tablist" aria-label="Pilih bagian">
      {items.map((t, i) => (
        <button
          key={t}
          ref={(el) => {
            refs.current[t] = el;
          }}
          id={tabId(idBase, t)}
          role="tab"
          aria-selected={value === t}
          aria-controls={`${idBase}-panel`}
          tabIndex={value === t ? 0 : -1}
          className={value === t ? "on" : ""}
          onClick={() => onChange(t)}
          onKeyDown={(e) => onKey(e, i)}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
