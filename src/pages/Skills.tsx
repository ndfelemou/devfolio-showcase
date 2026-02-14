import { motion } from "framer-motion";
import { getData, defaultSkills, KEYS, type Skill } from "@/data/mock-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Skills = () => {
  const skills = getData<Skill>(KEYS.skills, defaultSkills);
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-primary font-mono text-sm mb-2">{"// Compétences"}</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold mb-12">
          Stack <span className="gradient-text">technique</span>
        </motion.h1>

        <div className="space-y-10">
          {categories.map((cat, ci) => (
            <motion.div key={cat} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: ci * 0.1 }}>
              <h2 className="text-lg font-display font-semibold mb-4 text-primary">{cat}</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {skills.filter((s) => s.category === cat).map((skill) => (
                  <div key={skill.id} className="glass rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-sm">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{ background: "var(--gradient-brand)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
