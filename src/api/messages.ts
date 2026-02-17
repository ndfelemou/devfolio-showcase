import { createClient } from "@supabase/supabase-js";
import { VercelRequest, VercelResponse } from "@vercel/node";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);


// Fonction
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    const { name, email, subject, message } = req.body;

    const { data, error } = await supabase.from("messages").insert([{ name, email, subject, message }])

    if (error) return res.status(400).json({ error: error.message });
    return res.status(201).json({ success: true, data });
  }

  if (req.method === "GET") {
    const { data, error } = await supabase.from("messages").select("*");
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
