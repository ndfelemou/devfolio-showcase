export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  category: string;
  gradientIndex: number;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  category: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  description: string;
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
  title: "Développeur Full Stack",
  bio: "Passionné par le développement web moderne, je crée des applications performantes et élégantes. Avec 5 ans d'expérience, je maîtrise React, Node.js et les architectures cloud.",
  email: "daniel@felemou.dev",
  phone: "+224 6 12 34 56 78",
  location: "Conakry, Guinée",
  github: "https://github.com/danielfelemou",
  linkedin: "https://linkedin.com/in/danielfelemou",
};

export const defaultProjects: Project[] = [
  { id: "1", title: "TaskFlow", description: "Application de gestion de projets avec tableaux Kanban, suivi du temps et collaboration en temps réel.", technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "Socket.io"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "fullstack", gradientIndex: 1 },
  { id: "2", title: "CryptoTracker", description: "Dashboard de suivi de cryptomonnaies avec graphiques en temps réel et alertes de prix personnalisables.", technologies: ["React", "D3.js", "Express", "Redis", "WebSocket"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "frontend", gradientIndex: 2 },
  { id: "3", title: "DevBlog CMS", description: "Système de gestion de contenu pour blogs techniques avec éditeur Markdown et génération statique.", technologies: ["Next.js", "MDX", "Prisma", "PostgreSQL"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "fullstack", gradientIndex: 3 },
  { id: "4", title: "EcoShop API", description: "API RESTful pour plateforme e-commerce éco-responsable avec gestion des paiements et livraisons.", technologies: ["Node.js", "Express", "Stripe", "MongoDB", "Docker"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "backend", gradientIndex: 4 },
  { id: "5", title: "WeatherPulse", description: "Application météo élégante avec prévisions sur 7 jours, cartes interactives et widgets personnalisables.", technologies: ["React", "TypeScript", "Mapbox", "OpenWeather API"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "frontend", gradientIndex: 5 },
  { id: "6", title: "ChatConnect", description: "Application de messagerie instantanée avec chiffrement end-to-end, appels vidéo et partage de fichiers.", technologies: ["React", "WebRTC", "Socket.io", "Node.js", "MongoDB"], image: "", githubUrl: "https://github.com", liveUrl: "https://example.com", category: "fullstack", gradientIndex: 6 },
];

export const defaultSkills: Skill[] = [
  { id: "1", name: "React", level: 95, category: "Frontend" },
  { id: "2", name: "TypeScript", level: 90, category: "Frontend" },
  { id: "3", name: "Tailwind CSS", level: 92, category: "Frontend" },
  { id: "4", name: "Next.js", level: 85, category: "Frontend" },
  { id: "5", name: "Node.js", level: 88, category: "Backend" },
  { id: "6", name: "Express", level: 90, category: "Backend" },
  { id: "7", name: "Python", level: 75, category: "Backend" },
  { id: "8", name: "GraphQL", level: 78, category: "Backend" },
  { id: "9", name: "PostgreSQL", level: 85, category: "Database" },
  { id: "10", name: "MongoDB", level: 82, category: "Database" },
  { id: "11", name: "Docker", level: 80, category: "DevOps" },
  { id: "12", name: "AWS", level: 72, category: "DevOps" },
];

export const defaultExperiences: Experience[] = [
  { id: "1", company: "TechCorp", role: "Développeur Full Stack Senior", period: "2022 - Présent", description: "Développement d'applications web complexes pour des clients grands comptes. Lead technique sur 3 projets majeurs.", technologies: ["React", "Node.js", "PostgreSQL", "AWS"] },
  { id: "2", company: "StartupLab", role: "Développeur Full Stack", period: "2020 - 2022", description: "Création de MVPs et prototypes rapides. Mise en place de CI/CD et bonnes pratiques de développement.", technologies: ["Vue.js", "Express", "MongoDB", "Docker"] },
  { id: "3", company: "WebAgency", role: "Développeur Frontend", period: "2019 - 2020", description: "Intégration de maquettes et développement de composants UI réutilisables pour divers clients.", technologies: ["React", "SASS", "JavaScript", "WordPress"] },
];

export const defaultEducation: Education[] = [
  { id: "1", school: "Université Paris-Saclay", degree: "Master Informatique - Génie Logiciel", period: "2017 - 2019", description: "Spécialisation en architecture logicielle et développement web avancé." },
  { id: "2", school: "Université de Lyon", degree: "Licence Informatique", period: "2014 - 2017", description: "Fondamentaux de la programmation, algorithmes et structures de données." },
  { id: "3", school: "OpenClassrooms", degree: "Certifications Web Development", period: "2018", description: "Certifications React, Node.js et UX Design." },
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
  education: "portfolio_education",
  blog: "portfolio_blog",
  messages: "portfolio_messages",
} as const;
