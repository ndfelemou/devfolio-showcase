import { useState } from "react";
import { Save } from "lucide-react";
import { getProfile, setProfile, type Profile } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminProfile = () => {
  const { toast } = useToast();
  const [form, setForm] = useState<Profile>(getProfile);

  const handleSave = () => {
    setProfile(form);
    toast({ title: "Profil mis à jour !" });
  };

  const f = (key: keyof Profile, val: string) => setForm({ ...form, [key]: val });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Profil</h1>
        <Button onClick={handleSave} size="sm" className="gap-1"><Save className="w-4 h-4" /> Enregistrer</Button>
      </div>
      <div className="glass rounded-xl p-6 max-w-2xl space-y-4">
        <Input placeholder="Nom" value={form.name} onChange={(e) => f("name", e.target.value)} />
        <Input placeholder="Titre" value={form.title} onChange={(e) => f("title", e.target.value)} />
        <Textarea placeholder="Bio" rows={4} value={form.bio} onChange={(e) => f("bio", e.target.value)} />
        <Input placeholder="Email" value={form.email} onChange={(e) => f("email", e.target.value)} />
        <Input placeholder="Téléphone" value={form.phone} onChange={(e) => f("phone", e.target.value)} />
        <Input placeholder="Localisation" value={form.location} onChange={(e) => f("location", e.target.value)} />
        <Input placeholder="GitHub URL" value={form.github} onChange={(e) => f("github", e.target.value)} />
        <Input placeholder="LinkedIn URL" value={form.linkedin} onChange={(e) => f("linkedin", e.target.value)} />
      </div>
    </div>
  );
};

export default AdminProfile;
