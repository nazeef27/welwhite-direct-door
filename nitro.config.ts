import { defineConfig } from "nitro";

// Lab report PDFs uploaded by the admin. In production (Netlify) these are
// held in Netlify Blobs; locally, devStorage swaps in a plain folder on disk
// so the feature can be tested without any Netlify account/setup.
//
// NOTE: @lovable.dev/vite-tanstack-config only runs the nitro() vite plugin
// (which reads this file and actually mounts these drivers) during
// `vite build`, not `vite dev`/`npm run dev` — confirmed by testing. In plain
// dev mode, storage silently falls back to an unmounted in-memory store,
// where uploads/reads *appear* to work but clear() is a no-op (unstorage's
// clear() only clears a real mount, not an unmounted key-prefixed fallback).
// To actually test storage behavior locally: `npm run build` then
// `node .output/server/index.mjs` directly (NOT `vite preview` — its
// preview server expects a different output layout than nitro produces
// here). Real end-to-end verification still needs an actual Netlify Deploy
// Preview, since only that environment can reach the real netlify-blobs
// driver.
export default defineConfig({
  storage: {
    "lab-reports": { driver: "netlify-blobs", name: "lab-reports" },
  },
  devStorage: {
    "lab-reports": { driver: "fs", base: "./.data/lab-reports" },
  },
});
