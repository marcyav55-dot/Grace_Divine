import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./navbar.css";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const [theme, setTheme] = React.useState('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const location = useLocation();
  const navigate = useNavigate();
  const { items } = useCart();
  const { user, logout } = useAuth();
  const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { path: "/", label: "Accueil" },
    { path: "/a-propos", label: "À Propos" },
    { path: "/services", label: "Services" },
    { path: "/boutique", label: "Boutique" },
    { path: "/blog", label: "Blog" },
    { path: "/contact", label: "Contact" },
  ];

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className={`navbar ${theme} ${scrolled ? "scrolled" : ""}`}>
      {/* Barre du haut avec téléphone/WhatsApp */}
      <div className="navbar-top">
        <a href="https://wa.me/243998966650" target="_blank" rel="noopener noreferrer">
          📞 Tél. / WhatsApp : <strong>+243 998 966 650</strong>
        </a>
      </div>

      {/* Barre principale */}
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          <img src="/icon-192.png" alt="Grâce Divine Multiservices" className="nav-logo" />
          <div className="nav-brand-text">
            <h1>GRÂCE DIVINE</h1>
            <h2>MULTISERVICES</h2>
            <p>Apprenons Plus, Réussissons Ensemble</p>
          </div>
        </Link>

        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="nav-actions">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="theme-toggle"
            aria-label="Rechercher"
          >
            🔍
          </button>
          <Link to="/panier" className="cart-icon-link" aria-label="Panier" onClick={() => setMenuOpen(false)}>
            🛒
            {itemCount > 0 && <span className="cart-badge">{itemCount}</span>}
          </Link>
          <button
            onClick={toggleTheme}
            className={`theme-toggle ${theme === 'dark' ? 'dark' : 'light'}`}
            aria-label="Changer le thème"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="mobile-menu-btn"
          >
            {menuOpen ? "X" : "☰"}
          </button>
        </div>
      </div>

      {/* ─── Barre de recherche déroulante ──────────────────────────────── */}
      {searchOpen && (
        <div style={{
          background: "#fff", padding: "14px 1rem",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
        }}>
          <div style={{ maxWidth: 600, margin: "0 auto" }}>
            <SearchBar onClose={() => setSearchOpen(false)} />
          </div>
        </div>
      )}

      {/* Menu mobile déroulant */}
      {menuOpen && (
        <div className="mobile-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/panier"
            className={`nav-link ${location.pathname === "/panier" ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            🛒 Panier {itemCount > 0 && `(${itemCount})`}
          </Link>

          <hr style={{ margin: "12px 0", opacity: 0.2 }} />

          {user ? (
            <>
              <Link
                to="/profil"
                className={`nav-link ${location.pathname === "/profil" ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                👤 Mon compte ({user.username})
              </Link>
              <button
                onClick={handleLogout}
                className="nav-link"
                style={{ background: "none", border: "none", textAlign: "left", cursor: "pointer" }}
              >
                🚪 Déconnexion
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`nav-link ${location.pathname === "/login" ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                → Se connecter
              </Link>
              <Link
                to="/register"
                className={`nav-link ${location.pathname === "/register" ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                + Créer un compte
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
