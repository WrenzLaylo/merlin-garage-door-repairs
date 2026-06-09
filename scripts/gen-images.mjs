// Optional API fallback for generating the site's photographic assets with
// OpenAI gpt-image-1. The list of images, prompts, paths and sizes is read
// from public/assets/image-requests.json — the SAME manifest Hermes uses — so
// the two generators never drift.
//
//   1. Put your key in .env.local:   OPENAI_API_KEY=sk-...
//   2. node scripts/gen-images.mjs                       # generate everything
//      node scripts/gen-images.mjs hero-bg.jpg service-merlin-repair.webp
//
// Prefer Hermes (image_gen) for generation; this script exists only as a
// keyed fallback. The key is read from the environment, never written to the repo.
import OpenAI from "openai";
import sharp from "sharp";
import { existsSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, resolve, basename } from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const root = resolve(__dirname, "..");
const manifestPath = join(root, "public", "assets", "image-requests.json");

const manifest = JSON.parse(readFileSync(manifestPath, "utf-8"));
const STYLE = manifest.style || "";

// Load OPENAI_API_KEY from .env.local / .env if not already in the environment.
for (const f of [".env.local", ".env"]) {
  const p = join(root, f);
  if (!process.env.OPENAI_API_KEY && existsSync(p)) {
    for (const line of readFileSync(p, "utf-8").split(/\r?\n/)) {
      const m = line.match(/^\s*OPENAI_API_KEY\s*=\s*(.+?)\s*$/);
      if (m) process.env.OPENAI_API_KEY = m[1].replace(/^["']|["']$/g, "");
    }
  }
}

if (!process.env.OPENAI_API_KEY) {
  console.error(
    "Missing OPENAI_API_KEY. Add it to .env.local (OPENAI_API_KEY=sk-...) or set it in your shell.\n" +
      "Tip: you can generate these images with Hermes instead — no key required.",
  );
  process.exit(1);
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const GEN_SIZE = { landscape: "1536x1024", portrait: "1024x1536", square: "1024x1024" };

async function generate(item) {
  const outRel = item.path.replace(/^public[\\/]/, "");
  console.log(`• ${item.filename} → ${item.path} ...`);
  const res = await openai.images.generate({
    model: "gpt-image-1",
    prompt: `${item.prompt} ${STYLE}`.trim(),
    size: GEN_SIZE[item.aspect_ratio] || "1536x1024",
    n: 1,
  });
  const raw = Buffer.from(res.data[0].b64_json, "base64");
  let img = sharp(raw).resize(item.width, item.height, { fit: "cover" });
  img = item.format === "jpg" ? img.jpeg({ quality: 84 }) : img.webp({ quality: 82 });
  await img.toFile(join(root, "public", outRel));
  console.log(`  saved ${outRel}`);
}

async function main() {
  const args = process.argv.slice(2);
  const wanted = args.length
    ? manifest.images.filter((i) => args.includes(i.filename) || args.includes(basename(i.path)))
    : manifest.images;

  if (wanted.length === 0) {
    console.warn(`No matching images. Valid filenames: ${manifest.images.map((i) => i.filename).join(", ")}`);
    return;
  }

  for (const item of wanted) {
    try {
      await generate(item);
    } catch (err) {
      console.error(`  failed ${item.filename}:`, err?.message || err);
    }
  }
  console.log("Done. Review the new images in public/, then run: npm run build");
}

main();
