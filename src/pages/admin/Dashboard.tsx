import { FolderKanban, Zap, BookOpen, MessageSquare, Eye } from "lucide-react";
import { getData, defaultProjects, defaultSkills, defaultBlogPosts, defaultMessages, KEYS } from "@/data/mock-data";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const projects = getData(KEYS.projects, defaultProjects);
  const skills = getData(KEYS.skills, defaultSkills);
  const posts = getData(KEYS.blog, defaultBlogPosts);
  const messages = getData(KEYS.messages, defaultMessages);
  const unread = messages.filter((m) => !m.read).length;

  const stats = [
    { label: "Projets", value: projects.length, icon: FolderKanban, to: "/admin/projects" },
    { label: "Compétences", value: skills.length, icon: Zap, to: "/admin/skills" },
    { label: "Articles", value: posts.length, icon: BookOpen, to: "/admin/blog" },
    { label: "Messages", value: `${unread} non lus`, icon: MessageSquare, to: "/admin/messages" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-display font-bold">Dashboard</h1>
        <Link to="/" target="_blank" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
          <Eye className="w-4 h-4" /> Voir le site
        </Link>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="glass rounded-xl p-5 hover:border-primary/30 transition-colors">
            <Icon className="w-5 h-5 text-primary mb-2" />
            <p className="text-2xl font-display font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-display font-semibold mb-4">Messages récents</h2>
        <div className="space-y-2">
          {messages.slice(0, 5).map((m) => (
            <div key={m.id} className="glass rounded-lg p-4 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium">{m.name} — <span className="text-muted-foreground">{m.subject}</span></p>
                <p className="text-xs text-muted-foreground mt-1">{m.message.slice(0, 80)}...</p>
              </div>
              {!m.read && <span className="shrink-0 w-2 h-2 rounded-full bg-primary mt-1.5" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
