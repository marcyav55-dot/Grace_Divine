import { useNavigate } from "react-router-dom";
import { SERVICES_PREMIUM } from "../data/siteData";

export default function ServicesPremium() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: "70px 24px", background: "var(--bg-light, #f8fafc)" }}>
      <style>{`
        .svp-grid {
          max-width: 1200px; margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 26px;
        }
        .svp-card {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          height: 320px;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(10,30,80,0.10);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .svp-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 40px rgba(10,30,80,0.2);
        }
        .svp-card:hover .svp-img {
          transform: scale(1.08);
        }
        .svp-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          transition: transform 0.6s ease;
        }
        .svp-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(10,30,80,0.15) 0%, rgba(10,30,80,0.55) 65%, rgba(10,30,80,0.92) 100%);
        }
        .svp-content {
          position: absolute; left: 0; right: 0; bottom: 0;
          padding: 22px 22px 24px;
          z-index: 2;
        }
        .svp-icon {
          font-size: 26px;
          margin-bottom: 8px;
          display: inline-block;
        }
        .svp-title {
          color: #fff; font-size: 18px; font-weight: 900;
          margin: 0 0 6px; text-shadow: 0 2px 10px rgba(0,0,0,0.4);
        }
        .svp-desc {
          color: #e2e8f0; font-size: 12.5px; line-height: 1.5;
          margin: 0 0 14px; max-height: 0; opacity: 0;
          overflow: hidden; transition: all 0.35s ease;
        }
        .svp-card:hover .svp-desc {
          max-height: 80px; opacity: 1;
        }
        .svp-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, #c9a227, #a8841f);
          color: #fff; border: none; border-radius: 999px;
          padding: 8px 18px; font-size: 12px; font-weight: 800;
          letter-spacing: 0.3px; cursor: pointer;
          box-shadow: 0 4px 14px rgba(245,158,11,0.4);
        }
        @media (max-width: 640px) {
          .svp-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .svp-desc { max-height: 80px !important; opacity: 1 !important; }
        }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <span style={{
          display: "inline-block",
          background: "#eff6ff", color: "#0a1628",
          fontSize: 12, fontWeight: 700, letterSpacing: 2,
          padding: "4px 16px", borderRadius: 20, marginBottom: 16,
          textTransform: "uppercase",
        }}>
          Nos domaines d'expertise
        </span>
        <h2 style={{
          fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
          fontWeight: 900, color: "var(--text-primary, #0f172a)",
          margin: "0 0 16px",
        }}>
          Des Services Complets Pour Vous
        </h2>
        <div style={{
          width: 50, height: 4,
          background: "linear-gradient(90deg, #0a1628, #c9a227)",
          borderRadius: 2, margin: "0 auto",
        }} />
      </div>

      <div className="svp-grid">
        {SERVICES_PREMIUM.map(s => (
          <div
            key={s.id}
            className="svp-card"
            onClick={() => navigate(s.link)}
          >
            <div className="svp-img" style={{ backgroundImage: `url(${s.img})` }} />
            <div className="svp-overlay" />
            <div className="svp-content">
              <span className="svp-icon">{s.icon}</span>
              <h3 className="svp-title">{s.title}</h3>
              <p className="svp-desc">{s.desc}</p>
              <button
                className="svp-btn"
                onClick={(e) => { e.stopPropagation(); navigate(s.link); }}
              >
                {s.cta} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
