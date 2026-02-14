import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getData, setData, defaultExperiences, KEYS, generateId, type Experience } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminExperiences = () => {
  const [items, setItems] = useState(() => getData<Experience>(KEYS.experiences, defaultExperiences));
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Experience>>({});

  const save = (data: Experience[]) => { setItems(data); setData(KEYS.experiences, data); };

  const handleSave = () => {
    const exp = { ...form, id: editId || generateId(), technologies: form.technologies || [] } as Experience;
    save(editId ? items.map((i) => (i.id === editId ? exp : i)) : [...items, exp]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Expériences</h1>
        <Button onClick={() => { setForm({ technologies: [] }); setEditId(null); setOpen(true); }} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Poste</TableHead><TableHead>Entreprise</TableHead><TableHead>Période</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.role}</TableCell>
                <TableCell className="text-muted-foreground">{e.company}</TableCell>
                <TableCell className="text-muted-foreground">{e.period}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button onClick={() => { setForm(e); setEditId(e.id); setOpen(true); }} className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => save(items.filter((i) => i.id !== e.id))} className="p-1.5 hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Modifier" : "Ajouter"} une expérience</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Poste" value={form.role || ""} onChange={(e) => setForm({ ...form, role: e.target.value })} />
            <Input placeholder="Entreprise" value={form.company || ""} onChange={(e) => setForm({ ...form, company: e.target.value })} />
            <Input placeholder="Période" value={form.period || ""} onChange={(e) => setForm({ ...form, period: e.target.value })} />
            <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Input placeholder="Technologies (virgules)" value={(form.technologies || []).join(", ")} onChange={(e) => setForm({ ...form, technologies: e.target.value.split(",").map((t) => t.trim()) })} />
            <Button onClick={handleSave} className="w-full">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminExperiences;
