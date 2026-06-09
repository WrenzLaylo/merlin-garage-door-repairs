// Generates the favicon/icon set and branded social cards from the selected favicon artwork.
// Deterministic rasterization with sharp — no API key required.
//   node scripts/gen-favicons.mjs
import sharp from "sharp";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, resolve } from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const pub = resolve(__dirname, "..", "public");
const sourcePngPath = join(pub, "favicon-source.png");
const sourceSvgPath = join(pub, "favicon-mark.svg");
const hasSourcePng = existsSync(sourcePngPath);
const iconSource = hasSourcePng ? readFileSync(sourcePngPath) : readFileSync(sourceSvgPath);
const sourceOptions = hasSourcePng ? {} : { density: 384 };

const BRAND = "#66C42B";
const ACCENT = "#E64833";
const INK = "#111111";
const MUTED = "#444444";
const CANVAS = "#F9FAFB";

// ── Icon set ────────────────────────────────────────────────
async function png(size, out) {
  const buf = await sharp(iconSource, sourceOptions)
    .resize(size, size, { fit: "cover", position: "center" })
    .png()
    .toBuffer();
  writeFileSync(join(pub, out), buf);
  return buf;
}

// Minimal ICO writer: wraps a PNG-encoded 32×32 image in an ICO container.
function writeIco(pngBuf, size, out) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(1, 4); // image count
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size % 256, 0); // width (0 = 256)
  entry.writeUInt8(size % 256, 1); // height
  entry.writeUInt8(0, 2); // palette
  entry.writeUInt8(0, 3); // reserved
  entry.writeUInt16LE(1, 4); // color planes
  entry.writeUInt16LE(32, 6); // bits per pixel
  entry.writeUInt32LE(pngBuf.length, 8); // image size
  entry.writeUInt32LE(header.length + entry.length, 12); // offset
  writeFileSync(join(pub, out), Buffer.concat([header, entry, pngBuf]));
}

async function iconDataUri(size) {
  const mark = await sharp(iconSource, sourceOptions)
    .resize(size, size, { fit: "cover", position: "center" })
    .png()
    .toBuffer();
  return `data:image/png;base64,${mark.toString("base64")}`;
}

async function socialMarkDataUri() {
  return iconDataUri(250);
}

async function logoPng() {
  const markHref = await iconDataUri(96);
  const logo = `<svg xmlns="http://www.w3.org/2000/svg" width="540" height="116" viewBox="0 0 540 116">
  <image href="${markHref}" x="3" y="10" width="96" height="96" preserveAspectRatio="xMidYMid slice"/>
  <text x="116" y="48" font-family="Montserrat, Inter, Arial, sans-serif" font-weight="800" font-size="31" fill="#111111">Merlin Garage Door</text>
  <text x="116" y="83" font-family="Montserrat, Inter, Arial, sans-serif" font-weight="800" font-size="31" fill="${BRAND}">Repairs</text>
  <text x="281" y="83" font-family="Montserrat, Inter, Arial, sans-serif" font-weight="700" font-size="15" letter-spacing="3" fill="#475569">POWERED BY AGG DOORS</text>
</svg>`;
  const buf = await sharp(Buffer.from(logo)).png().toBuffer();
  writeFileSync(join(pub, "site-logo.png"), buf);
  writeFileSync(join(pub, "assets", "brand", "site-logo.png"), buf);
}

// ── Social card (og-image / twitter-card) ───────────────────
async function cardSvg() {
  const markHref = await socialMarkDataUri();
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${CANVAS}"/>
  <rect x="0" y="0" width="1200" height="10" fill="${BRAND}"/>
  <rect x="0" y="620" width="1200" height="10" fill="${ACCENT}"/>
  <image href="${markHref}" x="96" y="136" width="250" height="250" preserveAspectRatio="xMidYMid slice"/>
  <text x="96" y="430" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="68" fill="${INK}">Merlin Garage Door</text>
  <text x="96" y="500" font-family="Montserrat, Arial, sans-serif" font-weight="800" font-size="68" fill="${BRAND}">Repairs <tspan fill="${INK}">Melbourne</tspan></text>
  <text x="96" y="560" font-family="Montserrat, Arial, sans-serif" font-weight="600" font-size="30" fill="${MUTED}">Same-Day &#183; 24/7 Emergency &#183; No Fix No Fee &#183; Powered by AGG Doors</text>
  <g transform="translate(360,150)">
    <text font-family="Arial, sans-serif" font-weight="800" font-size="40" fill="${ACCENT}">&#9733;&#9733;&#9733;&#9733;&#9733;</text>
    <text x="230" y="0" font-family="Montserrat, Arial, sans-serif" font-weight="700" font-size="34" fill="${INK}">4.9 / 5</text>
  </g>
</svg>`;
}

async function main() {
  await png(16, "favicon-16x16.png");
  const p32 = await png(32, "favicon-32x32.png");
  await png(180, "apple-touch-icon.png");
  await png(192, "android-chrome-192x192.png");
  await png(512, "android-chrome-512x512.png");
  writeIco(p32, 32, "favicon.ico");
  await logoPng();

  const card = Buffer.from(await cardSvg());
  await sharp(card).jpeg({ quality: 88 }).toFile(join(pub, "og-image.jpg"));
  await sharp(card).webp({ quality: 88 }).toFile(join(pub, "og-image.webp"));
  await sharp(card).webp({ quality: 88 }).toFile(join(pub, "twitter-card.webp"));

  console.log(`Icons + social cards regenerated in public/ from ${hasSourcePng ? "favicon-source.png" : "favicon-mark.svg"}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
