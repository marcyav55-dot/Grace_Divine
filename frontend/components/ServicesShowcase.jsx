import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SERVICES, colorMap } from "../data/siteData";
import "./services-showcase.css";

// ─── Une carte de service ────────────────────────────────────────────────
// Utilisée à l'identique en desktop (grille) et en mobile (swipe plein écran).
function ServiceShowcaseCard({ service }) {
  const c = colorMap[service.color] || colorMap.blue;
  const isShop = service.cta === "VOIR LA BOUTIQUE";
  const linkTo = isShop ? `/boutique?cat=${service.slug}` : `/services/${service.slug}`;

  return (
    <div className="showcase-card" data-card style={{ "--card-accent": c.border }}>
      {/* ─── Image 16:9 avec effet de zoom léger au survol ────────────── */}
      <div className="showcase-card-media">
        <div
          className="showcase-card-img"
          style={{ backgroundImage: `url(${service.img})` }}
        />
        <div className="showcase-card-media-fade" />

        {/* Icône flottante, à cheval sur l'image et le contenu */}
        <div className="showcase-card-icon" style={{ borderColor: c.border }}>
          {service.icon}
        </div>
      </div>

      {/* ─── Contenu texte ─────────────────────────────────────────────── */}
      <div className="showcase-card-body">
        <h3 className="showcase-card-title">{service.title}</h3>
        <p className="showcase-card-desc">{service.desc}</p>

        <Link
          to={linkTo}
          className="showcase-card-btn"
          style={{
            borderColor: c.border,
            "--btn-hover-bg": `linear-gradient(135deg, ${c.badge}, ${c.border})`,
          }}
        >
          Explorer
          <span className="showcase-card-btn-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function ServicesShowcase() {
  const scrollerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ─── Suivi de la carte visible à l'écran (mobile) pour les points ──────
  // On observe chaque carte : dès qu'une carte occupe la majorité de
  // l'écran pendant le swipe, elle devient la carte "active".
  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const cards = Array.from(scroller.querySelectorAll("[data-card]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            const idx = cards.indexOf(entry.target);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { root: scroller, threshold: [0.6] }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (i) => {
    const scroller = scrollerRef.current;
    const card = scroller?.querySelectorAll("[data-card]")[i];
    card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  return (
    <section className="showcase-section">
      {/* ─── Titre de la section ─────────────────────────────────────────── */}
      <div className="showcase-header">
        <span className="showcase-eyebrow">Nos domaines d'expertise</span>
        <h2 className="showcase-title">Des Services Complets Pour Vous</h2>
        <div className="showcase-underline" />
      </div>

      {/* ─── Desktop : grille 3 colonnes / Mobile : scroll horizontal ────── */}
      <div className="showcase-scroller" ref={scrollerRef}>
        {SERVICES.map((service) => (
          <ServiceShowcaseCard key={service.id} service={service} />
        ))}
      </div>

      {/* ─── Points de progression, visibles uniquement en mobile ───────── */}
      <div className="showcase-dots">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            className={`showcase-dot ${i === activeIndex ? "is-active" : ""}`}
            onClick={() => scrollToCard(i)}
            aria-label={`Aller au service ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
