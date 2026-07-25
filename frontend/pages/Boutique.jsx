import { useSearchParams } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import ProductCard from "../components/ProductCard";
import { enrichProducts } from "../utils/productEnrichment";
import "./boutique.css";

const PAGE_SIZE = 8;

const PRICE_RANGES = [
  { id: "all", label: "Tous les prix" },
  { id: "under20", label: "Moins de 20 $" },
  { id: "20-50", label: "20 $ – 50 $" },
  { id: "50-100", label: "50 $ – 100 $" },
  { id: "over100", label: "Plus de 100 $" },
];

const SORT_OPTIONS = [
  { id: "pertinence", label: "Pertinence" },
  { id: "popularite", label: "Popularité" },
  { id: "nouveaute", label: "Nouveautés" },
  { id: "prix-asc", label: "Prix croissant" },
  { id: "prix-desc", label: "Prix décroissant" },
];

// ─── Petit composant réutilisable pour une rangée horizontale de produits ──
function ProductRail({ title, products, onAdd, addedId }) {
  if (!products.length) return null;
  return (
    <div className="shop-section">
      <div className="shop-section-header">
        <h2 className="shop-section-title">{title}</h2>
      </div>
      <div className="shop-scroller">
        {products.map((p) => (
          <div className="shop-scroller-item" key={p.id}>
            <ProductCard product={p} onAdd={onAdd} isAdded={addedId === p.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Boutique() {
  const [params] = useSearchParams();
  const initialCat = params.get("cat");

  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addItem } = useCart();
  const [addedId, setAddedId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCat || "tous");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("pertinence");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allItems = await api.getServices();
        setRawProducts(allItems);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAdd = (product) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  // ─── Uniquement les produits (pas les prestations de service) ──────────
  const products = useMemo(
    () => enrichProducts(rawProducts.filter((p) => p.is_service === false)),
    [rawProducts]
  );

  // ─── Liste des catégories disponibles, déduites des produits ───────────
  const categories = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      if (p.category?.slug) map.set(p.category.slug, p.category.name || p.category.slug);
    });
    return Array.from(map.entries()).map(([slug, name]) => ({ slug, name }));
  }, [products]);

  // ─── Sections marketing (filtrées par la catégorie sélectionnée) ────────
  const categoryFiltered = useMemo(() => {
    if (selectedCategory === "tous") return products;
    return products.filter(
      (p) => p.category?.slug === selectedCategory || p.slug === selectedCategory
    );
  }, [products, selectedCategory]);

  const popularProducts = useMemo(
    () => [...categoryFiltered].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 10),
    [categoryFiltered]
  );
  const newProducts = useMemo(
    () => categoryFiltered.filter((p) => p.isNew).slice(0, 10),
    [categoryFiltered]
  );
  const promoProducts = useMemo(
    () => categoryFiltered.filter((p) => p.badge === "promo").slice(0, 10),
    [categoryFiltered]
  );
  const recommendedProducts = useMemo(
    () => [...categoryFiltered].filter((p) => p.rating >= 4.3).slice(0, 10),
    [categoryFiltered]
  );

  // ─── Filtrage + tri du catalogue principal ─────────────────────────────
  const filteredSorted = useMemo(() => {
    let list = products;

    if (selectedCategory !== "tous") {
      list = list.filter(
        (p) => p.category?.slug === selectedCategory || p.slug === selectedCategory
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (priceRange !== "all") {
      list = list.filter((p) => {
        const usd = p.price;
        if (priceRange === "under20") return usd < 20;
        if (priceRange === "20-50") return usd >= 20 && usd <= 50;
        if (priceRange === "50-100") return usd > 50 && usd <= 100;
        if (priceRange === "over100") return usd > 100;
        return true;
      });
    }

    const sorted = [...list];
    if (sortBy === "prix-asc") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "prix-desc") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "popularite") sorted.sort((a, b) => b.popularityScore - a.popularityScore);
    else if (sortBy === "nouveaute") sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return sorted;
  }, [products, selectedCategory, searchQuery, priceRange, sortBy]);

  const visibleProducts = filteredSorted.slice(0, visibleCount);
  const hasMore = visibleCount < filteredSorted.length;

  // Réinitialise la pagination quand un filtre change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategory, searchQuery, priceRange, sortBy]);

  if (loading) {
    return <div className="shop-page" style={{ padding: 60, textAlign: "center" }}>Chargement...</div>;
  }

  if (error) {
    return (
      <div className="shop-page" style={{ padding: 60, textAlign: "center", color: "#dc2626" }}>
        Erreur : {error}
      </div>
    );
  }

  return (
    <div className="shop-page">
      {/* ─── Hero + recherche ─────────────────────────────────────────────── */}
      <div className="shop-hero">
        <h1 className="shop-hero-title">Boutique Grâce Divine</h1>
        <p className="shop-hero-subtitle">
          Informatique & habillement — livraison rapide à Kolwezi
        </p>
        <div className="shop-search-wrap">
          <span className="shop-search-icon">🔍</span>
          <input
            type="text"
            className="shop-search-input"
            placeholder="Rechercher un produit…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* ─── Chips de catégories ──────────────────────────────────────────── */}
      <div className="shop-categories">
        <button
          className={`shop-chip ${selectedCategory === "tous" ? "is-active" : ""}`}
          onClick={() => setSelectedCategory("tous")}
        >
          Tous
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            className={`shop-chip ${selectedCategory === c.slug ? "is-active" : ""}`}
            onClick={() => setSelectedCategory(c.slug)}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* ─── Sections marketing (masquées pendant une recherche active) ────── */}
      {!searchQuery.trim() && (
        <>
          <ProductRail title="🔥 Produits populaires" products={popularProducts} onAdd={handleAdd} addedId={addedId} />
          <ProductRail title="🆕 Nouveautés" products={newProducts} onAdd={handleAdd} addedId={addedId} />
          <ProductRail title="🏷️ Promotions" products={promoProducts} onAdd={handleAdd} addedId={addedId} />
          <ProductRail title="✨ Produits recommandés" products={recommendedProducts} onAdd={handleAdd} addedId={addedId} />
        </>
      )}

      {/* ─── Filtres + tri ────────────────────────────────────────────────── */}
      <div className="shop-filter-bar">
        <span className="shop-filter-label">Prix</span>
        <select
          className="shop-select"
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          {PRICE_RANGES.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>

        <span className="shop-filter-label">Trier par</span>
        <select
          className="shop-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((s) => (
            <option key={s.id} value={s.id}>{s.label}</option>
          ))}
        </select>

        <span className="shop-results-count">
          {filteredSorted.length} produit{filteredSorted.length > 1 ? "s" : ""}
        </span>
      </div>

      {/* ─── Catalogue principal ──────────────────────────────────────────── */}
      <h2 className="shop-main-title">Tous nos produits</h2>

      {filteredSorted.length === 0 ? (
        <div className="shop-empty">
          <div className="shop-empty-icon">🛒</div>
          <h3 className="shop-empty-title">Aucun produit trouvé</h3>
          <p className="shop-empty-text">Essayez une autre catégorie, un autre prix ou une autre recherche.</p>
        </div>
      ) : (
        <>
          <div className="shop-grid">
            {visibleProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAdd={handleAdd}
                isAdded={addedId === p.id}
              />
            ))}
          </div>

          {hasMore && (
            <div className="shop-load-more-wrap">
              <button
                className="shop-load-more-btn"
                onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              >
                Charger plus de produits
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
