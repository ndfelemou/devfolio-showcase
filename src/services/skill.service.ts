import { Skill, getData, setData, KEYS, generateId, defaultSkills } from "@/data/mock-data";

export const skillService = {
  async getAll() {
    return getData<Skill>(KEYS.skills, defaultSkills);
  },

  async create(skill: Omit<Skill, "id">) {
    const skills = getData<Skill>(KEYS.skills, defaultSkills);
    const newSkill = { ...skill, id: generateId() } as Skill;
    setData(KEYS.skills, [...skills, newSkill]);
    return newSkill;
  },

  async update(id: string, updates: Partial<Skill>) {
    const skills = getData<Skill>(KEYS.skills, defaultSkills);
    const index = skills.findIndex(s => s.id === id);
    if (index === -1) throw new Error("Compétence non trouvée");
    
    const updatedSkill = { ...skills[index], ...updates };
    skills[index] = updatedSkill;
    setData(KEYS.skills, skills);
    return updatedSkill;
  },

  async delete(id: string) {
    const skills = getData<Skill>(KEYS.skills, defaultSkills);
    const filtered = skills.filter(s => s.id !== id);
    setData(KEYS.skills, filtered);
  }
};
