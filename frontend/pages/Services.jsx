import { useParams } from "react-router-dom";
import { api } from "../services/api"; // Import du service API
import ServiceCard from "../components/ServiceCard";
import { CTABanner } from "../components/StatsAndCTA";
import { useState, useEffect } from "react";

// ─── Page Services ────────────────────────────────────────────────────────
// Deux modes selon l'URL :
//  - "/services"        -> affiche la grille des 6 services
//  - "/services/:slug"  -> affiche le détail d'UN seul service
//
// useParams() lit le ":slug" présent dans l'URL (défini dans App.jsx)
export default function Services() {
  const { slug } = useParams();
  const [services, setServices] = useState([]);
  const [singleService, setSingleService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Charger tous les services
        const allServices = await api.getServices();
        setServices(allServices);
        
        // Si un slug est présent, charger le service spécifique
        if (slug) {
          const serviceData = await api.getServiceBySlug(slug);
          setSingleService(serviceData[0] || null);
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [slug]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <div style={{ marginTop: 110 }}> {/* espace pour la Navbar fixe */}
      {/* ─── Bandeau de titre ─────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(135deg, #0a1e50, #1d4ed8)", padding: "60px 24px", textAlign: "center" }}>
        <h1 style={{ color: "#fff", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, margin: 0 }}>
          {singleService ? singleService.name : "Nos Services"}
        </h1>
        <p style={{ color: "#94a3b8", marginTop: 12, fontSize: 15 }}>
          {singleService ? singleService.description : "Découvrez l'ensemble de nos domaines d'expertise"}
        </p>
      </div>

      {/* ─── Contenu : une carte seule, OU la grille complète ──────────────── */}
      <section style={{ padding: "60px 24px", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          {singleService ? (
            // Détail d'un service : une seule carte centrée
            <div style={{ maxWidth: 360, margin: "0 auto" }}>
              <ServiceCard service={singleService} />
            </div>
          ) : (
            // Liste complète : grille responsive (s'adapte à la largeur d'écran)
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 24,
            }}>
              {services.map(s => <ServiceCard key={s.id} service={s} />)}
            </div>
          )}
        </div>
      </section>

      <CTABanner />
    </div>
  );
}