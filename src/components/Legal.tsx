"use client";

import { useEffect, useRef, useState } from "react";
import { LEGAL, LEGAL_LINKS, type LegalId } from "@/lib/legal";

export const OPEN_LEGAL_EVENT = "nitza:open-legal";

export function openLegal(id: LegalId) {
  window.dispatchEvent(new CustomEvent<LegalId>(OPEN_LEGAL_EVENT, { detail: id }));
}

/** הקישורים בפוטר + החלון שמציג את המסמך. הכול נשאר באותו דף. */
export default function Legal() {
  const [id, setId] = useState<LegalId | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  const doc = id ? LEGAL[id] : null;

  useEffect(() => {
    const onOpen = (e: Event) => setId((e as CustomEvent<LegalId>).detail);
    window.addEventListener(OPEN_LEGAL_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_LEGAL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (id && !d.open) d.showModal();
    if (!id && d.open) d.close();
    if (id) d.scrollTop = 0;
  }, [id]);

  return (
    <>
      <nav className="foot-links" aria-label="מידע משפטי">
        {LEGAL_LINKS.map((l) => (
          <button key={l.id} type="button" onClick={() => setId(l.id)}>
            {l.label}
          </button>
        ))}
      </nav>

      <dialog
        ref={ref}
        className="sheet legal"
        onClose={() => setId(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setId(null);
        }}
        aria-labelledby="legal-title"
      >
        {doc && (
          <div className="legal-inner">
            <button type="button" className="sheet-close" onClick={() => setId(null)} aria-label="סגירה">
              ×
            </button>
            <h2 id="legal-title" className="h3">
              {doc.title}
            </h2>
            <p className="legal-updated">עודכן: {doc.updated}</p>
            {doc.sections.map((s) => (
              <section key={s.heading}>
                <h3>{s.heading}</h3>
                {s.body.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </section>
            ))}
          </div>
        )}
      </dialog>
    </>
  );
}
