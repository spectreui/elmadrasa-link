// api/resolve/[id].js
import { getLink } from "../../../lib/store.js";

export default async function handler(req, res) {
  const { id } = req.query;
  const link = getLink(id);

  if (!link) return res.status(404).json({ error: "Link not found" });

  // This is up to you — structure it however you like.
  // Example:
  res.json({
    target: link.target, // e.g. 'homework', 'exam'
    id: link.itemId,      // optional
    url: link.url,        // optional fallback
  });
}
