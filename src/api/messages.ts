import { VercelRequest, VercelResponse } from "@vercel/node";

// API désactivée pour utiliser des données locales statiques
export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === "POST") {
    // Simulation d'envoi de message (sans enregistrement)
    return res.status(201).json({ success: true, message: "Simulation réussie" });
  }

  if (req.method === "GET") {
    // Retourner une liste vide ou des données simulées
    return res.status(200).json([]);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
