# RAPPORT TECHNIQUE — Problème de connexion Django avec PostgreSQL via Supabase dans SmartIDE

## 1. Contexte du problème

Le projet Grace Divine utilise :
- Backend : Django (Python)
- Base de données : PostgreSQL via Supabase
- Environnement de développement : SmartIDE sur Android
- Version Python utilisée : Python 3.13

L'objectif était de connecter Django à la base PostgreSQL fournie par Supabase afin d'utiliser une base de données distante pour le projet.


## 2. Description de l'erreur rencontrée

Lors du lancement du projet Django, une erreur est apparue au niveau du chargement du moteur PostgreSQL.

L'erreur indique que Django ne parvient pas à charger le pilote PostgreSQL (psycopg).

Django a besoin d'un connecteur pour communiquer avec PostgreSQL.

Architecture de communication :

Django
   |
   ↓
Psycopg (pilote PostgreSQL Python)
   |
   ↓
PostgreSQL Supabase


## 3. Analyse du problème

Django ne communique pas directement avec PostgreSQL. Il utilise une bibliothèque appelée "driver".

Dans notre cas, ce driver est psycopg.

Le problème peut venir de plusieurs causes :

- psycopg mal installé ;
- mauvaise version de psycopg ;
- incompatibilité entre Python 3.13 et certaines bibliothèques PostgreSQL ;
- problème lié à l'environnement SmartIDE sur Android ;
- mauvaise configuration de Django.


## 4. Hypothèses principales

HYPOTHÈSE 1 : Psycopg n'est pas correctement installé.

Même si pip indique que psycopg est installé, il est possible que Python ne puisse pas l'importer correctement.


HYPOTHÈSE 2 : Problème de compatibilité avec Python 3.13.

Python 3.13 est une version récente.

Certaines bibliothèques utilisées avec Django et PostgreSQL peuvent encore rencontrer des problèmes de compatibilité.

SmartIDE sur Android peut aussi compliquer l'installation des dépendances natives.


HYPOTHÈSE 3 : Mauvaise configuration Django.

Le fichier settings.py peut contenir une erreur dans la configuration DATABASES.


## 5. Vérifications effectuées

ÉTAPE 1 : Vérification de psycopg

Commande :

python -c "import psycopg; print(psycopg.__version__)"

Pourquoi cette technique ?

Cette commande permet de vérifier directement si Python arrive à charger le module psycopg.

Si elle retourne une version, par exemple :

3.x.x

Alors psycopg est correctement installé.

Si elle retourne une erreur :

ModuleNotFoundError

Alors le problème vient de l'installation du pilote.


ÉTAPE 2 : Vérification de la version Django

Commande :

python -m django --version

Pourquoi cette technique ?

Elle permet de vérifier :
- que Django est bien installé ;
- la version utilisée ;
- la compatibilité possible avec Python 3.13.


## 6. Solution prévue si psycopg est mal installé

Désinstallation :

pip uninstall psycopg

Réinstallation :

pip install psycopg[binary]


Pourquoi utiliser psycopg[binary] ?

Cette version contient déjà les bibliothèques nécessaires.

Avantages :
- évite une compilation complexe ;
- facilite l'installation dans SmartIDE Android ;
- améliore la compatibilité avec PostgreSQL.


## 7. Solution alternative : Utiliser Python 3.11

Si le problème continue, la solution sera de passer à Python 3.11.

Pourquoi Python 3.11 ?

Parce qu'il est très stable avec :
- Django ;
- PostgreSQL ;
- TensorFlow ;
- OpenCV ;
- les bibliothèques scientifiques.

Création d'un environnement :

python3.11 -m venv env

Activation :

source env/bin/activate

Installation :

pip install django psycopg[binary]


## 8. Solution de secours : Utiliser psycopg2

Si psycopg continue de poser problème :

Installation :

pip install psycopg2-binary


Pourquoi ?

Psycopg2 est une ancienne bibliothèque mais très stable et largement utilisée avec Django.


## 9. Tests après correction

Test Django :

python manage.py check

Résultat attendu :

System check identified no issues


Test connexion PostgreSQL :

python manage.py migrate

Résultat attendu :

Applying migrations...
OK


Ces tests confirmeront que :
- Django communique avec Supabase ;
- PostgreSQL fonctionne correctement ;
- les tables peuvent être créées.


## 10. Plan d'action suivant

1. Tester l'importation de psycopg.
Objectif : vérifier si le pilote PostgreSQL fonctionne.

2. Vérifier la version Django.
Objectif : contrôler la compatibilité avec Python.

3. Réinstaller psycopg[binary].
Objectif : corriger une installation défectueuse.

4. Tester Django avec manage.py check.
Objectif : vérifier la configuration.

5. Tester les migrations.
Objectif : confirmer la connexion avec Supabase.

6. Si l'erreur continue, passer à Python 3.11.
Objectif : utiliser un environnement plus stable.


## Conclusion

Le problème ne vient probablement pas de Supabase.

La connexion échoue au niveau du pilote PostgreSQL utilisé par Django.

La cause la plus probable est une incompatibilité entre :
- Django ;
- psycopg ;
- Python 3.13 ;
- SmartIDE sur Android.

La méthode choisie est donc de diagnostiquer d'abord psycopg, corriger son installation, puis utiliser Python 3.11 si nécessaire afin d'obtenir un environnement stable pour le développement du projet Grace Divine.