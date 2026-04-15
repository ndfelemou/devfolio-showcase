import { Training, getData, setData, KEYS, generateId, defaultTrainings } from "@/data/mock-data";

export const trainingService = {
  async getAll() {
    return getData<Training>(KEYS.trainings, defaultTrainings);
  },

  async create(training: Omit<Training, "id">) {
    const trainings = getData<Training>(KEYS.trainings, defaultTrainings);
    const newTraining = { ...training, id: generateId() } as Training;
    setData(KEYS.trainings, [...trainings, newTraining]);
    return newTraining;
  },

  async update(id: string, updates: Partial<Training>) {
    const trainings = getData<Training>(KEYS.trainings, defaultTrainings);
    const index = trainings.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Formation non trouvée");
    
    const updatedTraining = { ...trainings[index], ...updates };
    trainings[index] = updatedTraining;
    setData(KEYS.trainings, trainings);
    return updatedTraining;
  },

  async delete(id: string) {
    const trainings = getData<Training>(KEYS.trainings, defaultTrainings);
    const filtered = trainings.filter(t => t.id !== id);
    setData(KEYS.trainings, filtered);
  }
};
