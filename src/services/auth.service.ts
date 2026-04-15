export const authService = {
  // Connexion
  async login(email: string, password: string) {
    // Vérification des identifiants spécifiques
    if (email === "ndfelemou@gmail.com" && password === "ndfelemou2026") {
      const user = { id: "1", email };
      localStorage.setItem("portfolio_user", JSON.stringify(user));
      return { user, session: { access_token: "mock-token" } };
    } else {
      throw new Error("Identifiants invalides");
    }
  },

  // Déconnexion
  async logout() {
    localStorage.removeItem("portfolio_user");
  },
  
  // Récupérer l'utilisateur actuel
  async getCurrentUser() {
    const user = localStorage.getItem("portfolio_user");
    return user ? JSON.parse(user) : null;
  },

  // Vérifier si l'utilisateur est connecté
  async isAuthenticated() {
    const user = await this.getCurrentUser();
    return !!user;
  }
};
