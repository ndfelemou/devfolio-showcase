import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { LogIn, Terminal, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/admin/dashboard");
    } else {
      toast({ title: "Erreur", description: "Identifiants incorrects ou problème de connexion.", variant: "destructive" });
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
          <div className="relative">
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Mot de passe" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <Button type="submit" className="w-full gap-2"><LogIn className="w-4 h-4" /> Se connecter</Button>
        </form>
        {/* <p className="text-xs text-muted-foreground text-center mt-4">admin@portfolio.dev / admin123</p> */}
      </div>
    </div>
  );
};

export default Login;
