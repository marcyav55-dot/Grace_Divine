import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { NAV_LINKS, SOCIAL } from "../data/siteData";

// Petit composant pour les icônes des réseaux sociaux (Facebook, WhatsApp...)
function SocialIcon({ icon, label, href }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        width: 28, height: 28,
        borderRadius: "50%",
        background: "rgba(255,255,255,0.15)",
        display: "flex", alignItems: "center", justifyContent: "center",
        color: "#fff",
        fontSize: 11,
        fontWeight: 700,
        textDecoration: "none",
        transition: "background 0.2s",
      }}
      onMouseEnter={e => e.currentTarget.style.background = "#f59e0b"}
      onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
    >
      {icon.slice(0, 2)}
    </a>
  );
}

// ─── Barre de navigation principale (fixe en haut de page) ───────────────────
export default function Navbar() {
  // true dès qu'on a scrollé un peu -> la barre devient plus opaque
  const [scrolled, setScrolled] = useState(false);

  // true quand le menu mobile (☰) est ouvert
  const [menuOpen, setMenuOpen] = useState(false);

  // Écoute le scroll de la page pour changer l'apparence de la navbar
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Style appliqué à chaque lien du menu (desktop).
  // React Router fournit "isActive" automatiquement via NavLink :
  // true si l'utilisateur est actuellement sur cette page.
  const linkStyle = (isActive) => ({
    background: "none", border: "none", cursor: "pointer",
    color: isActive ? "#f59e0b" : "#cbd5e1",       // orange si page active
    fontWeight: isActive ? 700 : 500,
    fontSize: 13, padding: "6px 14px",
    borderBottom: isActive ? "2px solid #f59e0b" : "2px solid transparent",
    transition: "all 0.2s",
    textDecoration: "none",
    display: "inline-block",
  });

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(10,30,80,0.97)" : "rgba(10,30,80,0.85)",
      backdropFilter: "blur(10px)",
      boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.4)" : "none",
      transition: "all 0.3s",
    }}>
      {/* ─── Barre du haut : téléphone/WhatsApp + réseaux sociaux ──────────── */}
      <div style={{
        background: "#0a1e50",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "6px 24px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 16,
        flexWrap: "wrap",
      }}>
        <a href="https://wa.me/243998966650" target="_blank" rel="noopener noreferrer"
          style={{ color: "#f59e0b", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
          📞 Tél. / WhatsApp : <strong>+243 998 966 650</strong>
        </a>
        <div style={{ display: "flex", gap: 8 }}>
          {SOCIAL.map(s => <SocialIcon key={s.label} {...s} />)}
        </div>
      </div>

      {/* ─── Barre principale : logo + liens de navigation ─────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 24px",
        maxWidth: 1200, margin: "0 auto", width: "100%",
      }}>
        {/* Logo + nom -> cliquer ramène à l'accueil ("/") */}
        <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 42, height: 42, borderRadius: "50%",
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900, color: "#fff", fontSize: 18,
          }}>G</div>
          <div>
            <div style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: 0.5 }}>
              GRÂCE DIVINE
            </div>
            <div style={{ color: "#f59e0b", fontSize: 10, letterSpacing: 1 }}>MULTISERVICES</div>
            <div style={{ color: "#94a3b8", fontSize: 9 }}>Apprenons Plus, Réussissons Ensemble</div>
          </div>
        </NavLink>

        {/* Menu desktop : un NavLink par entrée de NAV_LINKS (Accueil, Services, ...) */}
        {/* "end" sur "/" évite que le lien Accueil reste actif sur toutes les pages */}
        <div className="desktop-nav" style={{ display: "flex", gap: 4 }}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              style={({ isActive }) => linkStyle(isActive)}
              onMouseEnter={e => {
                if (!e.currentTarget.classList.contains("active")) e.currentTarget.style.color = "#fff";
              }}
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Bouton ☰ visible uniquement sur mobile (voir media query en bas) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "none", border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 6, color: "#fff", padding: "6px 10px",
            cursor: "pointer", fontSize: 18,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* ─── Menu déroulant mobile (s'affiche seulement si menuOpen = true) ── */}
      {menuOpen && (
        <div style={{
          background: "#0a1e50",
          padding: "12px 24px 20px",
          display: "flex", flexDirection: "column", gap: 4,
        }}>
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.path === "/"}
              onClick={() => setMenuOpen(false)} // referme le menu après un clic
              style={({ isActive }) => ({
                background: "none", border: "none", cursor: "pointer",
                color: isActive ? "#f59e0b" : "#cbd5e1",
                fontWeight: 600, fontSize: 14, padding: "10px 0",
                textAlign: "left", textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "block",
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      )}

      {/* ─── Responsive : bascule entre menu desktop et menu mobile ────────── */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
