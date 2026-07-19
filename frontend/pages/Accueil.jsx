import Hero from "../components/Hero";
import ServiceCarousel from "../components/ServiceCarousel";
import { StatsStrip, CTABanner } from "../components/StatsAndCTA";

// ─── Page d'accueil ("/") ────────────────────────────────────────────────────
// Cette page se contente d'assembler les "blocs" déjà construits
// dans src/components/. C'est ce style d'organisation qu'on retrouvera
// pour les autres pages : chaque page = assemblage de composants.
export default function Accueil() {
  return (
    <>
      <Hero />            {/* grand bandeau avec carrousel d'images */}
      <ServiceCarousel /> {/* slider centré des 6 services */}
      <StatsStrip />      {/* chiffres clés (500+ clients, etc.) */}
      <CTABanner />       {/* appel à l'action WhatsApp / Contact */}
    </>
  );
}
