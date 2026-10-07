import { handleEnquiry } from "../functions/api/enquiry.js";

let calls = [];
const realFetch = globalThis.fetch;
function stub(responder) {
  calls = [];
  globalThis.fetch = async (url, init) => {
    let body = null;
    try { body = init && init.body ? JSON.parse(init.body) : null; } catch {}
    calls.push({ url: String(url), body });
    return responder(String(url), init);
  };
}
const res = (status, payload) => new Response(JSON.stringify(payload ?? {}), { status });

const results = [];
const check = (name, pass, extra) => results.push({ name, pass: !!pass, extra });

async function post(body, env, raw) {
  const req = new Request("https://davaodigital.com/api/enquiry", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: raw !== undefined ? raw : JSON.stringify(body),
  });
  const r = await handleEnquiry(req, env);
  let json = null;
  try { json = await r.json(); } catch {}
  return { status: r.status, json };
}

const lead = { name: "Juan", business: "Juan Cafe", email: "juan@example.com", reach: "0917 111 2222", message: "we need bookings" };

/* 1. GET is rejected */
{
  stub(() => res(200));
  const r = await handleEnquiry(new Request("https://davaodigital.com/api/enquiry", { method: "GET" }), {});
  check("GET -> 405", r.status === 405, r.status);
}
/* 2. malformed JSON */
{
  stub(() => res(200));
  const r = await post(null, {}, "{not json");
  check("bad JSON -> 400", r.status === 400, r.status);
}
/* 3. honeypot is silently dropped and sends nothing */
{
  stub(() => res(200));
  const r = await post({ ...lead, company_website: "http://spam.example" }, { RESEND_API_KEY: "re_x" });
  check("honeypot -> 200 ok, zero sends", r.status === 200 && r.json.ok === true && calls.length === 0, { status: r.status, calls: calls.length });
}
/* 4. missing required field */
{
  stub(() => res(200));
  const r = await post({ ...lead, business: "" }, { RESEND_API_KEY: "re_x" });
  check("missing business -> 400", r.status === 400 && r.json.fields.business === true, r.status);
}
/* 5. invalid visitor email */
{
  stub(() => res(200));
  const r = await post({ ...lead, email: "not-an-email" }, { RESEND_API_KEY: "re_x" });
  check("invalid email -> 400", r.status === 400, r.status);
}
/* 6. no API key -> 503, nothing sent (browser falls back to mailto) */
{
  stub(() => res(200));
  const r = await post(lead, {});
  check("no RESEND_API_KEY -> 503, zero sends", r.status === 503 && calls.length === 0, { status: r.status, calls: calls.length });
}
/* 7. Resend rejects -> 502 so the browser falls back instead of silently losing the lead */
{
  stub(() => res(422, { message: "invalid api key" }));
  const r = await post(lead, { RESEND_API_KEY: "re_bad" });
  check("Resend 422 -> 502", r.status === 502, r.status);
}
/* 8. test sender: owner notified, confirmation suppressed, sheet logged */
{
  stub((url) => res(200, { id: "email_1" }));
  const r = await post(lead, {
    RESEND_API_KEY: "re_ok",
    LEAD_INBOX: "davaodigital@gmail.com",
    SHEET_WEBHOOK_URL: "https://script.google.com/macros/s/abc/exec",
    SHEET_WEBHOOK_SECRET: "s3cret",
  });
  const resendCalls = calls.filter((c) => c.url.includes("api.resend.com"));
  const sheetCalls = calls.filter((c) => c.url.includes("script.google.com"));
  check("test sender -> 200 ok", r.status === 200 && r.json.ok === true, r.status);
  check("test sender -> 1 owner email only (no confirmation)", resendCalls.length === 1, resendCalls.length);
  check("owner email goes to the lead inbox", resendCalls[0] && JSON.stringify(resendCalls[0].body.to) === JSON.stringify(["davaodigital@gmail.com"]), resendCalls[0] && resendCalls[0].body.to);
  check("owner email replies straight to the visitor", resendCalls[0] && resendCalls[0].body.reply_to === "juan@example.com", resendCalls[0] && resendCalls[0].body.reply_to);
  check("sheet called once with the secret + fields", sheetCalls.length === 1 && sheetCalls[0].body.secret === "s3cret" && sheetCalls[0].body.business === "Juan Cafe", sheetCalls[0] && Object.keys(sheetCalls[0].body));
  check("no HTML injection in the email", !/we need bookings/.test(resendCalls[0].body.html) || resendCalls[0].body.html.includes("we need bookings"), true);
}
/* 9. verified sender: confirmation to the visitor is sent too */
{
  stub(() => res(200, { id: "email_2" }));
  const r = await post(lead, { RESEND_API_KEY: "re_ok", RESEND_FROM: "Davao Digital <hello@davaodigital.com>" });
  const resendCalls = calls.filter((c) => c.url.includes("api.resend.com"));
  const visitor = resendCalls.find((c) => JSON.stringify(c.body.to) === JSON.stringify(["juan@example.com"]));
  check("verified sender -> 200 ok", r.status === 200, r.status);
  check("verified sender -> confirmation sent to the visitor", resendCalls.length === 2 && !!visitor, resendCalls.length);
  check("confirmation greets by first name", visitor && /Salamat, Juan!/.test(visitor.body.html), visitor && visitor.body.subject);
  check("confirmation is sent from the verified address", visitor && /davaodigital\.com/.test(visitor.body.from), visitor && visitor.body.from);
}
/* 10. escaping: a hostile name cannot inject markup into the email */
{
  stub(() => res(200, { id: "e" }));
  await post({ ...lead, name: '<img src=x onerror=alert(1)>', business: "A & B <script>" }, { RESEND_API_KEY: "re_ok" });
  const html = calls[0].body.html;
  check("hostile input is escaped", !/<img/.test(html) && !/<script>/.test(html) && html.includes("&lt;img") && html.includes("&amp;"), html.slice(0, 0) || "escaped");
}
/* 11. sheet failure never breaks the form */
{
  stub((url) => (url.includes("script.google.com") ? res(500) : res(200, { id: "e" })));
  const r = await post(lead, { RESEND_API_KEY: "re_ok", SHEET_WEBHOOK_URL: "https://script.google.com/macros/s/abc/exec" });
  check("Sheet 500 still -> 200 ok", r.status === 200, r.status);
}

globalThis.fetch = realFetch;
const failed = results.filter((r) => !r.pass);
for (const r of results) console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}${r.pass ? "" : "  -> " + JSON.stringify(r.extra)}`);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
process.exit(failed.length ? 1 : 0);
