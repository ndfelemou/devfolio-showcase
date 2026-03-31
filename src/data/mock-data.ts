export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  category: "frontend" | "backend" | "fullstack" | "mobile";
  gradientIndex: number;
  origin: "entreprise" | "perso" | "freelance";
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

// Expériences professionnelles
export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

// Éducation académique
export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  description: string;
}

// Formations complémentaires / spécialisées
export interface Training {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  tags: string[];
}

export interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  github: string;
  linkedin: string;
}

export const generateId = () => Math.random().toString(36).substr(2, 9);

export const defaultProfile: Profile = {
  name: "Nyankoye Daniel Félémou",
  title: "Développeur Full Stack & Ingénieur Logiciel",
  bio: "Passionné par le développement web moderne, je crée des applications performantes et élégantes. Avec 1,2 ans d'expérience, je maîtrise Angular, React, Node.js, Laravel et les architectures cloud.",
  email: "ndfelemou@gmail.com",
  phone: "+224 627 15 25 66",
  location: "Conakry, Guinée",
  github: "https://github.com/danielfelemou",
  linkedin: "https://linkedin.com/in/ndfelemou",
};

// export const defaultProjects: Project[] = [
//   { id: "1", title: "TaskFlow", description: "Application de gestion de projets avec tableaux Kanban, suivi du temps et collaboration en temps réel.", technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "fullstack", gradientIndex: 1 },
//   { id: "2", title: "CryptoTracker", description: "Dashboard de suivi de cryptomonnaies avec graphiques en temps réel et alertes de prix personnalisables.", technologies: ["React", "D3.js", "Express", "Redis", "WebSocket"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "frontend", gradientIndex: 2 },
//   { id: "3", title: "DevBlog CMS", description: "Système de gestion de contenu pour blogs techniques avec éditeur Markdown et génération statique.", technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "fullstack", gradientIndex: 3 },
//   { id: "4", title: "EcoShop API", description: "API RESTful pour plateforme e-commerce éco-responsable avec gestion des paiements et livraisons.", technologies: ["Node.js", "Express", "Stripe", "MongoDB", "Docker"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "backend", gradientIndex: 4 },
//   { id: "5", title: "WeatherPulse", description: "Application météo élégante avec prévisions sur 7 jours, cartes interactives et widgets personnalisables.", technologies: ["React", "TypeScript", "Mapbox", "OpenWeather API"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "frontend", gradientIndex: 5 },
//   { id: "6", title: "ChatConnect", description: "Application de messagerie instantanée avec chiffrement end-to-end, appels vidéo et partage de fichiers.", technologies: ["React", "WebRTC", "Socket.io", "Node.js", "MongoDB"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "fullstack", gradientIndex: 6 },
// ];

