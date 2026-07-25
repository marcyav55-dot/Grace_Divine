import { useState, useRef } from "react";
import { api } from "../services/api";
import { BADGES } from "../utils/productEnrichment";
import ProductViewer from "./ProductViewer";
import "./product-card.css";

const PLACEHOLDER =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='400' viewBox='0 0 500 400'%3E%3Crect width='500' height='400' fill='%23e2e8f0'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='22' fill='%2394a3b8' text-anchor='middle' dominant-baseline='middle'%3E📦 Image indisponible%3C/text%3E%3C/svg%3E";

function resolveImg(path) {
  if (!path) return PLACEHOLDER;
  return path.startsWith("http") ? path : `${api.baseUrl}${path}`;
}

function Stars({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) stars.push("★");
    else if (rating >= i - 0.5) stars.push("★");
    else stars.push("☆");
  }
  return <span className="product-stars">{stars.join("")}</span>;
}

export default function ProductCard({ product, onAdd, isAdded }) {
  const [viewerOpen, setViewerOpen] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const lastClosedAt = useRef(0);

  const images = product.gallery_images?.length
    ? [product.image, ...product.gallery_images.map(g => g.image)].filter(Boolean)
    : [product.image];
  const resolvedImages = images.map(resolveImg);

  const badgeInfo = BADGES[product.badge];
  const priceUSD = Number(product.price).toFixed(2);
  const oldPriceUSD = product.oldPrice ? Number(product.oldPrice).toFixed(2) : null;

  const handleOpenViewer = () => {
    // Ignore les clics fantômes qui suivent immédiatement une fermeture
    if (Date.now() - lastClosedAt.current < 400) return;
    setViewerOpen(true);
  };

  const handleCloseViewer = () => {
    lastClosedAt.current = Date.now();
    setViewerOpen(false);
  };

  return (
    <div className="product-card">
      <div className="product-card-media">
        <img
          src={resolvedImages[0]}
          alt={product.name}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER;
          }}
        />

        {badgeInfo && (
          <span className={`product-badge badge-${product.badge}`}>
            {badgeInfo.icon ? `${badgeInfo.icon} ` : ""}{badgeInfo.label}
          </span>
        )}

        <button
          className={`product-fav-btn ${isFav ? "is-fav" : ""}`}
          onClick={(e) => { e.stopPropagation(); setIsFav((f) => !f); }}
          aria-label="Ajouter aux favoris"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="product-card-body">
        <h3 className="product-title">{product.name}</h3>

        <div className="product-rating-row">
          <Stars rating={product.rating} />
          <span className="product-rating-value">{product.rating}/5</span>
          <span className="product-reviews-count">({product.reviewsCount} avis)</span>
        </div>

        <div className="product-price-row">
          <span className="product-price">{priceUSD} $</span>
          {oldPriceUSD && <span className="product-old-price">{oldPriceUSD} $</span>}
        </div>

        <p className="product-desc">{product.description}</p>

        <div className="product-meta-row">
          <span className={`product-stock ${product.inStock ? "in-stock" : "out-stock"}`}>
            {product.inStock ? "✅ En stock" : "⏳ Rupture temporaire"}
          </span>
          {product.fastDelivery && (
            <span className="product-delivery">🚚 Livraison rapide</span>
          )}
        </div>

        <div className="product-actions">
          <button
            type="button"
            className="product-btn product-btn-secondary"
            onClick={handleOpenViewer}
          >
            🖼️ Voir les photos
          </button>

          <button
            className={`product-btn product-btn-primary ${isAdded ? "is-added" : ""}`}
            onClick={() => onAdd(product)}
            disabled={!product.inStock}
          >
            {isAdded ? "✓ Ajouté au panier" : "🛒 Ajouter au panier"}
          </button>
        </div>
      </div>

      {viewerOpen && (
        <ProductViewer
          product={product}
          images={resolvedImages}
          onClose={handleCloseViewer}
          onAdd={onAdd}
          isAdded={isAdded}
        />
      )}
    </div>
  );
}
