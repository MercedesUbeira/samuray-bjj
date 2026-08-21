"use client";

import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle, Clock, MapPin } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

type FormState = "idle" | "success";

interface FormData {
  nombre: string;
  email: string;
  telefono: string;
  nivel: string;
  mensaje: string;
}

const NIVELES = [
  { value: "", label: "Seleccioná tu nivel" },
  { value: "principiante", label: "Principiante (sin experiencia)" },
  { value: "inicial", label: "Inicial (0 a 3 meses)" },
  { value: "intermedio", label: "Intermedio (3 a 6 meses)" },
  { value: "avanzado", label: "Avanzado / Cinturón de color" },
];

const BRANCHES = [
  {
    key: "central",
    name: "Central",
    profesor: undefined as string | undefined,
    address: "Av. Rivadavia 5040",
    neighborhood: "Caballito",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+5040,+Caballito,+Buenos+Aires",
    schedule: [
      { key: "central-lunes", day: "Lunes", time: "20:00 - 21:15" },
      { key: "central-miercoles", day: "Miércoles", time: "20:00 - 21:15" },
      { key: "central-viernes", day: "Viernes", time: "20:00 - 21:15" },
    ],
  },
  {
    key: "filial-1",
    name: "Balvanera",
    profesor: "Prof. Guilherme Mello",
    address: "Av. Rivadavia 2283",
    neighborhood: "Balvanera",
    mapsUrl: "https://maps.google.com/?q=Av.+Rivadavia+2283,+Balvanera,+Buenos+Aires",
    schedule: [
      { key: "filial-1-martes", day: "Martes", time: "20:00 - 21:30" },
      { key: "filial-1-jueves", day: "Jueves", time: "20:00 - 21:30" },
    ],
  },
];