// export const defaultSkills: Skill[] = [
//   { id: "1", name: "React", level: 95, category: "Frontend" },
//   { id: "2", name: "TypeScript", level: 90, category: "Frontend" },
//   { id: "3", name: "Tailwind CSS", level: 92, category: "Frontend" },
//   { id: "4", name: "Angular", level: 70, category: "Frontend" },
//   { id: "5", name: "Node.js", level: 88, category: "Backend" },
//   { id: "6", name: "Express", level: 90, category: "Backend" },
//   { id: "7", name: "Python", level: 75, category: "Backend" },
//   { id: "8", name: "Laravel", level: 78, category: "Backend" },
//   { id: "9", name: "PostgreSQL", level: 85, category: "Database" },
//   { id: "10", name: "MySQL", level: 90, category: "Database" },
//   { id: "11", name: "MongoDB", level: 82, category: "Database" },
//   { id: "12", name: "Docker", level: 80, category: "DevOps" },
//   { id: "13", name: "AWS", level: 72, category: "DevOps" },
//   { id: "14", name: "Git & GitHub", level: 60, category: "DevOps" },
//   { id: "15", name: "Git & GitLab", level: 40, category: "DevOps" },
// ];
export const defaultProjects: Project[] = [
  {
    id: "1", title: "Gestion d'agence de location de véhicules", description: "Application web de gestion complète pour une agence de location de véhicules avec authentification, gestion des clients, véhicules, contrats, paiements et maintenance.", technologies: ["Laravel", "SQL Server", "Ajax"], image: "", githubUrl: "", liveUrl: "", category: "fullstack", gradientIndex: 1, origin: "entreprise",


  },
  {
    id: "2", title: "Gestion des tâches", description: "Application de gestion des tâches avec assignation, notifications par email et gestion des utilisateurs. Envoi automatique des identifiants lors de la création d’un compte.", technologies: ["Laravel", "SQL Server", "Mailing"], image: "", githubUrl: "", liveUrl: "", category: "backend", gradientIndex: 2, origin: "entreprise",
  },

  {
    id: "3", title: "Interface web Cellcome", description: "Plateforme web pour une société téléphonique permettant aux clients de souscrire et consulter la liste de leurs transactions.", technologies: ["Laravel", "SQL Server"], image: "", githubUrl: "", liveUrl: "", category: "frontend", gradientIndex: 3, origin: "entreprise",
  },

  {
    id: "4", title: "API CREVADE", description: "API Laravel sécurisée avec Sanctum pour la gestion des initiatives de valorisation des déchets et production de charbons verts, en partenariat avec FEGEDEG.", technologies: ["Laravel", "Sanctum", "SQL Server"], image: "", githubUrl: "", liveUrl: "", category: "backend", gradientIndex: 4, origin: "entreprise",
  },

  {
    id: "5", title: "SchoolPay", description: "Application de gestion des paiements de frais de scolarité au Sénégal. Développement de l’API en Laravel et intégration du frontend en ReactJS.", technologies: ["Laravel", "SQL Server", "ReactJS"], image: "", githubUrl: "", liveUrl: "", category: "fullstack", gradientIndex: 5, origin: "entreprise",
  },

  {
    id: "6", title: "BCI Backoffice", description: "Application Angular pour la gestion du backoffice d’une banque (BCI), incluant la gestion des opérations et des utilisateurs.", technologies: ["Angular", "SQL Server"], image: "", githubUrl: "", liveUrl: "", category: "frontend", gradientIndex: 6, origin: "entreprise",
  },

  {
    id: "7", title: "Application de gestion d’un cabinet de voyage", description: "Application web avec Laravel, Livewire et AlpineJS pour gérer les services, clients, utilisateurs, témoignages, partenaires, galeries et messages de contact.", technologies: ["Laravel", "Livewire", "AlpineJS", "MySQL"], image: "", githubUrl: "", liveUrl: "", category: "fullstack", gradientIndex: 8, origin: "freelance",
  },

  {
    id: "8", title: "Gestion de contacts personnels", description: "Application avec API Laravel et frontend React TS pour gérer ses contacts personnels. Authentification et CRUD déjà implémentés.", technologies: ["Laravel", "React", "TypeScript", "SQL Server"], image: "", githubUrl: "", liveUrl: "", category: "fullstack", gradientIndex: 8, origin: "perso",
  },

  {
    id: "9", title: "Application de gestion de blog", description: "Application web permettant la création, modification et gestion de contenus de blog.", technologies: ["Laravel", "MySQL"], image: "", githubUrl: "", liveUrl: "", category: "backend", gradientIndex: 9, origin: "perso",
  },

  {
    id: "10", title: "Application de gestion de polyclinique ASGUI", description: "Projet de fin de licence développé en équipe de 5 étudiants. Application Laravel pour gérer patients, médecins, rendez-vous et services médicaux.", technologies: ["Laravel", "MySQL"], image: "", githubUrl: "", liveUrl: "", category: "fullstack", gradientIndex: 10, origin: "perso",
  },

  {
    id: "11", title: "Application de gestion de bibliothèque", description: "Application React TS avec backend NodeJS et MySQL pour gérer livres, emprunts et utilisateurs.", technologies: ["React", "TypeScript", "Node.js", "MySQL"], image: "", githubUrl: "", liveUrl: "https://frontend-biblio-plus.vercel.app/", category: "fullstack", gradientIndex: 11, origin: "perso",
  },

  {
    id: "12", title: "TodoList améliorée", description: "Application TodoList avec Angular et NodeJS, utilisant SQL Server comme base de données.", technologies: ["Angular", "Node.js", "SQL Server"], image: "", githubUrl: "", liveUrl: "", category: "fullstack", gradientIndex: 12, origin: "perso",
  },

  {
    id: "13", title: "TodoList PHP/MySQL", description: "Application TodoList simple en PHP avec MySQL pour la gestion des tâches.", technologies: ["PHP", "MySQL"], image: "", githubUrl: "", liveUrl: "", category: "backend", gradientIndex: 13, origin: "perso",
  },

  {
    id: "14", title: "E-commerce en PHP POO", description: "Projet personnel réalisé après formation en PHP. Application e-commerce en PHP orienté objet avec MySQL comme base de données.", technologies: ["PHP", "POO", "MySQL"], image: "", githubUrl: "", liveUrl: "", category: "fullstack", gradientIndex: 14, origin: "perso",
  },
];


