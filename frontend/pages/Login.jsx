import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(username, password);
      navigate("/");
    } catch {
      setError("Identifiants incorrects. Vérifiez votre nom d'utilisateur et mot de passe.");
    } finally {
      setLoading(false);
    }
  };

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
          Connexion
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          Accédez à votre compte Grâce Divine Multiservices.
        </p>
      </div>

      <section style={{ padding: "60px 24px", background: "var(--bg-light)" }}>
        <div style={{
          maxWidth: 420, margin: "0 auto",
          background: "var(--bg-white)", borderRadius: 12, padding: 28,
          boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", margin: "0 0 20px" }}>
            Se connecter
          </h2>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <input style={inputStyle} type="text" placeholder="Nom d'utilisateur"
              value={username} onChange={e => setUsername(e.target.value)} required />
            <input style={inputStyle} type="password" placeholder="Mot de passe"
              value={password} onChange={e => setPassword(e.target.value)} required />

            {error && (
              <p style={{ color: "#dc2626", fontSize: 13, margin: 0 }}>{error}</p>
            )}

            <button type="submit" disabled={loading} style={{
              background: "linear-gradient(135deg, #1d4ed8, #1e3a8a)",
              color: "#fff", border: "none", borderRadius: 8,
              padding: "12px 0", fontWeight: 800, fontSize: 14,
              letterSpacing: 1, cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? "CONNEXION..." : "SE CONNECTER"}
            </button>
          </form>

          <p style={{ marginTop: 20, fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
            Pas de compte ? <Link to="/register" style={{ color: "#1d4ed8", fontWeight: 700, textDecoration: "none" }}>S'inscrire</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
