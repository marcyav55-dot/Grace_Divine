import { useCart } from "../context/CartContext";
import { WHATSAPP_NUMBER } from "../data/siteData";

export default function Panier() {
  const { items, removeItem, updateQty, clearCart, total } = useCart();

  const buildWhatsAppMessage = () => {
    let msg = "Bonjour, je souhaite commander :%0A%0A";
    items.forEach((i) => {
      msg += `- ${i.name} x${i.qty} (${(i.price * i.qty).toLocaleString()} CDF)%0A`;
    });
    msg += `%0ATotal : ${total.toLocaleString()} CDF`;
    return msg;
  };

  return (
    <div style={{ marginTop: 110, minHeight: "60vh" }}>
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          Mon Panier
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          {items.length === 0 ? "Votre panier est vide" : `${items.length} article(s)`}
        </p>
      </div>

      <section style={{ padding: "40px 24px", background: "var(--bg-light)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🛒</div>
              <p style={{ color: "var(--text-secondary)" }}>
                Ajoutez des produits depuis la boutique pour commencer.
              </p>
            </div>
          ) : (
            <>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {items.map((i) => (
                  <div key={i.id} style={{
                    background: "var(--bg-white)", borderRadius: 12, padding: 20,
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text-primary)" }}>{i.name}</div>
                      <div style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                        {Number(i.price).toLocaleString()} CDF / unité
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <button onClick={() => updateQty(i.id, i.qty - 1)} style={qtyBtnStyle}>−</button>
                      <span style={{ minWidth: 20, textAlign: "center", color: "var(--text-primary)" }}>{i.qty}</span>
                      <button onClick={() => updateQty(i.id, i.qty + 1)} style={qtyBtnStyle}>+</button>
                      <button onClick={() => removeItem(i.id)} style={{ ...qtyBtnStyle, marginLeft: 10, color: "#dc2626" }}>✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 24, padding: 20, background: "var(--bg-white)", borderRadius: 12,
                display: "flex", justifyContent: "space-between", alignItems: "center",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              }}>
                <span style={{ fontWeight: 800, fontSize: 18, color: "var(--text-primary)" }}>Total</span>
                <span style={{ fontWeight: 900, fontSize: 20, color: "#f59e0b" }}>
                  {total.toLocaleString()} CDF
                </span>
              </div>

              <div style={{ display: "flex", gap: 12, marginTop: 20, flexWrap: "wrap" }}>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${buildWhatsAppMessage()}`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, minWidth: 200, textAlign: "center", textDecoration: "none",
                    background: "linear-gradient(135deg, #25D366, #128C7E)",
                    color: "#fff", padding: "16px 24px", borderRadius: 8,
                    fontWeight: 800, fontSize: 15,
                  }}
                >
                  💬 Commander via WhatsApp
                </a>
                <button
                  onClick={clearCart}
                  style={{
                    background: "transparent", border: "2px solid #dc2626",
                    color: "#dc2626", padding: "16px 24px", borderRadius: 8,
                    fontWeight: 700, fontSize: 14, cursor: "pointer",
                  }}
                >
                  Vider le panier
                </button>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

const qtyBtnStyle = {
  width: 32, height: 32, borderRadius: "50%",
  border: "1px solid #e2e8f0", background: "#fff",
  cursor: "pointer", fontSize: 16, fontWeight: 700,
  display: "flex", alignItems: "center", justifyContent: "center",
};
