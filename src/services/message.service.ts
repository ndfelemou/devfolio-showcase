import supabase from "@/utils/supabase";

export const messageService = {
  async getAll() {
    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },

  async markAsRead(id: string) {
    const { data, error } = await supabase
      .from("messages")
      .update({ is_read: true })
      .eq("id", id)
      .select();
    if (error) throw error;
    return data[0];
  },

  async delete(id: string) {
    const { error } = await supabase.from("messages").delete().eq("id", id);
    if (error) throw error;
  }
};
