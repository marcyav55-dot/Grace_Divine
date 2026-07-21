# Rapport Backend - Grâce Divine Multiservices

Ce document détaille la structure actuelle du backend Django REST Framework pour le projet.

## 1. Structure de l'Architecture
Le backend est organisé de manière modulaire au sein du répertoire `Grace_Divine/backend/apps/`.

### Applications :
- **`accounts/`** : Gestion des utilisateurs, authentification (JWT) et profils.
- **`services/`** : Gestion des offres (Produits et Services) et catégories.
- **`content/`** : Contenu dynamique (Slides du carrousel de la page d'accueil).
- **`orders/`** : Suivi des commandes clients.

## 2. Table des fichiers clés par application

| Application | Modèles (`models.py`) | Sérialiseurs (`serializers.py`) | Vues (`views.py`) | URLs (`urls.py`) |
| :--- | :--- | :--- | :--- | :--- |
| **`accounts`** | `User` (rôles) | `UserSerializer`, `RegisterSerializer` | `RegisterView`, `ProfileView` | `register/`, `login/`, `profile/` |
| **`services`** | `Product`, `Category` | `ProductSerializer`, `CategorySerializer` | `ProductViewSet` | `api/services/list/` |
| **`content`** | `ServiceSlide` | `ServiceSlideSerializer` | `ServiceSlideViewSet` | `api/content/slides/` |
| **`orders`** | `Order` | `OrderSerializer` | `OrderViewSet` | `api/orders/` |

## 3. Configuration Globale (`core/`)
- **`core/urls.py`** : Point d'entrée central des routes API.
  - `/api/auth/`
  - `/api/services/`
  - `/api/content/`
  - `/api/orders/`

## 4. État du projet
- **Base de données** : Supabase (PostgreSQL).
- **Migrations** : Toutes les applications ont été migrées avec succès.
- **API** : Les ViewSets sont configurés pour une interaction directe avec le frontend.
