export default function TrustSection() {
  const items = [
    { icon: "⭐", title: "Clients satisfaits", desc: "★★★★★  4.9/5 — Note moyenne de nos clients" },
    { icon: "⚡", title: "Intervention rapide", desc: "Réponse rapide à Kolwezi & Lubumbashi" },
    { icon: "📱", title: "Mobile Money", desc: "Paiement Mobile Money, cash ou virement" },
    { icon: "🕐", title: "Disponible 7j/7", desc: "Service disponible toute la semaine" },
    { icon: "💬", title: "Assistance WhatsApp", desc: "Contact direct et rapide via WhatsApp" },
  ];

  return (
    <section style={{ padding: "48px 24px", background: "var(--bg-white, #fff)" }}>
      <style>{`
        .trust-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 18px;
        }
        .trust-card {
          background: #fff;
          border: 1px solid #eef2f7;
          border-radius: 18px;
          padding: 22px 18px;
          text-align: center;
          box-shadow: 0 4px 18px rgba(10,30,80,0.06);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .trust-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(10,30,80,0.12);
        }
      `}</style>
      <div className="trust-grid">
        {items.map((it, i) => (
          <div key={i} className="trust-card">
            <div style={{ fontSize: 28, marginBottom: 10, color: "#c9a227" }}>{it.icon}</div>
            <div style={{ fontWeight: 800, fontSize: 14, color: "#0a1628", marginBottom: 4 }}>
              {it.title}
            </div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
