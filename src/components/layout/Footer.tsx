import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border bg-card/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <Link to="/" className="flex items-center gap-2 text-primary font-display font-bold text-xl mb-3">
            <Terminal className="w-5 h-5" />
            <span>Nyankoye Daniel Félémou</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            Développeur Full Stack passionné par les technologies web modernes.
          </p>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-foreground">Navigation</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            {["Accueil", "Projets", "Compétences", "Contact"].map((l) => (
              <Link key={l} to={`/${l === "Accueil" ? "" : l.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`} className="text-muted-foreground hover:text-primary transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-display font-semibold mb-3 text-foreground">Réseaux</h4>
          <div className="flex gap-3">
            {[
              { icon: Github, href: "#" },
              { icon: Linkedin, href: "#" },
              { icon: Mail, href: "mailto:daniel@felemou.dev" },
            ].map(({ icon: Icon, href }, i) => (
              <a key={i} href={href} className="p-2 rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors">
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Nyankoye Daniel Félémou. Tous droits réservés.
      </div>
    </div>
  </footer>
);

export default Footer;
