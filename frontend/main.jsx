import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./index.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/700.css";
import "@fontsource/montserrat/800.css";
import "@fontsource/montserrat/900.css";
import "@fontsource/playwrite-nz-guides/400.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// ─── Point d'entrée de l'application ────────────────────────────────────────
// <BrowserRouter> active la navigation par URL (React Router).
// Sans lui, les composants <Routes>, <Route>, <Link>, <NavLink>
// dans App.jsx et Navbar.jsx ne fonctionneraient pas.

// ─── Enregistrement du Service Worker (rend le site installable en PWA) ────
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => console.log("Service Worker enregistré avec succès"))
      .catch((err) => console.error("Erreur Service Worker :", err));
  });
}

