import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { getData, defaultProjects, KEYS } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const ProjectDetail = () => {
  const { id } = useParams();
  const projects = getData(KEYS.projects, defaultProjects);
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl font-display font-bold mb-4">Projet introuvable</h1>
        <Link to="/projects"><Button variant="outline">Retour aux projets</Button></Link>
      </div>
    );
  }

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={fadeUp}>
            <Link to="/projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Retour aux projets
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="aspect-video rounded-xl flex items-center justify-center mb-8"
            style={{ background: `var(--gradient-project-${project.gradientIndex})` }}>
            <span className="text-6xl font-display font-bold opacity-20">{project.title[0]}</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-3xl sm:text-4xl font-display font-bold mb-4">{project.title}</motion.h1>
          <motion.p variants={fadeUp} className="text-muted-foreground leading-relaxed mb-6">{project.description}</motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-2 mb-8">
            {project.technologies.map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">{t}</span>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2"><Github className="w-4 h-4" /> GitHub</Button>
            </a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <Button className="gap-2"><ExternalLink className="w-4 h-4" /> Voir en live</Button>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectDetail;
