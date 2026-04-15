import { useState, useEffect } from "react";
import { Plus, Edit } from "lucide-react";
import { type Experience } from "@/data/mock-data";
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
import { experienceService } from "@/services/experience.service";
import { useToast } from "@/hooks/use-toast";

const AdminExperiences = () => {
  const [items, setItems] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Experience>>({});
  const { toast } = useToast();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAll();
      setItems(data || []);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
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
    setForm({ role: "", company: "", period: "", description: "", technologies: [] }); 
    setEditId(null); 
    setOpen(true); 
  };
  
  const openEdit = (e: Experience) => { 
    setForm(e); 
    setEditId(e.id); 
    setOpen(true); 
  };

  const handleSave = async () => {
    try {
      const expData = { 
        ...form, 
        technologies: form.technologies || [] 
      } as Omit<Experience, "id">;

      if (editId) {
        const updated = await experienceService.update(editId, expData);
        setItems(items.map((i) => (i.id === editId ? updated : i)));
        toast({ title: "Succès", description: "Expérience mise à jour." });
      } else {
        const created = await experienceService.create(expData);
        setItems([created, ...items]);
        setCurrentPage(1);
        toast({ title: "Succès", description: "Expérience créée." });
      }
      setOpen(false);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await experienceService.delete(id);
      const newItems = items.filter((i) => i.id !== id);
      setItems(newItems);
      
      const newTotalPages = Math.ceil(newItems.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      toast({ title: "Succès", description: "Expérience supprimée." });
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Expériences</h1>
        <Button onClick={openAdd} size="sm" className="gap-1"><Plus className="w-4 h-4" /> Ajouter</Button>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">Chargement...</div>
      ) : (
        <div className="space-y-4">
          <div className="glass rounded-xl overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Poste</TableHead><TableHead>Entreprise</TableHead><TableHead>Période</TableHead><TableHead className="w-24 text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {paginatedItems.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-medium">{e.role}</TableCell>
                    <TableCell className="text-muted-foreground">{e.company}</TableCell>
                    <TableCell className="text-muted-foreground">{e.period}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <button onClick={() => openEdit(e)} className="p-1.5 hover:text-primary transition-colors"><Edit className="w-4 h-4" /></button>
                        <DeleteConfirmDialog onConfirm={() => handleDelete(e.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-center p-8 text-muted-foreground">Aucune expérience trouvée.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, items.length)} sur {items.length} expériences
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
