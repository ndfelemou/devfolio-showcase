import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Code, Database, Globe } from "lucide-react";
import { getData, defaultProjects, defaultSkills, getProfile, KEYS, type Project } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Index = () => {
  const profile = getProfile();
  const projects = getData<Project>(KEYS.projects, defaultProjects).slice(0, 3);
  const skills = getData(KEYS.skills, defaultSkills);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center hero-glow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15 } } }} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-primary font-mono text-sm mb-4">
              {"// Bonjour, je suis"}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-display font-bold mb-4">
              {profile.name}
              <span className="gradient-text">.</span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl sm:text-2xl text-muted-foreground font-display mb-2">
              {profile.title}
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {profile.bio}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/projects">
                <Button size="lg" className="gap-2">
                  Voir mes projets <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Me contacter</Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-3 mt-8">
              {[Github, Linkedin, Mail].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding border-t border-border">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Code, label: "Projets", value: defaultProjects.length + "+" },
            { icon: Database, label: "Technologies", value: skills.length + "+" },
            { icon: Globe, label: "Années", value: "5+" },
            { icon: Mail, label: "Clients", value: "20+" },
          ].map(({ icon: Icon, label, value }, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
              className="glass rounded-xl p-6 text-center">
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-2xl font-display font-bold">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-display font-bold">
              Projets <span className="gradient-text">récents</span>
            </h2>
            <p className="text-muted-foreground mt-2">Découvrez mes dernières réalisations</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <motion.div key={p.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}>
                <Link to={`/projects/${p.id}`} className="block glass rounded-xl overflow-hidden group hover:border-primary/30 transition-colors">
                  <div className="aspect-video flex items-center justify-center" style={{ background: `var(--gradient-project-${p.gradientIndex})` }}>
                    <span className="text-4xl font-display font-bold opacity-30">{p.title[0]}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-primary transition-colors">{p.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link to="/projects">
              <Button variant="outline" className="gap-2">
                Tous les projets <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="max-w-3xl mx-auto text-center glass rounded-2xl p-10 sm:p-14">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Un projet en tête<span className="gradient-text">?</span>
          </h2>
          <p className="text-muted-foreground mb-6">Discutons de votre prochaine idée et donnons-lui vie ensemble.</p>
          <Link to="/contact">
            <Button size="lg" className="gap-2">
              Parlons-en <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>
    </>
  );
};

export default Index;
