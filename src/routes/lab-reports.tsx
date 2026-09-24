import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { FileText, Loader2 } from "lucide-react";

import { Nav } from "@/components/site/Nav";
import { Reveal } from "@/components/site/Reveal";
import { listLabReportsFn, getLabReportFileFn } from "@/lib/lab-reports";

const TITLE = "Daily Lab Reports | Welwhite";
const DESCRIPTION =
  "Daily milk quality lab reports from Welwhite, published for full transparency.";

export const Route = createFileRoute("/lab-reports")({
  component: LabReportsPage,
  head: () => ({
    meta: [{ title: TITLE }, { name: "description", content: DESCRIPTION }],
  }),
});

function formatDisplayDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y ?? 1970, (m ?? 1) - 1, d ?? 1)).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function LabReportsPage() {
  const [dates, setDates] = useState<string[] | null>(null);
  const [today, setToday] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loadingList, setLoadingList] = useState(true);
  const [loadingFile, setLoadingFile] = useState(false);
  const [listError, setListError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await listLabReportsFn();
        const result: { dates: string[]; today: string } = await res.json();
        if (cancelled) return;
        setDates(result.dates);
        setToday(result.today);
        setSelected(result.dates.includes(result.today) ? result.today : (result.dates[0] ?? null));
      } catch {
        if (!cancelled)
          setListError("Couldn't load lab reports right now. Please try again shortly.");
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!selected) return;
    let cancelled = false;
    setLoadingFile(true);
    setFileError(null);
    (async () => {
      try {
        const res = await getLabReportFileFn({ data: { date: selected } });
        if (!res.ok) throw new Error("not found");
        const blob = await res.blob();
        if (cancelled) return;
        setBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
      } catch {
        if (!cancelled) setFileError("Couldn't load that report.");
      } finally {
        if (!cancelled) setLoadingFile(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [selected]);

  useEffect(() => {
    return () => {
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [blobUrl]);

  const hasToday = !!(dates && today && dates.includes(today));
  const olderDates = (dates ?? []).filter((d) => d !== selected);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="pt-28 pb-20 sm:pt-32 lg:pt-40">
        <section className="mx-auto max-w-5xl px-6 sm:px-8 lg:px-10">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow eyebrow-rule eyebrow-rule-center justify-center text-gold">
              Transparency
            </p>
            <h1 className="mt-4 text-[1.85rem] leading-[1.12] text-primary sm:text-4xl md:text-[3.1rem]">
              Daily Lab Reports
            </h1>
            <p className="mt-5 text-[0.975rem] leading-relaxed text-muted-foreground sm:text-lg">
              We test our milk daily and publish the results here — see exactly what's in every
              bottle.
            </p>
          </Reveal>

          <div className="mt-14 lg:mt-16">
            {loadingList && (
              <div className="flex items-center justify-center gap-2 py-16 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin" /> Loading reports…
              </div>
            )}

            {!loadingList && listError && (
              <p className="rounded-2xl border border-border/70 bg-cream-soft p-8 text-center text-sm text-muted-foreground">
                {listError}
              </p>
            )}

            {!loadingList && !listError && !hasToday && (
              <div className="card-fine rounded-2xl p-8 text-center sm:p-10">
                <FileText className="mx-auto h-8 w-8 text-gold" strokeWidth={1.5} />
                <p className="mt-4 text-lg text-primary">No report published yet today</p>
                <p className="mt-2 text-sm text-muted-foreground">Please check back soon.</p>
              </div>
            )}

            {!loadingList && !listError && selected && (
              <div className="card-fine overflow-hidden rounded-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 bg-cream-soft/60 px-6 py-4">
                  <p className="text-sm font-medium text-primary">
                    {selected === today ? "Today's report — " : "Report — "}
                    {formatDisplayDate(selected)}
                  </p>
                  {blobUrl && (
                    <a
                      href={blobUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium uppercase tracking-wide text-gold hover:text-primary"
                    >
                      Open in new tab
                    </a>
                  )}
                </div>
                <div className="h-[70vh] min-h-[420px] bg-muted">
                  {loadingFile && (
                    <div className="flex h-full items-center justify-center gap-2 text-muted-foreground">
                      <Loader2 className="h-5 w-5 animate-spin" /> Loading PDF…
                    </div>
                  )}
                  {!loadingFile && fileError && (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      {fileError}
                    </div>
                  )}
                  {!loadingFile && !fileError && blobUrl && (
                    <iframe
                      title={`Lab report ${selected}`}
                      src={blobUrl}
                      className="h-full w-full"
                    />
                  )}
                </div>
              </div>
            )}

            {olderDates.length > 0 && (
              <div className="mt-10">
                <p className="eyebrow text-muted-foreground">Past week</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {olderDates.map((d) => (
                    <li key={d}>
                      <button
                        type="button"
                        onClick={() => setSelected(d)}
                        className="rounded-full border border-border/70 bg-cream-soft px-4 py-2 text-xs font-medium text-primary transition-colors hover:border-gold/40 hover:bg-gold/5"
                      >
                        {formatDisplayDate(d)}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
