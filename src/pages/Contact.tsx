import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Mail, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { getData, defaultMessages, KEYS, setData, generateId, getProfile, type Message } from "@/data/mock-data";

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Contact = () => {
  const profile = getProfile();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Erreur", description: "Veuillez remplir tous les champs obligatoires.", variant: "destructive" });
      return;
    }
    setSending(true);
    setTimeout(() => {
      const messages = getData<Message>(KEYS.messages, defaultMessages);
      const newMessage: Message = { id: generateId(), ...form, date: new Date().toISOString(), read: false };
      setData(KEYS.messages, [...messages, newMessage]);
      setForm({ name: "", email: "", subject: "", message: "" });
      setSending(false);
      toast({ title: "Message envoyé !", description: "Je vous répondrai dans les plus brefs délais." });
    }, 800);
  };

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        <motion.p initial="hidden" animate="visible" variants={fadeUp} className="text-primary font-mono text-sm mb-2">{"// Contact"}</motion.p>
        <motion.h1 initial="hidden" animate="visible" variants={fadeUp} className="text-4xl sm:text-5xl font-display font-bold mb-12">
          Me <span className="gradient-text">contacter</span>
        </motion.h1>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.form onSubmit={handleSubmit} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="md:col-span-3 space-y-4">
            <motion.div variants={fadeUp}><Input placeholder="Votre nom *" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></motion.div>
            <motion.div variants={fadeUp}><Input type="email" placeholder="Votre email *" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></motion.div>
            <motion.div variants={fadeUp}><Input placeholder="Sujet" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></motion.div>
            <motion.div variants={fadeUp}><Textarea placeholder="Votre message *" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></motion.div>
            <motion.div variants={fadeUp}>
              <Button type="submit" disabled={sending} className="gap-2 w-full sm:w-auto">
                <Send className="w-4 h-4" /> {sending ? "Envoi..." : "Envoyer"}
              </Button>
            </motion.div>
          </motion.form>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="md:col-span-2 glass rounded-xl p-6 space-y-5 h-fit">
            <h3 className="font-display font-semibold text-lg">Coordonnées</h3>
            {[
              { icon: MapPin, text: profile.location },
              { icon: Mail, text: profile.email },
              { icon: Phone, text: profile.phone },
            ].map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
