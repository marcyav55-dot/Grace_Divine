import { useState } from "react";
import { api } from "../services/api";

const PLACEHOLDER = "https://via.placeholder.com/400x300?text=Produit";

function resolveImg(path) {
  if (!path) return PLACEHOLDER;
  return path.startsWith("http") ? path : `${api.baseUrl}${path}`;
}

export default function ProductCard({ product, onAdd, isAdded }) {
  const [showGallery, setShowGallery] = useState(false);
  const [current, setCurrent] = useState(0);

  // Le backend n'a qu'un seul champ "image" pour l'instant.
  // Quand un champ "images" (tableau) sera ajouté côté Django,
  // le carrousel affichera automatiquement toutes les photos.
  const images = product.images?.length ? product.images : [product.image];
  const resolvedImages = images.map(resolveImg);

  const next = () => setCurrent((c) => (c + 1) % resolvedImages.length);
  const prev = () => setCurrent((c) => (c - 1 + resolvedImages.length) % resolvedImages.length);

  return (
    <div style={{
      background: "var(--bg-white)",
      borderRadius: 12,
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
    }}>
      {showGallery ? (
        <div style={{ position: "relative" }}>
          <div style={{
            width: "100%",
            height: 220,
            backgroundImage: `url(${resolvedImages[current]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }} />
          {resolvedImages.length > 1 && (
            <>
              <button onClick={prev} style={navBtnStyle("left")}>‹</button>
              <button onClick={next} style={navBtnStyle("right")}>›</button>
            </>
          )}
          <div style={{
            position: "absolute", bottom: 8, left: 0, right: 0,
            display: "flex", justifyContent: "center", gap: 6,
          }}>
            {resolvedImages.map((_, i) => (
              <span key={i} style={{
                width: i === current ? 18 : 8, height: 8, borderRadius: 4,
                background: i === current ? "#f59e0b" : "rgba(255,255,255,0.7)",
                transition: "all 0.3s",
              }} />
            ))}
          </div>
          <div style={{ padding: 16, textAlign: "center" }}>
            <button
              onClick={() => setShowGallery(false)}
              style={{
                width: "100%", padding: "10px 0", borderRadius: 8,
                border: "2px solid #1d4ed8", background: "#fff",
                color: "#1d4ed8", fontWeight: 700, fontSize: 13, cursor: "pointer",
              }}
            >
              ← Retour au produit
            </button>
          </div>
        </div>
      ) : (
        <div style={{
          position: "relative",
          padding: "20px",
          textAlign: "center",
          minHeight: 220,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.93)), url(${resolvedImages[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{product.name}</h3>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, margin: "0 0 12px" }}>{product.description}</p>
          <p style={{ fontSize: 18, fontWeight: 800, color: "#1d4ed8" }}>{product.price / 1000} USD</p>

          <button
            onClick={() => { setShowGallery(true); setCurrent(0); }}
            style={{
              width: "100%", marginTop: 4, marginBottom: 8,
              padding: "10px 20px", borderRadius: 8, border: "none",
              cursor: "pointer", fontWeight: 700, fontSize: 13,
              color: "#fff", background: "#f59e0b",
            }}
          >
            🖼️ Voir les photos
          </button>

          <button
            onClick={() => onAdd(product)}
            style={{
              width: "100%", padding: "12px 20px", borderRadius: 8,
              border: "none", cursor: "pointer", fontWeight: 700, fontSize: 14,
              color: "#fff",
              background: isAdded ? "#16a34a" : "#1d4ed8",
              transition: "background 0.3s ease",
            }}
          >
            {isAdded ? "✓ Ajouté au panier" : "Ajouter au panier"}
          </button>
        </div>
      )}
    </div>
  );
}

function navBtnStyle(side) {
  return {
    position: "absolute", top: "50%", [side]: 8,
    transform: "translateY(-50%)",
    width: 34, height: 34, borderRadius: "50%",
    border: "none", background: "rgba(15,23,42,0.55)", color: "#fff",
    fontSize: 20, cursor: "pointer",
  };
}
