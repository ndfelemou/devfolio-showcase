import { useState } from "react";
import { Plus, Edit } from "lucide-react";
import { getData, setData, defaultSkills, KEYS, generateId, type Skill } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

const AdminSkills = () => {
  const [items, setItems] = useState(() => getData<Skill>(KEYS.skills, defaultSkills));
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Skill>>({});

  const save = (data: Skill[]) => { setItems(data); setData(KEYS.skills, data); };
  const openAdd = () => { setForm({}); setEditId(null); setOpen(true); };
  const openEdit = (s: Skill) => { setForm(s); setEditId(s.id); setOpen(true); };

  const handleSave = () => {
    const skill = { ...form, id: editId || generateId(), level: Number(form.level) || 50 } as Skill;
    save(editId ? items.map((i) => (i.id === editId ? skill : i)) : [...items, skill]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Compétences</h1>
        <Button onClick={openAdd} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>
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
                    <DeleteConfirmDialog onConfirm={() => save(items.filter((i) => i.id !== s.id))} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Modifier" : "Ajouter"} une compétence</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nom" value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input placeholder="Catégorie (Frontend, Backend, etc.)" value={form.category || ""} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <Input type="number" placeholder="Niveau (0-100)" value={form.level || ""} onChange={(e) => setForm({ ...form, level: Number(e.target.value) })} />
            <Button onClick={handleSave} className="w-full">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminSkills;
