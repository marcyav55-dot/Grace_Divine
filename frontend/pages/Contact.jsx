import { useState } from "react";
import { WHATSAPP_NUMBER } from "../data/siteData";

// ─── Page Contact ("/contact") ────────────────────────────────────────────
export default function Contact() {
  // État local du formulaire (nom, téléphone, message)
  const [form, setForm] = useState({ nom: "", telephone: "", message: "" });

  // Devient true après l'envoi -> affiche un message de confirmation
  const [sent, setSent] = useState(false);

  // Met à jour le champ modifié dans "form" (utilise le "name" de l'input)
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: remplacer par un appel à l'API Django -> POST /api/contacts/
    // Exemple :
    // fetch("http://localhost:8000/api/contacts/", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });
    console.log("Formulaire envoyé :", form);
    setSent(true);
  };

  // Style commun à tous les champs du formulaire
  const inputStyle = {
    width: "100%", padding: "12px 14px", borderRadius: 8,
    border: "1px solid #cbd5e1", fontSize: 14, fontFamily: "inherit",
    boxSizing: "border-box",
  };

  return (
    <div style={{ marginTop: 110 }}>
      {/* ─── Bandeau de titre ─────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          Contactez-nous
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          Une question ? Un devis ? Écrivez-nous ou contactez-nous sur WhatsApp.
        </p>
      </div>

      <section style={{ padding: "60px 24px", background: "var(--bg-light)" }}>
        {/* Grille 2 colonnes : formulaire + bloc WhatsApp/infos */}
        <div style={{
          maxWidth: 900, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 32,
        }}>

          {/* ─── Colonne gauche : formulaire de contact ─────────────────────── */}
          <div style={{ background: "var(--bg-white)", borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 20px" }}>
              Envoyer un message
            </h2>

            {sent ? (
              // ─── Message affiché après l'envoi ──────────────────────────
              <div style={{ textAlign: "center", padding: "30px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <p style={{ color: "var(--text-primary)", fontWeight: 700 }}>Merci ! Votre message a été enregistré.</p>
              </div>
            ) : (
              // ─── Formulaire ──────────────────────────────────────────────
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <input style={inputStyle} type="text" name="nom" placeholder="Votre nom"
                  value={form.nom} onChange={handleChange} required />
                <input style={inputStyle} type="tel" name="telephone" placeholder="Votre téléphone"
                  value={form.telephone} onChange={handleChange} required />
                <textarea style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                  name="message" placeholder="Votre message"
                  value={form.message} onChange={handleChange} required />
                <button type="submit" style={{
                  background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)",
                  color: "#fff", border: "none", borderRadius: 8,
                  padding: "12px 0", fontWeight: 800, fontSize: 14,
                  letterSpacing: 1, cursor: "pointer",
                }}>
                  ENVOYER
                </button>
              </form>
            )}
          </div>

          {/* ─── Colonne droite : bouton WhatsApp + coordonnées ──────────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

            {/* Carte WhatsApp cliquable -> ouvre une conversation directe */}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "linear-gradient(135deg, #25D366, #128C7E)",
                color: "#fff", textDecoration: "none",
                borderRadius: 12, padding: "20px 24px",
                boxShadow: "0 6px 24px rgba(37,211,102,0.35)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 3.5a8.97 8.97 0 0 0-7.77 13.5L3 21l4.15-1.25a8.94 8.94 0 0 0 4.9 1.45h.01c4.95 0 9-4.03 9-9a8.93 8.93 0 0 0-3.46-6.88zM12.06 19.9a7.4 7.4 0 0 1-3.78-1.04l-.27-.16-2.81.85.85-2.74-.18-.28a7.42 7.42 0 0 1-1.14-3.97c0-4.1 3.35-7.45 7.46-7.45a7.4 7.4 0 0 1 5.27 2.19 7.4 7.4 0 0 1 2.18 5.27c0 4.12-3.45 7.33-7.58 7.33zm4.07-5.5c-.22-.11-1.32-.65-1.53-.73-.2-.07-.35-.11-.5.11-.15.22-.57.73-.7.88-.13.15-.26.16-.48.05-1.32-.66-2.19-1.18-3.06-2.67-.23-.4.23-.37.66-1.23.07-.15.04-.27-.02-.38-.07-.11-.6-1.45-.82-1.94-.22-.48-.44-.42-.6-.42-.16 0-.34-.02-.52-.02-.18 0-.47.07-.71.34-.25.27-.96.94-.96 2.3 0 1.35.98 2.66 1.12 2.85.13.18 1.84 2.8 4.47 3.82 2.21.85 2.65.69 3.13.65.48-.05 1.51-.62 1.72-1.21.21-.6.21-1.11.15-1.21-.06-.11-.22-.17-.44-.28z"/>
              </svg>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>WhatsApp</div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>+243 998 966 650</div>
              </div>
            </a>


            {/* Carte Appel direct -> lance un appel téléphonique */}
            <a
              href="tel:+243808955958"
              style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "linear-gradient(135deg, #1d4ed8, #0a1e50)",
                color: "#fff", textDecoration: "none",
                borderRadius: 12, padding: "20px 24px",
                boxShadow: "0 6px 24px rgba(29,78,216,0.35)",
              }}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24 11.3 11.3 0 0 0 3.54.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11.3 11.3 0 0 0 .57 3.54 1 1 0 0 1-.25 1.02z"/>
              </svg>
              <div>
                <div style={{ fontWeight: 800, fontSize: 15 }}>Appel direct</div>
                <div style={{ fontSize: 13, opacity: 0.9 }}>+243 808 955 958</div>
              </div>
            </a>

            {/* Bloc informations générales */}
            <div style={{ background: "var(--bg-white)", borderRadius: 12, padding: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 16px" }}>
                Informations
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13, color: "var(--text-secondary)" }}>
                <div>📍 République Démocratique du Congo</div>
                <div>📧 gracedivineinformatique@gmail.com</div>
                <div>🕐 Lun – Sam : 07h – 19h</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
