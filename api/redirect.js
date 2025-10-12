export default async function handler(req, res) {
  const path = req.url.replace(/^\/api\/redirect/, ""); // Get everything after /api/redirect
  const deeplink = `elmadrasa://${path}`; // Convert to your app's scheme

  // iOS Universal Link behavior: redirect to deep link
  // Android App Link fallback: same
  // You can optionally add a fallback URL if app not installed

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta http-equiv="refresh" content="0;url=${deeplink}" />
        <title>Opening Elmadrasa...</title>
      </head>
      <body>
        <script>
          window.location.href = "${deeplink}";
          setTimeout(() => {
            window.location.href = "https://play.google.com/store/apps/details?id=com.elmadrasa.app";
          }, 2000);
        </script>
        <p>Opening the Elmadrasa app...</p>
      </body>
    </html>
  `);
}
