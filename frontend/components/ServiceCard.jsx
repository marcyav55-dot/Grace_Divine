import { useState } from "react";
import { Link } from "react-router-dom";
import { colorMap } from "../data/siteData";

// ─── Carte d'un service (utilisée dans le carrousel et la page Services) ────
// props :
//   - service    : un objet du tableau SERVICES (data/siteData.js)
//   - interactive: si false, on désactive l'effet de survol (hover)
//                   -> utile pour les cartes secondaires du carrousel
export default function ServiceCard({ service, interactive = true }) {
  const [hovered, setHovered] = useState(false);

  // Couleurs spécifiques à ce service (bordure, badge, fond clair)
  const c = colorMap[service.color];

  // Les services "boutique" (informatique / habillement) renvoient vers /boutique,
  // les autres vers leur page /services/:slug
  const isShop = service.cta === "VOIR LA BOUTIQUE";
  const linkTo = isShop ? `/boutique?cat=${service.slug}` : `/services/${service.slug}`;

  return (
    <div
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      style={{
        background: "#fff",
        borderRadius: 12,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        // Au survol : ombre plus marquée + bordure colorée
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.18), 0 0 0 2px ${c.border}`
          : "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex", flexDirection: "column",
        border: `1px solid ${hovered ? c.border : "#f1f5f9"}`,
      }}
    >
      {/* ─── En-tête : icône + titre ──────────────────────────────────────── */}
      <div style={{
        // Au survol, le fond devient un dégradé coloré (couleur du service)
        background: hovered
          ? `linear-gradient(135deg, ${c.badge}, ${c.border})`
          : c.light,
        padding: "24px 20px 20px",
        transition: "background 0.3s",
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: hovered ? "rgba(255,255,255,0.2)" : "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, marginBottom: 12,
          boxShadow: hovered ? "none" : `0 4px 12px ${c.border}30`,
          transition: "all 0.3s",
        }}>
          {service.icon}
        </div>
        <h3 style={{
          fontSize: 14, fontWeight: 800,
          color: hovered ? "#fff" : "#0f172a",
          margin: 0, lineHeight: 1.3,
          transition: "color 0.3s",
        }}>
          {service.title}
        </h3>
      </div>

      {/* ─── Corps : liste des prestations du service ────────────────────── */}
      <div style={{ padding: "16px 20px", flex: 1 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {service.items.map((item, i) => (
            <li key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 13, color: "#475569",
            }}>
              {/* petite puce ronde colorée */}
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: c.border, flexShrink: 0,
              }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Pied : bouton d'action (lien interne via React Router) ─────────── */}
      <div style={{ padding: "0 20px 20px" }}>
        <Link to={linkTo} style={{
          display: "block", textAlign: "center", textDecoration: "none",
          width: "100%",
          background: hovered
            ? `linear-gradient(135deg, ${c.badge}, ${c.border})`
            : "#fff",
          color: hovered ? "#fff" : c.badge,
          border: `2px solid ${c.border}`,
          borderRadius: 8, padding: "10px 0",
          fontWeight: 800, fontSize: 12,
          letterSpacing: 1,
          transition: "all 0.3s",
          boxSizing: "border-box",
        }}>
          {service.cta} →
        </Link>
      </div>
    </div>
  );
}
