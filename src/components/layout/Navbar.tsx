import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
  const { theme, toggleTheme } = useTheme();

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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
