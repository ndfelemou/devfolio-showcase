import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { getData, setData, defaultBlogPosts, KEYS, generateId, type BlogPost } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminBlog = () => {
  const [items, setItems] = useState(() => getData<BlogPost>(KEYS.blog, defaultBlogPosts));
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  const save = (data: BlogPost[]) => { setItems(data); setData(KEYS.blog, data); };

  const handleSave = () => {
    const post = { ...form, id: editId || generateId(), tags: form.tags || [], date: form.date || new Date().toISOString().split("T")[0] } as BlogPost;
    save(editId ? items.map((i) => (i.id === editId ? post : i)) : [...items, post]);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Blog</h1>
        <Button onClick={() => { setForm({ tags: [] }); setEditId(null); setOpen(true); }} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Date</TableHead><TableHead>Tags</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.title}</TableCell>
                <TableCell className="text-muted-foreground">{new Date(p.date).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{p.tags.join(", ")}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button onClick={() => { setForm(p); setEditId(p.id); setOpen(true); }} className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => save(items.filter((i) => i.id !== p.id))} className="p-1.5 hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editId ? "Modifier" : "Ajouter"} un article</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Titre" value={form.title || ""} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <Textarea placeholder="Extrait" value={form.excerpt || ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} />
            <Textarea placeholder="Contenu" rows={6} value={form.content || ""} onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <Input placeholder="Tags (virgules)" value={(form.tags || []).join(", ")} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((t) => t.trim()) })} />
            <Input type="date" value={form.date || ""} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            <Button onClick={handleSave} className="w-full">Enregistrer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlog;
