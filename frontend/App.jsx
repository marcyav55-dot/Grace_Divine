import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Accueil from "./pages/Accueil";
import Apropos from "./pages/Apropos";
import Services from "./pages/Services";
import Boutique from "./pages/Boutique";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";

// ─── Composant racine de l'application ──────────────────────────────────────
// Structure générale de TOUTES les pages :
//
//   Navbar  (toujours visible, en haut)
//   <Routes> -> affiche UNE des pages selon l'URL
//   Footer  (toujours visible, en bas)
//
// <BrowserRouter> (dans main.jsx) doit envelopper ce composant pour que
// <Routes> / <Route> / <NavLink> / <Link> fonctionnent.
export default function App() {
  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", minHeight: "100vh" }}>
      {/* Petit reset CSS global */}
      <style>{`
        * { box-sizing: border-box; }
        body { margin: 0; }
      `}</style>

      <Navbar />

      {/* ─── Routage : chaque <Route> associe une URL à une page ────────────── */}
      <Routes>
        <Route path="/" element={<Accueil />} />

        {/* Page de présentation du fondateur et de l'histoire de Grâce Divine */}
        <Route path="/a-propos" element={<Apropos />} />

        {/* /services           -> liste de tous les services */}
        {/* /services/:slug     -> détail d'un service précis  */}
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<Services />} />

        <Route path="/boutique" element={<Boutique />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Footer />
    </div>
  );
}
