import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api"; // Import du service API

// ─── Page Boutique ("/boutique") ──────────────────────────────────────────
// Maintenant connectée à l'API Django pour afficher les produits par catégorie
export default function Boutique() {
  const [params] = useSearchParams();
  const cat = params.get("cat");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Charger tous les produits/services
        const allItems = await api.getServices();
        setProducts(allItems);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filtrer par catégorie si paramètre présent
  const filteredProducts = cat 
    ? products.filter(p => p.category?.slug === cat || p.slug === cat)
    : products.filter(p => p.is_service === false);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div style={{ marginTop: 110 }}>
      {/* ─── Bandeau de titre (affiche la catégorie si elle est connue) ────── */}
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          Boutique
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          {cat ? `Catégorie : ${cat}` : "Informatique & Habillement - Catalogue connecté à l'API"}
        </p>
      </div>

      {/* ─── Liste des produits ──────────────────────────────────────────────── */}
      <section style={{ padding: "60px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>Aucun produit trouvé</h2>
              <p style={{ color: "#64748b", fontSize: 14 }}>Essayez une autre catégorie ou revenez plus tard.</p>
            </div>
          ) : (
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}>
              {filteredProducts.map(p => (
                <div key={p.id} style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{p.name}</h3>
                    <p style={{ color: "#64748b", fontSize: 14, margin: "0 0 12px" }}>{p.description}</p>
                    <p style={{ fontSize: 18, fontWeight: 800, color: "#1d4ed8" }}>{p.price/1000} {p.price % 1000 === 0 ? "USD" : "USD"}</p>
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