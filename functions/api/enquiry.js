/**
 * POST /api/enquiry — the enquiry form backend.
 *
 * What it does, in order:
 *   1. Quietly swallows bot submissions (hidden honeypot field).
 *   2. Emails the lead to the studio inbox. This is the one step that MUST
 *      succeed — if it fails the endpoint answers with an error and the browser
 *      falls back to a pre-filled mailto:, so a lead is never lost.
 *   3. Appends the lead to a Google Sheet (best effort — a Sheet outage must
 *      never cost us the enquiry).
 *   4. Sends the visitor a short confirmation email (best effort, and gated on
 *      a verified sending domain — see RESEND_FROM below).
 *
 * This file is written as a Cloudflare Pages Function (`onRequestPost`), so it
 * drops into a Pages project unchanged. The Worker entry point in
 * `worker/index.js` imports the same handler, which is what actually serves it
 * today (see wrangler.jsonc).
 *
 * Secrets (set with `npx wrangler secret put <NAME>`, never commit them):
 *   RESEND_API_KEY      required — https://resend.com/api-keys
 *   RESEND_FROM         optional — default "Davao Digital <onboarding@resend.dev>"
 *   LEAD_INBOX          optional — default "davaodigital@gmail.com"
 *   SHEET_WEBHOOK_URL   optional — Google Apps Script web app URL
 *   SHEET_WEBHOOK_SECRET optional — shared secret sent with each Sheet row
 */

const DEFAULT_FROM = "Davao Digital <onboarding@resend.dev>";
const DEFAULT_INBOX = "davaodigital@gmail.com";

/** Hard caps, so an automated flood cannot post a 10MB message body. */
const LIMITS = {
  name: 120,
  business: 160,
  email: 200,
  reach: 200,
  message: 4000,
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

/** Trim, cap, and strip control characters. */
function clean(value, max) {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "")
    .trim()
    .slice(0, max);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function looksLikeEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
}

/** Resend's shared resend.dev sender can only mail the account owner. */
function usingTestSender(from) {
  return /resend\.dev/i.test(from);
}

async function sendEmail(env, message) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Resend ${response.status}: ${detail.slice(0, 400)}`);
  }
  return response.json().catch(() => ({}));
}

/* ------------------------------- templates ------------------------------- */

function ownerEmail(lead, to) {
  const rows = [
    ["Name", lead.name],
    ["Business", lead.business],
    ["Email", lead.email],
    ["Facebook page or phone", lead.reach],
  ];

  return {
    from: lead.from,
    to: [to],
    reply_to: lead.email || undefined,
    subject: `New enquiry — ${lead.business || lead.name}`,
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#0f1220;line-height:1.6">
        <h2 style="margin:0 0 4px;font-size:19px">New website enquiry</h2>
        <p style="margin:0 0 18px;color:#5b6780">${escapeHtml(lead.receivedAt)}</p>
        <table cellpadding="0" cellspacing="0" style="border-collapse:collapse">
          ${rows
            .map(
              ([label, value]) => `
          <tr>
            <td style="padding:5px 18px 5px 0;color:#5b6780;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
            <td style="padding:5px 0;font-weight:600">${escapeHtml(value) || "—"}</td>
          </tr>`,
            )
            .join("")}
        </table>
        <p style="margin:22px 0 6px;color:#5b6780">What they need the site to do:</p>
        <blockquote style="margin:0;padding:14px 18px;background:#f4f7fb;border-left:3px solid #1e6fd9;border-radius:6px;white-space:pre-wrap">${escapeHtml(
          lead.message || "(no message)",
        )}</blockquote>
        <p style="margin:22px 0 0;color:#5b6780">
          ${lead.email ? `Reply straight to this email — it will go to ${escapeHtml(lead.email)}.` : "They did not leave an email address, so reply on Facebook or by phone."}
        </p>
      </div>
    `,
  };
}

function visitorEmail(lead) {
  return {
    from: lead.from,
    to: [lead.email],
    subject: "We got your message — Davao Digital",
    html: `
      <div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;color:#0f1220;line-height:1.65">
        <h2 style="margin:0 0 10px;font-size:19px">Salamat, ${escapeHtml(lead.name.split(" ")[0] || lead.name)}!</h2>
        <p style="margin:0 0 14px">Your enquiry reached us. Here is exactly what happens next:</p>
        <ol style="margin:0 0 16px;padding-left:20px">
          <li style="margin-bottom:6px">We reply within one business day — usually much faster.</li>
          <li style="margin-bottom:6px">We build the first version of your website, free, and send you a private link.</li>
          <li>You review it. If you love it, we launch within seven days.</li>
        </ol>
        <p style="margin:0 0 18px">You will not be asked for payment until you have approved your website.</p>
        <p style="margin:0 0 4px;color:#5b6780">Here is a copy of what you sent us:</p>
        <blockquote style="margin:0 0 20px;padding:14px 18px;background:#f4f7fb;border-left:3px solid #17bebb;border-radius:6px;white-space:pre-wrap">${escapeHtml(
          lead.message || "(no message)",
        )}</blockquote>
        <p style="margin:0;color:#5b6780">
          Davao Digital · ${escapeHtml(lead.hours)}<br />
          ${escapeHtml(lead.inbox)} · ${escapeHtml(lead.phone)}
        </p>
      </div>
    `,
  };
}

