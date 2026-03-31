import supabase from "@/utils/supabase";
import { Project } from "@/data/mock-data";

export const projectService = {
  // Récupérer tous les projets
  async getAll() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Récupérer un projet par ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();
    
    if (error) throw error;
    return data;
  },

  // Ajouter un projet
  async create(project: Omit<Project, "id">, profileId: string) {
    const { data, error } = await supabase
      .from("projects")
      .insert([{ ...project, profile_id: profileId }])
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Mettre à jour un projet
  async update(id: string, updates: Partial<Project>) {
    const { data, error } = await supabase
      .from("projects")
      .update(updates)
      .eq("id", id)
      .select();
    
    if (error) throw error;
    return data[0];
  },

  // Supprimer un projet
  async delete(id: string) {
    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);
    
    if (error) throw error;
  }
};
