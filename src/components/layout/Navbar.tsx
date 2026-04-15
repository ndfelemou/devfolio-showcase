import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, Terminal, X, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { to: "/", label: "Accueil" },
  { to: "/about", label: "À propos" },
  { to: "/skills", label: "Compétences" },
  { to: "/projects", label: "Projets" },
  {
    label: "Parcours",
    children: [
      { to: "/experience", label: "Expérience" },
      { to: "/education", label: "Education" },
      { to: "/trainings", label: "Formations" },
    ],
  },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [parcoursOpen, setParcoursOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-primary font-display font-bold text-xl"
          >
            <Terminal className="w-5 h-5" />
            <span>NDF</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) =>
              l.children ? (
                <div key={l.label} className="relative">
                  <button
                    onClick={() => setParcoursOpen(!parcoursOpen)}
                    className={`px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 transition-colors ${parcoursOpen
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                  >
                    {l.label}
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <AnimatePresence>
                    {parcoursOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute left-0 mt-2 w-40 glass rounded-lg shadow-lg p-2 space-y-1"
                      >
                        {l.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => setParcoursOpen(false)}
                            className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === child.to
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${pathname === l.to
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                >
                  {l.label}
                </Link>
              )
            )}

            {/* Admin Links (Desktop) */}
            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-border mx-2" />
                <Link
                  to="/admin/dashboard"
                  className="px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center gap-1"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  title="Déconnexion"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              aria-label="Basculer le thème"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Basculer le thème"
            >
              {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-muted-foreground hover:text-foreground"
              aria-label="Menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu avec sous-menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-border"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map((l) =>
                l.children ? (
                  <div key={l.label}>
                    <button
                      onClick={() => setParcoursOpen(!parcoursOpen)}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium"
                    >
                      {l.label}
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {parcoursOpen && (
                      <div className="pl-4 space-y-1">
                        {l.children.map((child) => (
                          <Link
                            key={child.to}
                            to={child.to}
                            onClick={() => {
                              setParcoursOpen(false);
                              setMobileOpen(false);
                            }}
                            className={`block px-3 py-2 rounded-md text-sm font-medium ${pathname === child.to
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-foreground"
                              }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={l.to}
                    to={l.to}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-3 py-2 rounded-md text-sm font-medium ${pathname === l.to
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {l.label}
                  </Link>
                )
              )}

              {/* Admin Links (Mobile) */}
              {isAuthenticated && (
                <div className="pt-2 mt-2 border-t border-border space-y-1">
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Administration
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
