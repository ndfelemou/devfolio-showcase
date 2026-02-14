import { useState } from "react";
import { Plus, Edit } from "lucide-react";
import { getData, setData, defaultEducation, KEYS, generateId, type Education } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

const AdminEducation = () => {
  const [items, setItems] = useState(() => getData<Education>(KEYS.education, defaultEducation));
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Education>>({});

  const save = (data: Education[]) => { setItems(data); setData(KEYS.education, data); };

  const handleSave = () => {
    const edu = { ...form, id: editId || generateId() } as Education;
    save(editId ? items.map((i) => (i.id === editId ? edu : i)) : [...items, edu]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Formation</h1>
        <Button onClick={() => { setForm({}); setEditId(null); setOpen(true); }} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Diplôme</TableHead><TableHead>Établissement</TableHead><TableHead>Période</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="font-medium">{e.degree}</TableCell>
                <TableCell className="text-muted-foreground">{e.school}</TableCell>
                <TableCell className="text-muted-foreground">{e.period}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button onClick={() => { setForm(e); setEditId(e.id); setOpen(true); }} className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                    <DeleteConfirmDialog onConfirm={() => save(items.filter((i) => i.id !== e.id))} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editId ? "Modifier" : "Ajouter"} une formation</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Diplôme" value={form.degree || ""} onChange={(e) => setForm({ ...form, degree: e.target.value })} />
            <Input placeholder="Établissement" value={form.school || ""} onChange={(e) => setForm({ ...form, school: e.target.value })} />
            <Input placeholder="Période" value={form.period || ""} onChange={(e) => setForm({ ...form, period: e.target.value })} />
            <Textarea placeholder="Description" value={form.description || ""} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <Button onClick={handleSave} className="w-full">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminEducation;
