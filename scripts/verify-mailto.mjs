/** Quick sanity check for mail links — run: node scripts/verify-mailto.mjs */

function buildMailtoHref(to, subject, body) {
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildGmailComposeHref(to, subject, body) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to, su: subject, body });
  return `https://mail.google.com/mail/?${params.toString()}`;
}

const body = [
  "Name: Test User",
  "Company: Acme Corp",
  "Email: test@acme.in",
  "Focus: AI automation & agents",
  "",
  "Workflow:",
  "my name isb chai hguinj jkh nlhj ojji iknyuj",
].join("\n");

const subject = "Enquiry — Acme Corp";
const mailto = buildMailtoHref("garvailabs@gmail.com", subject, body);
const gmail = buildGmailComposeHref("garvailabs@gmail.com", subject, body);

const checks = [
  ["mailto starts correctly", mailto.startsWith("mailto:garvailabs@gmail.com?")],
  ["mailto encodes subject", mailto.includes("subject=Enquiry%20%E2%80%94%20Acme%20Corp")],
  ["gmail uses mail.google.com", gmail.startsWith("https://mail.google.com/mail/?")],
  ["gmail includes recipient", gmail.includes("to=garvailabs%40gmail.com")],
  ["gmail includes body", gmail.includes("body=Name%3A%20Test%20User")],
  ["mailto under 2048 chars", mailto.length <= 2048],
];

let failed = 0;
for (const [name, ok] of checks) {
  console.log(ok ? "✓" : "✗", name);
  if (!ok) failed++;
}

console.log("mailto length:", mailto.length);
console.log("gmail length:", gmail.length);
process.exit(failed ? 1 : 0);
