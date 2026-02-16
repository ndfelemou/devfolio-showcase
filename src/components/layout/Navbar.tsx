import { NavLink } from "@/components/NavLink";
import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, Moon, Sun, Terminal, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

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
  const parcoursRef = useRef<HTMLDivElement>(null);

  // Fermer le sous-menu si clic en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (parcoursRef.current && !parcoursRef.current.contains(event.target as Node)) {
        setParcoursOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavLink
            to="/"
            className="flex items-center gap-2 text-primary font-display font-bold text-xl"
            activeClassName="text-primary"
          >
            <Terminal className="w-5 h-5" />
            <span>NDF</span>
          </NavLink>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((l) =>
              l.children ? (
                <div key={l.label} className="relative" ref={parcoursRef}>
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
                          <NavLink
                            key={child.to}
                            to={child.to}
                            onClick={() => setParcoursOpen(false)} // ✅ ferme au clic
                            className="block px-3 py-2 rounded-md text-sm font-medium transition-colors"
                            activeClassName="text-primary bg-primary/10"
                          >
                            {child.label}
                          </NavLink>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  activeClassName="text-primary bg-primary/10"
                >
                  {l.label}
                </NavLink>
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
    </nav>
  );
};

export default Navbar;
