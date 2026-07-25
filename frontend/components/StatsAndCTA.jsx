import { WHATSAPP_NUMBER } from "../data/siteData";

// ─── Bandeau de statistiques (500+ clients, 6 domaines, etc.) ───────────────
export function StatsStrip() {
  const stats = [
    { value: "500+", label: "Clients satisfaits", icon: "🤝" },
    { value: "6", label: "Domaines de service", icon: "🏢" },
    { value: "10+", label: "Années d'expérience", icon: "📅" },
    { value: "24/7", label: "Support disponible", icon: "📞" },
  ];
  return (
    <div style={{
      background: "linear-gradient(135deg, #0a1628, #0a1628)",
      padding: "44px 24px",
    }}>
      <style>{`
        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .stats-card {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 16px;
          padding: 22px 12px;
          text-align: center;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .stats-card:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.1);
        }
        @media (max-width: 640px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .stats-card {
            padding: 18px 10px;
          }
        }
      `}</style>
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stats-card">
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 30, fontWeight: 900, color: "#c9a227", lineHeight: 1 }}>
              {s.value}
            </div>
            <div style={{ color: "#cbd5e1", fontSize: 12.5, marginTop: 6 }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bandeau "Call To Action" en bas de la page d'accueil ───────────────────
export function CTABanner() {
  return (
    <section style={{
      background: "linear-gradient(135deg, #c9a227 0%, #a8841f 100%)",
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
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #25D366, #128C7E)",
              color: "#fff", border: "none", textDecoration: "none",
              cursor: "pointer",
              padding: "14px 32px", borderRadius: 999,
              fontWeight: 800, fontSize: 14, letterSpacing: 0.5,
            }}
          >
            💬 WhatsApp
          </a>
          <a href="/contact" style={{
            background: "transparent", color: "#fff", textDecoration: "none",
            border: "2px solid rgba(255,255,255,0.8)", cursor: "pointer",
            padding: "14px 32px", borderRadius: 999,
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
