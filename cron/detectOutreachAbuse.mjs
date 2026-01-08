// cron/detectOutreachAbuse.mjs
// Runs once, calls Supabase RPC, exits.
// No loops. No polling.

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const res = await fetch(
  `${SUPABASE_URL}/rest/v1/rpc/detect_outreach_abuse`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
    },
    body: JSON.stringify({}), // p_day defaults to current_date
  }
);

const body = await res.text();

if (!res.ok) {
  console.error("RPC failed:", res.status, body);
  process.exit(1);
}

console.log("Abuse check OK:", body);