export const defaultSkills: Skill[] = [
  // --- Langages de programmation ---
  { id: "19", name: "JavaScript", level: 85, category: "Langages de programmation" },
  { id: "2", name: "TypeScript", level: 75, category: "Langages de programmation" },
  { id: "20", name: "PHP", level: 90, category: "Langages de programmation" },
  { id: "7", name: "Python", level: 60, category: "Langages de programmation" },

  // --- Frontend (Frameworks & Librairies) ---
  { id: "1", name: "React", level: 70, category: "Frontend" },
  { id: "21", name: "Next.js", level: 45, category: "Frontend" },
  { id: "4", name: "Angular", level: 75, category: "Frontend" },
  { id: "3", name: "Tailwind CSS", level: 80, category: "Frontend" },
  { id: "16", name: "Bootstrap", level: 85, category: "Frontend" },

  // --- Backend (Frameworks & Runtimes) ---
  { id: "8", name: "Laravel", level: 95, category: "Backend" },
  { id: "5", name: "Node.js", level: 70, category: "Backend" },
  { id: "6", name: "Express", level: 85, category: "Backend" },
  { id: "17", name: "FastAPI", level: 40, category: "Backend" },

  // --- Database ---
  { id: "10", name: "MySQL", level: 90, category: "Database" },
  { id: "18", name: "SQL Server", level: 90, category: "Database" },
  { id: "11", name: "MongoDB", level: 80, category: "Database" },
  { id: "9", name: "PostgreSQL", level: 38, category: "Database" },

  // --- DevOps & Outils ---
  { id: "14", name: "Git & GitHub", level: 75, category: "DevOps" },
  { id: "15", name: "Git & GitLab", level: 45, category: "DevOps" },
  { id: "12", name: "Docker", level: 42, category: "DevOps" },
  { id: "13", name: "AWS", level: 35, category: "DevOps" },
];


