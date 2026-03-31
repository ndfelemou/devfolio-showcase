import supabase from "@/utils/supabase";
import { Experience } from "@/data/mock-data";

export const experienceService = {
  async getAll() {
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async create(exp: Omit<Experience, "id">, profileId: string) {
    const { data, error } = await supabase
      .from("experiences")
      .insert([{ ...exp, profile_id: profileId }])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id: string, updates: Partial<Experience>) {
    const { data, error } = await supabase
      .from("experiences")
      .update(updates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id: string) {
    const { error } = await supabase.from("experiences").delete().eq("id", id);
    if (error) throw error;
  }
};
