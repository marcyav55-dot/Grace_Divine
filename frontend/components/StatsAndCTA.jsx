import { WHATSAPP_NUMBER } from "../data/siteData";

// ─── Bandeau de statistiques (500+ clients, 6 domaines, etc.) ───────────────
// Affiché sur la page d'accueil, juste après le carrousel de services.
export function StatsStrip() {
  const stats = [
    { value: "500+", label: "Clients satisfaits", icon: "🤝" },
    { value: "6", label: "Domaines de service", icon: "🏢" },
    { value: "10+", label: "Années d'expérience", icon: "📅" },
    { value: "24/7", label: "Support disponible", icon: "📞" },
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg, #0a1e50, #1d4ed8)",
      padding: "40px 24px",
    }}>
      {/* Grille responsive : autant de colonnes que de place disponible */}
      <div style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        gap: 24, textAlign: "center",
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{
            padding: "20px 16px",
            // séparateur vertical entre chaque statistique (sauf la dernière)
            borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.12)" : "none",
          }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 36, fontWeight: 900, color: "#f59e0b", lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bandeau "Call To Action" en bas de la page d'accueil ───────────────────
// Encourage l'utilisateur à contacter l'entreprise via WhatsApp ou formulaire.
export function CTABanner() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
      padding: "60px 24px",
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2 style={{
          fontSize: "clamp(1.5rem, 4vw, 2rem)",
          fontWeight: 900, color: "#fff",
          margin: "0 0 12px",
        }}>
          Besoin d'un service ? Parlons-en !
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 15, marginBottom: 32 }}>
          Contactez-nous via WhatsApp pour un devis rapide et gratuit.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          {/* Bouton WhatsApp (vert) -> ouvre une conversation directe */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff", border: "none", textDecoration: "none",
              cursor: "pointer",
              padding: "14px 32px", borderRadius: 8,
              fontWeight: 800, fontSize: 14, letterSpacing: 0.5,
            }}
          >
            💬 WhatsApp
          </a>
          {/* Bouton vers la page /contact (formulaire) */}
          <a href="/contact" style={{
            background: "transparent", color: "#fff", textDecoration: "none",
            border: "2px solid rgba(255,255,255,0.8)", cursor: "pointer",
            padding: "14px 32px", borderRadius: 8,
            fontWeight: 700, fontSize: 14,
            display: "inline-flex", alignItems: "center",
          }}>
            📧 Formulaire de contact
          </a>
        </div>
      </div>
    </section>
  );
}
