import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { generateId, getProfile } from "@/data/mock-data";
import { useToast } from "@/hooks/use-toast";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { defaultMessages, Message } from '../data/messages';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

const Contact = () => {
  const profile = getProfile();
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    // Implementation de la fonctionnalites de dev
    emailjs
      .sendForm(
        "devFolio_showCase",
        "template_v6icdwv",
        e.currentTarget,
        "gEbsB3iLkbOelP2RV",
      )
      .then(
        () => {

          try {
            // Implementation et Sauvegarde local
            const newMessage: Message = {
              id: generateId(),
              ...form,
              date: new Date().toISOString(),
              read: false
            }

            defaultMessages.push(newMessage);
            console.log('Your message sended : ', newMessage);

            toast({
              title: "Message envoyé ✅",
              description: "Je vous répondrai dans les plus brefs délais.",
            });
            setForm({ name: "", email: "", subject: "", message: "" });
            setSending(false);
          } catch (error) {
            console.error(error);
            toast({
              title: "Erreur ❌",
              description: "Impossible d'envoyer le message.",
            });
            setSending(false);
          }



        },
        (error) => {
          console.error(error);
          toast({
            title: "Erreur ❌",
            description: "Impossible d'envoyer le message.",
          });
          setSending(false);
        },
      );
  };

  return (
    <section className="section-padding">
      <div className="max-w-5xl mx-auto">
        {" "}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-primary font-mono text-sm mb-2"
        >
          {" "}
          {"// Contact"}{" "}
        </motion.p>
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-display font-bold mb-12"
        >
          Me <span className="gradient-text">contacter</span>
        </motion.h1>{" "}
        <div className="grid md:grid-cols-5 gap-10">
          <motion.form
            onSubmit={handleSubmit}
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            className="md:col-span-3 space-y-4"
          >
            <motion.div variants={fadeUp}>
              <Input
                name="name"
                placeholder="Votre nom *"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </motion.div>
            <motion.div variants={fadeUp}>
              <Input
                type="email"
                name="email"
                placeholder="Votre email *"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />{" "}
            </motion.div>{" "}
            <motion.div variants={fadeUp}>
              {" "}
              <Input
                name="subject"
                placeholder="Sujet"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />{" "}
            </motion.div>{" "}
            <motion.div variants={fadeUp}>
              {" "}
              <Textarea
                name="message"
                placeholder="Votre message *"
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />{" "}
            </motion.div>{" "}
            <motion.div variants={fadeUp}>
              {" "}
              <Button
                type="submit"
                disabled={sending}
                className="gap-2 w-full sm:w-auto"
              >
                {" "}
                <Send className="w-4 h-4" />{" "}
                {sending ? "Envoi..." : "Envoyer"}{" "}
              </Button>{" "}
            </motion.div>{" "}
          </motion.form>{" "}
          {/* Bloc coordonnées (inchangé) */}{" "}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="md:col-span-2 glass rounded-xl p-6 space-y-5 h-fit"
          >
            {" "}
            <h3 className="font-display font-semibold text-lg">
              Coordonnées
            </h3>{" "}
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
          </motion.div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
};

export default Contact;
