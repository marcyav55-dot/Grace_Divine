import { useSearchParams } from "react-router-dom";
import { SERVICES } from "../data/siteData";

// ─── Page Boutique ("/boutique") ──────────────────────────────────────────
// Pour l'instant : page d'attente (placeholder).
// useSearchParams() lit les paramètres après le "?" dans l'URL.
// Exemple : /boutique?cat=habillement -> params.get("cat") = "habillement"
// (ce lien est généré automatiquement par les boutons "VOIR LA BOUTIQUE"
//  des cartes de services informatique / habillement)
export default function Boutique() {
  const [params] = useSearchParams();
  const cat = params.get("cat");
  const category = SERVICES.find(s => s.slug === cat);

  return (
    <div style={{ marginTop: 110 }}>
      {/* ─── Bandeau de titre (affiche la catégorie si elle est connue) ────── */}
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          Boutique
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          {category ? `Catégorie : ${category.title}` : "Informatique & Habillement"}
        </p>
      </div>

      {/* ─── Message d'attente (à remplacer par le vrai catalogue) ─────────── */}
      <section style={{ padding: "80px 24px", background: "#f8fafc", minHeight: "40vh" }}>
        <div style={{
          maxWidth: 600, margin: "0 auto", textAlign: "center",
          background: "#fff", borderRadius: 12, padding: "48px 24px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
            Catalogue en cours de préparation
          </h2>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.7 }}>
            Le catalogue de produits {category ? `pour "${category.title}"` : ""} sera bientôt
            disponible ici, connecté à l'API Django (catégories, produits, panier et commandes).
          </p>
        </div>
      </section>
    </div>
  );
}
