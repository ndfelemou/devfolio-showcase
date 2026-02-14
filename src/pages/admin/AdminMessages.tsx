import { useState } from "react";
import { Trash2, Mail, MailOpen } from "lucide-react";
import { getData, setData, defaultMessages, KEYS, type Message } from "@/data/mock-data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminMessages = () => {
  const [items, setItems] = useState(() => getData<Message>(KEYS.messages, defaultMessages));

  const save = (data: Message[]) => { setItems(data); setData(KEYS.messages, data); };
  const toggleRead = (id: string) => save(items.map((m) => (m.id === id ? { ...m, read: !m.read } : m)));

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-display font-bold">Messages</h1>
        <span className="text-sm text-muted-foreground">{items.filter((m) => !m.read).length} non lu(s)</span>
      </div>
      <div className="glass rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow><TableHead>Nom</TableHead><TableHead>Sujet</TableHead><TableHead>Date</TableHead><TableHead className="w-24">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {items.map((m) => (
              <TableRow key={m.id} className={m.read ? "opacity-60" : ""}>
                <TableCell className="font-medium">{m.name} <span className="text-muted-foreground text-xs">({m.email})</span></TableCell>
                <TableCell>{m.subject}<p className="text-xs text-muted-foreground mt-0.5">{m.message.slice(0, 60)}...</p></TableCell>
                <TableCell className="text-muted-foreground text-sm">{new Date(m.date).toLocaleDateString("fr-FR")}</TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    <button onClick={() => toggleRead(m.id)} className="p-1.5 hover:text-primary transition-colors">
                      {m.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                    </button>
                    <button onClick={() => save(items.filter((i) => i.id !== m.id))} className="p-1.5 hover:text-destructive transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminMessages;
