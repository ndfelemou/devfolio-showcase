import { Project, getData, setData, KEYS, generateId, defaultProjects } from "@/data/mock-data";

export const projectService = {
  // Récupérer tous les projets
  async getAll() {
    return getData<Project>(KEYS.projects, defaultProjects);
  },

  // Récupérer un projet par ID
  async getById(id: string) {
    const projects = getData<Project>(KEYS.projects, defaultProjects);
    return projects.find(p => p.id === id);
  },

  // Ajouter un projet
  async create(project: Omit<Project, "id">) {
    const projects = getData<Project>(KEYS.projects, defaultProjects);
    const newProject = { ...project, id: generateId() } as Project;
    setData(KEYS.projects, [newProject, ...projects]);
    return newProject;
  },

  // Mettre à jour un projet
  async update(id: string, updates: Partial<Project>) {
    const projects = getData<Project>(KEYS.projects, defaultProjects);
    const index = projects.findIndex(p => p.id === id);
    if (index === -1) throw new Error("Projet non trouvé");
    
    const updatedProject = { ...projects[index], ...updates };
    projects[index] = updatedProject;
    setData(KEYS.projects, projects);
    return updatedProject;
  },

  // Supprimer un projet
  async delete(id: string) {
    const projects = getData<Project>(KEYS.projects, defaultProjects);
    const filteredProjects = projects.filter(p => p.id !== id);
    setData(KEYS.projects, filteredProjects);
  }
};
