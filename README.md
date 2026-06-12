# PIVER Events

## Présentation

PIVER Events est une application permettant de stocker et consulter des événements utilisateurs.

Le projet a été réalisé avec :

* FastAPI
* PostgreSQL
* React
* Docker Compose

## Fonctionnalités

### Backend

* Création d'un événement via `POST /events`
* Liste des événements via `GET /events`
* Filtrage des événements par `user_id` et `type`
* Résumé d'activité d'un utilisateur via `GET /users/{user_id}/summary`

### Frontend

* Formulaire de création d'événements
* Affichage de la liste des événements
* Affichage du résumé d'un utilisateur

## Structure du projet

```text
piver-events/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   └── database.py
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml
├── .env.example
└── README.md
```

## Lancement du projet

### Prérequis

* Docker
* Docker Compose

### Démarrage

```bash
docker compose up --build
```

### Accès aux services

| Service  | URL                        |
| -------- | -------------------------- |
| Frontend | http://localhost:5173      |
| Backend  | http://localhost:8000      |
| Swagger  | http://localhost:8000/docs |

## Choix techniques

### FastAPI

Utilisé pour développer rapidement une API REST et bénéficier d'une documentation Swagger automatique.

### PostgreSQL

Utilisé pour stocker les événements de manière persistante.

### SQLAlchemy

Utilisé comme ORM pour interagir avec PostgreSQL.

### React

Utilisé pour fournir une interface simple permettant d'utiliser l'API.

### Docker Compose

Permet de lancer l'ensemble des services avec une seule commande.

## Limites et pistes d'amélioration

Avec plus de temps, plusieurs améliorations pourraient être ajoutées :

* tests automatisés (pytest)
* pagination des résultats
* amélioration de l'interface utilisateur
* gestion plus avancée des erreurs
* authentification

## Utilisation de l'IA

ChatGPT a été utilisé pour :

* aide à la résolution de problèmes techniques
* revue de cohérence du projet
* assistance ponctuelle sur React, FastAPI et Docker

Les choix d'implémentation, l'intégration et les validations ont été réalisés manuellement.
