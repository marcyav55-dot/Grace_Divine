import { useSearchParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { api } from "../services/api";
import ServiceCard from "../components/ServiceCard";

function mapToCard(s) {
  return {
    id: s.id,
    title: s.name,
    description: s.description,
    items: s.description ? [s.description] : [],
    cta: s.is_service === false ? "VOIR LA BOUTIQUE" : "EN SAVOIR PLUS",
    slug: s.category?.slug || s.id,
    icon: s.category?.slug === "web" ? "🌐" : s.category?.slug === "forage" ? "💧" : "🔧",
    color: s.category?.slug === "web" ? "blue" : s.category?.slug === "forage" ? "cyan" : "amber",
  };
}

export default function Recherche() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const data = await api.search(q);
        setResults(data.map(mapToCard));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    if (q) fetchResults();
    else { setResults([]); setLoading(false); }
  }, [q]);

  return (
    <div style={{ marginTop: 110 }}>
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", fontWeight: 900, margin: 0 }}>
          Résultats pour « {q} »
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          {loading ? "Recherche en cours..." : `${results.length} résultat(s) trouvé(s)`}
        </p>
      </div>

      <section style={{ padding: "60px 24px", background: "var(--bg-light)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {!loading && results.length === 0 && (
            <div style={{ textAlign: "center", color: "var(--text-secondary)", padding: "40px 0" }}>
              <p>Aucun résultat pour cette recherche.</p>
              <Link to="/services" style={{ color: "#1d4ed8", fontWeight: 700 }}>Voir tous nos services</Link>
            </div>
          )}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {results.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
