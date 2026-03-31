import { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import { type Project } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import { projectService } from "@/services/project.service";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const AdminProjects = () => {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});
  const { user } = useAuth();
  const { toast } = useToast();

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setItems(data || []);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const openAdd = () => { 
    setForm({ technologies: [], gradientIndex: Math.ceil(Math.random() * 6), category: "fullstack", origin: "perso" }); 
    setEditId(null); 
    setOpen(true); 
  };
  
  const openEdit = (p: Project) => { 
    setForm(p); 
    setEditId(p.id); 
    setOpen(true); 
  };

  const handleDelete = async (id: string) => {
    try {
      await projectService.delete(id);
      setItems(items.filter((i) => i.id !== id));
      toast({ title: "Succès", description: "Projet supprimé." });
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const handleSave = async () => {
    try {
      if (!user) return;
      
      const projectData = {
        ...form,
        technologies: form.technologies || [],
        gradientIndex: form.gradientIndex || 1,
        category: (form.category as any) || "fullstack",
        origin: (form.origin as any) || "perso"
      } as Omit<Project, "id">;

      if (editId) {
        const updated = await projectService.update(editId, projectData);
        setItems(items.map((i) => (i.id === editId ? updated : i)));
        toast({ title: "Succès", description: "Projet mis à jour." });
      } else {
        const created = await projectService.create(projectData, user.id);
        setItems([created, ...items]);
        toast({ title: "Succès", description: "Projet créé." });
      }
      setOpen(false);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const f = (key: keyof Project, val: string) => setForm({ ...form, [key]: val });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Projets</h1>
        <Button onClick={openAdd} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">Chargement...</div>
      ) : (
        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Catégorie</TableHead><TableHead>Technologies</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {items.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="capitalize text-muted-foreground">{p.category}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.technologies.join(", ")}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(p)} className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                      <DeleteConfirmDialog onConfirm={() => handleDelete(p.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center p-8 text-muted-foreground">Aucun projet trouvé. Ajoutez votre premier projet !</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editId ? "Modifier" : "Ajouter"} un projet</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Titre" value={form.title || ""} onChange={(e) => f("title", e.target.value)} />
            <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => f("description", e.target.value)} />
            <div className="grid grid-cols-2 gap-3">
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={form.category || "fullstack"} 
                onChange={(e) => f("category", e.target.value)}
              >
                <option value="frontend">Frontend</option>
                <option value="backend">Backend</option>
                <option value="fullstack">Fullstack</option>
                <option value="mobile">Mobile</option>
              </select>
              <select 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={form.origin || "perso"} 
                onChange={(e) => f("origin", e.target.value)}
              >
                <option value="perso">Personnel</option>
                <option value="entreprise">Entreprise</option>
                <option value="freelance">Freelance</option>
              </select>
            </div>
            <Input placeholder="Technologies (séparées par des virgules)" value={(form.technologies || []).join(", ")} onChange={(e) => setForm({ ...form, technologies: e.target.value.split(",").map((t) => t.trim()) })} />
            <Input placeholder="Lien GitHub" value={form.githubUrl || ""} onChange={(e) => f("githubUrl", e.target.value)} />
            <Input placeholder="Lien Live" value={form.liveUrl || ""} onChange={(e) => f("liveUrl", e.target.value)} />
            <Button onClick={handleSave} className="w-full">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProjects;