/* --------------------------------- sheet --------------------------------- */

/**
 * Fire-and-forget row append via a Google Apps Script web app (see
 * DEPLOYMENT.md for the ~15-line script). Never throws: a Sheet problem is not
 * a reason to lose an enquiry.
 */
async function logToSheet(env, lead, log) {
  if (!env.SHEET_WEBHOOK_URL) return;
  try {
    const response = await fetch(env.SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: env.SHEET_WEBHOOK_SECRET || "",
        receivedAt: lead.receivedAt,
        name: lead.name,
        business: lead.business,
        email: lead.email,
        reach: lead.reach,
        message: lead.message,
      }),
    });
    if (!response.ok) {
      log(`sheet: Apps Script returned ${response.status}`);
    }
  } catch (error) {
    log(`sheet: ${error && error.message ? error.message : error}`);
  }
}

/* -------------------------------- handler -------------------------------- */

export async function handleEnquiry(request, env, ctx) {
  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let raw;
  try {
    raw = await request.json();
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  // Honeypot. Answer 200 so the bot thinks it worked and does not retry.
  if (clean(raw.company_website, 200)) {
    return json({ ok: true });
  }

  const name = clean(raw.name, LIMITS.name);
  const business = clean(raw.business, LIMITS.business);
  const email = clean(raw.email, LIMITS.email);
  const reach = clean(raw.reach, LIMITS.reach);
  const message = clean(raw.message, LIMITS.message);

  if (!name || !business || !reach) {
    return json({ error: "missing_fields", fields: { name: !name, business: !business, reach: !reach } }, 400);
  }
  if (!looksLikeEmail(email)) {
    return json({ error: "invalid_email" }, 400);
  }

  if (!env.RESEND_API_KEY) {
    // Not configured yet. Tell the browser so it falls back to mailto:.
    return json({ error: "not_configured" }, 503);
  }

  const from = (env.RESEND_FROM || DEFAULT_FROM).trim();
  const inbox = (env.LEAD_INBOX || DEFAULT_INBOX).trim();

  const lead = {
    name,
    business,
    email,
    reach,
    message,
    from,
    inbox,
    hours: "Mon–Sat · 9AM–6PM (PHT)",
    phone: "+63 969 193 3721",
    receivedAt: new Date().toISOString(),
  };

  const log = (line) => console.log(`[enquiry] ${line}`);

  // 1. The lead notification. If this fails, the lead must not be swallowed.
  try {
    await sendEmail(env, ownerEmail(lead, inbox));
  } catch (error) {
    log(`owner email FAILED: ${error && error.message ? error.message : error}`);
    return json({ error: "email_failed", detail: "Could not send notification email." }, 502);
  }

  // 2. Best-effort extras, off the critical path.
  const extras = async () => {
    await logToSheet(env, lead, log);

    if (usingTestSender(from)) {
      // resend.dev can only deliver to the Resend account owner. Once
      // davaodigital.com is verified in Resend and RESEND_FROM is set to an
      // address on it, visitor confirmations start going out automatically.
      log("visitor confirmation skipped: still using the resend.dev test sender");
      return;
    }
    try {
      await sendEmail(env, visitorEmail(lead));
    } catch (error) {
      log(`visitor confirmation FAILED: ${error && error.message ? error.message : error}`);
    }
  };

  if (ctx && typeof ctx.waitUntil === "function") {
    ctx.waitUntil(extras());
  } else {
    await extras();
  }

  log(`sent for ${business} -> ${inbox}`);
  return json({ ok: true });
}

/* ---------------------- Cloudflare Pages Function entry ------------------- */

/** Pages Function entry point (if this project is ever moved to Pages). */
export function onRequestPost(context) {
  return handleEnquiry(context.request, context.env, {
    waitUntil: context.waitUntil ? context.waitUntil.bind(context) : undefined,
  });
}

/** A GET here means someone opened the URL in a browser. Say so, politely. */
export function onRequestGet() {
  return json({ error: "method_not_allowed", hint: "POST the enquiry form here." }, 405);
}
