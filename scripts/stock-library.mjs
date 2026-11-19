// Stock photo library (Unsplash licence: free to use, attribution appreciated).
// Every image shown on the site comes from this list; no photos are copied from the original hotel site.
//
// Usage: node scripts/stock-library.mjs        -> downloads missing files into public/site/stock/
//        (also writes docs/stock-credits.md and src/lib/stock.json)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const OUT = path.join(ROOT, "public/site/stock");
const U = "Unsplash contributor";

/** theme -> [[photo id (after "photo-"), photographer], ...] ; files are named <theme>-<n>.webp (n from 1) */
const LIBRARY = {
  villa: [
    ["1693576588461-3ad3dd88371e", "Loris Boulinguez"],
    ["1710563138874-4bac91c14e51", "Polina Kuzovkova"],
    ["1763770523213-8a2bce70579c", U],
    ["1771526087650-6c755f4e5639", "Jonathan Borba"],
    ["1526556822629-6f2c7afeb10d", "Bernard Hermant"],
    ["1668957067320-921d79368284", "Polina Kuzovkova"],
    ["1645378975326-7339786fdec3", "Sasha Kaunas"],
    ["1634671651144-adbeca8623cb", "We Do Creative Films"],
  ],
  room: [
    ["1611892440504-42a792e24d32", "visualsofdana"],
    ["1729605411476-defbdab14c54", "Antonio Araujo"],
    ["1729605412224-147d072d3667", "Antonio Araujo"],
    ["1791535767615-2fb43a41e8a8", "sidath vimukthi"],
    ["1661069540645-fda115a217ae", "Alexander Davies"],
    ["1601586404677-a2e1fc310bdf", "Dmitriy Frantsev"],
  ],
  bath: [
    ["1760564019103-81cd3c225cd1", "Meg von Haartman"],
    ["1736138282619-1a926586fd4d", "Laszlo Kiss"],
    ["1790276319878-308f169c503a", "Rosemary Media"],
  ],
  garden: [
    ["1668957065301-bc8cc8691c5f", "Polina Kuzovkova"],
    ["1681747590988-f631d177cd10", "Dian Tindaon"],
    ["1682415134352-cbc4a6b72e77", "Lovely N"],
    ["1677306341816-bb814674cd3c", U],
    ["1642070723756-6defe28609e8", "Vonita Buirski"],
    ["1586964272329-606304ad0436", "Colin Watts"],
    ["1579977338243-d5017ac698e6", "Lukas Stoermer"],
  ],
  pool: [
    ["1540541338287-41700207dee6", "Paolo Nicolello"],
    ["1571003123894-1f0594d2b5d9", "Saad Khan"],
    ["1664876080601-acf03b40c5e3", "Ayadi Ghaith"],
  ],
  beach: [
    ["1533610376401-26ad24919395", "wahyu saputra"],
    ["1609951586190-90af3296b127", "Laurentiu Morariu"],
    ["1733281120655-ecbc5885f397", "Didi Suprapta"],
    ["1546484475-7f7bd55792da", "Cassie Gallegos"],
    ["1561009226-7a820d647a40", "Melissa Cassar"],
    ["1552272492-3053fbacbf4b", U],
    ["1641524678718-166e36f52c60", "Narendra Dinata"],
    ["1759825905105-b2e089b87fc4", "Matt Johnson"],
  ],
  food: [
    ["1539755530862-00f623c00f52", "Haryo Setyadi"],
    ["1680169590313-9a14f3cd8148", "Aldino Hartan Putra"],
    ["1680674774705-90b4904b3a7f", "R Eris"],
    ["1647093953000-9065ed6f85ef", "Iosi Pratama"],
    ["1603133872878-684f208fb84b", "Christopher Alvarenga"],
  ],
  breakfast: [
    ["1728050829024-8113f4cd85ec", "Antonio Araujo"],
    ["1728051104003-aa16971b44b3", "Antonio Araujo"],
    ["1756115374220-c43b04be3a53", "Ann Kolisnyk"],
    ["1756115383455-bbc90edb4121", "Ann Kolisnyk"],
    ["1666181941657-eade2d78f3fd", "Keesha's Kitchen"],
  ],
  tea: [
    ["1532509334149-d2130d74253c", "Jelleke Vanooteghem"],
    ["1759530539862-5f8ce627d930", "Bronty Woodard"],
    ["1772369241885-8597e9405ce3", "phoebe lynch"],
  ],
  drink: [
    ["1722624072828-d31140ebdd86", "Fadi Al Shami"],
    ["1602298134483-f4f469306bf6", "Finn"],
    ["1681579289916-af960b852352", "Doğu Tuncer"],
    ["1595311229337-9b538bd7fdb4", "Fabio Sangregorio"],
    ["1707313835513-6f44e631ffc0", "sander traa"],
  ],
  dinner: [
    ["1680956986940-ae0bca0b727a", "Mark Chan"],
    ["1680956987339-38c94dea393f", "Mark Chan"],
    ["1680956987334-f068594ad200", "Mark Chan"],
    ["1707485318392-150797766d0d", "Yulia Z"],
    ["1639244132045-94c307ff4bfc", "Holger Woizick"],
  ],
  cooking: [
    ["1638446081329-aa6003de5800", "Nita Payne"],
    ["1658218615073-90d616af73d9", "Mufid Majnun"],
    ["1658218615043-26a9f739b98e", "Mufid Majnun"],
    ["1663246545361-364603f70de1", "Rafael Atantya"],
  ],
  craft: [
    ["1604973104381-870c92f10343", "Mahmur Marganti"],
    ["1610558310044-dc89b9c4b4a4", "Marco De Hevia"],
    ["1528265417219-1a288ae08573", "Paolo Nicolello"],
  ],
  dance: [
    ["1741272689174-f7f03b09a0ab", "Didi Paul"],
    ["1755077012428-cf36fee31c1c", "Gabriel Federa"],
    ["1630553070011-07a7f5930b39", "Hari Ramana"],
    ["1773562612522-01a8f24ae7d9", "Eyestetix Studio"],
    ["1630553069081-962b9270a00e", "Hari Ramana"],
  ],
  ceremony: [
    ["1627974159699-b355b081460e", "Polina Kuzovkova"],
    ["1773555899937-229935a87166", "Eyestetix Studio"],
    ["1775113513317-401e71322573", "Polina Kuzovkova"],
    ["1542897644-e04428948020", "Ruben Hutabarat"],
    ["1542897643-cfccd88c7127", "Ruben Hutabarat"],
  ],
  penjor: [
    ["1745739193791-c2d4153f5e9c", "Catherine Zaidova"],
    ["1742090554373-7f4eef0db241", "Dmitry Voronov"],
    ["1745739145363-537fbfac712d", "Catherine Zaidova"],
    ["1745739206535-0594ff39614a", "Catherine Zaidova"],
    ["1745739201854-cd9c1fb1379b", "Catherine Zaidova"],
    ["1742090190347-5b09941a4c27", "Dmitry Voronov"],
    ["1745739181916-a21ab897e989", "Catherine Zaidova"],
  ],
  ogoh: [
    ["1710345422982-6453b7b32287", "Robbi"],
    ["1769606020480-c99006fd809f", "Wahde Stock"],
    ["1769606020292-9ad4a7cda181", "Wahde Stock"],
    ["1773020309086-c5ed7f7c669c", "Eyestetix Studio"],
  ],
  offering: [
    ["1768834108238-86eb85d88b90", "Mutiara Salsabila Irawan"],
    ["1772787429537-77ba39d3f855", "Eyestetix Studio"],
    ["1767502597098-6bbefa312095", "Mutiara Salsabila Irawan"],
    ["1587632467120-c79b296a5dda", "Pier Francesco Grizi"],
  ],
  gamelan: [
    ["1775114305712-4fdb43165a99", "Polina Kuzovkova"],
    ["1670179716487-5acdf98c9646", "Shannia Christanty"],
  ],
  wedding: [
    ["1693576588167-2e7148490dc5", "Loris Boulinguez"],
    ["1693576587780-31fa6109191a", "Loris Boulinguez"],
  ],
  aerial: [
    ["1689506385992-633e29d08338", "Fahrul Razi"],
    ["1724133614320-a862c21c259a", "Anubhav Arora"],
    ["1725395702929-39d283b2ffaf", "Lucas T Photography"],
  ],
  temple: [
    ["1711609110590-5ad5c4599e56", "Katarzyna Zygnerska"],
    ["1501179691627-eeaa65ea017c", "Jeremy Bishop"],
    ["1788059231723-04d6b977eb8d", "ikhtiardims"],
    ["1766932189685-f840e6590291", U],
    ["1568609477908-f76bff63279c", "Wayan Aditya"],
  ],
  interior: [
    ["1618582383736-ed9080511254", "Peter Herrmann"],
    ["1758380742318-4074cce52ec4", "Robert | Visual Diary"],
    ["1611991743247-4dd4e50c9c17", "Peter Herrmann"],
  ],
};

