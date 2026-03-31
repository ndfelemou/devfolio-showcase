import supabase from "@/utils/supabase";

export const authService = {
  // Connexion
  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  },

  // Déconnexion
  async logout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },
  
  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  // Vérifier si l'utilisateur est connecté
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  }
};
