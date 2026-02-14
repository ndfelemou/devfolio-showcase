import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { getData, defaultExperiences, KEYS, type Experience as Exp } from "@/data/mock-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Experience = () => {
  const experiences = getData<Exp>(KEYS.experiences, defaultExperiences);

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-primary font-mono text-sm mb-2">{"// Expérience"}</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold mb-12">
          Parcours <span className="gradient-text">professionnel</span>
        </motion.h1>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div key={exp.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="relative pl-12">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <Briefcase className="w-4 h-4 text-primary" />
                </div>
                <div className="glass rounded-xl p-6">
                  <span className="text-xs text-primary font-mono">{exp.period}</span>
                  <h3 className="text-lg font-display font-semibold mt-1">{exp.role}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{exp.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((t) => (
                      <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