// Files already downloaded earlier under descriptive names are kept under the same theme list order:
// they are re-downloaded under the new naming if missing (cheap), so the library stays reproducible.
const files = [];
for (const [theme, items] of Object.entries(LIBRARY)) {
  items.forEach(([photo, by], i) => files.push({ theme, n: i + 1, photo, by, file: `${theme}-${i + 1}.webp` }));
}

fs.mkdirSync(OUT, { recursive: true });
let fetched = 0;
await Promise.all(
  Array.from({ length: 6 }, async (_, w) => {
    for (let i = w; i < files.length; i += 6) {
      const f = files[i];
      const dest = path.join(OUT, f.file);
      if (fs.existsSync(dest) && fs.statSync(dest).size > 20000) continue;
      const res = await fetch(`https://images.unsplash.com/photo-${f.photo}?w=1400&q=75&fm=webp&fit=max`);
      if (!res.ok) {
        console.log("FAILED", f.file, res.status);
        continue;
      }
      fs.writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
      fetched++;
    }
  }),
);

// theme -> number of files, used by the site to pick images
const counts = Object.fromEntries(Object.entries(LIBRARY).map(([t, a]) => [t, a.length]));
fs.mkdirSync(path.join(ROOT, "src/lib"), { recursive: true });
fs.writeFileSync(path.join(ROOT, "src/lib/stock.json"), JSON.stringify(counts, null, 2) + "\n");

let md =
  "# Stock photo credits\n\nAll photographs on the site are free stock images from Unsplash (https://unsplash.com/license: free to use, attribution appreciated, not required). They are not photographs of the hotel. Generated by `scripts/stock-library.mjs`.\n\n| File (public/site/stock/) | Photographer | Unsplash image |\n|---|---|---|\n";
for (const f of files) md += `| ${f.file} | ${f.by} | https://images.unsplash.com/photo-${f.photo} |\n`;
fs.writeFileSync(path.join(ROOT, "docs/stock-credits.md"), md);
console.log(`library: ${files.length} images, downloaded ${fetched} new`);
