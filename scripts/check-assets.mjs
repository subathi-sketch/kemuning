// Verifies that every /site/... asset referenced from src/ exists in public/,
// and that no referenced image lives outside the stock library or the project's own graphics.
//
// Usage: node scripts/check-assets.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(tsx?|json|css)$/.test(e.name)) files.push(p);
  }
})(path.join(ROOT, "src"));

const ALLOWED = /^\/site\/(stock\/|ornament-(light|cream)\.svg|fonts\/)/;
const missing = [];
const foreign = [];
let total = 0;
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  for (const m of text.matchAll(/\/site\/[A-Za-z0-9_./-]+\.(?:webp|svg|jpe?g|png|woff2)/g)) {
    total++;
    const rel = path.relative(ROOT, f).split(path.sep).join("/");
    if (!fs.existsSync(path.join(ROOT, "public", m[0]))) missing.push(`${m[0]}  <- ${rel}`);
    if (!ALLOWED.test(m[0])) foreign.push(`${m[0]}  <- ${rel}`);
  }
}
console.log(`checked ${total} references: ${missing.length} missing, ${foreign.length} outside the stock library`);
for (const m of missing) console.log("MISSING", m);
for (const m of foreign) console.log("FOREIGN", m);
process.exit(missing.length || foreign.length ? 1 : 0);
