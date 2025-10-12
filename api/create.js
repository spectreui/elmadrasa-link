// api/create.js
import { nanoid } from "nanoid";
import { saveLink } from "../lib/store.js";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const data = req.body;
    if (!data) return res.status(400).json({ error: "Missing payload" });

    const id = nanoid(8);
    saveLink(id, data);

    res.status(200).json({
      id,
      shortUrl: `https://elmadrasa-link.vercel.app/api/l/${id}`
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Server error" });
  }
}
