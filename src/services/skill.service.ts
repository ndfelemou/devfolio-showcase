import supabase from "@/utils/supabase";
import { Skill } from "@/data/mock-data";

export const skillService = {
  async getAll() {
    const { data, error } = await supabase
      .from("skills")
      .select("*")
      .order("name", { ascending: true });
    if (error) throw error;
    return data;
  },

  async create(skill: Omit<Skill, "id">, profileId: string) {
    const { data, error } = await supabase
      .from("skills")
      .insert([{ ...skill, profile_id: profileId }])
      .select();
    if (error) throw error;
    return data[0];
  },

  async update(id: string, updates: Partial<Skill>) {
    const { data, error } = await supabase
      .from("skills")
      .update(updates)
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id: string) {
    const { error } = await supabase.from("skills").delete().eq("id", id);
    if (error) throw error;
  }
};
