import { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import { type Skill } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { skillService } from "@/services/skill.service";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminSkills = () => {
  const [items, setItems] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Skill>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await skillService.getAll();
      setItems(data || []);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openAdd = () => { setForm({ level: 50 }); setEditId(null); setOpen(true); };
  const openEdit = (s: Skill) => { setForm(s); setEditId(s.id); setOpen(true); };

  const handleSave = async () => {
    try {
      if (!user) return;
      const skillData = { 
        name: form.name || "", 
        category: form.category || "Frontend", 
        level: Number(form.level) || 50 
      } as Omit<Skill, "id">;

      if (editId) {
        const updated = await skillService.update(editId, skillData);
        setItems(items.map((i) => (i.id === editId ? updated : i)));
        toast({ title: "Succès", description: "Compétence mise à jour." });
      } else {
        const created = await skillService.create(skillData, user.id);
        setItems([...items, created]);
        toast({ title: "Succès", description: "Compétence créée." });
      }
      setOpen(false);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await skillService.delete(id);
      setItems(items.filter((i) => i.id !== id));
      toast({ title: "Succès", description: "Compétence supprimée." });
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Compétences</h1>
        <Button onClick={openAdd} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">Chargement...</div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Catégorie</TableHead><TableHead>Niveau</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium">{s.name}</TableCell>
                  <TableCell className="text-muted-foreground">{s.category}</TableCell>
                  <TableCell className="text-muted-foreground">{s.level}%</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(s)} className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                      <DeleteConfirmDialog onConfirm={() => handleDelete(s.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center p-8 text-muted-foreground">Aucune compétence trouvée.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Modifier" : "Ajouter"} une compétence</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nom" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <select 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={form.category || "Frontend"} 
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="Langages de programmation">Langages de programmation</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
            </select>
            <Input type="number" placeholder="Niveau (0-100)" value={form.level || ""} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} />
            <Button onClick={handleSave} className="w-full">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSkills;
