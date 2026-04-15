import { useState } from "react";
import { Plus, Edit } from "lucide-react";
import { getData, setData, defaultBlogPosts, KEYS, generateId, type BlogPost } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

const AdminBlog = () => {
  const [items, setItems] = useState(() => getData<BlogPost>(KEYS.blog, defaultBlogPosts));
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const save = (data: BlogPost[]) => { 
    setItems(data); 
    setData(KEYS.blog, data); 
  };

  // Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSave = () => {
    const post = { ...form, id: editId || generateId(), tags: form.tags || [], date: form.date || new Date().toISOString().split("T")[0] } as BlogPost;
    const newItems = editId ? items.map((i) => (i.id === editId ? post : i)) : [post, ...items];
    save(newItems);
    if (!editId) setCurrentPage(1);
    setOpen(false);
  };

  const handleDelete = (id: string) => {
    const newItems = items.filter((i) => i.id !== id);
    save(newItems);
    const newTotalPages = Math.ceil(newItems.length / itemsPerPage);
    if (currentPage > newTotalPages && newTotalPages > 0) {
      setCurrentPage(newTotalPages);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Blog</h1>
        <Button onClick={() => { setForm({ tags: [] }); setEditId(null); setOpen(true); }} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>

      <div className="space-y-4">
        <div className="glass rounded-xl overflow-hidden">
          <Table>
            <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Date</TableHead><TableHead>Tags</TableHead><TableHead className="w-24 text-right">Actions</TableHead></TableRow></TableHeader>
            <TableBody>
              {paginatedItems.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell className="text-muted-foreground whitespace-nowrap">{new Date(p.date).toLocaleDateString("fr-FR")}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{p.tags.join(", ")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => { setForm(p); setEditId(p.id); setOpen(true); }} className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                      <DeleteConfirmDialog onConfirm={() => handleDelete(p.id)} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow><TableCell colSpan={4} className="text-center p-8 text-muted-foreground">Aucun article trouvé. Ajoutez votre premier article !</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, items.length)} sur {items.length} articles
            </p>
            <Pagination className="w-auto mx-0">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={(e) => { e.preventDefault(); goToPage(currentPage - 1); }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i + 1} className="hidden sm:inline-block">
                    <PaginationLink 
                      onClick={(e) => { e.preventDefault(); goToPage(i + 1); }}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext 
                    onClick={(e) => { e.preventDefault(); goToPage(currentPage + 1); }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
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
