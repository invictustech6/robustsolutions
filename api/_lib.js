// Shared helpers for Robust Testing Solutions enquiry endpoints.
// No secrets are hardcoded; all configuration comes from environment variables.

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map(); // best-effort, per-instance only

export function rateLimited(ip) {
  const now = Date.now();
  const rec = hits.get(ip) || { n: 0, t: now };
  if (now - rec.t > WINDOW_MS) {
    rec.n = 0;
    rec.t = now;
  }
  rec.n += 1;
  hits.set(ip, rec);
  return rec.n > MAX_PER_WINDOW;
}

export function clientIp(req) {
  const xf = req.headers["x-forwarded-for"];
  return (Array.isArray(xf) ? xf[0] : (xf || "").split(",")[0]).trim() || "unknown";
}

export async function readJson(req) {
  if (req.body && typeof req.body === "object") return req.body;
  return await new Promise((resolve) => {
    let raw = "";
    req.on("data", (c) => (raw += c));
    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validate(data, required) {
  const errors = {};
  for (const key of required) {
    if (!String(data[key] || "").trim()) errors[key] = "required";
  }
  if (data.email && !emailRe.test(String(data.email))) errors.email = "invalid";
  return errors;
}

const HIDDEN_FIELDS = new Set(["website", "turnstileToken", "cf-turnstile-response"]);

export async function verifyTurnstile(token, ip) {
  const secret = process.env.TURNSTILE_SECRET;
  if (!secret) return "not_configured";
  if (!token) return "missing";
  const body = new URLSearchParams({ secret, response: String(token) });
  if (ip && ip !== "unknown") body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!res.ok) return "failed";
  const data = await res.json();
  return data.success ? "ok" : "failed";
}

function esc(s) {
  return String(s || "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]));
}

// Attempts delivery via Resend if configured. Returns:
//   "sent"           -> email delivered
//   "not_configured" -> env vars missing (caller should return 503)
export async function deliver(subject, data) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "info@robustsolutions.in";
  const from = process.env.CONTACT_FROM; // e.g. "Robust Website <noreply@robustsolutions.in>"
  if (!apiKey || !from) return "not_configured";

  const rows = Object.entries(data)
    .filter(([k]) => !HIDDEN_FIELDS.has(k))
    .map(([k, v]) => `<tr><td style="padding:4px 10px;font-weight:600">${esc(k)}</td><td style="padding:4px 10px">${esc(v)}</td></tr>`)
    .join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: data.email || undefined,
      subject,
      html: `<h2>${esc(subject)}</h2><table style="border-collapse:collapse;font-family:sans-serif">${rows}</table>`,
    }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}`);
  return "sent";
}
