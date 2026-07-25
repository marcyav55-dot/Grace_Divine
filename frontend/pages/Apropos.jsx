import { useNavigate } from "react-router-dom";
import { SERVICES_PREMIUM, FOUNDER, LOCATION, EMAIL, SECOND_PHONE } from "../data/siteData";
import { CTABanner } from "../components/StatsAndCTA";

const VALEURS = [
  { icon: "🏅", title: "Qualité Professionnelle", desc: "Un travail soigné, conforme aux normes académiques et techniques." },
  { icon: "⏱️", title: "Respect des Délais", desc: "Rapidité d'exécution sans jamais sacrifier la qualité." },
  { icon: "💰", title: "Prix Accessibles", desc: "Des tarifs adaptés aux étudiants, familles et entreprises de Kolwezi." },
  { icon: "🤝", title: "Service Fiable", desc: "Un accompagnement sérieux et confidentiel, du début à la fin." },
];

const CHIFFRES = [
  { value: "+100", label: "Projets réalisés" },
  { value: "500+", label: "Clients satisfaits" },
  { value: "10+", label: "Années d'expérience" },
  { value: "24/7", label: "Service disponible" },
];

export default function Apropos() {
  const navigate = useNavigate();

  return (
    <div style={{ marginTop: 110 }}>
      <style>{`
        @keyframes aproposFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .apropos-fade { animation: aproposFadeUp 0.7s ease-out both; }
        .valeur-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .valeur-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 30px rgba(10,30,80,0.12);
        }
        .domaine-card {
          position: relative; border-radius: 18px; overflow: hidden;
          height: 220px; cursor: pointer;
          box-shadow: 0 6px 22px rgba(10,30,80,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .domaine-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 14px 34px rgba(10,30,80,0.2);
        }
        .domaine-card:hover .domaine-img { transform: scale(1.1); }
        .domaine-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: transform 0.6s ease;
        }
        .domaine-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,30,80,0.1) 0%, rgba(10,30,80,0.85) 100%);
        }
        .domaine-content {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 16px 18px; z-index: 2;
        }
      `}</style>

      {/* ─── Bandeau de titre ─────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          À Propos de Grâce Divine
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          Apprenons Plus, Réussissons Ensemble
        </p>
      </div>

      {/* ─── Fondateur + Histoire ─────────────────────────────────────────── */}
      <section style={{ padding: "60px 24px", background: "var(--bg-white)" }}>
        <div className="apropos-fade" style={{
          maxWidth: 1100, margin: "0 auto",
          display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center",
        }}>
          <div style={{
            flex: "1 1 320px",
            background: "linear-gradient(135deg, #0a1e50, #1d4ed8)",
            borderRadius: 16, padding: "40px 24px", textAlign: "center",
            boxShadow: "0 10px 40px rgba(10,30,80,0.25)",
          }}>
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

          <div style={{ flex: "2 1 400px" }}>
            <span style={{
              display: "inline-block",
              background: "#eff6ff", color: "#1d4ed8",
              fontSize: 12, fontWeight: 700, letterSpacing: 2,
              padding: "4px 16px", borderRadius: 20, marginBottom: 16,
              textTransform: "uppercase",
            }}>
              Notre Histoire
            </span>
            <h2 style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 18px", lineHeight: 1.25 }}>
              Une vision née en {FOUNDER.year}, au service de Kolwezi
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.8, marginBottom: 16 }}>
              Tout commence en <strong>{FOUNDER.year}</strong>, lorsque <strong>{FOUNDER.name}</strong>,
              animé par la volonté de servir sa communauté, fonde <strong>Maison Grâce Divine</strong>.
              Convaincu que l'eau, le savoir et la technologie sont des piliers essentiels du
              développement, il se lance avec une triple mission&nbsp;:
            </p>
            <ul style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.9, paddingLeft: 20, marginBottom: 16 }}>
              <li>💧 Faciliter l'accès à l'eau potable grâce au <strong>forage de puits</strong> pour les familles et communautés&nbsp;;</li>
              <li>📚 Accompagner les <strong>étudiants et finalistes</strong> dans la rédaction, correction, impression et reliure de leurs <strong>mémoires, TFC et rapports de stage</strong>&nbsp;;</li>
              <li>💻 Fournir aux particuliers et entreprises du <strong>matériel informatique</strong> de qualité, garanti et au juste prix.</li>
            </ul>
            <p style={{ color: "var(--text-secondary)", fontSize: 15, lineHeight: 1.8 }}>
              Au fil des années, Grâce Divine a élargi son champ d'action — électricité, réseaux &
              télécommunications, domotique, boutique — tout en gardant la même devise&nbsp;:
              <em> « Apprenons Plus, Réussissons Ensemble »</em>.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Mission & Vision ───────────────────────────────────────────────── */}
      <section style={{ padding: "50px 24px", background: "var(--bg-light)" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 24,
        }}>
          <div className="apropos-fade valeur-card" style={{
            background: "var(--bg-white)", borderRadius: 16, padding: 28,
            boxShadow: "0 6px 22px rgba(10,30,80,0.08)",
          }}>
            <div style={{ fontSize: 30, marginBottom: 12 }}>🎯</div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px" }}>
              Notre Mission
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
              Rendre accessibles l'eau potable, la technologie et l'accompagnement académique
              à toutes les familles et entreprises de Kolwezi et Lubumbashi, avec sérieux et proximité.
            </p>
          </div>
          <div className="apropos-fade valeur-card" style={{
            background: "var(--bg-white)", borderRadius: 16, padding: 28,
            boxShadow: "0 6px 22px rgba(10,30,80,0.08)",
          }}>
            <div style={{ fontSize: 30, marginBottom: 12 }}>🔭</div>
            <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 10px" }}>
              Notre Vision
            </h3>
            <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.7, margin: 0 }}>
              Devenir la référence multiservices de la région du Lualaba, reconnue pour sa qualité,
              son innovation et son engagement envers ses communautés.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Chiffres clés ──────────────────────────────────────────────────── */}
      <section style={{ padding: "44px 24px", background: "linear-gradient(135deg, #0a1e50, #1d4ed8)" }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 16, textAlign: "center",
        }}>
          {CHIFFRES.map((c, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14, padding: "20px 10px",
            }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: "#f59e0b" }}>{c.value}</div>
              <div style={{ fontSize: 12.5, color: "#cbd5e1", marginTop: 6 }}>{c.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Nos domaines d'activité ─────────────────────────────────────────── */}
      <section style={{ padding: "60px 24px", background: "var(--bg-white)" }}>
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
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 16px" }}>
              Une mission, plusieurs domaines
            </h2>
            <div style={{ width: 50, height: 4, background: "linear-gradient(90deg, #1d4ed8, #f59e0b)", borderRadius: 2, margin: "0 auto" }} />
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 20,
          }}>
            {SERVICES_PREMIUM.map(s => (
              <div key={s.id} className="domaine-card" onClick={() => navigate(s.link)}>
                <div className="domaine-img" style={{ backgroundImage: `url(${s.img})` }} />
                <div className="domaine-overlay" />
                <div className="domaine-content">
                  <span style={{ fontSize: 20 }}>{s.icon}</span>
                  <h3 style={{ color: "#fff", fontSize: 14.5, fontWeight: 800, margin: "6px 0 0" }}>
                    {s.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pourquoi nous choisir (nos valeurs) ───────────────────────────── */}
      <section style={{ padding: "60px 24px", background: "var(--bg-light)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 900, color: "var(--text-primary)", margin: "0 0 16px" }}>
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
              <div key={i} className="valeur-card" style={{
                textAlign: "center", padding: "28px 20px",
                borderRadius: 14, background: "var(--bg-white)",
                border: "1px solid #f1f5f9",
              }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 8px" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Localisation / Contact rapide ─────────────────────────────────── */}
      <section style={{ padding: "0 24px 60px", background: "var(--bg-light)" }}>
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
