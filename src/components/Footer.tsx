"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Phone, Mail } from "lucide-react";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.73a4.85 4.85 0 01-1-.04z"/>
  </svg>
);

const SOCIAL = [
  { label: "Instagram", href: "https://instagram.com/samurayledesma", icon: <InstagramIcon /> },
  { label: "Facebook",  href: "https://facebook.com/samurayledesma",  icon: <FacebookIcon /> },
  { label: "TikTok",    href: "https://tiktok.com/@samurayledesma",   icon: <TikTokIcon /> },
];

const CREDENTIALS = [
  "IBJJF #32285",
  "CBJJE #1080",
  "Academia IBJJF #10580",
  "CAJJ Afiliada",
  "Sukata Internacional",
];

interface FooterLink {
  label: string;
  href: string;
  type: "page" | "anchor";
  id?: string;
}

const NAV_LINKS: FooterLink[] = [
  { label: "Inicio",    href: "/",          type: "page" },
  { label: "Clases",    href: "/#clases",   type: "anchor", id: "clases" },
  { label: "Comunidad", href: "/comunidad", type: "page" },
  { label: "Historia",  href: "/historia",  type: "page" },
  { label: "Afiliaciones", href: "/credenciales-y-afiliaciones", type: "page" },
];

export default function Footer() {
  const router   = useRouter();
  const pathname = usePathname();
  const isHome   = pathname === "/";

  const handleClick = (link: FooterLink) => {
    if (link.type === "anchor") {
      if (isHome && link.id) {
        document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" });
      } else {
        router.push(link.href);
      }
    } else {
      router.push(link.href);
    }
  };

  return (
    <footer id="footer-root" style={{ background: "#1A0A0A", borderTop: "1px solid rgba(248,113,113,0.15)", padding: "4rem 1.5rem 2rem", position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "120px", height: "2px", background: "#8B1A1A" }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>

          {/* Brand column */}
          <div>
            <Link href="/" style={{ background: "none", border: "none", textAlign: "left", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}>
              <Image
                src="/images/logo-nuevo.webp"
                alt="JL Samuray BJJ Academy"
                width={40}
                height={40}
                style={{ borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(248,113,113,0.35)" }}
                loading="lazy"
              />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 700, fontSize: "1.375rem", letterSpacing: "0.06em", color: "#F87171", lineHeight: 1.1, display: "block" }}>
                  JL SAMURAY
                </span>
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "rgba(248,235,235,0.45)", textTransform: "uppercase" }}>
                  BJJ ACADEMY
                </span>
              </div>
            </Link>
            <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", lineHeight: 1.65, color: "rgba(248,235,235,0.5)", marginBottom: "0.75rem", maxWidth: "240px" }}>
              Fundada para formar atletas fuertes técnica y moralmente. Disciplina, respeto y hermandad en cada clase.
            </p>
            <p style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 600, fontSize: "0.8125rem", letterSpacing: "0.14em", color: "#F87171", textTransform: "uppercase", marginBottom: "1.25rem" }}>
              OSS
            </p>
            <div style={{ display: "flex", gap: "0.625rem" }}>
              {SOCIAL.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{ width: "36px", height: "36px", borderRadius: "0.375rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(248,235,235,0.45)", textDecoration: "none", transition: "color 0.2s, border-color 0.2s, background 0.2s" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F87171"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(248,113,113,0.35)"; (e.currentTarget as HTMLElement).style.background = "rgba(248,113,113,0.1)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,235,235,0.45)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)"; }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#F87171", marginBottom: "1.25rem" }}>
              Navegación
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link)}
                    style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", color: "rgba(248,235,235,0.5)", padding: 0, transition: "color 0.2s" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F5F3EF"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,235,235,0.5)"; }}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Credentials */}
          <div>
            <h4 style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#F87171", marginBottom: "1.25rem" }}>
              Afiliaciones
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              {CREDENTIALS.map((c) => (
                <li key={c} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.8125rem", color: "rgba(248,235,235,0.5)" }}>
                  <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#F87171", flexShrink: 0 }} />
                  {c}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#F87171", marginBottom: "1.25rem" }}>
              Contacto
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
              <a
                href="tel:+541161781198"
                style={{ display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none", color: "rgba(248,235,235,0.5)", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F5F3EF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,235,235,0.5)"; }}
              >
                <Phone size={14} color="#F87171" style={{ flexShrink: 0 }} />
                +54 11 6178-1198
              </a>
              <a
                href="mailto:samurayledesma@gmail.com"
                style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", textDecoration: "none", color: "rgba(248,235,235,0.5)", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.875rem", transition: "color 0.2s", wordBreak: "break-all" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#F5F3EF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(248,235,235,0.5)"; }}
              >
                <Mail size={14} color="#F87171" style={{ flexShrink: 0, marginTop: "3px" }} />
                samurayledesma@gmail.com
              </a>
              <a
                href={`https://wa.me/541161781198?text=${encodeURIComponent("Hola! Me interesa conocer más sobre las clases. OSS!")}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem", background: "rgba(37,211,102,0.1)", border: "1px solid rgba(37,211,102,0.25)", borderRadius: "0.375rem", padding: "0.5rem 0.875rem", color: "#25D366", textDecoration: "none", fontFamily: "var(--font-inter), sans-serif", fontSize: "0.8125rem", fontWeight: 500, transition: "background 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.18)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.1)"; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(248,113,113,0.25), transparent)", marginBottom: "2rem" }} />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "0.75rem" }}>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "rgba(248,235,235,0.3)" }}>
            {"2026 - Launched into orbit by "}
            <a
              href="https://devnova.com.ar"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "inherit", textDecoration: "underline" }}
            >
              DevNova
            </a>
            {" © All rights reserved."}
          </p>
          <p style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.16em", color: "rgba(248,113,113,0.55)", textTransform: "uppercase" }}>
            {"Sé fuerte · Sé parte · OSS"}
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #footer-root { padding: 3rem 1.25rem 1.5rem !important; }
        }
        @media (max-width: 640px) {
          #footer-root { padding: 2.5rem 1rem 1.5rem !important; }
        }
      `}</style>
    </footer>
  );
}
