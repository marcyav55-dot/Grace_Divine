import Hero from "../components/Hero";
import BoutiquePreview from "../components/BoutiquePreview";
import TrustSection from "../components/TrustSection";
import ServicesPremium from "../components/ServicesPremium";
import { StatsStrip, CTABanner } from "../components/StatsAndCTA";

export default function Accueil() {
  return (
    <>
      <Hero />
        <BoutiquePreview />
      <TrustSection />
      <ServicesPremium />
      <StatsStrip />
      <CTABanner />
    </>
  );
}
