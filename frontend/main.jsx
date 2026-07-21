import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// ─── Point d'entrée de l'application ────────────────────────────────────────
// <BrowserRouter> active la navigation par URL (React Router).
// Sans lui, les composants <Routes>, <Route>, <Link>, <NavLink>
// dans App.jsx et Navbar.jsx ne fonctionneraient pas.

