import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dirs = ["public/projects/hotelkamer2", "public/projects/keukenproject2"];

function sortKey(name) {
  const base = name.replace(/\.jpe?g$/i, "");
  const m = base.match(/\((\d+)\)$/);
  const suffix = m ? Number(m[1]) : 0;
  return base.replace(/\s*\(\d+\)$/, "") + String(suffix).padStart(4, "0");
}

for (const dir of dirs) {
  const files = fs
    .readdirSync(dir)
    .filter((f) => /\.jpe?g$/i.test(f))
    .sort((a, b) => sortKey(a).localeCompare(sortKey(b)));

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const out = `Scene ${i + 1}.webp`;
    const src = path.join(dir, file);
    const dest = path.join(dir, out);
    await sharp(src).webp({ quality: 85 }).toFile(dest);
    fs.unlinkSync(src);
    console.log(`${dir}: ${file} -> ${out}`);
  }
}
