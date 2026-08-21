"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface NavLink {
  label: string;
  href: string;
  type: "page" | "anchor";
  id?: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Inicio",    href: "/",          type: "page" },
  { label: "Clases",    href: "/#clases",   type: "anchor", id: "clases" },
  { label: "Comunidad", href: "/comunidad", type: "page" },
  { label: "Historia",  href: "/historia",  type: "page" },
  { label: "Afiliaciones", href: "/credenciales-y-afiliaciones", type: "page" },
];

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeAnchor, setActiveAnchor] = useState("#inicio");
  const pathname = usePathname();
  const router   = useRouter();

  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const nosotros = document.getElementById("nosotros");
    let observer: IntersectionObserver | null = null;
    if (nosotros) {
      observer = new IntersectionObserver(
        ([entry]) => setScrolled(entry.isIntersecting || entry.boundingClientRect.top < 0),
        { threshold: 0 }
      );
      observer.observe(nosotros);
    }
    const onScroll = () => {
      const anchors = ["inicio", "nosotros", "clases", "credenciales", "contacto"];
      for (const id of [...anchors].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveAnchor(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const handleNavClick = (link: NavLink) => {
    setIsOpen(false);
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

  const isActive = (link: NavLink): boolean => {
    if (link.type === "page") {
      return pathname === link.href;
    }
    return isHome && activeAnchor === `#${link.id}`;
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 50,
        transition: "background 0.4s, box-shadow 0.4s, backdrop-filter 0.4s",
        background: scrolled ? "rgba(248,248,246,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(185,28,28,0.12)" : "none",
      }}
    >
      <nav style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 1.5rem", height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>

        {/* Logo */}
        <Link
          href="/"
          onClick={(e) => {
            if (isHome) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.625rem", textDecoration: "none" }}
        >
          <Image
            src="/images/logo-nuevo.webp"
            alt="JL Samuray BJJ Academy"
            width={44}
            height={44}
            style={{ borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(185,28,28,0.25)" }}
            priority
          />
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <span id="navbar-logo-text" style={{ fontFamily: "var(--font-oswald), system-ui, sans-serif", fontWeight: 700, fontSize: "1.25rem", letterSpacing: "0.08em", color: scrolled ? "#8B1A1A" : "#FFFFFF", lineHeight: 1.1, transition: "color 0.4s" }}>
              JL SAMURAY
            </span>
            <span style={{ fontFamily: "var(--font-inter), system-ui, sans-serif", fontSize: "0.625rem", letterSpacing: "0.18em", color: scrolled ? "#9C9890" : "rgba(255,255,255,0.55)", textTransform: "uppercase", transition: "color 0.4s" }}>
              BJJ ACADEMY
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul id="desktop-nav" style={{ display: "none", gap: "0.25rem", listStyle: "none" }}>
          {NAV_LINKS.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link)}
                  style={{
                    background: "none", border: "none", cursor: "pointer",
                    fontFamily: "var(--font-inter), system-ui, sans-serif",
                    fontSize: "0.8125rem", fontWeight: 500, letterSpacing: "0.06em",
                    textTransform: "uppercase", padding: "0.5rem 0.75rem", borderRadius: "0.375rem",
                    color: active
                      ? (scrolled ? "#8B1A1A" : "#E87070")
                      : (scrolled ? "#6B6460" : "rgba(255,255,255,0.75)"),
                    transition: "color 0.3s", position: "relative",
                  }}
                  onMouseEnter={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = scrolled ? "#1A1615" : "#FFFFFF"; }}
                  onMouseLeave={(e) => { if (!active) (e.currentTarget as HTMLElement).style.color = scrolled ? "#6B6460" : "rgba(255,255,255,0.75)"; }}
                >
                  {link.label}
                  {active && (
                    <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: "20px", height: "2px", background: scrolled ? "#8B1A1A" : "#E87070", borderRadius: "1px" }} />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNavClick({ label: "Contacto", href: "/#contacto", type: "anchor", id: "contacto" })}
          id="desktop-cta"
          style={{ display: "none", background: "transparent", border: `1px solid ${scrolled ? "#8B1A1A" : "rgba(255,255,255,0.6)"}`, color: scrolled ? "#8B1A1A" : "#FFFFFF", transition: "border-color 0.4s, color 0.4s, background 0.2s", fontFamily: "var(--font-oswald), system-ui, sans-serif", fontWeight: 600, fontSize: "0.8125rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.5rem 1.25rem", borderRadius: "0.375rem", cursor: "pointer" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#8B1A1A"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "#8B1A1A"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = scrolled ? "#8B1A1A" : "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = scrolled ? "#8B1A1A" : "rgba(255,255,255,0.6)"; }}
        >
          Inscribirse
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          id="mobile-menu-btn"
          style={{ background: "none", border: "none", cursor: "pointer", color: scrolled ? "#8B1A1A" : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", padding: "0.625rem", minWidth: "44px", minHeight: "44px", transition: "color 0.4s" }}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div style={{ overflow: "hidden", maxHeight: isOpen ? "400px" : "0", transition: "max-height 0.35s ease", background: "rgba(248,248,246,0.98)", backdropFilter: "blur(12px)", borderTop: isOpen ? "1px solid rgba(185,28,28,0.08)" : "none", boxShadow: isOpen ? "0 8px 24px rgba(185,28,28,0.08)" : "none" }}>
        <ul style={{ listStyle: "none", padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link)}
                style={{ background: "none", border: "none", cursor: "pointer", width: "100%", textAlign: "left", fontFamily: "var(--font-oswald), system-ui, sans-serif", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 0.5rem", color: isActive(link) ? "#8B1A1A" : "#6B6460", borderBottom: "1px solid rgba(185,28,28,0.07)" }}
              >
                {link.label}
              </button>
            </li>
          ))}
          <li style={{ marginTop: "0.75rem" }}>
            <button
              onClick={() => handleNavClick({ label: "Inscribirse", href: "/#contacto", type: "anchor", id: "contacto" })}
              style={{ width: "100%", background: "#8B1A1A", border: "none", color: "#FFFFFF", fontFamily: "var(--font-oswald), system-ui, sans-serif", fontWeight: 700, fontSize: "0.9375rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0.875rem", borderRadius: "0.5rem", cursor: "pointer" }}
            >
              Inscribirse
            </button>
          </li>
        </ul>
      </div>

      <style>{`
        @media (min-width: 768px) {
          #desktop-nav   { display: flex !important; }
          #desktop-cta   { display: block !important; }
          #mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 360px) {
          #navbar-logo-text { font-size: 1.05rem !important; }
        }
      `}</style>
    </header>
  );
}
