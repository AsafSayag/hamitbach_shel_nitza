import type { Metadata, Viewport } from "next";
import { Fredoka, Assistant } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/content";

const display = Fredoka({
  variable: "--font-display",
  subsets: ["hebrew", "latin"],
  weight: ["500", "600"],
  display: "swap",
});

const body = Assistant({
  variable: "--font-body",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600"],
  display: "swap",
});

const title = "המטבח של ניצה | עוגות, קינוחים ומגשי אירוח בנתניה";
const description =
  "עוגות, עוגיות, קינוחים ומגשי אירוח חלביים בעבודת יד. מטבח כשר, כל המוצרים בכשרות בד״ץ. איסוף מנתניה והזמנה פשוטה בוואטסאפ.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    locale: "he_IL",
    type: "website",
    siteName: BUSINESS.name,
    images: [{ url: "/images/h-cups.webp", width: 1100, height: 1400 }],
  },
};

export const viewport: Viewport = {
  themeColor: "#fdf6f1",
  // The site has only a light design: stop phone browsers from forcing a dark version.
  colorScheme: "only light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: BUSINESS.name,
  slogan: BUSINESS.tagline,
  description,
  telephone: "+" + BUSINESS.phoneIntl,
  image: "/images/logo.webp",
  priceRange: "₪₪",
  servesCuisine: ["מאפים", "קינוחים", "מגשי אירוח חלביים"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "נתניה",
    streetAddress: "עין התכלת",
    addressCountry: "IL",
  },
  areaServed: "נתניה והסביבה",
  sameAs: [BUSINESS.instagram],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="he"
      dir="rtl"
      className={`${display.variable} ${body.variable}`}
      style={{ colorScheme: "only light" }}
    >
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
