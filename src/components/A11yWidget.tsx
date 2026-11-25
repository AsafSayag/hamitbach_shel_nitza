"use client";

import { useEffect, useRef, useState } from "react";
import { openLegal } from "./Legal";

type Prefs = { size: number; contrast: boolean; links: boolean; motion: boolean };

const DEFAULTS: Prefs = { size: 0, contrast: false, links: false, motion: false };
const KEY = "nitza-a11y";
const SIZES = [100, 112.5, 125, 137.5];

function apply(p: Prefs) {
  const el = document.documentElement;
  el.style.fontSize = p.size ? `${SIZES[p.size]}%` : "";
  el.classList.toggle("a11y-contrast", p.contrast);
  el.classList.toggle("a11y-links", p.links);
  el.classList.toggle("a11y-motion", p.motion);
}

export default function A11yWidget() {
  const [open, setOpen] = useState(false);
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS);
  const box = useRef<HTMLDivElement>(null);

  // טוען העדפות שנשמרו בביקור קודם
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) {
        const p = { ...DEFAULTS, ...JSON.parse(saved) } as Prefs;
        setPrefs(p);
        apply(p);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (box.current && !box.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  function update(next: Prefs) {
    setPrefs(next);
    apply(next);
    try {
      const isDefault = JSON.stringify(next) === JSON.stringify(DEFAULTS);
      if (isDefault) localStorage.removeItem(KEY);
      else localStorage.setItem(KEY, JSON.stringify(next));
    } catch {}
  }

  const toggles: { key: "contrast" | "links" | "motion"; label: string }[] = [
    { key: "contrast", label: "ניגודיות גבוהה" },
    { key: "links", label: "הדגשת קישורים" },
    { key: "motion", label: "עצירת אנימציות" },
  ];

  return (
    <div className="a11y" ref={box}>
      <button
        type="button"
        className="a11y-btn"
        aria-label="תפריט נגישות"
        aria-expanded={open}
        aria-controls="a11y-panel"
        onClick={() => setOpen((o) => !o)}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <circle cx="12" cy="4.6" r="2.1" />
          <path d="M20.2 8.300c.2.700-.2 1.400-.900 1.600l-4.500 1.200v3.300l2.200 5.700c.3.700-.1 1.400-.700 1.700-.700.300-1.400-.1-1.700-.700L12 15.400l-2.600 5.700c-.3.600-1 1-1.700.7-.600-.3-1-1-.700-1.700l2.200-5.700v-3.300L4.700 9.900c-.7-.2-1.100-.9-.900-1.600.2-.7.900-1.100 1.600-.9l4.800 1.200h3.600l4.800-1.200c.7-.2 1.400.2 1.600.9Z" />
        </svg>
      </button>

      {open && (
        <div id="a11y-panel" className="a11y-panel" role="dialog" aria-label="התאמות נגישות">
          <p className="a11y-title">נגישות</p>

          <div className="a11y-size">
            <span>גודל טקסט</span>
            <div>
              <button
                type="button"
                onClick={() => update({ ...prefs, size: Math.max(0, prefs.size - 1) })}
                disabled={prefs.size === 0}
                aria-label="הקטנת טקסט"
              >
                א−
              </button>
              <button
                type="button"
                onClick={() => update({ ...prefs, size: Math.min(SIZES.length - 1, prefs.size + 1) })}
                disabled={prefs.size === SIZES.length - 1}
                aria-label="הגדלת טקסט"
              >
                א+
              </button>
            </div>
          </div>

          {toggles.map((t) => (
            <button
              key={t.key}
              type="button"
              className="a11y-toggle"
              aria-pressed={prefs[t.key]}
              onClick={() => update({ ...prefs, [t.key]: !prefs[t.key] })}
            >
              <span>{t.label}</span>
              <span className="a11y-switch" aria-hidden="true" />
            </button>
          ))}

          <div className="a11y-foot">
            <button type="button" onClick={() => update(DEFAULTS)}>
              איפוס
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openLegal("accessibility");
              }}
            >
              הצהרת נגישות
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
