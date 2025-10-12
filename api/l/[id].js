// api/l/[id].js
import { getLink } from "../../../lib/store.js";

export default async function handler(req, res) {
  const { id } = req.query;
  const data = getLink(id);

  if (!data) return res.status(404).send("Link not found");

  const ua = (req.headers["user-agent"] || "").toLowerCase();
  const isiOS = /iphone|ipad|ipod/.test(ua);
  const isAndroid = /android/.test(ua);

  const fallback = data.web_fallback || "https://elmadrasa.app";

  if (isiOS && data.ios?.url) {
    return res.send(buildOpenHtml(data.ios.url, data.ios.app_store_url || fallback));
  }
  if (isAndroid && data.android?.url) {
    return res.send(buildOpenHtml(data.android.url, data.android.play_store_url || fallback));
  }

  return res.redirect(fallback);
}

function buildOpenHtml(appUrl, fallbackUrl) {
  return `
  <!doctype html>
  <html>
  <head>
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Open Elmadrasa</title>
  </head>
  <body>
    <p>Opening Elmadrasa app…</p>
    <script>
      var start = Date.now();
      location.href = ${JSON.stringify(appUrl)};
      setTimeout(function() {
        if (Date.now() - start < 1500) {
          location.href = ${JSON.stringify(fallbackUrl)};
        }
      }, 1000);
    </script>
  </body>
  </html>`;
}
