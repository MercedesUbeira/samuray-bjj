"use client";

import Image from "next/image";
import { useInView } from "@/hooks/useInView";

export default function PromesaTatami() {
  const { ref, visible } = useInView(0.1);

  return (
    <section
      id="promesa-tatami"
      ref={ref}
      style={{
        background: "#1A0A0A",
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative line top */}
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.4), transparent)" }} />

      {/* logo dramático de fondo */}
      <div style={{
        position: "absolute",
        right: "-280px",
        top: "50%",
        transform: "translateY(-50%)",
        width: "1000px",
        height: "1000px",
        opacity: visible ? 0.07 : 0,
        transition: "opacity 1s ease 0.3s",
        pointerEvents: "none",
        filter: "grayscale(100%)",
      }}>
        <Image
          src="/images/logo-nuevo.webp"
          alt=""
          fill
          style={{ objectFit: "contain" }}
          sizes="420px"
        />
      </div>

      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          textAlign: "center",
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* eyebrow */}
        <span style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.6875rem",
          fontWeight: 600,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#E87070",
          display: "block",
          marginBottom: "1.25rem",
        }}>
          · Disciplina · Respeto · Hermandad ·
        </span>

        {/* title */}
        <h2 style={{
          fontFamily: "var(--font-oswald), sans-serif",
          fontWeight: 700,
          fontSize: "clamp(2rem, 5vw, 3.25rem)",
          textTransform: "uppercase",
          color: "#FFFFFF",
          lineHeight: 1.05,
          marginBottom: "1rem",
        }}>
          La Promesa del Tatami
        </h2>

        <hr style={{
          height: "3px",
          border: "none",
          background: "linear-gradient(90deg, transparent, #8B1A1A, transparent)",
          maxWidth: "180px",
          margin: "0 auto 2.5rem",
        }} />

        {/* quote block */}
        <div
          id="promesa-quote"
          style={{
            padding: "2.5rem 2.5rem",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.25s",
          }}
        >
          <blockquote style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "clamp(1rem, 2.2vw, 1.175rem)",
            lineHeight: 1.8,
            color: "rgba(255,255,255,0.75)",
            margin: 0,
            marginBottom: "2rem",
          }}>
            En J.L. SAMURAY BJJ Academy, entrenar va más allá de aprender técnicas:<br />
            Es un camino de crecimiento personal basado en disciplina, respeto, hermandad y lealtad.
            Cada clase es una oportunidad para fortalecerse física y mentalmente, superando desafíos
            junto a un equipo que acompaña como una familia.
          </blockquote>

          <cite style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.875rem",
            color: "rgba(248,113,113,0.85)",
            fontStyle: "normal",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}>
            Mestre Jorge Omar Ledesma
          </cite>
        </div>
      </div>

      {/* decorative line bottom */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "linear-gradient(90deg, transparent, rgba(139,26,26,0.4), transparent)" }} />

      <style>{`
        @media (max-width: 768px) {
          #promesa-tatami { padding: 4rem 1.25rem !important; }
          #promesa-quote { padding: 1.5rem 0 !important; }
        }
        @media (max-width: 640px) {
          #promesa-tatami { padding: 3rem 1rem !important; }
        }
      `}</style>
    </section>
  );
}
