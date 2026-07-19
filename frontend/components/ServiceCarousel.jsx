import { useState, useEffect } from "react";
import { SERVICES, colorMap } from "../data/siteData";
import ServiceCard from "./ServiceCard";

// Largeur de base d'une carte (en pixels) — utilisée pour calculer
// l'espacement entre les cartes dans le carrousel.
const CARD_WIDTH = 300;

// Nombre total de services (= nombre de "slides" du carrousel)
const TOTAL = SERVICES.length;

export default function ServiceCarousel() {
  // Index du service actuellement affiché au centre (en grand)
  const [active, setActive] = useState(0);

  // Met le défilement automatique en pause quand la souris est sur le carrousel
  const [paused, setPaused] = useState(false);

  // Change l'index actif, en "bouclant" (si on dépasse 5, on revient à 0, etc.)
  const goTo = (i) => setActive(((i % TOTAL) + TOTAL) % TOTAL);
  const next = () => goTo(active + 1);
  const prev = () => goTo(active - 1);

  // ─── Défilement automatique ──────────────────────────────────────────────
  // Toutes les 4,5 secondes, on passe au service suivant,
  // sauf si l'utilisateur a la souris sur le carrousel (paused = true)
  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer); // nettoyage si le composant change
  }, [active, paused]);

  // ─── Calcul de la position de chaque carte ──────────────────────────────
  // Pour chaque service i, on calcule sa "distance" par rapport au service actif.
  // Exemple avec 6 services et active = 0 :
  //   service 0 -> offset 0  (au centre)
  //   service 1 -> offset 1  (à droite)
  //   service 5 -> offset -1 (à gauche, car c'est plus court de tourner par la gauche)
  const offsetOf = (i) => {
    let diff = i - active;
    if (diff > TOTAL / 2) diff -= TOTAL;   // raccourci vers la gauche
    if (diff < -TOTAL / 2) diff += TOTAL;  // raccourci vers la droite
    return diff;
  };

  return (
    <section
      style={{ padding: "70px 0 50px", background: "#f8fafc", overflow: "hidden" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ─── Titre de la section ─────────────────────────────────────────── */}
      <div style={{ textAlign: "center", marginBottom: 40, padding: "0 24px" }}>
        <span style={{
          display: "inline-block",
          background: "#eff6ff", color: "#1d4ed8",
          fontSize: 12, fontWeight: 700, letterSpacing: 2,
          padding: "4px 16px", borderRadius: 20, marginBottom: 16,
          textTransform: "uppercase",
        }}>
          Nos domaines d'expertise
        </span>
        <h2 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 900, color: "#0f172a",
          margin: "0 0 16px", lineHeight: 1.2,
        }}>
          Des Services Complets Pour Vous
        </h2>
        <div style={{
          width: 50, height: 4,
          background: "linear-gradient(90deg, #1d4ed8, #f59e0b)",
          borderRadius: 2, margin: "0 auto",
        }} />
      </div>

      {/* ─── Scène du carrousel ──────────────────────────────────────────── */}
      {/* Conteneur de hauteur fixe dans lequel toutes les cartes sont
          positionnées en "absolute" et superposées les unes sur les autres. */}
      <div style={{
        position: "relative",
        height: 540,
        maxWidth: "100%",
      }}>
        {SERVICES.map((service, i) => {
          const offset = offsetOf(i);

          // On n'affiche que les cartes proches du centre (offset -2 à +2)
          // pour ne pas surcharger le DOM avec des cartes invisibles.
          if (Math.abs(offset) > 2) return null;

          const isActive = offset === 0;       // true uniquement pour la carte du milieu
          const dist = Math.abs(offset);        // distance par rapport au centre (0, 1 ou 2)

          // Plus la carte est loin du centre, plus elle est petite, transparente et floue
          const scale = isActive ? 1 : dist === 1 ? 0.72 : 0.5;
          const opacity = isActive ? 1 : dist === 1 ? 0.55 : 0.25;
          const blur = isActive ? 0 : dist === 1 ? 1 : 2;

          // Décalage horizontal : offset négatif = vers la gauche, positif = vers la droite
          const translate = offset * (CARD_WIDTH * 0.78);

          // La carte active passe au-dessus des autres (zIndex plus grand)
          const zIndex = 10 - dist;

          return (
            <div
              key={service.id}
              // Cliquer sur une carte secondaire la fait passer au centre
              onClick={() => !isActive && goTo(i)}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                width: CARD_WIDTH,
                // translate(-50%,-50%) centre la carte, puis on applique
                // le décalage horizontal et la réduction de taille
                transform: `translate(-50%, -50%) translateX(${translate}px) scale(${scale})`,
                opacity,
                filter: `blur(${blur}px)`,
                zIndex,
                cursor: isActive ? "default" : "pointer",
                // Animation fluide à chaque changement de slide
                transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s, filter 0.5s",
                // Les cartes trop éloignées (offset ±2) ne sont pas cliquables
                pointerEvents: dist > 1 ? "none" : "auto",
              }}
            >
              <ServiceCard service={service} interactive={isActive} />
            </div>
          );
        })}

        {/* ─── Flèches précédent / suivant ─────────────────────────────── */}
        <button
          onClick={prev}
          aria-label="Précédent"
          style={arrowStyle("left")}
          onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(15,23,42,0.08)"}
        >‹</button>
        <button
          onClick={next}
          aria-label="Suivant"
          style={arrowStyle("right")}
          onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
          onMouseLeave={e => e.currentTarget.style.background = "rgba(15,23,42,0.08)"}
        >›</button>
      </div>

      {/* ─── Pastilles de navigation (les 6 icônes alignées) ─────────────── */}
      {/* Reprend l'alignement des 6 miniatures du mockup : cliquer sur une
          icône fait directement passer ce service au centre du carrousel. */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 10,
        marginTop: 24, padding: "0 16px",
        flexWrap: "wrap",
      }}>
        {SERVICES.map((s, i) => {
          const isActive = i === active;
          const c = colorMap[s.color];
          return (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={s.title}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                // La pastille active est plus grande et colorée
                width: isActive ? 56 : 44,
                height: isActive ? 56 : 44,
                borderRadius: "50%",
                border: isActive ? `3px solid ${c.border}` : "2px solid #e2e8f0",
                background: isActive ? c.light : "#fff",
                fontSize: isActive ? 24 : 18,
                cursor: "pointer",
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                boxShadow: isActive ? `0 6px 16px ${c.border}40` : "none",
              }}
            >
              {s.icon}
            </button>
          );
        })}
      </div>
    </section>
  );
}

// Style commun aux deux flèches (gauche / droite), seule la position change
function arrowStyle(side) {
  return {
    position: "absolute",
    [side]: 8,
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 20,
    width: 44, height: 44,
    borderRadius: "50%",
    border: "none",
    background: "rgba(15,23,42,0.08)",
    color: "#0f172a",
    fontSize: 26,
    fontWeight: 300,
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "background 0.2s",
  };
}
