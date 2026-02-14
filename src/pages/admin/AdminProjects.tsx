import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getData, setData, defaultProjects, KEYS, generateId, type Project } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminProjects = () => {
  const [items, setItems] = useState(() => getData<Project>(KEYS.projects, defaultProjects));
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Project>>({});

  const save = (newItems: Project[]) => { setItems(newItems); setData(KEYS.projects, newItems); };
  const openAdd = () => { setForm({ technologies: [], gradientIndex: Math.ceil(Math.random() * 6) }); setEditId(null); setOpen(true); };
  const openEdit = (p: Project) => { setForm(p); setEditId(p.id); setOpen(true); };
  const handleDelete = (id: string) => save(items.filter((i) => i.id !== id));

  const handleSave = () => {
    const project = { ...form, id: editId || generateId(), technologies: form.technologies || [], gradientIndex: form.gradientIndex || 1 } as Project;
    save(editId ? items.map((i) => (i.id === editId ? project : i)) : [...items, project]);
    setOpen(false);
  };

  const f = (key: keyof Project, val: string) => setForm({ ...form, [key]: val });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Projets</h1>
        <Button onClick={openAdd} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>
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
                    <button onClick={() => handleDelete(p.id)} className="p-1.5 hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editId ? "Modifier" : "Ajouter"} un projet</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Titre" value={form.title || ""} onChange={(e) => f("title", e.target.value)} />
            <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => f("description", e.target.value)} />
            <Input placeholder="Catégorie (fullstack, frontend, backend)" value={form.category || ""} onChange={(e) => f("category", e.target.value)} />
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
