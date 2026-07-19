import { useState, useEffect, useRef } from "react";
import { SLIDES, WHATSAPP_NUMBER } from "../data/siteData";

// ─── Hero : grand bandeau d'accueil avec carrousel d'images en fond ──────────
export default function Hero() {
  // Index de la slide actuellement affichée
  const [current, setCurrent] = useState(0);

  // true pendant la courte transition (fondu) entre deux slides
  const [animating, setAnimating] = useState(false);

  // Référence vers le minuteur du défilement automatique
  const timerRef = useRef(null);

  // Change de slide avec un petit effet de fondu (300ms)
  const goTo = (idx) => {
    if (animating || idx === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const next = () => goTo((current + 1) % SLIDES.length);
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  // ─── Défilement automatique toutes les 5 secondes ──────────────────────
  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section style={{
      position: "relative",
      minHeight: "88vh",
      display: "flex", alignItems: "center",
      overflow: "hidden",
      marginTop: 110, // espace pour la Navbar fixe en haut
    }}>
      {/* ─── Image de fond de la slide actuelle ──────────────────────────── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${slide.img})`,
        backgroundSize: "cover", backgroundPosition: "center",
        opacity: animating ? 0 : 1,
        transition: "opacity 0.5s ease",
      }} />

      {/* Voile dégradé sombre pour que le texte blanc reste lisible */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(90deg, rgba(10,30,80,0.92) 0%, rgba(10,30,80,0.65) 60%, rgba(10,30,80,0.2) 100%)",
      }} />

      {/* ─── Contenu texte (titre, sous-titre, boutons) ──────────────────── */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1200, margin: "0 auto",
        padding: "60px 32px",
        opacity: animating ? 0 : 1,
        transform: animating ? "translateX(-20px)" : "translateX(0)",
        transition: "all 0.4s ease",
      }}>
        {/* Badge "GRÂCE DIVINE" */}
        <div style={{
          display: "inline-block",
          background: "#f59e0b", color: "#fff",
          fontSize: 11, fontWeight: 800, letterSpacing: 2,
          padding: "4px 16px", borderRadius: 20, marginBottom: 20,
        }}>
          GRÂCE DIVINE
        </div>

        {/* Titre principal (change selon la slide) */}
        <h1 style={{
          fontSize: "clamp(2.5rem, 8vw, 5rem)",
          fontWeight: 900, color: "#fff",
          margin: "0 0 16px",
          lineHeight: 1.05,
          textShadow: "0 2px 20px rgba(0,0,0,0.5)",
        }}>
          {slide.title}
        </h1>

        {/* Petite barre décorative orange */}
        <div style={{
          width: 60, height: 4,
          background: "linear-gradient(90deg, #f59e0b, #fcd34d)",
          borderRadius: 2, marginBottom: 20,
        }} />

        {/* Sous-titre */}
        <h2 style={{
          fontSize: "clamp(1rem, 3vw, 1.5rem)",
          fontWeight: 700, color: "#e2e8f0",
          margin: "0 0 20px", maxWidth: 520, lineHeight: 1.4,
        }}>
          {slide.subtitle}
        </h2>

        {/* Description */}
        <p style={{
          color: "#94a3b8", fontSize: 15, lineHeight: 1.7,
          maxWidth: 460, marginBottom: 36,
        }}>
          {slide.desc}
        </p>

        {/* ─── Boutons d'action ────────────────────────────────────────── */}
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          {/* Bouton "Découvrir nos services" (orange) */}
          <button style={{
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            color: "#fff", border: "none", cursor: "pointer",
            padding: "14px 28px", borderRadius: 6,
            fontWeight: 800, fontSize: 13, letterSpacing: 1,
            boxShadow: "0 4px 20px rgba(245,158,11,0.4)",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(245,158,11,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(245,158,11,0.4)";
            }}
          >
            🔍 DÉCOUVRIR NOS SERVICES
          </button>

          {/* Bouton "Nous contacter" -> ouvre WhatsApp (vert) */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff", border: "none", textDecoration: "none",
              cursor: "pointer",
              padding: "14px 28px", borderRadius: 6,
              fontWeight: 800, fontSize: 13, letterSpacing: 1,
              boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 30px rgba(37,211,102,0.5)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(37,211,102,0.4)";
            }}
          >
            {/* Icône WhatsApp en SVG */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 3.5a8.97 8.97 0 0 0-7.77 13.5L3 21l4.15-1.25a8.94 8.94 0 0 0 4.9 1.45h.01c4.95 0 9-4.03 9-9a8.93 8.93 0 0 0-3.46-6.88zM12.06 19.9a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.81.85.85-2.74-.18-.28a7.42 7.42 0 0 1-1.14-3.97c0-4.1 3.35-7.45 7.46-7.45a7.4 7.4 0 0 1 5.27 2.19 7.4 7.4 0 0 1 2.18 5.27c0 4.12-3.45 7.33-7.58 7.33zm4.07-5.5c-.22-.11-1.32-.65-1.53-.73-.2-.07-.35-.11-.5.11-.15.22-.57.73-.7.88-.13.15-.26.16-.48.05-1.32-.66-2.19-1.18-3.06-2.67-.23-.4.23-.37.66-1.23.07-.15.04-.27-.02-.38-.07-.11-.6-1.45-.82-1.94-.22-.48-.44-.42-.6-.42-.16 0-.34-.02-.52-.02-.18 0-.47.07-.71.34-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.85.13.18 1.84 2.8 4.47 3.82 2.21.85 2.65.69 3.13.65.48-.05 1.51-.62 1.72-1.21.21-.6.21-1.11.15-1.21-.06-.11-.22-.17-.44-.28z"/>
            </svg>
            NOUS CONTACTER
          </a>
        </div>
      </div>

      {/* ─── Flèches précédent / suivant ──────────────────────────────────── */}
      {[{ dir: "prev", action: prev, label: "‹", pos: "left" },
        { dir: "next", action: next, label: "›", pos: "right" }].map(({ dir, action, label, pos }) => (
        <button
          key={dir}
          onClick={action}
          style={{
            position: "absolute", [pos]: 20, top: "50%", transform: "translateY(-50%)",
            zIndex: 3,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", width: 48, height: 48,
            borderRadius: "50%", cursor: "pointer",
            fontSize: 24, fontWeight: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          {label}
        </button>
      ))}

      {/* ─── Points de pagination (en bas, indiquent la slide active) ──────── */}
      <div style={{
        position: "absolute", bottom: 30, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: 10, zIndex: 3,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              // Le point de la slide active est plus large (28px) et orange
              width: i === current ? 28 : 10,
              height: 10, borderRadius: 5,
              background: i === current ? "#f59e0b" : "rgba(255,255,255,0.4)",
              border: "none", cursor: "pointer",
              transition: "all 0.3s",
              padding: 0,
            }}
          />
        ))}
      </div>
    </section>
  );
}
