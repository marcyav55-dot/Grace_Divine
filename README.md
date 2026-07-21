# Projet : Grâce Divine Multiservices

**Frontend :** `/frontend/` (React + Tailwind CSS)
**Backend :** `/backend/` (Django REST Framework + Supabase)
**Public :** `/public/` (Fichiers statiques)

## 📋 Sommaire
- [✅ État d'avancement](#etat-davancement)
- [📦 Architecture Backend](#architecture-backend)
- [🎨 Frontend Modernisé](#frontend-modernise)
- [🚀 Comment tester](#comment-tester)
- [📖 Documentation Technique](#documentation-technique)

---

## ✅ État d'avancement
Le projet est **fonctionnel** et prêt pour le développement.

### ✅ Backend (Django)
- ✅ **Modèles** : `accounts.User`, `services.Product/Category`, `content.ServiceSlide`, `orders.Order`
- ✅ **Migrations** : Générées et appliquées à Supabase (PostgreSQL)
- ✅ **API** : ViewSets pour toutes les applications (`accounts`, `services`, `content`, `orders`)
- ✅ **Authentification** : JWT via `rest_framework_simplejwt`
- ✅ **Documentation** : Fichier `gemini.md` mis à jour

### ✅ Frontend (React)
- ✅ **CSS Global** : Fichier `index.css` créé avec design system
- ✅ **Responsive** : Navigation mobile, flex/grid responsive
- ✅ **Composants** : Navbar, Footer, pages mises à jour
- ✅ **Intégration** : Connexion à l'API backend

---

## 📦 Architecture Backend

### Applications Django
| App | Modèles | API | Routes |
|-----|---------|-----|--------|
| `accounts` | `User` (rôles) | Inscription, Login, Profil | `/api/auth/` |
| `services` | `Product`, `Category` | Liste, détail, filtres | `/api/services/` |
| `content` | `ServiceSlide` | Slides actifs | `/api/content/` |
| `orders` | `Order` | Commandes utilisateur | `/api/orders/` |

### Base de données
- **Supabase** (PostgreSQL) – migrations appliquées
- **Tables** : `auth_user`, `accounts_user`, `services_product`, `services_category`, `content_servic slide`, `orders_order`

---

## 🎨 Frontend Modernisé

### Design System (inspiré de E-lycee)
- **Couleurs** : Bleu nuit (`#0a1e50`), bleu principal (`#1d4ed8`), orange (`#f59e0b`)
- **Typographie** : `Inter` font, responsive (clamp)
- **Composants** : Cartes, boutons, badges, grille CSS

### Modifications Clés
1. **`index.css`** : Styles globaux et design system
2. **`Navbar.jsx`** : Flexbox responsive + menu mobile
3. **`Footer.jsx`** : 4 colonnes avec liens et contact
4. **`Apropos.jsx`** : Mise en page flexible (fondateur/histoire empilables sur mobile)

---

## 🚀 Comment Tester

### 1. Backend
```bash
# Se déplacer dans le dossier backend
cd Grace_Divine/backend
# Démarrer le serveur Django
python manage.py runserver 0.0.0.0:8000
```

### 2. Frontend (développement)
```bash
# Se déplacer dans le dossier frontend
cd Grace_Divine/frontend
npm install
npm start
# Le site sera accessible à http://localhost:3000
```

### 3. Accéder à l'API
```bash
# Tester les points d'entrée
curl http://localhost:8000/api/auth/
curl http://localhost:8000/api/services/
curl http://localhost:8000/api/content/
curl http://localhost:8000/api/orders/
```

### 4. Accéder à l'application
- Ouvrez `http://localhost:3000` dans votre navigateur
- Utilisez le lien `/api/auth/register/` pour créer un compte
- Testez la navigation et les pages

---

## 📖 Documentation Technique

- Rapport détaillé Frontend/Backend : `doc/rapport_frontend_backend.md`

### Fichiers Importants
- `Grace_Divine/gemini.md` : Documentation complète du projet
- `Grace_Divine/backend/settings.py` : Configuration Django
- `Grace_Divine/frontend/index.css` : Design system CSS
- `Grace_Divine/frontend/main.jsx` : Point d'entrée React

### Routes API
- **POST** `/api/auth/register/` – Inscription
- **POST** `/api/auth/login/` – Connexion (JWT)
- **GET** `/api/services/` – Liste des services/produits
- **GET** `/api/content/slides/` – Slides actifs
- **GET/POST** `/api/orders/` – Commandes utilisateur

### Technologies
- **Backend** : Django 4.2, DRF, PostgreSQL (Supabase), JWT
- **Frontend** : React 18, React Router, Tailwind CSS, Inter font
- **Déploiement** : Fichiers statiques dans `/public/`

---

## 🎯 Prochaines Étapes
1. **Frontend** : Finaliser les pages Boutique et Blog
2. **Backend** : Ajouter les endpoints pour la boutique et les articles
3. **Tests** : Écrire des tests unitaires et d'intégration
4. **Déploiement** : Configurer un reverse proxy (nginx) pour servir le frontend

---

## 📞 Contact
- **Téléphone/WhatsApp** : +243 998 966 650
- **Email** : contact@gricedivine.org
- **Adresse** : Kolwezi, Av. Unikol (près de l'Université UNIKOL)

---

*Généré avec Claude Code – Version 2026 juillet*
