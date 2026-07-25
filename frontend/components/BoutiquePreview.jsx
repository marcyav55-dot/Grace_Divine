import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useCart } from "../context/CartContext";
import ProductCard from "./ProductCard";
import { enrichProducts } from "../utils/productEnrichment";
import "./boutique-preview.css";

const CATEGORY_FILTERS = [
  { id: "tous", label: "Tout" },
  { id: "equipements", label: "Équipements" },
  { id: "outillage", label: "Outillage" },
  { id: "materiaux", label: "Matériaux" },
  { id: "securite", label: "Sécurité" },
];

export default function BoutiquePreview() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [rawProducts, setRawProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("tous");
  const [addedId, setAddedId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allItems = await api.getServices();
        setRawProducts(allItems);
      } catch (err) {
        // Silencieux : la section reste vide si l'API échoue
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const products = useMemo(
    () => enrichProducts(rawProducts.filter((p) => p.is_service === false)),
    [rawProducts]
  );

  const filtered = useMemo(() => {
    if (selectedCategory === "tous") return products;
    return products.filter(
      (p) => p.category?.slug === selectedCategory || p.slug === selectedCategory
    );
  }, [products, selectedCategory]);

  const preview = useMemo(
    () => [...filtered].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 4),
    [filtered]
  );

  const handleAdd = (product) => {
    addItem(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  if (loading || products.length === 0) return null;

  return (
    <section className="shop-preview-section">
      <div className="shop-preview-header">
        <h2 className="shop-preview-title">Notre Boutique</h2>
      </div>

      <div className="shop-preview-chips">
        {CATEGORY_FILTERS.map((c) => (
          <button
            key={c.id}
            className={`shop-preview-chip ${selectedCategory === c.id ? "is-active" : ""}`}
            onClick={() => setSelectedCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="shop-preview-grid">
        {preview.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onAdd={handleAdd}
            isAdded={addedId === p.id}
          />
        ))}
      </div>

      <div className="shop-preview-cta-wrap">
        <button className="shop-preview-cta" onClick={() => navigate("/boutique")}>
          Voir toute la boutique →
        </button>
      </div>
    </section>
  );
}
