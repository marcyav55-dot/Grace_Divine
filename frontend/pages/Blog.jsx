import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../services/api";

function resolveImg(path) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${api.baseUrl}${path}`;
}

export default function Blog() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await api.get("/api/content/articles/");
        setArticles(Array.isArray(data) ? data : data.results || []);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    })();
  }, []);

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

      <section style={{ padding: "60px 24px", background: "var(--bg-light)", minHeight: "40vh" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {loading ? (
            <p style={{ textAlign: "center" }}>Chargement...</p>
          ) : error ? (
            <p style={{ textAlign: "center", color: "red" }}>Erreur : {error}</p>
          ) : articles.length === 0 ? (
            <div style={{
              maxWidth: 600, margin: "0 auto", textAlign: "center",
              background: "var(--bg-white)", borderRadius: 12, padding: "48px 24px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📰</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 12px" }}>
                Aucun article pour le moment
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.7 }}>
                Revenez bientôt pour découvrir nos actualités.
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
              {articles.map((a) => (
                <div key={a.id} style={{
                  background: "var(--bg-white)", borderRadius: 12, overflow: "hidden",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column",
                }}>
                  {a.image && (
                    <div style={{
                      height: 160, backgroundImage: `url(${resolveImg(a.image)})`,
                      backgroundSize: "cover", backgroundPosition: "center",
                    }} />
                  )}
                  <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: "0 0 8px" }}>{a.title}</h3>
                    <p style={{ color: "var(--text-secondary)", fontSize: 13, flex: 1, margin: "0 0 12px" }}>
                      {a.excerpt || a.content?.slice(0, 100) + "..."}
                    </p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: "0 0 12px" }}>
                      {a.author} · {a.published_at ? new Date(a.published_at).toLocaleDateString("fr-FR") : ""}
                    </p>
                    <Link to={`/blog/${a.slug}`} style={{
                      textAlign: "center", textDecoration: "none", padding: "10px 0",
                      borderRadius: 8, border: "2px solid #1d4ed8", color: "#1d4ed8",
                      fontWeight: 700, fontSize: 13,
                    }}>
                      Lire l'article
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
