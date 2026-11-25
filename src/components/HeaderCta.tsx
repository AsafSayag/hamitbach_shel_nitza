"use client";

import { useEffect, useState, type ReactNode } from "react";

type Props = {
  href: string;
  /** מזהה של הכפתור בהירו. כל עוד הוא על המסך, הכפתור בסרגל מוסתר. */
  watch: string;
  children: ReactNode;
};

/** כפתור הוואטסאפ של הסרגל העליון: מופיע רק אחרי שגוללים מעבר לכפתור שבהירו. */
export default function HeaderCta({ href, watch, children }: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = document.getElementById(watch);
    if (!target) {
      setShow(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      // מציגים רק כשהכפתור בהירו נעלם מעל קצה המסך, לא כשהוא עדיין מתחתיו
      setShow(!e.isIntersecting && e.boundingClientRect.top < 0);
    }, { rootMargin: "-64px 0px 0px 0px" });
    io.observe(target);
    return () => io.disconnect();
  }, [watch]);

  return (
    <a
      className={`btn btn-primary btn-sm top-cta${show ? " is-on" : ""}`}
      href={href}
      target="_blank"
      rel="noopener"
      aria-hidden={!show}
      tabIndex={show ? undefined : -1}
    >
      {children}
    </a>
  );
}
