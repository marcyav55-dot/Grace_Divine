// Données partagées du site MAISON GRÂCE DIVINE (multiservices)

export const NAV_LINKS = [
  { label: "Accueil", path: "/" },
  { label: "À propos", path: "/a-propos" },
  { label: "Services", path: "/services" },
  { label: "Boutique", path: "/boutique" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export const SLIDES = [
  {
    title: "BIENVENUE",
    subtitle: "DES SOLUTIONS COMPLÈTES POUR UN AVENIR MEILLEUR",
    desc: "Nous offrons des services professionnels dans plusieurs domaines pour les particuliers, entreprises et communautés.",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=900&q=80",
  },
  {
    title: "FORAGE D'EAU",
    subtitle: "L'EAU POTABLE, UN DROIT POUR TOUS",
    desc: "Forage de puits, installation de pompes et maintenance hydraulique pour vos communautés.",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  {
    title: "INFORMATIQUE",
    subtitle: "SOLUTIONS NUMÉRIQUES POUR VOTRE SUCCÈS",
    desc: "Maintenance, réseaux, vente de matériel et formations pour particuliers et entreprises.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80",
  },
];

export const SERVICES = [
  {
    id: 1,
    icon: "🖨️",
    title: "Bureautique & Assistance Académique",
    slug: "bureautique",
    color: "blue",
    desc: "Tous vos travaux de bureau et académiques réalisés rapidement et avec soin.",
    items: [
      "Traitement de texte",
      "Saisie de documents",
      "Mise en forme",
      "Rédaction de mémoires",
      "Rapports de stage",
      "Correction & relecture",
      "Impression & photocopie",
    ],
    cta: "EN SAVOIR PLUS",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=75",
  },
  {
    id: 2,
    icon: "💧",
    title: "Forage d'Eau",
    slug: "forage-eau",
    color: "cyan",
    desc: "Apporter l'eau potable aux familles et communautés grâce à des forages durables.",
    items: [
      "Étude de terrain",
      "Forage de puits",
      "Installation de pompes",
      "Maintenance des installations hydrauliques",
      "Demande de devis en ligne",
    ],
    cta: "EN SAVOIR PLUS",
    img: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=75",
  },
  {
    id: 3,
    icon: "🔧",
    title: "Maintenance Informatique",
    slug: "maintenance-informatique",
    color: "indigo",
    desc: "Diagnostic, réparation et entretien de votre matériel informatique.",
    items: [
      "Réparation d'ordinateurs",
      "Installation de logiciels",
      "Maintenance préventive",
      "Maintenance corrective",
      "Assistance à distance",
    ],
    cta: "EN SAVOIR PLUS",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=75",
  },
  {
    id: 4,
    icon: "📡",
    title: "Réseaux & Télécommunications",
    slug: "reseaux-telecom",
    color: "violet",
    desc: "Connectez votre maison ou votre entreprise avec des réseaux fiables et rapides.",
    items: [
      "Installation réseau LAN/WiFi",
      "Câblage informatique",
      "Configuration routeurs et switches",
      "Installation & configuration Starlink",
      "Maintien du réseau",
    ],
    cta: "EN SAVOIR PLUS",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=75",
  },
  {
    id: 5,
    icon: "💻",
    title: "Vente de Produits Informatiques",
    slug: "produits-informatiques",
    color: "sky",
    desc: "Du matériel informatique de qualité, neuf et garanti, à prix compétitif.",
    items: [
      "Ordinateurs",
      "Imprimantes & Cartouches",
      "Claviers, Souris",
      "Disques SSD / HDD",
      "Routeurs",
      "Accessoires Informatiques",
    ],
    cta: "VOIR LA BOUTIQUE",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=75",
  },
  {
    id: 6,
    icon: "👗",
    title: "Boutique d'Habillement",
    slug: "habillement",
    color: "amber",
    desc: "Des collections tendance pour toute la famille, à prix abordables.",
    items: [
      "Hommes",
      "Femmes",
      "Enfants",
      "Chaussures",
      "Accessoires",
      "Collections tendance",
    ],
    cta: "VOIR LA BOUTIQUE",
    img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&q=75",
  },
];

export const SOCIAL = [
  { icon: "f", label: "Facebook", href: "#" },
  { icon: "in", label: "LinkedIn", href: "#" },
  { icon: "yt", label: "YouTube", href: "#" },
  { icon: "ig", label: "Instagram", href: "#" },
  { icon: "wa", label: "WhatsApp", href: "https://wa.me/243998966650" },
];

export const WHATSAPP_NUMBER = "243998966650";
export const SECOND_PHONE = "+243 808 955 958";
export const EMAIL = "gracedivineinformatique@gmail.com";
export const LOCATION = "Kolwezi, Avenue Unikol — près de l'Université de Kolwezi (UNIKOL), Réf. Internat Maman Deborah";

// Informations sur le fondateur, utilisées dans la page "À propos"
export const FOUNDER = {
  name: "LUBANGULA Aaron",
  role: "Fondateur & Directeur Général",
  year: 2015,
};

export const colorMap = {
  blue:   { border: "#3b82f6", badge: "#1d4ed8", light: "#eff6ff" },
  cyan:   { border: "#06b6d4", badge: "#0e7490", light: "#ecfeff" },
  indigo: { border: "#6366f1", badge: "#4338ca", light: "#eef2ff" },
  violet: { border: "#8b5cf6", badge: "#6d28d9", light: "#f5f3ff" },
  sky:    { border: "#0ea5e9", badge: "#0369a1", light: "#f0f9ff" },
  amber:  { border: "#f59e0b", badge: "#b45309", light: "#fffbeb" },
};
