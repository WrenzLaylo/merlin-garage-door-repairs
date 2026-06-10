// Post-build prerender: serves the built dist/ with Vite's preview server,
// renders the real app in headless Chromium, scrolls to trigger in-view
// reveals, then writes the fully-rendered HTML back to dist/index.html.
//
// The app still boots and re-renders on real loads (createRoot), so users get
// the live React app while crawlers, social scrapers and AI engines get full
// content in the initial HTML.
//
// Non-fatal by design: if anything fails, it logs a warning and exits 0 so the
// build/zip still completes with the normal SPA shell.
import { preview } from "vite";
import puppeteer from "puppeteer";
import { existsSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, resolve } from "path";

const root = resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const outFile = join(root, "dist", "index.html");
const PORT = 4319;

async function run() {
  if (!existsSync(outFile)) {
    console.warn("Prerender skipped: dist/index.html not found (run vite build first).");
    return;
  }

  const server = await preview({
    root,
    preview: { port: PORT, host: "127.0.0.1", strictPort: false },
  });
  const url = server.resolvedUrls?.local?.[0] ?? `http://127.0.0.1:${PORT}/`;

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 1000 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

    // Wait for the app to actually render its hero heading.
    await page.waitForSelector("#root h1", { timeout: 30000 });

    // Walk the page so IntersectionObserver-based reveals settle to visible.
    await page.evaluate(
      () =>
        new Promise((done) => {
          let y = 0;
          const step = () => {
            window.scrollTo(0, y);
            y += Math.round(window.innerHeight * 0.8);
            if (y < document.body.scrollHeight) setTimeout(step, 90);
            else {
              window.scrollTo(0, 0);
              setTimeout(done, 400);
            }
          };
          step();
        }),
    );

    const html = await page.content();

    // Sanity check: only overwrite if the render actually contains content.
    if (!html.includes("Merlin garage door") || html.length < 5000) {
      throw new Error("rendered HTML looks empty — keeping the SPA shell");
    }

    writeFileSync(outFile, html);
    console.log(`Prerendered dist/index.html (${(html.length / 1024).toFixed(1)} KB).`);
  } finally {
    await browser.close();
    await new Promise((res) => server.httpServer.close(() => res()));
  }
}

run().catch((err) => {
  console.warn("Prerender skipped:", err?.message || err);
  process.exit(0);
});
