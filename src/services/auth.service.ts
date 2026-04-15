export const authService = {
  // Connexion
  async login(email: string, _password: string) {
    // Mock login: always succeeds with any password
    const user = { id: "1", email };
    localStorage.setItem("portfolio_user", JSON.stringify(user));
    return { user, session: { access_token: "mock-token" } };
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
