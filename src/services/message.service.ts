import { Message, getData, setData, KEYS, defaultMessages } from "@/data/mock-data";

export const messageService = {
  async getAll() {
    return getData<Message>(KEYS.messages, defaultMessages);
  },

  async markAsRead(id: string) {
    const messages = getData<Message>(KEYS.messages, defaultMessages);
    const index = messages.findIndex(m => m.id === id);
    if (index === -1) throw new Error("Message non trouvé");
    
    messages[index] = { ...messages[index], read: true };
    setData(KEYS.messages, messages);
    return messages[index];
  },

  async delete(id: string) {
    const messages = getData<Message>(KEYS.messages, defaultMessages);
    const filtered = messages.filter(m => m.id !== id);
    setData(KEYS.messages, filtered);
  }
};
