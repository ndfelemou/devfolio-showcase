import { useState, useEffect } from "react";
import { Plus, Edit, ChevronLeft, ChevronRight } from "lucide-react";
import { type Project } from "@/data/mock-data";
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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  // Pagination logic
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const openAdd = () => { 
    setForm({ title: "", description: "", technologies: [], gradientIndex: Math.ceil(Math.random() * 6), category: "fullstack", origin: "perso", githubUrl: "", liveUrl: "" }); 
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
      const newItems = items.filter((i) => i.id !== id);
      setItems(newItems);
      
      // Ajuster la page courante si nécessaire
      const newTotalPages = Math.ceil(newItems.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
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
        const created = await projectService.create(projectData);
        setItems([created, ...items]);
        setCurrentPage(1); // Revenir à la première page pour voir le nouveau projet
        toast({ title: "Succès", description: "Projet créé." });
      }
      setOpen(false);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const f = (key: keyof Project, val: string) => setForm({ ...form, [key]: val });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Projets</h1>
        <Button onClick={openAdd} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>
      
      {loading ? (
        <div className="flex justify-center p-12">Chargement...</div>
      ) : (
        <div className="space-y-4">
          <div className="glass rounded-xl overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Titre</TableHead><TableHead>Catégorie</TableHead><TableHead>Technologies</TableHead><TableHead className="w-24 text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {paginatedItems.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.title}</TableCell>
                    <TableCell className="capitalize text-muted-foreground">{p.category}</TableCell>
                    <TableCell className="text-muted-foreground text-sm">{p.technologies.join(", ")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
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

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, items.length)} sur {items.length} projets
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
