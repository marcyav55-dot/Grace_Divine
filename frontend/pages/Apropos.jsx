import { SERVICES, FOUNDER, LOCATION, EMAIL, WHATSAPP_NUMBER, SECOND_PHONE } from "../data/siteData";
import ServiceCard from "../components/ServiceCard";
import { CTABanner } from "../components/StatsAndCTA";

// ─── Nos engagements / valeurs ───────────────────────────────────────────
// Repris des supports de communication (badges "Qualité / Rapidité /
// Prix abordables / Service fiable" visibles sur les flyers Grâce Divine)
const VALEURS = [
  { icon: "🏅", title: "Qualité Professionnelle", desc: "Un travail soigné, conforme aux normes académiques et techniques." },
  { icon: "⏱️", title: "Respect des Délais", desc: "Rapidité d'exécution sans jamais sacrifier la qualité." },
  { icon: "💰", title: "Prix Accessibles", desc: "Des tarifs adaptés aux étudiants, familles et entreprises de Kolwezi." },
  { icon: "🤝", title: "Service Fiable", desc: "Un accompagnement sérieux et confidentiel, du début à la fin." },
];

// ─── Page "À Propos" ("/a-propos") ──────────────────────────────────────
export default function Apropos() {
  return (
    <div style={{ marginTop: 110 }}>

      {/* ─── Bandeau de titre ─────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          À Propos de Grâce Divine
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          Apprenons Plus, Réussissons Ensemble
        </p>
      </div>

      {/* ─── Fondateur + Histoire ───────────────────────────────────────────
          Grille 2 colonnes : à gauche la carte du fondateur,
          à droite le texte racontant la création et la mission de l'entreprise. */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(220px, 320px) 1fr",
          gap: 40,
          alignItems: "center",
        }}>
          {/* ─── Carte du fondateur ─────────────────────────────────────── */}
          <div style={{
            background: "linear-gradient(135deg, #0a1e50, #1d4ed8)",
            borderRadius: 16,
            padding: "40px 24px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(10,30,80,0.25)",
          }}>
            {/* Avatar avec initiales (en attendant une vraie photo) */}
            <div style={{
              width: 110, height: 110, borderRadius: "50%",
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 40, fontWeight: 900, color: "#fff",
              margin: "0 auto 20px",
              boxShadow: "0 6px 20px rgba(245,158,11,0.4)",
            }}>
              LA
            </div>
            <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>
              {FOUNDER.name}
            </h3>
            <p style={{ color: "#f59e0b", fontSize: 13, fontWeight: 700, margin: "0 0 12px" }}>
              {FOUNDER.role}
            </p>
            <p style={{ color: "#94a3b8", fontSize: 12, lineHeight: 1.6, margin: 0 }}>
              À l'origine de Maison Grâce Divine, fondée en {FOUNDER.year} à Kolwezi.
            </p>
          </div>

          {/* ─── Texte de présentation / histoire ─────────────────────────── */}
          <div>
            <span style={{
              display: "inline-block",
              background: "#eff6ff", color: "#1d4ed8",
              fontSize: 12, fontWeight: 700, letterSpacing: 2,
              padding: "4px 16px", borderRadius: 20, marginBottom: 16,
              textTransform: "uppercase",
            }}>
              Notre Histoire
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "#0f172a", margin: "0 0 18px", lineHeight: 1.25 }}>
              Une vision née en {FOUNDER.year}, au service de Kolwezi
            </h2>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Tout commence en <strong>{FOUNDER.year}</strong>, lorsque <strong>{FOUNDER.name}</strong>,
              animé par la volonté de servir sa communauté, fonde <strong>Maison Grâce Divine</strong>.
              Convaincu que l'eau, le savoir et la technologie sont des piliers essentiels du
              développement, il se lance avec une triple mission&nbsp;:
            </p>
            <ul style={{ color: "#475569", fontSize: 15, lineHeight: 1.9, paddingLeft: 20, marginBottom: 16 }}>
              <li>💧 Faciliter l'accès à l'eau potable grâce au <strong>forage de puits</strong> pour les familles et communautés&nbsp;;</li>
              <li>📚 Accompagner les <strong>étudiants et finalistes</strong> (notamment de l'Université de Kolwezi) dans la
                rédaction, la correction, l'impression et la reliure de leurs <strong>mémoires, TFC et rapports de stage</strong>&nbsp;;</li>
              <li>💻 Fournir aux particuliers et entreprises du <strong>matériel informatique</strong> de qualité, garanti et au juste prix.</li>
            </ul>
            <p style={{ color: "#475569", fontSize: 15, lineHeight: 1.8 }}>
              Au fil des années, Grâce Divine a élargi son champ d'action — bureautique, réseaux &
              télécommunications, boutique d'habillement — tout en gardant la même devise&nbsp;:
              <em> « Apprenons Plus, Réussissons Ensemble »</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Nos domaines d'activité (réutilise les cartes SERVICES) ───────── */}
      <section style={{ padding: "60px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{
              display: "inline-block",
              background: "#eff6ff", color: "#1d4ed8",
              fontSize: 12, fontWeight: 700, letterSpacing: 2,
              padding: "4px 16px", borderRadius: 20, marginBottom: 16,
              textTransform: "uppercase",
            }}>
              Nos Domaines d'Activité
            </span>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>
              Une mission, plusieurs domaines
            </h2>
            <div style={{ width: 50, height: 4, background: "linear-gradient(90deg, #1d4ed8, #f59e0b)", borderRadius: 2, margin: "0 auto" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 24,
          }}>
            {SERVICES.map(s => <ServiceCard key={s.id} service={s} />)}
          </div>
        </div>
      </section>

      {/* ─── Pourquoi nous choisir (nos valeurs) ───────────────────────────── */}
      <section style={{ padding: "60px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "#0f172a", margin: "0 0 16px" }}>
              Pourquoi Nous Choisir ?
            </h2>
            <div style={{ width: 50, height: 4, background: "linear-gradient(90deg, #1d4ed8, #f59e0b)", borderRadius: 2, margin: "0 auto" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 24,
          }}>
            {VALEURS.map((v, i) => (
              <div key={i} style={{
                textAlign: "center", padding: "28px 20px",
                borderRadius: 12, background: "#f8fafc",
                border: "1px solid #f1f5f9",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "#0f172a", margin: "0 0 8px" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Localisation / Contact rapide ─────────────────────────────────── */}
      <section style={{ padding: "0 24px 60px", background: "#fff" }}>
        <div style={{
          maxWidth: 1100, margin: "0 auto",
          background: "linear-gradient(135deg, #0a1e50, #1d4ed8)",
          borderRadius: 16, padding: "40px 28px",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 24, textAlign: "center", color: "#fff",
        }}>
          <div>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📍</div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Où nous trouver</div>
            <div style={{ fontSize: 13, color: "#cbd5e1" }}>{LOCATION}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📞</div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>Téléphone / WhatsApp</div>
            <div style={{ fontSize: 13, color: "#cbd5e1" }}>+243 998 966 650 · {SECOND_PHONE}</div>
          </div>
          <div>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📧</div>
            <div style={{ fontWeight: 800, marginBottom: 4 }}>E-mail</div>
            <div style={{ fontSize: 13, color: "#cbd5e1" }}>{EMAIL}</div>
          </div>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
