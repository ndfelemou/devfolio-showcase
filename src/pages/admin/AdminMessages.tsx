import { useState, useEffect } from "react";
import { Mail, MailOpen } from "lucide-react";
import { type Message } from "@/data/mock-data";
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
import { messageService } from "@/services/message.service";
import { useToast } from "@/hooks/use-toast";

const AdminMessages = () => {
  const [items, setItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await messageService.getAll();
      setItems(data || []);
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
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

  const toggleRead = async (id: string) => {
    try {
      const updated = await messageService.markAsRead(id);
      setItems(items.map((m) => (m.id === id ? updated : m)));
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await messageService.delete(id);
      const newItems = items.filter((i) => i.id !== id);
      setItems(newItems);
      
      const newTotalPages = Math.ceil(newItems.length / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      
      toast({ title: "Succès", description: "Message supprimé." });
    } catch (error: any) {
      toast({ title: "Erreur", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-display font-bold">Messages</h1>
        <div className="text-right">
          <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
            {items.filter((m) => !m.read).length} non lu(s)
          </span>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center p-12">Chargement...</div>
      ) : (
        <div className="space-y-4">
          <div className="glass rounded-xl overflow-hidden">
            <Table>
              <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Sujet</TableHead><TableHead>Date</TableHead><TableHead className="w-24 text-right">Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {paginatedItems.map((m) => (
                  <TableRow key={m.id} className={m.read ? "opacity-60" : "bg-primary/5"}>
                    <TableCell className="font-medium">{m.name} <p className="text-muted-foreground text-xs">{m.email}</p></TableCell>
                    <TableCell>
                      <span className={m.read ? "" : "font-bold"}>{m.subject}</span>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{m.message}</p>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm whitespace-nowrap">{new Date(m.date).toLocaleDateString("fr-FR")}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <button 
                          onClick={() => toggleRead(m.id)} 
                          className={`p-1.5 transition-colors ${m.read ? "text-muted-foreground hover:text-primary" : "text-primary hover:text-primary/80"}`}
                          title={m.read ? "Marquer comme non lu" : "Marquer comme lu"}
                        >
                          {m.read ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                        </button>
                        <DeleteConfirmDialog onConfirm={() => handleDelete(m.id)} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {items.length === 0 && (
                  <TableRow><TableCell colSpan={4} className="text-center p-8 text-muted-foreground">Aucun message reçu.</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Affichage de {startIndex + 1} à {Math.min(startIndex + itemsPerPage, items.length)} sur {items.length} messages
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
    </div>
  );
};

export default AdminMessages;
