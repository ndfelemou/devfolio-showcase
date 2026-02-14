import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { getData, defaultProjects, KEYS, type Project } from "@/data/mock-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const filters = ["all", "fullstack", "frontend", "backend"];

const Projects = () => {
  const projects = getData<Project>(KEYS.projects, defaultProjects);
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <section className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-primary font-mono text-sm mb-2">{"// Projets"}</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold mb-8">
          Mes <span className="gradient-text">réalisations</span>
        </motion.h1>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button key={f} onClick={() => setActive(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                active === f ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}>
              {f === "all" ? "Tous" : f}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <motion.div key={p.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}
              className="glass rounded-xl overflow-hidden group hover:border-primary/30 transition-colors">
              <Link to={`/projects/${p.id}`}>
                <div className="aspect-video flex items-center justify-center" style={{ background: `var(--gradient-project-${p.gradientIndex})` }}>
                  <span className="text-4xl font-display font-bold opacity-20">{p.title[0]}</span>
                </div>
              </Link>
              <div className="p-5">
                <Link to={`/projects/${p.id}`}>
                  <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                </Link>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.technologies.map((t) => (
                    <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
