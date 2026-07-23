import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-logo">
            <img src="/icon-192.png" alt="Grâce Divine Multiservices" className="footer-logo-img" />
            <div className="logo-text">
              <h4>GRÂCE DIVINE</h4>
              <p>MULTISERVICES</p>
            </div>
          </div>
          <p className="footer-desc">
            La grâce de la qualité, la puissance du service. Votre partenaire de confiance pour le forage d'eau, l'assistance académique (mémoires & TFC), l'informatique et bien plus.
          </p>
          <div className="social-links">
            <a href="https://facebook.com/gracedivinemultiservices" target="_blank" rel="noopener noreferrer" className="social-icon">f</a>
            <a href="https://twitter.com/gracedivinemultiservices" target="_blank" rel="noopener noreferrer" className="social-icon">t</a>
            <a href="https://instagram.com/gracedivinemultiservices" target="_blank" rel="noopener noreferrer" className="social-icon">in</a>
            <a href="https://wa.me/243998966650" target="_blank" rel="noopener noreferrer" className="social-icon">wa</a>
          </div>
        </div>
        <div className="footer-col">
          <h4>Nos Services</h4>
          <ul className="footer-links">
            <li><Link to="/services">Forage de puits</Link></li>
            <li><Link to="/services">Programmation</Link></li>
            <li><Link to="/boutique?cat=forage">Boutique</Link></li>
            <li><Link to="/a-propos">À Propos</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li><span>📍</span> Kolwezi, Av. Unikol</li>
            <li><span>📞</span> +243 998 966 650</li>
            <li><span>📧</span> gracedivineinformatique@gmail.com</li>
            <li><span>🕐</span> Lun–Sam : 07h – 19h</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Liens rapides</h4>
          <ul className="footer-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/a-propos">À Propos</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/boutique">Boutique</Link></li>
            <li><Link to="/blog">Blog</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Maison Grâce Divine · Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;
