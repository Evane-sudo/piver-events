# PIVER Events

## Présentation

Mini API de suivi d'événements développée avec :

- FastAPI
- PostgreSQL
- React
- Docker Compose

L'application permet :

- la création d'événements
- la consultation des événements
- le filtrage par utilisateur ou type
- l'affichage d'un résumé utilisateur

---

## Lancement du projet

**Prérequis :**

- Docker
- Docker Compose

**Lancer le projet :**

```bash
docker compose up --build
```

| Service | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:8000 |
| Swagger | http://localhost:8000/docs |

---

## Structure du projet

```
piver-events/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── models.py
│   │   ├── schemas.py
│   │   ├── crud.py
│   │   └── database.py
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   └── App.jsx
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
├── .env.example
└── README.md
```

---

## Choix techniques

### Backend

- **FastAPI** — simplicité, performance et génération automatique de la documentation Swagger
- **SQLAlchemy** — ORM Python mature, évite le SQL brut et facilite les migrations
- **PostgreSQL** — base relationnelle robuste, bien adaptée à un modèle d'événements typés

### Frontend

- **React + Vite** — démarrage rapide, adapté à une interface sur une seule page comme demandé dans l'énoncé

### Conteneurisation

- **Docker** pour chaque service (backend, frontend, base de données)
- **Docker Compose** pour orchestrer l'ensemble — un seul `docker compose up --build` suffit
- **Healthcheck** sur PostgreSQL avec `depends_on: condition: service_healthy` pour éviter que le backend démarre avant que la base soit prête

---

## Fonctionnalités implémentées

- `POST /events` — création d'un événement
- `GET /events` — liste des événements avec filtres optionnels (`user_id`, `type`)
- `GET /users/{user_id}/summary` — résumé d'activité d'un utilisateur (total, répartition par type, premier et dernier événement)
- Formulaire de création d'événement depuis le frontend
- Liste des événements avec filtrage
- Affichage du résumé utilisateur

---

## Améliorations possibles

Avec plus de temps, j'aurais ajouté :

- Pagination sur la liste des événements
- Tests automatisés sur l'API (pytest)
- Gestion avancée des erreurs et validation d'entrée plus stricte
- Authentification
- Interface utilisateur plus élaborée

---

## Utilisation de l'IA

ChatGPT a été utilisé pour :

- structurer l'approche et l'ordre des étapes
- aide au débogage Docker (healthcheck, réseau entre conteneurs)
- revue de cohérence entre le backend et le frontend
- assistance sur certaines implémentations React et FastAPI

L'intégration, les tests et les validations ont été réalisés manuellement.
