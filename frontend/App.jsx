import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationOptIn from "./components/NotificationOptIn";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./context/AuthContext";
import Accueil from "./pages/Accueil";
import Apropos from "./pages/Apropos";
import Services from "./pages/Services";
import Boutique from "./pages/Boutique";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Panier from "./pages/Panier";
import Login from "./pages/Login";
import Register from "./pages/Register";

// ─── Composant racine de l'application ──────────────────────────────────────
export default function App() {
  console.log("App rendered");

  return (
    <AuthProvider>
      <div
        style={{
          fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
          minHeight: "100vh",
        }}
      >
        {/* Petit reset CSS global */}
        <style>{`
          * { box-sizing: border-box; }
          body { margin: 0; }
        `}</style>

        {/* Barre de navigation toujours affichée */}
        <Navbar />

        {/* ─── Routage : chaque Route associe une URL à une page ────────────── */}
        <ErrorBoundary>
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<Accueil />} />

            {/* Page de présentation du fondateur et de l'histoire de Grâce Divine */}
            <Route path="/a-propos" element={<Apropos />} />

            {/* /services           -> liste de tous les services */}
            {/* /services/:slug     -> détail d'un service précis */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<Services />} />

            {/* Boutique */}
            <Route path="/boutique" element={<Boutique />} />

            {/* Blog */}
            <Route path="/blog" element={<Blog />} />

            {/* Contact */}
            <Route path="/contact" element={<Contact />} />

            {/* Panier */}
            <Route path="/panier" element={<Panier />} />

            {/* Authentification (facultative) */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </ErrorBoundary>

        {/* Pied de page toujours affiché */}
        <NotificationOptIn />
        <Footer />
      </div>
    </AuthProvider>
  );
}
