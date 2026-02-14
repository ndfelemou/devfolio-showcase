import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Github, Linkedin, Download } from "lucide-react";
import { getProfile } from "@/data/mock-data";
import { Button } from "@/components/ui/button";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const About = () => {
  const profile = getProfile();

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
          <motion.p variants={fadeUp} className="text-primary font-mono text-sm mb-2">{"// À propos"}</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold mb-8">
            Qui suis-je<span className="gradient-text">?</span>
          </motion.h1>

          <div className="grid md:grid-cols-5 gap-10">
            <motion.div variants={fadeUp} className="md:col-span-3 space-y-4 text-muted-foreground leading-relaxed">
              <p>{profile.bio}</p>
              <p>Je suis constamment à la recherche de nouveaux défis techniques et j'aime travailler sur des projets qui ont un impact réel. Mon approche combine rigueur technique et sensibilité design.</p>
              <p>En dehors du code, je contribue à des projets open source, j'écris des articles techniques et je participe à des meetups de développeurs.</p>
              <Button variant="outline" className="gap-2 mt-4">
                <Download className="w-4 h-4" /> Télécharger mon CV
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="md:col-span-2 glass rounded-xl p-6 space-y-4 h-fit">
              <h3 className="font-display font-semibold text-lg mb-4">Informations</h3>
              {[
                { icon: MapPin, label: profile.location },
                { icon: Mail, label: profile.email },
                { icon: Phone, label: profile.phone },
                { icon: Github, label: "GitHub" },
                { icon: Linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, label }, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-muted-foreground">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
