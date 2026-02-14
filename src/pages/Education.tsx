import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { getData, defaultEducation, KEYS, type Education as Edu } from "@/data/mock-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Education = () => {
  const education = getData<Edu>(KEYS.education, defaultEducation);

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-primary font-mono text-sm mb-2">{"// Formation"}</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold mb-12">
          Mon <span className="gradient-text">parcours</span>
        </motion.h1>

        <div className="relative">
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />
          <div className="space-y-10">
            {education.map((edu, i) => (
              <motion.div key={edu.id} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.1 }}
                className="relative pl-12">
                <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-secondary border border-border flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-primary" />
                </div>
                <div className="glass rounded-xl p-6">
                  <span className="text-xs text-primary font-mono">{edu.period}</span>
                  <h3 className="text-lg font-display font-semibold mt-1">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{edu.school}</p>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
