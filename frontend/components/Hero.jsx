import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { SLIDES, WHATSAPP_NUMBER } from "../data/siteData";

// ─── Hero : bandeau d'accueil compact avec carrousel d'images en fond ────────
export default function Hero() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (idx) => setCurrent(idx);
  const next = () => goTo((current + 1) % SLIDES.length);
  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    timerRef.current = setInterval(next, 7500);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section style={{
      position: "relative",
      minHeight: "min(62vh, 520px)",
      display: "flex", alignItems: "center",
      overflow: "hidden",
      marginTop: 96,
    }}>
      <style>{`
        @keyframes heroTextIn {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroKenBurns {
          from { transform: scale(1); }
          to   { transform: scale(1.09); }
        }
      `}</style>

      <div style={{ position: "absolute", inset: 0 }}>
        {SLIDES.map((s, i) => (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${s.img})`,
              backgroundSize: "cover", backgroundPosition: "center",
              opacity: i === current ? 1 : 0,
              transition: "opacity 1.6s ease-in-out",
              animation: i === current ? "heroKenBurns 9s ease-out forwards" : "none",
              willChange: "opacity, transform",
            }}
          />
        ))}
      </div>

      <div style={{
        position: "absolute", inset: 0,
        background: `
          linear-gradient(100deg, rgba(10,22,40,0.7) 0%, rgba(10,22,40,0.45) 45%, rgba(10,22,40,0.15) 75%),
          linear-gradient(0deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0) 35%)
        `,
      }} />

      <div
        key={current}
        style={{
          position: "relative", zIndex: 2,
          maxWidth: 1200, margin: "0 auto",
          width: "100%",
          padding: "32px 60px",
          animation: "heroTextIn 0.7s ease",
          textAlign: "center",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        <h1 style={{
          fontSize: "clamp(1.6rem, 6vw, 3rem)",
          fontWeight: 600, color: "#fff",
          fontFamily: "'Montserrat', sans-serif",
          margin: "0 0 10px",
          lineHeight: 1.15,
          maxWidth: "min(560px, 82vw)", marginLeft: "auto", marginRight: "auto",
          textShadow: "0 3px 24px rgba(0,0,0,0.65), 0 1px 4px rgba(0,0,0,0.8)",
        }}>
          {slide.subtitle}
        </h1>

        <p style={{
          color: "#e2e8f0", fontSize: "clamp(0.8rem, 2.2vw, 0.95rem)", lineHeight: 1.5,
          maxWidth: "min(440px, 78vw)", marginBottom: 22, marginLeft: "auto", marginRight: "auto",
          textShadow: "0 1px 8px rgba(0,0,0,0.6)",
        }}>
          {slide.desc}
        </p>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/services")}
            style={{
              background: "linear-gradient(135deg, #c9a227, #a8841f)",
              color: "#fff", border: "none", cursor: "pointer",
              padding: "11px 20px", borderRadius: 6,
              fontWeight: 800, fontSize: 12.5, letterSpacing: 0.5,
              boxShadow: "0 4px 20px rgba(201,162,39,0.4)",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            Découvrir nos services
          </button>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: "transparent",
              color: "#fff", border: "2px solid rgba(255,255,255,0.6)", textDecoration: "none",
              cursor: "pointer",
              padding: "9px 20px", borderRadius: 6,
              fontWeight: 800, fontSize: 12.5, letterSpacing: 0.5,
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.15)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Nous contacter
          </a>
        </div>
      </div>

      {[{ dir: "prev", action: prev, label: "‹", pos: "left" },
        { dir: "next", action: next, label: "›", pos: "right" }].map(({ dir, action, label, pos }) => (
        <button
          key={dir}
          onClick={action}
          style={{
            position: "absolute", [pos]: 10, top: "50%", transform: "translateY(-50%)",
            zIndex: 3,
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,0.3)",
            color: "#fff", width: 36, height: 36,
            borderRadius: "50%", cursor: "pointer",
            fontSize: 18, fontWeight: 300,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#c9a227"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          {label}
        </button>
      ))}

      <div style={{
        position: "absolute", bottom: 16, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", gap: 8, zIndex: 3,
      }}>
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            style={{
              width: i === current ? 22 : 8,
              height: 8, borderRadius: 4,
              background: i === current ? "#c9a227" : "rgba(255,255,255,0.4)",
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
