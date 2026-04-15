import { Experience, getData, setData, KEYS, generateId, defaultExperiences } from "@/data/mock-data";

export const experienceService = {
  async getAll() {
    return getData<Experience>(KEYS.experiences, defaultExperiences);
  },

  async create(exp: Omit<Experience, "id">) {
    const experiences = getData<Experience>(KEYS.experiences, defaultExperiences);
    const newExp = { ...exp, id: generateId() } as Experience;
    setData(KEYS.experiences, [newExp, ...experiences]);
    return newExp;
  },

  async update(id: string, updates: Partial<Experience>) {
    const experiences = getData<Experience>(KEYS.experiences, defaultExperiences);
    const index = experiences.findIndex(e => e.id === id);
    if (index === -1) throw new Error("Expérience non trouvée");
    
    const updatedExp = { ...experiences[index], ...updates };
    experiences[index] = updatedExp;
    setData(KEYS.experiences, experiences);
    return updatedExp;
  },

  async delete(id: string) {
    const experiences = getData<Experience>(KEYS.experiences, defaultExperiences);
    const filtered = experiences.filter(e => e.id !== id);
    setData(KEYS.experiences, filtered);
  }
};
