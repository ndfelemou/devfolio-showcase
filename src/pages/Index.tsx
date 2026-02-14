import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, Code, Database, Globe } from "lucide-react";
import { getData, defaultProjects, defaultSkills, getProfile, KEYS, type Project } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" as const } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const cardHover = {
  rest: { y: 0 },
  hover: { y: -8, transition: { duration: 0.3, ease: "easeOut" as const } },
};

const Index = () => {
  const profile = getProfile();
  const projects = getData<Project>(KEYS.projects, defaultProjects).slice(0, 3);
  const skills = getData(KEYS.skills, defaultSkills);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center hero-glow overflow-hidden">
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/5"
              style={{
                width: 300 + i * 150,
                height: 300 + i * 150,
                left: `${20 + i * 25}%`,
                top: `${10 + i * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, 10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6 + i * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } } }} className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-primary font-mono text-sm mb-4">
              {"// Bonjour, je suis"}
            </motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-7xl font-display font-bold mb-4">
              {profile.name}
              <motion.span
                className="gradient-text inline-block"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >.</motion.span>
            </motion.h1>
            <motion.p variants={fadeUp} className="text-xl sm:text-2xl text-muted-foreground font-display mb-2">
              {profile.title}
            </motion.p>
            <motion.p variants={fadeUp} className="text-muted-foreground max-w-xl mb-8 leading-relaxed">
              {profile.bio}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <Link to="/projects">
                <Button size="lg" className="gap-2 group">
                  Voir mes projets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="lg">Me contacter</Button>
              </Link>
            </motion.div>
            <motion.div variants={fadeUp} className="flex gap-3 mt-8">
              {[
                { Icon: Github, href: profile.github },
                { Icon: Linkedin, href: profile.linkedin },
                { Icon: Mail, href: `mailto:${profile.email}` },
              ].map(({ Icon, href }, i) => (
                <motion.a
                  key={i}
                  href={href}
                  className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
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
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={scaleIn}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="glass rounded-xl p-6 text-center cursor-default"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
              <motion.p
                className="text-2xl font-display font-bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
              >{value}</motion.p>
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
              <motion.div
                key={p.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                transition={{ delay: i * 0.15 }}
              >
                <motion.div initial="rest" whileHover="hover" variants={cardHover}>
                  <Link to={`/projects/${p.id}`} className="block glass rounded-xl overflow-hidden group hover:border-primary/30 transition-all duration-300">
                    <div className="aspect-video flex items-center justify-center relative overflow-hidden" style={{ background: `var(--gradient-project-${p.gradientIndex})` }}>
                      <motion.span
                        className="text-4xl font-display font-bold opacity-30"
                        whileHover={{ scale: 1.2, opacity: 0.5 }}
                        transition={{ duration: 0.3 }}
                      >{p.title[0]}</motion.span>
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
              </motion.div>
            ))}
          </div>
          <motion.div
            className="text-center mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Link to="/projects">
              <Button variant="outline" className="gap-2 group">
                Tous les projets <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={scaleIn}
          className="max-w-3xl mx-auto text-center glass rounded-2xl p-10 sm:p-14 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-primary/5"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Un projet en tête<span className="gradient-text">?</span>
            </h2>
            <p className="text-muted-foreground mb-6">Discutons de votre prochaine idée et donnons-lui vie ensemble.</p>
            <Link to="/contact">
              <Button size="lg" className="gap-2 group">
                Parlons-en <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Index;
