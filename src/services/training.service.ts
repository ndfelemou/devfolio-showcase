import supabase from "@/utils/supabase";
import { Training } from "@/data/mock-data";

export const trainingService = {
  async getAll() {
    const { data, error } = await supabase
      .from("trainings")
      .select("*");
    if (error) throw error;
    return data;
  },

  async create(training: Omit<Training, "id">, profileId: string) {
    const { data, error } = await supabase
      .from("trainings")
      .insert([{ ...training, profile_id: profileId }])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id: string, updates: Partial<Training>) {
    const { data, error } = await supabase
      .from("trainings")
      .update(updates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id: string) {
    const { error } = await supabase.from("trainings").delete().eq("id", id);
    if (error) throw error;
  }
};
