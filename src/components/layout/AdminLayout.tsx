import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LayoutDashboard, FolderKanban, Zap, Briefcase, GraduationCap, BookOpen, User, MessageSquare, LogOut, Terminal } from "lucide-react";

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

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-primary font-display font-bold">
            <Terminal className="w-5 h-5" />
            <span>Admin Panel</span>
          </Link>
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
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
