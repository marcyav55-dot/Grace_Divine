import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

export default function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const debounceRef = useRef(null);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const data = await api.search(query);
        setResults(data.slice(0, 6));
      } catch {
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  const goToResult = (item) => {
    setQuery("");
    setResults([]);
    if (onClose) onClose();
    navigate(item.is_service ? `/services/${item.category?.slug}` : "/boutique");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length < 2) return;
    if (onClose) onClose();
    navigate(`/recherche?q=${encodeURIComponent(query)}`);
  };

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
        <input
          autoFocus
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher un produit ou service..."
          style={{
            width: "100%", padding: "10px 14px", borderRadius: 8,
            border: "1px solid #cbd5e1", fontSize: 14, fontFamily: "inherit",
            boxSizing: "border-box",
          }}
        />
        <button type="submit" style={{
          marginLeft: 8, background: "#1d4ed8", color: "#fff", border: "none",
          borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontSize: 16,
        }}>
          🔍
        </button>
      </form>

      {/* ─── Suggestions live ──────────────────────────────────────────── */}
      {query.trim().length >= 2 && (
        <div style={{
          position: "absolute", top: "110%", left: 0, right: 0,
          background: "#fff", borderRadius: 8, boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          zIndex: 50, maxHeight: 320, overflowY: "auto",
        }}>
          {loading && (
            <div style={{ padding: 14, fontSize: 13, color: "#64748b" }}>Recherche...</div>
          )}
          {!loading && results.length === 0 && (
            <div style={{ padding: 14, fontSize: 13, color: "#64748b" }}>Aucun résultat.</div>
          )}
          {!loading && results.map(item => (
            <div
              key={item.id}
              onClick={() => goToResult(item)}
              style={{
                padding: "10px 14px", cursor: "pointer", fontSize: 14,
                borderBottom: "1px solid #f1f5f9",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
            >
              <div>
                <div style={{ fontWeight: 700, color: "#1a202c" }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "#64748b" }}>{item.category?.name}</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#1d4ed8" }}>
                {Number(item.price).toLocaleString()} FC
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
