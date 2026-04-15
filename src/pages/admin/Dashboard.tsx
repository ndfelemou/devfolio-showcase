import { 
  FolderKanban, 
  Zap, 
  BookOpen, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  Users,
  CheckCircle2,
  Clock
} from "lucide-react";
import { 
  getData, 
  defaultProjects, 
  defaultSkills, 
  defaultBlogPosts, 
  defaultMessages, 
  KEYS,
  type Project,
  type Skill,
  type BlogPost,
  type Message
} from "@/data/mock-data";
import { Link } from "react-router-dom";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell,
  Legend
} from "recharts";

const Dashboard = () => {
  const projects = getData<Project>(KEYS.projects, defaultProjects);
  const skills = getData<Skill>(KEYS.skills, defaultSkills);
  const posts = getData<BlogPost>(KEYS.blog, defaultBlogPosts);
  const messages = getData<Message>(KEYS.messages, defaultMessages);
  
  const unreadMessages = messages.filter((m) => !m.read);
  const recentMessages = [...messages].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 4);

  // Préparation des données pour le graphique des compétences (Pie Chart)
  const skillsByCategory = skills.reduce((acc: any, skill) => {
    acc[skill.category] = (acc[skill.category] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(skillsByCategory).map(name => ({
    name,
    value: skillsByCategory[name]
  }));

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

  // Préparation des données pour le graphique des projets (Bar Chart)
  const projectsByCategory = projects.reduce((acc: any, p) => {
    acc[p.category] = (acc[p.category] || 0) + 1;
    return acc;
  }, {});

  const barData = Object.keys(projectsByCategory).map(name => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    count: projectsByCategory[name]
  }));

  const stats = [
    { 
      label: "Projets", 
      value: projects.length, 
      sub: `${projects.filter(p => p.origin === 'entreprise').length} en entreprise`,
      icon: FolderKanban, 
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      to: "/admin/projects" 
    },
    { 
      label: "Compétences", 
      value: skills.length, 
      sub: `${Math.round(skills.reduce((a, b) => a + b.level, 0) / skills.length)}% moy. niveau`,
      icon: Zap, 
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      to: "/admin/skills" 
    },
    { 
      label: "Articles Blog", 
      value: posts.length, 
      sub: "Dernier: il y a 2j",
      icon: BookOpen, 
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      to: "/admin/blog" 
    },
    { 
      label: "Messages", 
      value: unreadMessages.length, 
      sub: `${messages.length} au total`,
      icon: MessageSquare, 
      color: "text-green-500",
      bg: "bg-green-500/10",
      to: "/admin/messages" 
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Dashboard</h1>
          <p className="text-muted-foreground text-sm">Bienvenue dans votre espace d'administration, Daniel.</p>
        </div>
        <Link to="/" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20">
          <Eye className="w-4 h-4" /> Voir mon portfolio
        </Link>
      </div>

      {/* Cartes Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(({ label, value, sub, icon: Icon, color, bg, to }) => (
          <Link key={label} to={to} className="glass group rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1">
            <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <p className="text-3xl font-display font-bold mb-1">{value}</p>
            <p className="text-sm font-medium mb-1">{label}</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" /> {sub}
            </p>
          </Link>
        ))}
      </div>

      {/* Graphiques */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Répartition par Techno */}
        <div className="glass rounded-2xl p-6 flex flex-col h-[400px]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" /> Répartition Technique
          </h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Legend iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Projets par catégorie */}
        <div className="glass rounded-2xl p-6 flex flex-col h-[400px]">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-primary" /> Projets par Catégorie
          </h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'rgba(59, 130, 246, 0.05)' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Derniers Messages & Activité */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> Messages Récents
            </h3>
            <Link to="/admin/messages" className="text-xs text-primary hover:underline">Tout voir</Link>
          </div>
          <div className="space-y-4">
            {recentMessages.map((m) => (
              <div key={m.id} className="flex items-start gap-4 p-4 rounded-xl hover:bg-secondary/30 transition-colors border border-transparent hover:border-border/50">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${m.read ? 'bg-secondary' : 'bg-primary/10'}`}>
                  {m.read ? <CheckCircle2 className="w-5 h-5 text-muted-foreground" /> : <Users className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-bold truncate">{m.name}</p>
                    <span className="text-[10px] text-muted-foreground">{new Date(m.date).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs font-medium mb-1 line-clamp-1">{m.subject}</p>
                  <p className="text-xs text-muted-foreground line-clamp-2">{m.message}</p>
                </div>
              </div>
            ))}
            {recentMessages.length === 0 && (
              <p className="text-center py-8 text-sm text-muted-foreground">Aucun message pour le moment.</p>
            )}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" /> Activité Rapide
          </h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-1 bg-blue-500 rounded-full" />
              <div>
                <p className="text-xs font-bold uppercase text-blue-500 mb-1">Dernier Projet</p>
                <p className="text-sm font-medium">{projects[0]?.title || "N/A"}</p>
                <p className="text-xs text-muted-foreground mt-1">Ajouté récemment</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-1 bg-green-500 rounded-full" />
              <div>
                <p className="text-xs font-bold uppercase text-green-500 mb-1">Dernier Article</p>
                <p className="text-sm font-medium">{posts[0]?.title || "N/A"}</p>
                <p className="text-xs text-muted-foreground mt-1">Publié le {new Date(posts[0]?.date || Date.now()).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="text-xs font-medium text-center text-primary italic">
                "Continue de bâtir, Daniel. Ton portfolio est ton meilleur ambassadeur."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
