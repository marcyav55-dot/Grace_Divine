// ─── Enrichissement des produits côté frontend ───────────────────────────
// Le backend Django ne fournit pas encore : note, nombre d'avis, stock,
// badge, ancien prix. En attendant que ces champs soient ajoutés au modèle
// Django (ex: rating, reviews_count, stock, old_price, badge), on génère
// ces valeurs de façon DÉTERMINISTE à partir de l'id du produit (donc
// stables entre deux rendus, pas aléatoires à chaque refresh).
//
// Quand le backend ajoutera ces champs, il suffira de remplacer le corps
// de cette fonction par un simple passthrough des données API.

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

export const BADGES = {
  new:     { label: "Nouveau",   icon: "🆕" },
  popular: { label: "Populaire", icon: "🔥" },
  topsale: { label: "Top Vente", icon: "⭐" },
  promo:   { label: "-20%",      icon: null },
};

export function enrichProduct(p) {
  const seed = simpleHash(String(p.id ?? p.slug ?? p.name ?? ""));

  const rating = Number((3.8 + (seed % 13) / 10).toFixed(1)); // entre 3.8 et 5.0
  const reviewsCount = 12 + (seed % 240);
  const inStock = seed % 9 !== 0; // ~89% des produits en stock
  const fastDelivery = seed % 3 !== 0;

  const badgeKeys = Object.keys(BADGES);
  const badge = badgeKeys[seed % badgeKeys.length];

  const oldPrice = badge === "promo" ? Math.round(p.price * 1.25) : null;

  // Score de popularité utilisé pour les tris/sections (combine note + avis)
  const popularityScore = rating * 20 + reviewsCount;

  // Utilisé pour la section "Nouveautés" : plus l'id est grand, plus le
  // produit est considéré comme récent (proxy en attendant un vrai
  // champ created_at côté API).
  const isNew = badge === "new";

  return {
    ...p,
    rating,
    reviewsCount,
    inStock,
    fastDelivery,
    badge,
    oldPrice,
    popularityScore,
    isNew,
  };
}

export function enrichProducts(products) {
  return products.map(enrichProduct);
}
