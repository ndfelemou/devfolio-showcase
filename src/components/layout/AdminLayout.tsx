import { useAuth } from "@/contexts/AuthContext";
import {
  BookOpen,
  Briefcase,
  FolderKanban,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Terminal,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const navItems = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/projects", label: "Projets", icon: FolderKanban },
  { to: "/admin/skills", label: "Compétences", icon: Zap },
  { to: "/admin/experiences", label: "Expériences", icon: Briefcase },
  { to: "/admin/education", label: "Formation", icon: GraduationCap },
  { to: "/admin/blog", label: "Blog", icon: BookOpen },
  { to: "/admin/profile", label: "Profil", icon: User },
  { to: "/admin/messages", label: "Messages", icon: MessageSquare },
];

const AdminLayout = () => {
  const { logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform bg-card border-r border-border flex flex-col w-64 shrink-0 transition-transform duration-300 z-40
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-2 text-primary font-display font-bold"
          >
            <Terminal className="w-5 h-5" />
            <span>Admin Panel</span>
          </Link>
          {/* Bouton fermer sur mobile */}
          <button
            className="md:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
              onClick={() => setSidebarOpen(false)} // Ferme le menu après clic sur mobile
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="w-4 h-4" />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Contenu principal */}
      <div className="flex-1 flex flex-col">
        {/* Header avec bouton menu sur mobile */}
        <header className="md:hidden p-4 border-b border-border flex items-center justify-between">
          <button
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <span className="font-bold">Admin Panel</span>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
