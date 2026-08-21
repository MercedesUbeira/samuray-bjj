import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Timeline from "@/components/Timeline";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import HistoriaHero from "@/components/HistoriaHero";

export const metadata: Metadata = {
  title: "Historia | JL Samuray BJJ Academy",
  description: "El camino del guerrero: más de 50 años de trayectoria marcial del Mestre Jorge Omar Ledesma, fundador de la JL Samuray BJJ Academy.",
  openGraph: {
    title: "Historia | JL Samuray BJJ Academy",
    description: "El camino del guerrero: más de 50 años de trayectoria marcial del Mestre Jorge Omar Ledesma.",
    type: "website",
    locale: "es_AR",
    url: "https://samuraybjj.com/historia",
    siteName: "JL Samuray BJJ Academy",
    images: [{ url: "/images/og-image.png", width: 1200, height: 630, alt: "Historia de JL Samuray BJJ Academy" }],
  },
};

export default function HistoriaPage() {
  return (
    <>
      <Navbar />
      <main>
        <HistoriaHero />
        <Timeline defaultExpanded />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
