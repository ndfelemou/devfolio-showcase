import { Education, getData, setData, KEYS, generateId, defaultEducation } from "@/data/mock-data";

export const educationService = {
  async getAll() {
    return getData<Education>(KEYS.education, defaultEducation);
  },

  async create(edu: Omit<Education, "id">) {
    const educations = getData<Education>(KEYS.education, defaultEducation);
    const newEdu = { ...edu, id: generateId() } as Education;
    setData(KEYS.education, [...educations, newEdu]);
    return newEdu;
  },

  async update(id: string, updates: Partial<Education>) {
    const educations = getData<Education>(KEYS.education, defaultEducation);
    const index = educations.findIndex(e => e.id === id);
    if (index === -1) throw new Error("Éducation non trouvée");
    
    const updatedEdu = { ...educations[index], ...updates };
    educations[index] = updatedEdu;
    setData(KEYS.education, educations);
    return updatedEdu;
  },

  async delete(id: string) {
    const educations = getData<Education>(KEYS.education, defaultEducation);
    const filtered = educations.filter(e => e.id !== id);
    setData(KEYS.education, filtered);
  }
};
