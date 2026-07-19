// ─── Page Blog ("/blog") ──────────────────────────────────────────────────
// Pour l'instant : page d'attente (placeholder), même structure visuelle
// que les autres pages (bandeau de titre + carte centrale).
export default function Blog() {
  return (
    <div style={{ marginTop: 110 }}>
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          Blog
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          Actualités, conseils et astuces de Maison Grâce Divine
        </p>
      </div>

      <section style={{ padding: "80px 24px", background: "#f8fafc", minHeight: "40vh" }}>
        <div style={{
          maxWidth: 600, margin: "0 auto", textAlign: "center",
          background: "#fff", borderRadius: 12, padding: "48px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>📰</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
            Articles à venir
          </h2>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>
            Les articles seront chargés depuis l'API Django (modèle <code>Article</code>),
            avec liste paginée et page de détail par <code>slug</code>.
          </p>
        </div>
      </section>
    </div>
  );
}
