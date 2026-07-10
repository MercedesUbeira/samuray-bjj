import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://samuraybjj.com"),
  verification: {
    google: "_cvJdcx5q-HNtQLp7kKMP1-HWFSoDw4I8hIGPFCBROM",
  },
  title: "JL Samuray BJJ Academy | Jiu-Jitsu Brasileño",
  description:
    "Academia de Brazilian Jiu-Jitsu con más de 10 años de experiencia. Afiliada a IBJJF, CBJJE y Sukata Internacional. Dirigida por el Mestre Jorge Omar Ledesma.",
  keywords: [
    "jiu jitsu", "BJJ", "Samuray", "academia", "artes marciales",
    "Ledesma", "IBJJF", "Sukata", "grappling", "defensa personal",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico"
  },
  openGraph: {
    title: "JL Samuray BJJ Academy",
    description: "Academia de Brazilian Jiu-Jitsu — Sukata Internacional",
    type: "website",
    locale: "es_AR",
    url: "https://samuraybjj.com",
    siteName: "JL Samuray BJJ Academy",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "JL Samuray BJJ Academy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JL Samuray BJJ Academy",
    description: "Academia de Brazilian Jiu-Jitsu — Sukata Internacional",
    images: ["/images/og-image.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "JL Samuray BJJ Academy",
  alternateName: "Samuray BJJ",
  url: "https://samuraybjj.com",
  description:
    "Academia de Brazilian Jiu-Jitsu con más de 10 años de experiencia. Afiliada a IBJJF, CBJJE y Sukata Internacional. Dirigida por el Mestre Jorge Omar Ledesma.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Av. Rivadavia 5040, Galería Cavour 2° piso",
    addressLocality: "Caballito",
    addressRegion: "Ciudad Autónoma de Buenos Aires",
    addressCountry: "AR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Wednesday", "Friday"],
      opens: "20:00",
      closes: "21:15",
    },
  ],
  sport: "Brazilian Jiu-Jitsu",
  founder: {
    "@type": "Person",
    name: "Jorge Omar Ledesma",
    jobTitle: "Mestre de Brazilian Jiu-Jitsu",
  },
  sameAs: ["https://www.facebook.com/samurayledesmabjj"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${oswald.variable}`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen antialiased"
        style={{ backgroundColor: "#0a0a0a", color: "#F5F5F5", fontFamily: "var(--font-inter), system-ui, sans-serif" }}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-KJJC0RWJ0V"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-KJJC0RWJ0V');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}
