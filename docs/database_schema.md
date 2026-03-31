# Structure de la Base de Données - DevFolio Showcase

Ce document décrit la structure de base de données recommandée pour le portfolio, optimisée pour **Supabase (PostgreSQL)**.

## Diagramme Relationnel (Résumé)

- **profiles** (1) <---> (N) **projects**
- **profiles** (1) <---> (N) **skills**
- **profiles** (1) <---> (N) **experiences**
- **profiles** (1) <---> (N) **education**
- **profiles** (1) <---> (N) **trainings**
- **profiles** (1) <---> (N) **blog_posts**
- **messages** (Indépendant)

---

## Tables

### 1. profiles
Stocke les informations personnelles et professionnelles principales.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique (lié à auth.users) |
| name | varchar | Nom complet |
| title | varchar | Titre professionnel |
| bio | text | Biographie courte |
| email | varchar | Email de contact |
| phone | varchar | Numéro de téléphone |
| location | varchar | Localisation (ex: Conakry, Guinée) |
| github_url | varchar | Lien vers GitHub |
| linkedin_url | varchar | Lien vers LinkedIn |
| avatar_url | varchar | URL de la photo de profil |
| updated_at | timestamp | Date de mise à jour |

### 2. projects
Réalisations techniques.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique |
| title | varchar | Titre du projet |
| description | text | Description détaillée |
| category | varchar | frontend, backend, fullstack, mobile |
| origin | varchar | entreprise, perso, freelance |
| technologies | text[] | Array de technos (ex: ['React', 'Laravel']) |
| github_url | varchar | Lien code source |
| live_url | varchar | Lien démo live |
| image_url | varchar | URL de l'image de couverture |
| gradient_index | integer | Index pour les dégradés CSS |
| profile_id | uuid (FK) | Référence au profil |
| created_at | timestamp | Date de création |

### 3. skills
Compétences techniques classées par catégorie.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique |
| name | varchar | Nom de la techno (ex: Next.js) |
| level | integer | Pourcentage (0-100) |
| category | varchar | Langages, Frontend, Backend, etc. |
| profile_id | uuid (FK) | Référence au profil |

### 4. experiences
Parcours professionnel.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique |
| company | varchar | Nom de l'entreprise |
| role | varchar | Poste occupé |
| period | varchar | Ex: "Mars 2025 - Présent" |
| description | text | Détails des missions |
| technologies | text[] | Technos utilisées durant l'expérience |
| profile_id | uuid (FK) | Référence au profil |

### 5. education
Parcours académique.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique |
| school | varchar | Nom de l'école/université |
| degree | varchar | Diplôme obtenu |
| period | varchar | Années d'études |
| description | text | Détails de la formation |
| profile_id | uuid (FK) | Référence au profil |

### 6. trainings
Certifications et formations courtes.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique |
| title | varchar | Nom de la formation |
| institution | varchar | Organisme formateur |
| period | varchar | Date |
| description | text | Contenu de la formation |
| technologies | text[] | Compétences acquises |
| profile_id | uuid (FK) | Référence au profil |

### 7. blog_posts
Articles et actualités.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique |
| title | varchar | Titre de l'article |
| excerpt | text | Résumé court |
| content | text | Contenu au format Markdown |
| tags | text[] | Mots-clés |
| published_at | timestamp | Date de publication |
| profile_id | uuid (FK) | Référence au profil |

### 8. messages
Formulaire de contact.
| Colonne | Type | Description |
| :--- | :--- | :--- |
| id | uuid (PK) | Identifiant unique |
| name | varchar | Nom de l'expéditeur |
| email | varchar | Email de l'expéditeur |
| subject | varchar | Objet du message |
| content | text | Corps du message |
| is_read | boolean | Statut de lecture (default: false) |
| created_at | timestamp | Date de réception |

---

## Sécurité (Row Level Security - RLS)

Dans Supabase, il est recommandé d'appliquer les politiques suivantes :
1. **Lecture (SELECT) :** Publique pour toutes les tables (sauf `messages`).
2. **Écriture (INSERT/UPDATE/DELETE) :** Réservée à l'utilisateur authentifié (`uid() = profile_id`).
3. **Messages :** INSERT autorisé pour tout le monde (public), mais SELECT réservé à l'administrateur.
