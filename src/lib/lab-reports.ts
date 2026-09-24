import { createServerFn } from "@tanstack/react-start";
import { useStorage } from "nitro/storage";

// Everything below runs on the server only (inside .handler() closures) — the
// TanStack Start compiler strips handler bodies, and anything only reachable
// from inside them (useStorage, process.env.ADMIN_PASSWORD), out of the
// client bundle. No special "*.server.ts" file naming needed for that.

const REPORTS_BASE = "lab-reports";
const IST_TIME_ZONE = "Asia/Kolkata";
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10MB safety cap, not a real limit
const PDF_MAGIC = "%PDF-";
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

// India has no DST, so a plain day-boundary offset from "now" plus
// IST-formatting is accurate for the recent-dates window below.
export function toIsoDateIST(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: IST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function todayIST(): string {
  return toIsoDateIST(new Date());
}

// Netlify Functions run in UTC; Welwhite is IST (UTC+5:30). Computing "today"
// from server-local time would show yesterday's date for the first ~5.5
// hours of every IST day — always compute dates in IST explicitly.
export function recentDatesIST(days = 7): string[] {
  const now = Date.now();
  const dates: string[] = [];
  for (let i = 0; i < days; i++) {
    dates.push(toIsoDateIST(new Date(now - i * 86_400_000)));
  }
  return dates;
}

export function isValidDate(value: unknown): value is string {
  return typeof value === "string" && DATE_RE.test(value);
}

function reportsStorage() {
  // Nitro's useStorage() is a server utility, not a React hook — the "use"
  // prefix just trips the react-hooks lint rule's naming heuristic.
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useStorage(REPORTS_BASE);
}

function checkPassword(password: unknown): boolean {
  const expected = process.env["ADMIN_PASSWORD"];
  return typeof expected === "string" && expected.length > 0 && password === expected;
}

function looksLikePdf(bytes: Uint8Array): boolean {
  return new TextDecoder().decode(bytes.slice(0, 5)) === PDF_MAGIC;
}

export const verifyAdminPasswordFn = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    return { ok: checkPassword(data.get("password")) };
  });

export const uploadLabReportFn = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    if (!checkPassword(data.get("password"))) {
      return { ok: false as const, error: "Incorrect password." };
    }

    const date = data.get("date");
    if (!isValidDate(date)) {
      return { ok: false as const, error: "Please choose a valid date." };
    }

    const file = data.get("file");
    if (!(file instanceof File)) {
      return { ok: false as const, error: "Please choose a PDF file." };
    }
    if (file.size === 0 || file.size > MAX_FILE_BYTES) {
      return { ok: false as const, error: "File is empty or larger than 10MB." };
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!looksLikePdf(bytes)) {
      return { ok: false as const, error: "That file doesn't look like a PDF." };
    }

    await reportsStorage().setItemRaw(date, bytes);
    return { ok: true as const };
  });

export const listLabReportsFn = createServerFn({ method: "GET" }).handler(async () => {
  const allowed = new Set(recentDatesIST(7));
  const keys = await reportsStorage().getKeys();
  const dates = keys.filter((key) => allowed.has(key)).sort((a, b) => (a < b ? 1 : -1));
  // Returned as a raw Response (not a plain object) so we can force
  // no-store — otherwise the browser can serve a stale cached GET result
  // right after an admin upload/clear, showing outdated reports.
  return new Response(JSON.stringify({ dates, today: todayIST() }), {
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
});

export const getLabReportFileFn = createServerFn({ method: "GET" })
  .validator((data: { date: string }) => data)
  .handler(async ({ data }) => {
    if (!isValidDate(data.date)) {
      return new Response("Invalid date", { status: 400 });
    }
    const bytes = await reportsStorage().getItemRaw(data.date);
    if (!bytes) {
      return new Response("Not found", { status: 404 });
    }
    return new Response(bytes, {
      headers: { "content-type": "application/pdf", "cache-control": "no-store" },
    });
  });

export const clearAllLabReportsFn = createServerFn({ method: "POST" })
  .validator((data: FormData) => data)
  .handler(async ({ data }) => {
    if (!checkPassword(data.get("password"))) {
      return { ok: false as const, error: "Incorrect password." };
    }
    await reportsStorage().clear();
    return { ok: true as const };
  });
