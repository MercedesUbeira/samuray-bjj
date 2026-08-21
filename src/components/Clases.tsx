"use client";

import { Clock, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const BRANCHES = [
  {
    key: "central",
    label: "Academia",
    name: "Central",
    profesor: "Mestre Jorge Omar Ledesma",
    address: "Av.Rivadavia 5040 (galería Cavour 2do piso), Caballito",
    addressExtra: undefined as string | undefined,
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+5040,+Caballito,+Buenos+Aires",
    schedule: [
      { key: "central-lunes",     label: "Lunes",     abrev: "LUN", hora: "20:00", fin: "21:15" },
      { key: "central-miercoles", label: "Miércoles", abrev: "MIÉ", hora: "20:00", fin: "21:15" },
      { key: "central-viernes",   label: "Viernes",   abrev: "VIE", hora: "20:00", fin: "21:15" },
    ],
  },
  {
    key: "filial-1",
    label: "Filial 1",
    name: "Balvanera",
    profesor: "Prof. Guilherme Mello",
    address: "Av.Rivadavia 2283,",
    addressExtra: "Balvanera",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+2283,+Balvanera,+Buenos+Aires",
    schedule: [
      { key: "filial-1-martes", label: "Martes", abrev: "MAR", hora: "20:00", fin: "21:30" },
      { key: "filial-1-jueves", label: "Jueves", abrev: "JUE", hora: "20:00", fin: "21:30" },
    ],
  },
];

export default function Clases() {
  const { ref, visible } = useInView();

  return (
    <section
      id="clases"
      ref={ref}
      style={{ background: "#F5F3EF", padding: "3.5rem 1.5rem", position: "relative", overflow: "hidden" }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.2), transparent)" }} />
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(185,28,28,0.2), transparent)" }} />

      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{
          textAlign: "center",
          marginBottom: "3.5rem",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}>
          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B1A1A", display: "block", marginBottom: "1rem" }}>
            Calendario de Clases
          </span>
          <h2 style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3.5rem)", textTransform: "uppercase", color: "#1A1615", lineHeight: 1.05, marginBottom: "1rem" }}>
            Horarios
          </h2>
          <hr style={{ height: "3px", border: "none", background: "linear-gradient(90deg, transparent, #8B1A1A, transparent)", maxWidth: "180px", margin: "0 auto 1.5rem" }} />
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "1rem", color: "#6B6460", maxWidth: "460px", margin: "0 auto", lineHeight: 1.65 }}>
            Clases de Brazilian Jiu-Jitsu para adultos en nuestras sedes.
          </p>
        </div>

        {/* Cards */}
        <div id="svc-grid-cards" style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "1.5rem",
          marginBottom: "2.5rem",
        }}>
          {BRANCHES.map((branch, branchIndex) => (
            <div
              key={branch.key}
              style={{
                background: "#FFFFFF",
                border: "1px solid #D4D0C8",
                borderRadius: "1rem",
                padding: "1.5rem 1rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transition: `opacity 0.6s ease ${0.15 + branchIndex * 0.12}s, transform 0.6s ease ${0.15 + branchIndex * 0.12}s`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", borderBottom: "1px solid rgba(185,28,28,0.1)", paddingBottom: "1.25rem" }}>
                <div>
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "#8B1A1A", display: "block", marginBottom: "0.25rem" }}>
                    {branch.label}
                  </span>
                  <a
                    href={branch.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none", display: "inline-block" }}
                    onMouseEnter={(e) => { (e.currentTarget.querySelector("h3") as HTMLElement).style.color = "#8B1A1A"; }}
                    onMouseLeave={(e) => { (e.currentTarget.querySelector("h3") as HTMLElement).style.color = "#1A1615"; }}
                  >
                    <h3 id="branch-h3" style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 5vw, 2rem)", textTransform: "uppercase", color: "#1A1615", lineHeight: 1, transition: "color 0.2s" }}>
                      {branch.name}
                    </h3>
                  </a>
                  {branch.profesor && (
                    <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.8125rem", color: "#6B6460", display: "block", marginTop: "0.375rem" }}>
                      {branch.profesor}
                    </span>
                  )}
                </div>
                <div style={{ background: "rgba(139,26,26,0.07)", border: "1px solid rgba(139,26,26,0.15)", borderRadius: "999px", padding: "0.45rem 0.75rem", flexShrink: 0 }}>
                  <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#8B1A1A" }}>
                    {branch.schedule.length} días
                  </span>
                </div>
              </div>

              <a
                href={branch.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "flex-start", gap: "0.625rem", color: "#6B6460", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#8B1A1A"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "#6B6460"; }}
              >
                <MapPin size={16} color="currentColor" style={{ marginTop: "0.125rem", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.9375rem", lineHeight: 1.5 }}>
                  {branch.address}{branch.addressExtra !== undefined && ` ${branch.addressExtra}`}
                </span>
              </a>

              <div className="branch-days" style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "nowrap" }}>
                {branch.schedule.map((dia) => (
                  <div
                    key={dia.key}
                    className="day-card"
                    style={{
                      flex: "0 0 calc((100% - 1rem) / 3)",
                      background: "#F8F8F6",
                      border: "1px solid rgba(212,208,200,0.9)",
                      borderRadius: "0.875rem",
                      padding: "1.25rem 0.75rem",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.75rem",
                    }}
                  >
                    <div className="day-circle" style={{
                      width: "48px",
                      height: "48px",
                      borderRadius: "50%",
                      background: "rgba(139,26,26,0.07)",
                      border: "1px solid rgba(139,26,26,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 700, fontSize: "0.8125rem", color: "#8B1A1A", letterSpacing: "0.08em" }}>
                        {dia.abrev}
                      </span>
                    </div>

                    <div className="day-name" style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 700, fontSize: "1.125rem", textTransform: "uppercase", color: "#1A1615", letterSpacing: "0.04em", lineHeight: 1 }}>
                      {dia.label}
                    </div>

                    <div className="day-sep" style={{ width: "28px", height: "2px", background: "#8B1A1A", borderRadius: "1px" }} />

                    <div className="day-time" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <Clock size={14} color="#8B1A1A" />
                      <span style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 700, fontSize: "1.35rem", color: "#1A1615", letterSpacing: "0.02em" }}>
                        {dia.hora}
                      </span>
                    </div>

                    <span className="day-until" style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.8125rem", color: "#9C9890", whiteSpace: "nowrap" }}>
                      hasta las {dia.fin} hs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note + CTA */}
        <div style={{
          textAlign: "center",
          padding: "1.75rem 2rem",
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease 0.5s",
        }}>
          <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.9375rem", color: "#6B6460", lineHeight: 1.6, marginBottom: "1rem" }}>
            La primera clase es de prueba y totalmente gratuita.<br />
            ¿No tenés Gi? ¡Vení igual! Te prestamos uno la primera clase.
          </p>
          <button
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "#8B1A1A",
              border: "none",
              color: "#FFFFFF",
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: "0.875rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.75rem 1.75rem",
              borderRadius: "0.375rem",
              cursor: "pointer",
              transition: "background 0.2s, transform 0.2s",
              boxShadow: "0 4px 16px rgba(139,26,26,0.25)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#A31919"; (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#8B1A1A"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
          >
            Reservar clase gratuita
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 800px) {
          #svc-grid-cards { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          #clases { padding: 4rem 1.25rem !important; }
        }
        @media (max-width: 640px) {
          #clases { padding: 3rem 1rem !important; }
        }
        @media (max-width: 600px) {
          /* Apila cada día verticalmente */
          .branch-days {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 0 !important;
          }
          /* Cada día como fila horizontal */
          .day-card {
            flex: none !important;
            flex-direction: row !important;
            align-items: center !important;
            gap: 0.875rem !important;
            padding: 0.875rem 1rem !important;
            border-radius: 0 !important;
            border-left: none !important;
            border-right: none !important;
            border-top: none !important;
            background: transparent !important;
          }
          .day-card:first-child {
            border-top: 1px solid rgba(212,208,200,0.9) !important;
            border-radius: 0.875rem 0.875rem 0 0 !important;
          }
          .day-card:last-child {
            border-radius: 0 0 0.875rem 0.875rem !important;
          }
          /* Círculo más compacto */
          .day-circle {
            width: 40px !important;
            height: 40px !important;
            flex-shrink: 0 !important;
          }
          /* Nombre del día a la izquierda */
          .day-name {
            font-size: 0.9375rem !important;
            flex: 1 !important;
            text-align: left !important;
          }
          /* Ocultar separador decorativo en móvil */
          .day-sep {
            display: none !important;
          }
          /* Hora empujada a la derecha */
          .day-time {
            margin-left: auto !important;
          }
          /* "hasta las X hs" debajo de la hora, alineado a la derecha */
          .day-until {
            display: none !important;
          }
        }
        @media (max-width: 380px) {
          .day-name { font-size: 0.8125rem !important; }
        }
      `}</style>
    </section>
  );
}
