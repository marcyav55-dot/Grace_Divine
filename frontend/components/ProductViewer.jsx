import { useState } from "react";
import { createPortal } from "react-dom";
import { BADGES } from "../utils/productEnrichment";

export default function ProductViewer({ product, images, onClose, onAdd, isAdded }) {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((c) => (c + 1) % images.length);
  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);

  const badgeInfo = BADGES[product.badge];
  const priceUSD = Number(product.price).toFixed(2);
  const oldPriceUSD = product.oldPrice ? Number(product.oldPrice).toFixed(2) : null;

  return createPortal(
    <div className="pv-overlay" onClick={onClose}>
      <style>{`
        .pv-overlay {
          position: fixed; inset: 0; z-index: 2000;
          background: #000;
          display: flex; flex-direction: column;
          animation: pvFadeIn 0.25s ease-out;
        }
        @keyframes pvFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .pv-image-zone {
          position: relative;
          flex: 1 1 55%;
          min-height: 280px;
          display: flex; align-items: center; justify-content: center;
          background: #0a0a0a;
        }
        .pv-image-zone img {
          max-width: 100%; max-height: 100%; object-fit: contain;
        }
        .pv-close {
          position: absolute; top: 16px; right: 16px; z-index: 5;
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.15); backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff; font-size: 20px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .pv-nav {
          position: absolute; top: 50%; transform: translateY(-50%);
          width: 40px; height: 40px; border-radius: 50%;
          background: rgba(255,255,255,0.12); backdrop-filter: blur(6px);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff; font-size: 22px; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .pv-nav.prev { left: 12px; }
        .pv-nav.next { right: 12px; }
        .pv-dots {
          position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
          display: flex; gap: 6px;
        }
        .pv-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(255,255,255,0.4);
        }
        .pv-dot.active { background: #c9a227; width: 20px; border-radius: 4px; }
        .pv-sheet {
          background: #fff;
          border-radius: 20px 20px 0 0;
          padding: 22px 20px 24px;
          flex: 1 1 45%;
          overflow-y: auto;
          animation: pvSlideUp 0.3s ease-out;
        }
        @keyframes pvSlideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .pv-handle {
          width: 40px; height: 4px; background: #e2e8f0; border-radius: 2px;
          margin: 0 auto 16px;
        }
      `}</style>

      <div className="pv-image-zone" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pv-close" onClick={(e) => { e.preventDefault(); e.stopPropagation(); onClose(); }} aria-label="Fermer">✕</button>
        <img src={images[current]} alt={product.name} />
        {images.length > 1 && (
          <>
            <button className="pv-nav prev" onClick={prev} aria-label="Précédente">‹</button>
            <button className="pv-nav next" onClick={next} aria-label="Suivante">›</button>
            <div className="pv-dots">
              {images.map((_, i) => (
                <span key={i} className={`pv-dot ${i === current ? "active" : ""}`} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="pv-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="pv-handle" />

        {badgeInfo && (
          <span style={{
            display: "inline-block", background: "#fef3c7", color: "#b45309",
            fontSize: 11, fontWeight: 800, padding: "3px 10px", borderRadius: 20,
            marginBottom: 10,
          }}>
            {badgeInfo.icon ? `${badgeInfo.icon} ` : ""}{badgeInfo.label}
          </span>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 900, margin: "0 0 8px", color: "#0f172a" }}>
          {product.name}
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, fontSize: 13, color: "#64748b" }}>
          <span style={{ color: "#c9a227" }}>{"★".repeat(Math.round(product.rating))}{"☆".repeat(5 - Math.round(product.rating))}</span>
          <span>{product.rating}/5 ({product.reviewsCount} avis)</span>
        </div>

        <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 14 }}>
          <span style={{ fontSize: 26, fontWeight: 900, color: "#0a1628" }}>{priceUSD} $</span>
          {oldPriceUSD && (
            <span style={{ fontSize: 15, color: "#94a3b8", textDecoration: "line-through" }}>{oldPriceUSD} $</span>
          )}
        </div>

        <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.6, marginBottom: 16 }}>
          {product.description}
        </p>

        <div style={{ display: "flex", gap: 16, marginBottom: 20, fontSize: 13 }}>
          <span style={{ color: product.inStock ? "#16a34a" : "#dc2626", fontWeight: 700 }}>
            {product.inStock ? "✅ En stock" : "⏳ Rupture temporaire"}
          </span>
          {product.fastDelivery && (
            <span style={{ color: "#0a1628", fontWeight: 700 }}>🚚 Livraison rapide</span>
          )}
        </div>

        <button
          onClick={() => onAdd(product)}
          disabled={!product.inStock}
          style={{
            width: "100%", padding: "14px 0", borderRadius: 999,
            background: isAdded ? "#16a34a" : "linear-gradient(135deg, #0a1628, #16274a)",
            color: "#fff", border: "none", fontWeight: 800, fontSize: 14,
            letterSpacing: 0.5, cursor: product.inStock ? "pointer" : "not-allowed",
            opacity: product.inStock ? 1 : 0.6,
          }}
        >
          {isAdded ? "✓ Ajouté au panier" : "🛒 Ajouter au panier"}
        </button>
      </div>
    </div>,
    document.body
  );
}
