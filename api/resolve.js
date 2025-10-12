// /api/resolve.js
export default function handler(req, res) {
  const { id, type } = req.query;

  if (!id || !type)
    return res.status(400).json({ error: "Missing id or type" });

  let deepLink = "";
  let fallback = "";

  if (type === "homework") {
    deepLink = `elmadrasa://homework/${id}`;
    fallback = `https://elmadrasa.app/homework/${id}`;
  } else if (type === "exam") {
    deepLink = `elmadrasa://exam/${id}`;
    fallback = `https://elmadrasa.app/exam/${id}`;
  } else {
    return res.status(404).json({ error: "Unknown link type" });
  }

  // Detect platform
  const ua = req.headers["user-agent"] || "";
  const isIOS = /iPhone|iPad|iPod/i.test(ua);
  const isAndroid = /Android/i.test(ua);

  // Smart redirect
  if (isIOS || isAndroid) {
    return res.redirect(302, deepLink);
  } else {
    return res.redirect(302, fallback);
  }
}
