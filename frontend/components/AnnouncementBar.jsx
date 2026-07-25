import { useState, useEffect } from "react";

const MESSAGES = [
  "🚚 Interventions rapides à Kolwezi et Lubumbashi",
  "💧 Devis gratuit pour vos projets de forage d'eau",
  "📱 Paiement Mobile Money, cash ou virement accepté",
  "🎓 Assistance académique : mémoires & TFC",
  "🛠️ Service après-vente & support disponible",
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % MESSAGES.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      background: "#000",
      color: "#fff",
      padding: "8px 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 13,
      fontWeight: 700,
      textAlign: "center",
    }}>
      <span>{MESSAGES[index]}</span>
    </div>
  );
}