// export const defaultExperiences: Experience[] = [
//   { id: "1", company: "TechCorp", role: "Développeur Full Stack Senior", period: "2022 - Présent", description: "Développement d'applications web complexes pour des clients grands comptes. Lead technique sur 3 projets majeurs.", technologies: ["React", "Node.js", "PostgreSQL", "AWS"] },
//   { id: "2", company: "StartupLab", role: "Développeur Full Stack", period: "2020 - 2022", description: "Création de MVPs et prototypes rapides. Mise en place de CI/CD et bonnes pratiques de développement.", technologies: ["Vue.js", "Express", "MongoDB", "Docker"] },
//   { id: "3", company: "WebAgency", role: "Développeur Frontend", period: "2019 - 2020", description: "Intégration de maquettes et développement de composants UI réutilisables pour divers clients.", technologies: ["React", "SASS", "JavaScript", "WordPress"] },
// ];
export const defaultExperiences: Experience[] = [
  {
    id: "1",
    company: "Elite & Synergies",
    role: "Développeur Frontend React TS",
    period: "Février 2026 - Présent",
    description:
      "Développement et optimisation d’interfaces utilisateur modernes avec React et TypeScript. Intégration de composants réutilisables, amélioration de l’expérience utilisateur et collaboration avec l’équipe backend pour assurer la cohérence des APIs.",
    technologies: ["React", "TypeScript", "TailwindCSS", "Bootstrap"],
  },
  {
    id: "2",
    company: "E-CASH GUINEE",
    role: "Développeur Web Fullstack",
    period: "Mars 2025 - Février 2026",
    description:
      "Développement d'applications web avec Laravel, conception et intégration d'APIs sécurisées, ajout de nouvelles fonctionnalités et optimisation des performances des applications existantes. Gestion de bases de données SQL Server et développement avec Angular et ReactJS.",
    technologies: ["Laravel", "SQL Server", "Angular", "ReactJS"],
  },
  {
    id: "3",
    company: "Projet AgriFARM - HMG",
    role: "Stagiaire en Passation des Marchés",
    period: "Mai 2024 - Mars 2025",
    description:
      "Participation à l'évaluation et à l'analyse des appels d'offres, rédaction des rapports d'évaluation et gestion documentaire. Appui à la planification des activités du PPM 2024-2025.",
    technologies: ["Documentation", "Analyse", "Gestion de projet"],
  },
  {
    id: "4",
    company: "DAD Prestation",
    role: "Formateur & Gérant",
    period: "Avril 2021 - Mai 2024",
    description:
      "Formation en bureautique, programmation et infographie. Développement et maintenance de solutions logicielles pour des clients locaux. Supervision de projets pédagogiques et gestion administrative du centre.",
    technologies: ["PHP", "Laravel", "Infographie", "Gestion de projet"],
  },
];

// export const defaultEducation: Education[] = [
//   { id: "1", school: "Université Paris-Saclay", degree: "Master Informatique - Génie Logiciel", period: "2017 - 2019", description: "Spécialisation en architecture logicielle et développement web avancé." },
//   { id: "2", school: "Université de Lyon", degree: "Licence Informatique", period: "2014 - 2017", description: "Fondamentaux de la programmation, algorithmes et structures de données." },
//   { id: "3", school: "OpenClassrooms", degree: "Certifications Web Development", period: "2018", description: "Certifications React, Node.js et UX Design." },
// ];
export const defaultEducation: Education[] = [
  {
    id: "1",
    school: "Institut Supérieur de Technologie de Mamou (ISTM)",
    degree: "Licence en Génie Informatique",
    period: "2020 - 2024",
    description:
      "Formation universitaire en génie informatique avec une spécialisation en développement logiciel, conception d’APIs et gestion de bases de données.",
  },
  {
    id: "2",
    school: "Lycée Félix Roland Moumié, N'Zérékoré",
    degree: "Baccalauréat Scientifique (SM)",
    period: "2018 - 2020",
    description:
      "Études secondaires avec une spécialisation scientifique, profil Mathématiques.",
  },
  {
    id: "3",
    school: "Collège Moderne de Boola",
    degree: "BEPC",
    period: "2012 - 2018",
    description:
      "Études secondaires générales avec obtention du Brevet d’Études du Premier Cycle.",
  },
  {
    id: "4",
    school: "École Primaire Patrice Lumumba de Gueckédou",
    degree: "CEP",
    period: "2007 - 2012",
    description:
      "Études élémentaires avec obtention du Certificat de Fin d’Études Primaires.",
  },
];

