import supabase from "@/utils/supabase";
import { Education } from "@/data/mock-data";

export const educationService = {
  async getAll() {
    const { data, error } = await supabase
      .from("education")
      .select("*");
    if (error) throw error;
    return data;
  },

  async create(edu: Omit<Education, "id">, profileId: string) {
    const { data, error } = await supabase
      .from("education")
      .insert([{ ...edu, profile_id: profileId }])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id: string, updates: Partial<Education>) {
    const { data, error } = await supabase
      .from("education")
      .update(updates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id: string) {
    const { error } = await supabase.from("education").delete().eq("id", id);
    if (error) throw error;
  }
};
