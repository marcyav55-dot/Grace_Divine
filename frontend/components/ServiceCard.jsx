import { useState } from "react";
import { Link } from "react-router-dom";
import { colorMap } from "../data/siteData";

export default function ServiceCard({ service, interactive = true }) {
  const [hovered, setHovered] = useState(false);
  const c = colorMap[service.color] || colorMap.blue;
  const isShop = service.cta === "VOIR LA BOUTIQUE";
  const linkTo = isShop ? `/boutique?cat=${service.slug}` : `/services/${service.slug}`;

  return (
    <div
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      style={{
        background: "var(--bg-white)",
        borderRadius: 12,
        overflow: "hidden",
        width: "100%",
        height: "100%",
        boxShadow: hovered
          ? `0 20px 50px rgba(0,0,0,0.18), 0 0 0 2px ${c.border}`
          : "0 4px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s cubic-bezier(0.34,1.56,0.64,1)",
        display: "flex", flexDirection: "column",
        border: `1px solid ${hovered ? c.border : "#f1f5f9"}`,
      }}
    >
      <div style={{
        position: "relative",
        height: 150,
        backgroundImage: `url(${service.img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "24px 20px 20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        transition: "all 0.3s",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? `linear-gradient(135deg, ${c.badge}e6, ${c.border}e6)`
            : "linear-gradient(180deg, rgba(15,23,42,0.05) 0%, rgba(15,23,42,0.7) 100%)",
          transition: "background 0.3s",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          width: 44, height: 44, borderRadius: 12,
          background: "rgba(255,255,255,0.92)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 22, marginBottom: 10,
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        }}>
          {service.icon}
        </div>
        <h3 style={{
          position: "relative", zIndex: 1,
          fontSize: 14, fontWeight: 800,
          color: "#fff",
          margin: 0, lineHeight: 1.3,
          textShadow: "0 1px 4px rgba(0,0,0,0.4)",
        }}>
          {service.title}
        </h3>
      </div>

      <div style={{ padding: "16px 20px", flex: 1 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8 }}>
          {(service.items || (service.description ? [service.description] : [])).map((item, i) => (
            <li key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "var(--text-secondary)" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.border, flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div style={{ padding: "0 20px 20px" }}>
        <Link to={linkTo} style={{
          display: "block", textAlign: "center", textDecoration: "none",
          width: "100%",
          background: hovered ? `linear-gradient(135deg, ${c.badge}, ${c.border})` : "#fff",
          color: hovered ? "#fff" : c.badge,
          border: `2px solid ${c.border}`,
          borderRadius: 8, padding: "10px 0",
          fontWeight: 800, fontSize: 12, letterSpacing: 1,
          transition: "all 0.3s", boxSizing: "border-box",
        }}>
          {service.cta} →
        </Link>
      </div>
    </div>
  );
}
