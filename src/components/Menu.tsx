"use client";

import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PROMO, WA, type Product } from "@/lib/content";
import { Sparkle, WhatsAppIcon } from "./Icons";

function Price({ value }: { value: number }) {
  return (
    <span className="price">
      <bdi>{value}</bdi> <span className="price-cur">₪</span>
    </span>
  );
}

export default function Menu() {
  const [active, setActive] = useState(CATEGORIES[0].id);
  const [open, setOpen] = useState<Product | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // מסמן בסרגל את הקטגוריה שנמצאת עכשיו על המסך
  useEffect(() => {
    const sections = CATEGORIES.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => !!el,
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // גולל את הסרגל כך שהלשונית הפעילה תמיד נראית במובייל
  useEffect(() => {
    const nav = navRef.current;
    const el = nav?.querySelector<HTMLElement>(`[data-cat="${active}"]`);
    if (!nav || !el) return;
    const target = el.offsetLeft - (nav.clientWidth - el.offsetWidth) / 2;
    nav.scrollTo({ left: target, behavior: "smooth" });
  }, [active]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <section id="menu" className="section menu">
      <div className="container">
        <header className="section-head">
          <p className="eyebrow">התפריט</p>
          <h2 className="h2">מה בא לכם היום?</h2>
          <p className="lead">
            בוחרים, לוחצים, ושולחים לי הודעה בוואטסאפ. אפשר להזמין גם באמצע השבוע.
          </p>
        </header>
      </div>

      <div className="catbar">
        <div className="catbar-scroll" ref={navRef} role="navigation" aria-label="קטגוריות התפריט">
          {CATEGORIES.map((c) => (
            <a
              key={c.id}
              href={`#${c.id}`}
              data-cat={c.id}
              className={`cat-pill${active === c.id ? " is-active" : ""}`}
              aria-current={active === c.id ? "true" : undefined}
            >
              {c.title}
            </a>
          ))}
          <a href="#events" className="cat-pill cat-pill--events">
            <Sparkle className="cat-spark" />
            אירועים
          </a>
        </div>
      </div>

      <div className="container">
        <a className="promo" href={WA.promo} target="_blank" rel="noopener">
          <span className="promo-label">{PROMO.label}</span>
          <span className="promo-title">{PROMO.title}</span>
          <span className="promo-text">{PROMO.text}</span>
          <span className="promo-cta">
            <WhatsAppIcon className="ico" />
            להזמנת המבצע
          </span>
        </a>

        {CATEGORIES.map((cat) => (
          <div key={cat.id} id={cat.id} className="cat">
            <div className="cat-head">
              <h3 className="h3">{cat.title}</h3>
              <p>{cat.blurb}</p>
            </div>
            <ul className={`grid grid-n${cat.products.length}`}>
              {cat.products.map((p) => (
                <li key={p.id} className="card">
                  <button
                    type="button"
                    className="card-open"
                    onClick={() => setOpen(p)}
                    aria-label={`${p.name}, לפרטים נוספים`}
                  >
                    <span className="card-img">
                      <img
                        src={`/images/${p.image}.webp`}
                        alt={p.name}
                        width={900}
                        height={1125}
                        loading="lazy"
                        decoding="async"
                      />
                      {p.tag && <span className="card-tag">{p.tag}</span>}
                    </span>
                    <span className="card-body">
                      <span className="card-name">{p.name}</span>
                      {p.note && <span className="card-note">{p.note}</span>}
                    </span>
                  </button>
                  <div className="card-foot">
                    <Price value={p.price} />
                    <a
                      className="card-order"
                      href={WA.product(p.name)}
                      target="_blank"
                      rel="noopener"
                      aria-label={`להזמנת ${p.name} בוואטסאפ`}
                    >
                      <WhatsAppIcon className="ico" />
                      להזמנה
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="sheet"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
        aria-labelledby="sheet-title"
      >
        {open && (
          <div className="sheet-inner">
            <button type="button" className="sheet-close" onClick={() => setOpen(null)} aria-label="סגירה">
              ×
            </button>
            <div className="sheet-img">
              <img src={`/images/${open.image}.webp`} alt={open.name} width={900} height={1125} />
            </div>
            <div className="sheet-body">
              <h3 id="sheet-title" className="h3">
                {open.name}
              </h3>
              <p className="sheet-desc">{open.desc}</p>
              {open.note && <p className="sheet-note">{open.note}</p>}
              <div className="sheet-foot">
                <Price value={open.price} />
                <a className="btn btn-primary" href={WA.product(open.name)} target="_blank" rel="noopener">
                  <WhatsAppIcon className="ico" />
                  להזמנה בוואטסאפ
                </a>
              </div>
              <p className="sheet-small">מטבח כשר · כל המוצרים בכשרות בד״ץ · איסוף מנתניה</p>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
