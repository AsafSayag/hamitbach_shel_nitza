"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  /** שם הקובץ בתיקיית public/video, בלי סיומת. צריך להיות גם קובץ ‎.webp באותו שם לתמונת הפתיחה. */
  name: string;
  /** תיאור קצר של מה שרואים, לקוראי מסך */
  label: string;
  width: number;
  height: number;
  className?: string;
};

function motionOff() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("a11y-motion")
  );
}

/**
 * סרטון קצר בלי קול שמתנגן בלולאה.
 * נטען ומתחיל לנגן רק כשהוא נכנס למסך, ועוצר כשיוצאים ממנו.
 * יש כפתור עצירה, ומי שביקש "בלי אנימציות" רואה תמונה ומפעיל בעצמו.
 */
export default function AutoVideo({ name, label, width, height, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!userPaused.current && !motionOff()) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  function toggle() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  }

  return (
    <div className={`vid${className ? ` ${className}` : ""}`}>
      <video
        ref={ref}
        src={`/video/${name}.mp4`}
        poster={`/video/${name}.webp`}
        width={width}
        height={height}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <button
        type="button"
        className="vid-toggle"
        onClick={toggle}
        aria-label={playing ? "עצירת הסרטון" : "הפעלת הסרטון"}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M7 5h3.5v14H7zM13.500 5H17v14h-3.500z" /> : <path d="M8 5.500v13l11-6.500z" />}
        </svg>
      </button>
    </div>
  );
}