export default function Contacto() {
  const { ref, visible } = useInView();
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    telefono: "",
    nivel: "",
    mensaje: "",
  });
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormData> = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!formData.email.trim()) newErrors.email = "El email es requerido";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email inválido";
    if (!formData.mensaje.trim()) newErrors.mensaje = "El mensaje es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const nivelLabel = NIVELES.find((n) => n.value === formData.nivel)?.label;
    const lines = [
      "Hola! Les escribo desde el sitio web 🥋",
      "",
      `Nombre: ${formData.nombre}`,
      `Email: ${formData.email}`,
      formData.telefono ? `Teléfono: ${formData.telefono}` : null,
      nivelLabel ? `Nivel: ${nivelLabel}` : null,
      "",
      `Consulta: ${formData.mensaje}`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    window.open(
      `https://wa.me/541161781198?text=${encodeURIComponent(lines)}`,
      "_blank",
      "noopener,noreferrer"
    );
    setFormState("success");
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const whatsappLink = `https://wa.me/541161781198?text=${encodeURIComponent("Hola! Me interesa conocer más sobre las clases de JL Samuray BJJ Academy. OSS!")}`;

  return (
    <section
      id="contacto"
      ref={ref}
      style={{
        background: "#F8F8F6",
        padding: "6rem 1.5rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(185,28,28,0.03) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "4rem",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter), sans-serif",
              fontSize: "0.6875rem",
              fontWeight: 600,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#8B1A1A",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            Sumate al Tatami
          </span>
          <h2
            style={{
              fontFamily: "var(--font-oswald), sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              textTransform: "uppercase",
              color: "#1A1615",
              lineHeight: 1.05,
              marginBottom: "1rem",
            }}
          >
            Contactanos
          </h2>
          <hr
            style={{
              height: "3px",
              border: "none",
              background: "linear-gradient(90deg, transparent, #8B1A1A, transparent)",
              maxWidth: "180px",
              margin: "0 auto",
            }}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 480px), 1fr))",
            gap: "3rem",
            alignItems: "start",
          }}
        >
          {/* Left: Info */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <h3
              style={{
                fontFamily: "var(--font-oswald), sans-serif",
                fontWeight: 600,
                fontSize: "1.375rem",
                textTransform: "uppercase",
                color: "#1A1615",
                marginBottom: "0.625rem",
              }}
            >
              {"Iniciá tu Camino"}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter), sans-serif",
                fontSize: "0.9375rem",
                lineHeight: 1.65,
                color: "#6B6460",
                marginBottom: "2rem",
              }}
            >
              Ya seas principiante o experimentado, llegaste al lugar correcto.
              <br></br>La primera clase es de prueba y totalmente gratuita. OSS.
            </p>

            {/* Schedule block */}
            <div
              style={{
                background: "#F5F3EF",
                border: "1px solid rgba(185,28,28,0.12)",
                borderRadius: "0.75rem",
                padding: "1.25rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.25rem" }}>
                <Clock size={14} color="#8B1A1A" />
                <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A1A" }}>
                  Horario de Clases
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B1A1A", marginBottom: "0.875rem" }}>Clases para adultos</p>
              <div id="contact-branches" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
                {BRANCHES.map((branch) => (
                  <div
                    key={branch.key}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid rgba(212,208,200,0.9)",
                      borderRadius: "0.625rem",
                      padding: "0.875rem 1rem",
                    }}
                  >
                    <div style={{ fontFamily: "var(--font-oswald), sans-serif", fontWeight: 700, fontSize: "1.0625rem", textTransform: "uppercase", color: "#1A1615", letterSpacing: "0.04em", lineHeight: 1, marginBottom: "0.375rem" }}>
                      {branch.name}
                    </div>
                    {branch.profesor && (
                      <div style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "#6B6460", marginBottom: "0.5rem" }}>
                        {branch.profesor}
                      </div>
                    )}
                    <a
                      href={branch.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.75rem", textDecoration: "none", color: "inherit" }}
                      onMouseEnter={(e) => { (e.currentTarget.querySelector("span") as HTMLElement).style.color = "#8B1A1A"; (e.currentTarget.querySelector("svg") as SVGElement).style.color = "#8B1A1A"; }}
                      onMouseLeave={(e) => { (e.currentTarget.querySelector("span") as HTMLElement).style.color = "#9C9890"; (e.currentTarget.querySelector("svg") as SVGElement).style.color = "#9C9890"; }}
                    >
                      <MapPin size={11} color="#9C9890" style={{ flexShrink: 0, transition: "color 0.2s" }} />
                      <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "#9C9890", lineHeight: 1.3, transition: "color 0.2s" }}>
                        {branch.address} · {branch.neighborhood}
                      </span>
                    </a>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {branch.schedule.map((item) => (
                        <div key={item.key} style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", padding: "0.25rem 0", borderBottom: "1px solid rgba(212,208,200,0.5)" }}>
                          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", color: "#1A1615", letterSpacing: "0.03em" }}>
                            {item.day}
                          </span>
                          <span style={{ fontFamily: "var(--font-inter), sans-serif", fontSize: "0.75rem", color: "#6B6460", whiteSpace: "nowrap" }}>
                            {item.time}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: "1rem",
                  paddingTop: "1rem",
                  borderTop: "1px solid rgba(185,28,28,0.08)",
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.75rem",
                  color: "#9C9890",
                }}
              >
                {"Cuota mensual — pago hasta el día 10. Presencial o transferencia bancaria."}
              </div>
            </div>

            {/* Social links */}
            <div style={{ marginBottom: "1.5rem" }}>
              <p
                style={{
                  fontFamily: "var(--font-inter), sans-serif",
                  fontSize: "0.6875rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "#9C9890",
                  marginBottom: "1rem",
                }}
              >
                Redes Sociales
              </p>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <SocialBtn
                  href="https://www.instagram.com/samuray.jiujitsu.central"
                  label="Instagram"
                  icon={<InstagramIcon />}
                />
                <SocialBtn
                  href="https://www.facebook.com/samurayMMA"
                  label="Facebook"
                  icon={<FacebookIcon />}
                />
                <SocialBtn
                  href="https://tiktok.com/@samurayledesma"
                  label="TikTok"
                  icon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.77 1.52V6.73a4.85 4.85 0 01-1-.04z"/>
                    </svg>
                  }
                />
              </div>
            </div>

            {/* WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.75rem",
                background: "#25D366",
                color: "#fff",
                fontFamily: "var(--font-oswald), sans-serif",
                fontWeight: 700,
                fontSize: "0.9375rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                padding: "0.875rem 1.75rem",
                borderRadius: "0.5rem",
                textDecoration: "none",
                transition: "background 0.2s, transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 20px rgba(37,211,102,0.25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#20c65a";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(37,211,102,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#25D366";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(37,211,102,0.25)";
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Escribinos por WhatsApp
            </a>

          </div>

          {/* Right: Contact + Form */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(30px)",
              transition: "opacity 0.7s ease 0.3s, transform 0.7s ease 0.3s",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div
              style={{
                background: "#F5F3EF",
                border: "1px solid #D4D0C8",
                borderRadius: "1rem",
                padding: "2rem",
              }}
            >
              {formState === "success" ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "3rem 1rem",
                    gap: "1.25rem",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      background: "rgba(185,28,28,0.08)",
                      border: "2px solid rgba(185,28,28,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle size={28} color="#8B1A1A" />
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-oswald), sans-serif",
                      fontWeight: 700,
                      fontSize: "1.375rem",
                      textTransform: "uppercase",
                      color: "#1A1615",
                    }}
                  >
                    {"¡Mensaje Enviado!"}
                  </h4>
                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.9375rem",
                      color: "#6B6460",
                      lineHeight: 1.6,
                      maxWidth: "320px",
                    }}
                  >
  {"¡WhatsApp abierto con tu consulta! Si no se abrió automáticamente, escribinos al 11 6178-1198. OSS."}
                  </p>
                  <button
                    onClick={() => { setFormState("idle"); setFormData({ nombre: "", email: "", telefono: "", nivel: "", mensaje: "" }); }}
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(185,28,28,0.3)",
                      color: "#8B1A1A",
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.875rem",
                      padding: "0.625rem 1.5rem",
                      borderRadius: "0.375rem",
                      cursor: "pointer",
                    }}
                  >
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                  <div
                    style={{
                      fontFamily: "var(--font-oswald), sans-serif",
                      fontWeight: 600,
                      fontSize: "1.125rem",
                      textTransform: "uppercase",
                      color: "#1A1615",
                      marginBottom: "0.25rem",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {"Solicitar Información"}
                  </div>

                  <FormField label="Nombre completo *" error={errors.nombre}>
                    <input
                      className="form-input"
                      type="text"
                      placeholder="Tu nombre"
                      value={formData.nombre}
                      onChange={handleChange("nombre")}
                    />
                  </FormField>

                  <div id="contact-email-tel" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    <FormField label="Email *" error={errors.email}>
                      <input
                        className="form-input"
                        type="email"
                        placeholder="tu@email.com"
                        value={formData.email}
                        onChange={handleChange("email")}
                      />
                    </FormField>
                    <FormField label="Teléfono">
                      <input
                        className="form-input"
                        type="tel"
                        placeholder="+54 11..."
                        value={formData.telefono}
                        onChange={handleChange("telefono")}
                      />
                    </FormField>
                  </div>

                  <FormField label="Nivel de experiencia">
                    <select
                      className="form-input"
                      value={formData.nivel}
                      onChange={handleChange("nivel")}
                      style={{ cursor: "pointer" }}
                    >
                      {NIVELES.map((n) => (
                        <option key={n.value} value={n.value}>
                          {n.label}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Mensaje *" error={errors.mensaje}>
                    <textarea
                      className="form-input"
                      placeholder={"Contanos qué te interesa, qué días podés entrenar, cualquier consulta..."}
                      value={formData.mensaje}
                      onChange={handleChange("mensaje")}
                      rows={4}
                      style={{ resize: "vertical", minHeight: "110px" }}
                    />
                  </FormField>

                  <button
                    type="submit"
                    style={{
                      background: "#8B1A1A",
                      border: "none",
                      color: "#FFFFFF",
                      fontFamily: "var(--font-oswald), sans-serif",
                      fontWeight: 700,
                      fontSize: "0.9375rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "0.9375rem",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "background 0.2s, transform 0.2s",
                      boxShadow: "0 4px 16px rgba(185,28,28,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#A31919";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.background = "#8B1A1A";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    <Send size={16} />
                    Enviar Consulta
                  </button>

                  <p
                    style={{
                      fontFamily: "var(--font-inter), sans-serif",
                      fontSize: "0.75rem",
                      color: "#9C9890",
                      textAlign: "center",
                      lineHeight: 1.5,
                    }}
                  >
                    {"Al enviar aceptás que nos comuniquemos con vos. No compartimos tu información con terceros."}
                  </p>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          #contacto { padding: 4rem 1.25rem !important; }
        }
        @media (max-width: 640px) {
          #contacto { padding: 3rem 1rem !important; }
          #contact-branches { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          #contact-email-tel { grid-template-columns: 1fr !important; }
          #contact-branches { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
      <label
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          fontSize: "0.75rem",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: "#6B6460",
        }}
      >
        {label}
      </label>
      {children}
      {error && (
        <span
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.75rem",
            color: "#8B1A1A",
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
}

function ContactItem({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        textDecoration: "none",
        color: "inherit",
        padding: "1rem 1.25rem",
        background: "#F5F3EF",
        border: "1px solid #D4D0C8",
        borderRadius: "0.625rem",
        transition: "border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(185,28,28,0.25)";
        (e.currentTarget as HTMLElement).style.background = "#EEECEA";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "#D4D0C8";
        (e.currentTarget as HTMLElement).style.background = "#F5F3EF";
      }}
    >
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "0.5rem",
          background: "rgba(185,28,28,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.6875rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#9C9890",
            marginBottom: "2px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-inter), sans-serif",
            fontSize: "0.9375rem",
            fontWeight: 500,
            color: "#1A1615",
          }}
        >
          {value}
        </div>
      </div>
    </a>
  );
}

function SocialBtn({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.5rem 0.875rem",
        background: "#F5F3EF",
        border: "1px solid #D4D0C8",
        borderRadius: "0.375rem",
        color: "#6B6460",
        textDecoration: "none",
        fontFamily: "var(--font-inter), sans-serif",
        fontSize: "0.8125rem",
        fontWeight: 500,
        transition: "color 0.2s, border-color 0.2s, background 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#8B1A1A";
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(185,28,28,0.3)";
        (e.currentTarget as HTMLElement).style.background = "rgba(185,28,28,0.06)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#6B6460";
        (e.currentTarget as HTMLElement).style.borderColor = "#D4D0C8";
        (e.currentTarget as HTMLElement).style.background = "#F5F3EF";
      }}
    >
      {icon}
      {label}
    </a>
  );
}
