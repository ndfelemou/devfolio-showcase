import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Terminal } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Erreur", description: "Identifiants incorrects. ", variant: "destructive" });
      // Essayez admin@portfolio.dev / admin123
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background hero-glow px-4">
      <div className="glass rounded-xl p-8 w-full max-w-md">
        <div className="flex items-center gap-2 text-primary font-display font-bold text-xl mb-6 justify-center">
          <Terminal className="w-5 h-5" />
          <span>Admin Panel</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button type="submit" className="w-full gap-2"><LogIn className="w-4 h-4" /> Se connecter</Button>
        </form>
        {/* <p className="text-xs text-muted-foreground text-center mt-4">admin@portfolio.dev / admin123</p> */}
      </div>
    </div>
  );
};

export default Login;
