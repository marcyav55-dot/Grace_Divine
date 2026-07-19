import { SERVICES, SOCIAL, WHATSAPP_NUMBER } from "../data/siteData";

// Icône ronde pour un réseau social (réutilisée depuis Navbar avec un style adapté)
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

// ─── Pied de page : présent sur toutes les pages (ajouté dans App.jsx) ──────
export default function Footer() {
  return (
    <footer style={{ background: "#050d1f", color: "#94a3b8" }}>
      {/* Grille à 3 colonnes : présentation / liens services / contact */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        padding: "60px 24px 32px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: 40,
      }}>
        {/* ─── Colonne 1 : logo + description + réseaux sociaux ────────────── */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, color: "#fff", fontSize: 18,
            }}>G</div>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: 13 }}>GRÂCE DIVINE</div>
              <div style={{ color: "#f59e0b", fontSize: 10 }}>MULTISERVICES</div>
            </div>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
            La grâce de la qualité, la puissance du service. Votre partenaire de confiance pour le forage d'eau, l'assistance académique (mémoires & TFC), l'informatique et bien plus.
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            {SOCIAL.map(s => <SocialIcon key={s.label} {...s} />)}
          </div>
        </div>

        {/* ─── Colonne 2 : liens rapides vers chaque service ────────────────── */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>
            Nos Services
          </h4>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
            {SERVICES.map(s => (
              <li key={s.id}>
                {/* même logique de lien que dans ServiceCard :
                    boutique -> /boutique?cat=..., sinon -> /services/:slug */}
                <a
                  href={s.cta === "VOIR LA BOUTIQUE" ? `/boutique?cat=${s.slug}` : `/services/${s.slug}`}
                  style={{ color: "#94a3b8", textDecoration: "none", fontSize: 13 }}
                  onMouseEnter={e => e.currentTarget.style.color = "#f59e0b"}
                  onMouseLeave={e => e.currentTarget.style.color = "#94a3b8"}
                >
                  {s.icon} {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ─── Colonne 3 : informations de contact ───────────────────────────── */}
        <div>
          <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 16, fontSize: 14 }}>Contact</h4>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", gap: 10, fontSize: 13, color: "#94a3b8", textDecoration: "none" }}>
              <span>📞</span><span>+243 998 966 650 / +243 808 955 958</span>
            </a>
            <div style={{ display: "flex", gap: 10, fontSize: 13 }}>
              <span>📧</span><span>gracedivineinformatique@gmail.com</span>
            </div>
            <div style={{ display: "flex", gap: 10, fontSize: 13 }}>
              <span>📍</span><span>Kolwezi, Av. Unikol — près de l'Université UNIKOL (Réf. Internat Maman Deborah)</span>
            </div>
            <div style={{ display: "flex", gap: 10, fontSize: 13 }}>
              <span>🕐</span><span>Lun–Sam : 07h – 19h</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bandeau de copyright (bas de page) ────────────────────────────── */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "20px 24px",
        textAlign: "center",
        fontSize: 12, color: "#475569",
      }}>
        © 2024 Maison Grâce Divine · Tous droits réservés
        <span style={{ margin: "0 8px" }}>·</span>
        Développé par <span style={{ color: "#f59e0b", fontWeight: 700 }}>Marcus Yav</span>
      </div>
    </footer>
  );
}
