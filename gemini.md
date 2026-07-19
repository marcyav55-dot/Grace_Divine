# Projet : Grâce Divine Multiservices - Documentation de Transmission

## État actuel du projet
- **Architecture** : Django + Django REST Framework + Supabase (PostgreSQL).
- **Structure** : Modulaire, divisée en apps (`accounts`, `services`, `orders`, `content`, `notifications`).
- **Phase active** : Phase 3 (Modélisation terminée).

## Modèles principaux créés
- `accounts.User` : Extension de l'utilisateur avec rôles (Client, Vendeur, Employé, Admin).
- `content.ServiceSlide` : Gestion dynamique du slider de la page d'accueil.
- `services.Product` / `Category` : Gestion des offres (Services comme le forage ou produits physiques).
- `orders.Order` : Système de suivi des commandes.

## Prochaines étapes obligatoires
1. **Migrations** : Exécuter `python manage.py makemigrations` et `migrate`.
2. **Authentification** : Implémenter les vues et sérialiseurs dans `apps.accounts`.
3. **API** : Créer les ViewSets pour les services et le slider.

## Consignes pour le prochain modèle
- Respectez la structure modulaire actuelle.
- Gardez le code commenté.
- Priorisez la sécurité et les performances (montée en charge 1M+ utilisateurs).
- Ne modifiez pas la configuration existante sans justification claire.
