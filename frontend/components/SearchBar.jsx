import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVICES } from "../data/siteData";

// ─── Slugs des services qui redirigent vers la Boutique plutôt que /services ─
const BOUTIQUE_SLUGS = ["produits-informatiques", "habillement"];

// ─── Construction d'un index de recherche à plat : service + chaque item ────
// Chaque entrée est soit le service lui-même (titre/desc), soit un de ses
// "items" (ex: "Ordinateurs", "Chaussures") rattaché à son service parent.
function buildSearchIndex() {
  const index = [];
  SERVICES.forEach((service) => {
    index.push({
      type: "service",
      label: service.title,
      sub: service.desc,
      icon: service.icon,
      slug: service.slug,
    });
    (service.items || []).forEach((item) => {
      index.push({
        type: BOUTIQUE_SLUGS.includes(service.slug) ? "produit" : "prestation",
        label: item,
        sub: service.title,
        icon: service.icon,
        slug: service.slug,
      });
    });
  });
  return index;
}

const SEARCH_INDEX = buildSearchIndex();

export default function SearchBar({ onClose }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Focus automatique à l'ouverture
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fermeture si on clique en dehors, ou touche Échap
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        onClose();
      }
    };
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  // Filtrage en direct (insensible à la casse / aux accents basiques)
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SEARCH_INDEX.filter(
      (entry) =>
        entry.label.toLowerCase().includes(q) ||
        entry.sub.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const goToResult = (entry) => {
    if (BOUTIQUE_SLUGS.includes(entry.slug)) {
      navigate(`/boutique?cat=${entry.slug}`);
    } else {
      navigate(`/services?focus=${entry.slug}`);
    }
    setQuery("");
    onClose();
  };

  return (
    <div className="nav-search-bar" ref={wrapperRef}>
      <div className="nav-search-input-row">
        <span className="nav-search-icon">🔍</span>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Rechercher un service ou un produit…"
          className="nav-search-input"
        />
        <button className="nav-search-close" onClick={onClose} aria-label="Fermer la recherche">
          ✕
        </button>
      </div>

      {query.trim() && (
        <div className="nav-search-results">
          {results.length === 0 ? (
            <p className="nav-search-empty">Aucun résultat pour « {query} »</p>
          ) : (
            results.map((entry, i) => (
              <button
                key={i}
                className="nav-search-result"
                onClick={() => goToResult(entry)}
              >
                <span className="nav-search-result-icon">{entry.icon}</span>
                <span className="nav-search-result-text">
                  <span className="nav-search-result-label">{entry.label}</span>
                  <span className="nav-search-result-sub">
                    {entry.type === "produit" ? "Boutique · " : entry.type === "prestation" ? "Service · " : ""}
                    {entry.sub}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
