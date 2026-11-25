"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { EVENTS, eventsMessage, waLink } from "@/lib/content";
import { Sparkle, WhatsAppIcon } from "./Icons";

const FIRST_DELAY = 1500; // כמה זמן רואים את התמונה הראשונה לפני ההחלפה הראשונה
const STEP_DELAY = 3200;

function motionOff() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("a11y-motion")
  );
}

export default function EventsTop() {
  const slides = EVENTS.slides;
  const n = slides.length;

  /* ---------- סוגי אירוע לבחירה ---------- */
  const [picked, setPicked] = useState<string[]>([]);
  const toggle = (label: string) =>
    setPicked((p) => (p.includes(label) ? p.filter((x) => x !== label) : [...p, label]));
  const phrases = EVENTS.occasions.filter((o) => picked.includes(o.label)).map((o) => o.phrase);
  const href = waLink(eventsMessage(phrases));

  /* ---------- קרוסלה ---------- */
  const [active, setActive] = useState(0);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false);
  const started = useRef(false);
  const stage = useRef<HTMLDivElement>(null);
  const drag = useRef<number | null>(null);

  const go = useCallback((dir: number) => setActive((a) => (a + dir + n) % n), [n]);

  // מתחילים להחליף רק כשהגולש באמת הגיע לקרוסלה
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.45 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hold || motionOff()) return;
    const t = window.setTimeout(
      () => {
        started.current = true;
        go(1);
      },
      started.current ? STEP_DELAY : FIRST_DELAY,
    );
    return () => window.clearTimeout(t);
  }, [inView, hold, active, go]);

  return (
    <div className="events-top">
      <div className="events-copy">
        <p className="eyebrow eyebrow--light">
          <Sparkle className="ico" />
          {EVENTS.eyebrow}
        </p>
        <h2 className="h2">{EVENTS.title}</h2>
        <p className="lead">{EVENTS.text}</p>

        <p className="chips-hint" id="chips-hint">
          מה חוגגים? אפשר לסמן, וההודעה לניצה תיכתב לבד.
        </p>
        <ul className="chips" aria-labelledby="chips-hint">
          {EVENTS.occasions.map((o) => {
            const on = picked.includes(o.label);
            return (
              <li key={o.label}>
                <button type="button" className="chip" aria-pressed={on} onClick={() => toggle(o.label)}>
                  <span className="chip-check" aria-hidden="true">
                    ✓
                  </span>
                  {o.label}
                </button>
              </li>
            );
          })}
        </ul>

        <a className="btn btn-light" href={href} target="_blank" rel="noopener">
          <WhatsAppIcon className="ico" />
          לתיאום אירוע בוואטסאפ
        </a>
      </div>

      <div
        className="carousel"
        role="group"
        aria-roledescription="קרוסלה"
        aria-label="תמונות ממגשי האירוח"
        onMouseEnter={() => setHold(true)}
        onMouseLeave={() => setHold(false)}
        onFocus={() => setHold(true)}
        onBlur={() => setHold(false)}
      >
        <div
          className="carousel-stage"
          ref={stage}
          onPointerDown={(e) => {
            drag.current = e.clientX;
          }}
          onPointerUp={(e) => {
            if (drag.current === null) return;
            const dx = e.clientX - drag.current;
            drag.current = null;
            // בעברית מתקדמים שמאלה: גרירה ימינה מביאה את התמונה הבאה
            if (Math.abs(dx) > 40) go(dx > 0 ? 1 : -1);
          }}
          onPointerCancel={() => {
            drag.current = null;
          }}
        >
          {slides.map((s, i) => {
            let d = i - active;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const near = Math.abs(d) <= 2;
            return (
              <figure
                key={s.image}
                className="slide"
                data-pos={d === 0 ? "active" : Math.abs(d) === 1 ? "side" : "far"}
                style={{ "--d": d, "--abs": Math.abs(d) } as React.CSSProperties}
                aria-hidden={d !== 0}
                onClick={() => d !== 0 && near && go(d > 0 ? 1 : -1)}
              >
                <img
                  src={`/images/${s.image}.webp`}
                  alt={d === 0 ? s.alt : ""}
                  width={s.w}
                  height={s.h}
                  loading="lazy"
                  draggable={false}
                />
              </figure>
            );
          })}
        </div>

        <div className="carousel-nav">
          <button type="button" className="carousel-btn" onClick={() => go(-1)} aria-label="התמונה הקודמת">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 5 7 7-7 7" />
            </svg>
          </button>
          <div className="carousel-dots">
            {slides.map((s, i) => (
              <button
                key={s.image}
                type="button"
                className="carousel-dot"
                aria-label={`תמונה ${i + 1} מתוך ${n}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
          <button type="button" className="carousel-btn" onClick={() => go(1)} aria-label="התמונה הבאה">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m15 5-7 7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
