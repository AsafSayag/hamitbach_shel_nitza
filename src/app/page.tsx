import AutoVideo from "@/components/AutoVideo";
import A11yWidget from "@/components/A11yWidget";
import EventsTop from "@/components/EventsTop";
import Legal from "@/components/Legal";
import Menu from "@/components/Menu";
import { FactIcon, Heart, InstagramIcon, WhatsAppIcon } from "@/components/Icons";
import { ABOUT, BUSINESS, EVENTS, FACTS, FAQ, HERO, HOW, NAV, TESTIMONIALS, WA } from "@/lib/content";

export default function Home() {
  return (
    <>
      <a className="skip" href="#menu">
        דילוג לתפריט
      </a>

      <div className="bsd-bar">
        <div className="container">בס״ד</div>
      </div>

      <header className="top">
        <div className="container top-in">
          <a className="brand" href="#" aria-label={BUSINESS.name}>
            <img src="/images/logo.webp" alt="" width={720} height={720} />
            <span>{BUSINESS.name}</span>
          </a>
          <nav className="nav" aria-label="ניווט ראשי">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="btn btn-primary btn-sm" href={WA.general} target="_blank" rel="noopener">
            <WhatsAppIcon className="ico" />
            <span>להזמנה</span>
          </a>
        </div>
      </header>

      <main>
        {/* ---------- Hero ---------- */}
        <section className="hero">
          <div className="container hero-in">
            <div className="hero-copy">
              <p className="eyebrow">{HERO.eyebrow}</p>
              <h1 className="h1">{HERO.title}</h1>
              <p className="lead">{HERO.text}</p>
              <div className="hero-cta">
                <a className="btn btn-primary" href={WA.general} target="_blank" rel="noopener">
                  <WhatsAppIcon className="ico" />
                  להזמנה בוואטסאפ
                </a>
                <a className="btn btn-ghost" href="#menu">
                  לתפריט המלא
                </a>
              </div>
              <p className="hero-kosher">
                <FactIcon name="kosher" className="ico" />
                מטבח כשר · כל המוצרים בכשרות בד״ץ
              </p>
            </div>

            <div className="hero-art">
              <div className="arch arch-main">
                <img src="/images/h-cups.webp" alt="" width={1100} height={1400} fetchPriority="high" />
              </div>
              <AutoVideo
                className="arch arch-side"
                name="desserts"
                label="מארזי פחזניות, קינוחי כוסות ומתוקים מהמטבח של ניצה"
                width={540}
                height={942}
              />
              <img className="hero-seal" src="/images/logo.webp" alt="" width={720} height={720} />
              <Heart className="float-heart fh1" />
              <Heart className="float-heart fh2" />
            </div>
          </div>
        </section>

        {/* ---------- Facts ---------- */}
        <section className="facts" aria-label="חשוב לדעת">
          <ul className="container facts-in">
            {FACTS.map((f) => (
              <li key={f.title}>
                <span className="fact-ico">
                  <FactIcon name={f.icon} className="ico" />
                </span>
                <span>
                  <strong>{f.title}</strong>
                  <small>{f.text}</small>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <Menu />

        {/* ---------- How to order ---------- */}
        <section id="how" className="section how">
          <div className="container">
            <header className="section-head">
              <p className="eyebrow">{HOW.eyebrow}</p>
              <h2 className="h2">{HOW.title}</h2>
            </header>
            <ol className="steps">
              {HOW.steps.map((st) => (
                <li key={st.title}>
                  <span className="step-ico">
                    <FactIcon name={st.icon} className="ico" />
                  </span>
                  <h3 className="h3">{st.title}</h3>
                  <p>{st.text}</p>
                  {st.extra && <p className="step-extra">{st.extra}</p>}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------- Events ---------- */}
        <section id="events" className="section events">
          <div className="events-glow" aria-hidden="true" />
          <div className="container">
            <EventsTop />

            <ul className="points">
              {EVENTS.points.map((p) => (
                <li key={p.title}>
                  <strong>{p.title}</strong>
                  <span>{p.text}</span>
                </li>
              ))}
            </ul>

            <div className="trays">
              <div className="trays-list">
                <h3 className="h3">מה אפשר לשים על השולחן</h3>
                <ul>
                  {EVENTS.trays.map((t) => (
                    <li key={t.title}>
                      <strong>{t.title}</strong>
                      <span>{t.items}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <AutoVideo
                className="trays-video"
                name="event-table"
                label="שולחן אירוח ערוך: מאפים, פלטת ירקות, לחם שום ועוגות"
                width={540}
                height={960}
              />
            </div>

            <ul className="gallery">
              {EVENTS.gallery.map((g) => (
                <li key={g.image}>
                  <img src={`/images/${g.image}.webp`} alt={g.alt} width={1000} height={1000} loading="lazy" />
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- About ---------- */}
        <section id="about" className="section about">
          <div className="container about-in">
            <div className="about-photo">
              <img src="/images/a-nitza.webp" alt="ניצה, בעלת המטבח של ניצה" width={800} height={800} loading="lazy" />
            </div>
            <div className="about-copy">
              <p className="eyebrow">{ABOUT.eyebrow}</p>
              <h2 className="h2">{ABOUT.title}</h2>
              {ABOUT.paragraphs.map((p, i) => (
                <p key={i} className={i === 0 ? "about-first" : undefined}>
                  {p}
                </p>
              ))}
              <p className="signature">{BUSINESS.tagline}</p>
            </div>
            <AutoVideo
              className="about-video"
              name="hands"
              label="ניצה מזלפת בלילה לתבנית"
              width={540}
              height={960}
            />
          </div>

          <div className="container">
            <ul className="quotes">
              {TESTIMONIALS.map((t) => (
                <li key={t.text}>
                  <Heart className="quote-heart" />
                  <blockquote>{t.text}</blockquote>
                  <cite>{t.by}</cite>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="section faq">
          <div className="container faq-in">
            <header className="section-head">
              <p className="eyebrow">שאלות נפוצות</p>
              <h2 className="h2">כל מה שרציתם לשאול</h2>
            </header>
            <div className="faq-list">
              {FAQ.map((f) => (
                <details key={f.q} name="faq">
                  <summary>
                    <span>{f.q}</span>
                    <span className="faq-plus" aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
            <p className="faq-more">
              לא מצאתם תשובה?{" "}
              <a href={WA.general} target="_blank" rel="noopener">
                כתבו לניצה בוואטסאפ
              </a>
            </p>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: FAQ.map((f) => ({
                  "@type": "Question",
                  name: f.q,
                  acceptedAnswer: { "@type": "Answer", text: f.a },
                })),
              }),
            }}
          />
        </section>

        {/* ---------- Final CTA ---------- */}
        <section className="cta">
          <div className="container cta-in">
            <img className="cta-seal" src="/images/logo.webp" alt="" width={720} height={720} loading="lazy" />
            <h2 className="h2">בא לכם משהו טוב?</h2>
            <p className="lead">שולחים הודעה, סוגרים מה ומתי, ובאים לאסוף.</p>
            <a className="btn btn-primary btn-lg" href={WA.general} target="_blank" rel="noopener">
              <WhatsAppIcon className="ico" />
              שלחו לי הודעה בוואטסאפ
            </a>
            <a className="cta-phone" href={`tel:+${BUSINESS.phoneIntl}`}>
              <bdi>{BUSINESS.phoneDisplay}</bdi>
            </a>
            <a className="cta-insta" href={BUSINESS.instagram} target="_blank" rel="noopener">
              <InstagramIcon className="ico" />
              עוד תמונות באינסטגרם
            </a>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="container foot-in">
          <p className="foot-name">{BUSINESS.name}</p>
          <p>
            איסוף: {BUSINESS.pickup} · משלוח בתיאום מראש · מטבח כשר, כל המוצרים בכשרות בד״ץ
          </p>
          <a className="foot-insta" href={BUSINESS.instagram} target="_blank" rel="noopener">
            <InstagramIcon className="ico" />
            <span>
              אינסטגרם <bdi>@nitzakachlon</bdi>
            </span>
          </a>
          <Legal />
        </div>
      </footer>

      <A11yWidget />

      <a className="fab" href={WA.general} target="_blank" rel="noopener" aria-label="הזמנה בוואטסאפ">
        <WhatsAppIcon className="ico" />
      </a>
    </>
  );
}
