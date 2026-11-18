// Public form config only. Never returns secrets.
export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ ok: false });
  }
  res.setHeader("Cache-Control", "no-store");
  return res.status(200).json({
    turnstileSiteKey: process.env.TURNSTILE_SITE_KEY || "",
  });
}
