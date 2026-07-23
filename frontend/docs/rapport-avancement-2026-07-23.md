# Rapport d'avancement — Grâce Divine Multiservices
**Date : Jeudi 23 juillet 2026**

---

## 1. Bug d'affichage sur `/services` et `/boutique`

**Problème initial** : le contenu principal des pages Services et Boutique disparaissait complètement — seuls la Navbar et le Footer restaient visibles.

**Diagnostic effectué :**
- Analyse du routing (`App.jsx`) et des composants (`Services.jsx`, `Boutique.jsx`, `Navbar.jsx`, `ErrorBoundary.jsx`, `api.js`, `CartContext.jsx`) → structure React/Router correcte.
- **Bug CSS trouvé et corrigé ✅** : les états `loading` et `error` n'avaient pas de `marginTop: 110`, contrairement au rendu final. Comme la Navbar est fixe en haut, ces messages s'affichaient cachés derrière elle. Patch appliqué sur `Services.jsx` et `Boutique.jsx` (sauvegardes `.bak` conservées).
- Test du backend en ligne de commande (`curl`) : réponse 200 OK, CORS bien configuré (`http://localhost:5173` autorisé).
- **Vraie cause identifiée** : erreur serveur Django `TemplateDoesNotExist` sur `/api/services/list/` — le template `django_filters/rest_framework/form.html` est introuvable. Le navigateur déclenche le rendu HTML navigable de Django REST Framework (contrairement à `curl`), qui échoue faute de template.
- `django-filter` (v26.1) confirmé installé.

**À faire ensuite :**
- Vérifier que `django_filters` est bien listé dans `INSTALLED_APPS` de `settings.py` du backend.
- Localiser le vrai chemin du projet backend (`/data/data/org.smartide.code/files/home/projects/GDV/Grace_Divine/backend`) et relancer le diagnostic `grep` sur `settings.py`.

---

## 2. Bandeau de notification qui disparaît trop vite

**Problème** : le bouton "Activer les notifications" s'affichait puis disparaissait quasi instantanément, sans laisser le temps de cliquer.

**Cause** : `NotificationOptIn.jsx` initialisait le `status` à `"idle"`, puis un `useEffect` le faisait basculer immédiatement vers `"subscribed"` ou `"denied"` si une permission était déjà enregistrée dans le navigateur — d'où l'effet de flash.

**Correction appliquée ✅** : le `status` est désormais calculé directement au premier rendu via une fonction `getInitialStatus()`, sans passer par un état intermédiaire visible.

*Note : si les notifications ont déjà été autorisées/bloquées lors de tests précédents, le bandeau ne réapparaîtra plus — comportement normal. Il faut réinitialiser la permission du site dans les réglages du navigateur pour retester.*

---

## 3. Bouton "Découvrir nos services" inactif

**Problème** : sur la page d'accueil, le bouton orange "DÉCOUVRIR NOS SERVICES" du carrousel principal (Hero) ne faisait rien au clic.

**Cause** : le bouton n'avait aucun gestionnaire `onClick` défini dans `Hero.jsx`.

**Correction appliquée ✅** :
- Import de `useNavigate` depuis `react-router-dom`.
- Ajout du hook `const navigate = useNavigate();`.
- Ajout de `onClick={() => navigate("/services")}` sur le bouton.

Le bouton redirige maintenant correctement vers la page `/services`.

---

## 4. Image du slide "Forage d'eau"

**Demande** : remplacer l'image actuelle du slide (photo Unsplash montrant des soudures visibles) par une photo plus adaptée.

**Statut** : en attente — le fichier `data/siteData.js` a été localisé (propriété `img` du slide "FORAGE D'EAU"). Une commande de patch a été préparée pour remplacer l'URL par un chemin local (`/images/forage.jpg`) une fois que Marc aura placé sa propre photo dans `public/images/`.

**Prochaine étape** : Marc doit transférer sa photo dans `public/images/forage.jpg`, puis lancer le script de remplacement dans `siteData.js`.

---

## Résumé des fichiers modifiés aujourd'hui

| Fichier | Modification | Statut |
|---|---|---|
| `pages/Services.jsx` | Ajout `marginTop: 110` sur états loading/erreur | ✅ Fait |
| `pages/Boutique.jsx` | Ajout `marginTop: 110` sur états loading/erreur | ✅ Fait |
| `components/NotificationOptIn.jsx` | Initialisation directe du status (plus de flash) | ✅ Fait |
| `components/Hero.jsx` | Ajout navigation au clic sur "Découvrir nos services" | ✅ Fait |
| `data/siteData.js` | Remplacement image slide forage | ⏳ En attente de la photo |
| Backend Django (`settings.py`) | Vérification `INSTALLED_APPS` pour `django_filters` | ⏳ À faire |

---

## Points ouverts pour la prochaine session

1. Corriger l'erreur `TemplateDoesNotExist` côté Django (backend) pour que l'API réponde correctement au navigateur.
2. Insérer la nouvelle photo du slide "Forage d'eau".
3. Nettoyer les fichiers `.bak` une fois toutes les corrections validées en conditions réelles.