export const defaultTrainings: Training[] = [
  {
    id: "1",
    title: "Formation en Système d’Information Géographique (SIG)",
    institution: "Projet AgriFARM-HMG, Mamou",
    period: "Août 2024",
    description:
      "Initiation et pratique des outils SIG pour l’analyse géographique et la gestion de données spatiales.",
    technologies: ["QGIS"],
  },
  {
    id: "2",
    title: "Formation en Comptabilité et Gestion",
    institution: "Action Pour une Jeunesse Africaine Solidaire (APJAS)",
    period: "Avril 2023 - Juin 2023",
    description:
      "Apprentissage des principes de comptabilité et gestion financière via une plateforme en ligne.",
    technologies: ["Comptabilité", "Gestion"],
  },
  {
    id: "3",
    title: "Formation en Maintenance Informatique",
    institution: "Centre DAD Prestation, Mamou",
    period: "Avril 2022 - Mai 2022",
    description:
      "Maintenance et dépannage des systèmes informatiques, installation et configuration de logiciels.",
    technologies: ["Hardware", "Software"],
  },
  {
    id: "4",
    title: "Formation en Gestion des problèmes collectifs et individuels",
    institution: "Centre Africaine de Formation et d’Innovation (CAFI), Mamou",
    period: "Mars 2022",
    description:
      "Techniques de résolution de conflits et gestion des dynamiques collectives.",
    technologies: ["Communication", "Gestion de conflits"],
  },
  {
    id: "5",
    title: "Formation en Développement personnel et entrepreneuriat",
    institution: "Mamou",
    period: "Mars 2022",
    description:
      "Développement personnel, création et gestion d’entreprise, techniques de communication en public.",
    technologies: ["Entrepreneuriat", "Communication"],
  },
  {
    id: "6",
    title: "Formation en Systèmes photovoltaïques",
    institution: "Business Technologie Académie, Mamou",
    period: "Janvier - Février 2022",
    description:
      "Mise en place et maintenance de systèmes solaires photovoltaïques.",
    technologies: ["Énergie solaire", "Maintenance"],
  },
];


export const defaultBlogPosts: BlogPost[] = [
  { id: "1", title: "Pourquoi TypeScript change tout", excerpt: "Découvrez comment TypeScript améliore la qualité du code et la productivité des équipes de développement.", content: "TypeScript apporte le typage statique à JavaScript...", date: "2024-01-15", tags: ["TypeScript", "JavaScript", "Bonnes pratiques"] },
  { id: "2", title: "Architecture Clean avec React", excerpt: "Comment structurer vos projets React pour qu'ils restent maintenables à grande échelle.", content: "L'architecture clean est un pattern...", date: "2024-02-20", tags: ["React", "Architecture", "Clean Code"] },
  { id: "3", title: "API REST vs GraphQL en 2024", excerpt: "Comparaison détaillée des deux approches pour construire vos APIs modernes.", content: "Le débat entre REST et GraphQL...", date: "2024-03-10", tags: ["API", "GraphQL", "REST", "Backend"] },
  { id: "4", title: "Docker pour les développeurs web", excerpt: "Guide pratique pour containeriser vos applications web avec Docker et Docker Compose.", content: "Docker simplifie le déploiement...", date: "2024-04-05", tags: ["Docker", "DevOps", "Déploiement"] },
];

export const defaultMessages: Message[] = [
  { id: "1", name: "Marie Laurent", email: "marie@example.com", subject: "Projet e-commerce", message: "Bonjour, je cherche un développeur pour créer une boutique en ligne.", date: "2024-04-10", read: false },
  { id: "2", name: "Pierre Martin", email: "pierre@example.com", subject: "Collaboration freelance", message: "Intéressé par une collaboration sur un projet SaaS.", date: "2024-04-08", read: true },
  { id: "3", name: "Sophie Chen", email: "sophie@example.com", subject: "Stage développement", message: "Je suis étudiante et j'aimerais faire un stage dans votre entreprise.", date: "2024-04-05", read: true },
];

// Data access helpers
export function getData<T>(key: string, fallback: T[]): T[] {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function setData<T>(key: string, data: T[]): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getProfile(): Profile {
  try {
    const saved = localStorage.getItem("portfolio_profile");
    return saved ? JSON.parse(saved) : defaultProfile;
  } catch {
    return defaultProfile;
  }
}

export function setProfile(profile: Profile): void {
  localStorage.setItem("portfolio_profile", JSON.stringify(profile));
}

export const KEYS = {
  projects: "portfolio_projects",
  skills: "portfolio_skills",
  experiences: "portfolio_experiences",
  trainings: "portfolio_trainings",
  education: "portfolio_education",
  blog: "portfolio_blog",
  messages: "portfolio_messages",
} as const;
