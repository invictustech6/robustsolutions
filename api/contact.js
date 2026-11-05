import { readJson, validate, deliver, rateLimited, clientIp } from "./_lib.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "method_not_allowed" });
  }
  if (rateLimited(clientIp(req))) {
    return res.status(429).json({ ok: false, error: "rate_limited" });
  }

  const data = await readJson(req);
  if (data.website) return res.status(200).json({ ok: true }); // honeypot: pretend success, drop

  const errors = validate(data, ["name", "email", "phone", "message"]);
  if (Object.keys(errors).length) {
    return res.status(422).json({ ok: false, errors });
  }

  try {
    const outcome = await deliver("Website contact enquiry", data);
    if (outcome === "not_configured") {
      return res.status(503).json({ ok: false, error: "email_not_configured" });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ ok: false, error: "delivery_failed" });
  }
}
