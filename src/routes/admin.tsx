import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Lock, Loader2, UploadCloud, Trash2 } from "lucide-react";

import {
  verifyAdminPasswordFn,
  uploadLabReportFn,
  clearAllLabReportsFn,
  todayIST,
} from "@/lib/lab-reports";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [{ title: "Admin | Welwhite" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

const SESSION_KEY = "welwhite_admin_password";

function AdminPage() {
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    const cached = sessionStorage.getItem(SESSION_KEY);
    if (!cached) {
      setChecking(false);
      return;
    }
    (async () => {
      try {
        const form = new FormData();
        form.set("password", cached);
        const result = await verifyAdminPasswordFn({ data: form });
        if (result.ok) {
          setPassword(cached);
          setUnlocked(true);
        } else {
          sessionStorage.removeItem(SESSION_KEY);
        }
      } catch {
        sessionStorage.removeItem(SESSION_KEY);
      } finally {
        setChecking(false);
      }
    })();
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true);
    setLoginError(null);
    try {
      const form = new FormData();
      form.set("password", password);
      const result = await verifyAdminPasswordFn({ data: form });
      if (result.ok) {
        sessionStorage.setItem(SESSION_KEY, password);
        setUnlocked(true);
      } else {
        setLoginError("Incorrect password.");
      }
    } catch {
      setLoginError("Something went wrong. Please try again.");
    } finally {
      setLoggingIn(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm rounded-2xl border border-border/70 bg-cream-soft p-8 shadow-hairline"
        >
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl border border-gold/25 bg-gold/5">
            <Lock className="h-5 w-5 text-gold" strokeWidth={1.5} />
          </div>
          <h1 className="mt-5 text-center text-xl text-primary">Admin Access</h1>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            Enter the admin password to continue.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="mt-6 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold/50"
          />
          {loginError && <p className="mt-2 text-xs text-destructive">{loginError}</p>}
          <button
            type="submit"
            disabled={loggingIn || !password}
            className="btn-premium mt-5 w-full rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-soft hover:bg-secondary disabled:opacity-60"
          >
            {loggingIn ? "Checking…" : "Unlock"}
          </button>
        </form>
      </div>
    );
  }

  return <AdminDashboard password={password} />;
}

function AdminDashboard({ password }: { password: string }) {
  const [date, setDate] = useState(todayIST());
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );
  const [clearing, setClearing] = useState(false);
  const [clearMessage, setClearMessage] = useState<{ type: "ok" | "error"; text: string } | null>(
    null,
  );

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setUploadMessage(null);
    try {
      const form = new FormData();
      form.set("password", password);
      form.set("date", date);
      form.set("file", file);
      const result = await uploadLabReportFn({ data: form });
      if (result.ok) {
        setUploadMessage({ type: "ok", text: `Report saved for ${date}.` });
        setFile(null);
      } else {
        setUploadMessage({ type: "error", text: result.error });
      }
    } catch {
      setUploadMessage({ type: "error", text: "Upload failed. Please try again." });
    } finally {
      setUploading(false);
    }
  }

  async function handleClearAll() {
    if (!window.confirm("Delete ALL stored lab reports? This cannot be undone.")) return;
    setClearing(true);
    setClearMessage(null);
    try {
      const form = new FormData();
      form.set("password", password);
      const result = await clearAllLabReportsFn({ data: form });
      setClearMessage(
        result.ok
          ? { type: "ok", text: "All reports cleared." }
          : { type: "error", text: result.error },
      );
    } catch {
      setClearMessage({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setClearing(false);
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-xl">
        <h1 className="text-2xl text-primary">Lab Reports Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Upload today's lab report, or clear everything stored.
        </p>

        <form onSubmit={handleUpload} className="card-fine mt-8 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg text-primary">Upload Report</h2>
          <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-2 w-full rounded-xl border border-input bg-background px-4 py-2.5 text-sm text-foreground outline-none focus:border-gold/50"
          />
          <label className="mt-5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            PDF File
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-2 block w-full text-sm text-foreground file:mr-4 file:rounded-xl file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
          />
          {uploadMessage && (
            <p
              className={`mt-4 text-sm ${uploadMessage.type === "ok" ? "text-leaf" : "text-destructive"}`}
            >
              {uploadMessage.text}
            </p>
          )}
          <button
            type="submit"
            disabled={uploading || !file}
            className="btn-premium mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow-soft hover:bg-secondary disabled:opacity-60"
          >
            <UploadCloud className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </form>

        <div className="card-fine mt-8 rounded-2xl p-6 sm:p-8">
          <h2 className="text-lg text-primary">Danger Zone</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Removes every stored report. Use this to start fresh (e.g. weekly cleanup).
          </p>
          {clearMessage && (
            <p
              className={`mt-3 text-sm ${clearMessage.type === "ok" ? "text-leaf" : "text-destructive"}`}
            >
              {clearMessage.text}
            </p>
          )}
          <button
            type="button"
            onClick={handleClearAll}
            disabled={clearing}
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-destructive/40 px-5 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/5 disabled:opacity-60"
          >
            <Trash2 className="h-4 w-4" />
            {clearing ? "Clearing…" : "Clear All Reports"}
          </button>
        </div>
      </div>
    </div>
  );
}
