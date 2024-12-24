# CEE-CRM - Système de Gestion des Visites Techniques CEE

Application de gestion des visites techniques pour l'évaluation de l'éligibilité aux Certificats d'Économies d'Énergie (CEE).

## Structure du Projet

Le projet est divisé en deux parties principales :

- `backend/` : API REST avec Node.js et Express
- `frontend/` : Interface web React pour le CRM
- `mobile/` : Application mobile React Native

## Technologies Utilisées

- Backend :
  - Node.js
  - Express
  - PostgreSQL
  - Prisma ORM
  - JWT pour l'authentification

- Frontend Web :
  - React
  - Material-UI
  - Redux Toolkit
  - React Query

- Mobile :
  - React Native
  - React Navigation
  - Redux Toolkit

## Configuration Requise

- Node.js >= 18
- PostgreSQL >= 14
- npm ou yarn

## Installation

1. Cloner le repository
2. Installer les dépendances pour chaque partie du projet :
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd frontend
   npm install

   # Mobile
   cd mobile
   npm install
   ```

3. Configurer les variables d'environnement
4. Lancer les migrations de la base de données
5. Démarrer les serveurs de développement

## Fonctionnalités Principales

- Gestion des visites techniques
- Génération de rapports PDF
- Tableau de bord avec statistiques
- Gestion multi-clients avec isolation des données
- Application mobile pour les techniciens
- Système de rôles et permissions
- Génération automatique de rapports
