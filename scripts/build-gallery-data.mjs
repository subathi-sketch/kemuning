// Builds src/components/site/data/gallery.json (image list per filter + real dimensions).
// The source gallery has four filters (all / bungalows / dining / guest comment) fed by the CMS;
// the lists below were captured from the live page. Dimensions are read from the downloaded .webp headers.
//
// Usage: node scripts/build-gallery-data.mjs   (run scripts/download-subpage-assets.mjs first)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public");
const A = "/site";

const bungalows = ["villa-1", "villa-2", "room-1", "villa-3", "bath-1", "villa-5", "room-4", "garden-1", "villa-7"].map((n) => "stock/" + n);
const dining = ["breakfast-1", "food-1", "drink-1", "dinner-1", "tea-1", "breakfast-3", "food-3", "dinner-3", "drink-3"].map((n) => "stock/" + n);
// Free stock photography of Bali (Unsplash licence); credits in docs/stock-credits.md
const bali = [
  "beach-3", "aerial-1", "temple-1", "dance-2", "penjor-5", "beach-2", "ceremony-1", "garden-5", "temple-4", "aerial-3", "dance-4", "offering-1",
].map((n) => "stock/" + n);

/** Reads width/height from a WebP file (VP8, VP8L or VP8X). */
function webpSize(file) {
  const b = fs.readFileSync(file);
  if (b.toString("ascii", 0, 4) !== "RIFF" || b.toString("ascii", 8, 12) !== "WEBP") throw new Error("not webp: " + file);
  const type = b.toString("ascii", 12, 16);
  if (type === "VP8 ") return { w: b.readUInt16LE(26) & 0x3fff, h: b.readUInt16LE(28) & 0x3fff };
  if (type === "VP8L") {
    const bits = b.readUInt32LE(21);
    return { w: (bits & 0x3fff) + 1, h: ((bits >> 14) & 0x3fff) + 1 };
  }
  if (type === "VP8X") return { w: 1 + b.readUIntLE(24, 3), h: 1 + b.readUIntLE(27, 3) };
  throw new Error("unknown webp chunk " + type);
}

const entry = (rel, category) => {
  const src = `${A}/${rel}.webp`;
  const { w, h } = webpSize(path.join(PUB, src));
  return { src, w, h, category };
};

const items = {
  bungalows: bungalows.map((r) => entry(r, "bungalows")),
  dining: dining.map((r) => entry(r, "dining")),
  bali: bali.map((r) => entry(r, "bali")),
};
const out = path.join(ROOT, "src/components/site/data/gallery.json");
fs.writeFileSync(out, JSON.stringify(items, null, 2) + "\n");
console.log("wrote gallery.json:", Object.fromEntries(Object.entries(items).map(([k, v]) => [k, v.length])));
