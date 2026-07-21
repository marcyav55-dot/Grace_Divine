import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

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

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* Barre du haut avec téléphone/WhatsApp */}
      <div className="navbar-top">
        <a href="https://wa.me/243998966650" target="_blank" rel="noopener noreferrer">
          📞 Tél. / WhatsApp : <strong>+243 998 966 650</strong>
        </a>
      </div>

      {/* Barre principale */}
      <div className="navbar-container">
        <Link to="/" className="nav-brand">
          <div className="nav-logo">G</div>
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
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
        >
          {menuOpen ? "✕" : "☰"}
      </div>

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
        </div>
      )}
    </nav>
  );
};

export default Navbar;
