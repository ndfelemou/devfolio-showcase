import { defaultProjects, getData, KEYS, type Project } from "@/data/mock-data";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Github, Search, Filter } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const fadeUp = { 
  hidden: { opacity: 0, y: 20 }, 
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 }
};

const categories = ["all", "fullstack", "frontend", "backend", "mobile"];
const origins = ["all", "entreprise", "perso", "freelance"];

const Projects = () => {
  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeOrigin, setActiveOrigin] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Simulation d'un chargement API pour montrer les skeletons
    const load = async () => {
      setLoading(true);
      const data = getData<Project>(KEYS.projects, defaultProjects);
      // Délai artificiel pour l'effet "pro"
      await new Promise(resolve => setTimeout(resolve, 800));
      setAllProjects(data);
      setLoading(false);
    };
    load();
  }, []);

  const filteredProjects = useMemo(() => {
    return allProjects.filter((p) => {
      const categoryMatch = activeCategory === "all" || p.category === activeCategory;
      const originMatch = activeOrigin === "all" || p.origin === activeOrigin;
      const searchMatch = searchQuery === "" || 
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return categoryMatch && originMatch && searchMatch;
    });
  }, [allProjects, activeCategory, activeOrigin, searchQuery]);

  return (
    <section className="section-padding min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <header className="mb-12">
          <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-primary font-mono text-sm mb-2">
            {"// Portfolio"}
          </motion.p>
          <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl sm:text-6xl font-display font-bold mb-6">
            Mes <span className="gradient-text">réalisations</span>
          </motion.h1>
          
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between glass p-6 rounded-2xl border-primary/10">
            <div className="space-y-4 w-full md:w-auto">
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-full mb-1 flex items-center gap-2">
                  <Filter className="w-3 h-3" /> Catégorie
                </span>
                {categories.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveCategory(f)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${activeCategory === f 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {f === "all" ? "Tous" : f}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-full mb-1">Origine</span>
                {origins.map((o) => (
                  <button
                    key={o}
                    onClick={() => setActiveOrigin(o)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${activeOrigin === o 
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105" 
                      : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary"
                    }`}
                  >
                    {o === "all" ? "Tous" : o}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Rechercher un projet ou techno..." 
                className="pl-10 bg-secondary/30 border-none focus-visible:ring-primary/30"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </header>

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-2xl overflow-hidden border-none p-0">
                <Skeleton className="aspect-video w-full rounded-none" />
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-5 w-16 rounded-full" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, i) => (
                <motion.div
                  layout
                  key={p.id}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={fadeUp}
                  className="glass rounded-2xl overflow-hidden group hover:border-primary/30 transition-all duration-500 hover:-translate-y-2"
                >
                  <Link to={`/projects/${p.id}`} className="block relative overflow-hidden">
                    <div
                      className="aspect-video flex items-center justify-center transition-transform duration-700 group-hover:scale-110"
                      style={{ background: `var(--gradient-project-${((i % 10) + 1)})` }}
                    >
                      <span className="text-5xl font-display font-bold opacity-10 group-hover:opacity-20 transition-opacity">
                        {p.title[0]}
                      </span>
                    </div>
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-background/90 text-foreground px-4 py-2 rounded-full text-sm font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        Voir les détails
                      </span>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-md ${
                        p.origin === "entreprise" ? "bg-blue-500/10 text-blue-500" :
                        p.origin === "freelance" ? "bg-purple-500/10 text-purple-500" :
                        "bg-green-500/10 text-green-500"
                      }`}>
                        {p.origin}
                      </span>
                      <div className="flex gap-3">
                        {p.githubUrl && (
                          <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {p.liveUrl && (
                          <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                    <Link to={`/projects/${p.id}`}>
                      <h3 className="font-display font-bold text-xl mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {p.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">{p.description}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/50">
                          {t}
                        </span>
                      ))}
                      {p.technologies.length > 4 && (
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground">
                          +{p.technologies.length - 4}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {!loading && filteredProjects.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <div className="bg-secondary/30 inline-block p-6 rounded-full mb-4">
              <Search className="w-10 h-10 text-muted-foreground opacity-20" />
            </div>
            <h3 className="text-xl font-bold mb-2">Aucun projet trouvé</h3>
            <p className="text-muted-foreground">Essayez d'ajuster vos filtres ou votre recherche.</p>
            <Button 
              variant="link" 
              onClick={() => { setActiveCategory("all"); setActiveOrigin("all"); setSearchQuery(""); }}
              className="mt-4"
            >
              Réinitialiser les filtres
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
