// Downloads the photos listed in scripts/images.json from the Travelbase media library,
// resizes them to max 2400px wide and saves them as src/assets/img/<slot>.jpg.
// Runs automatically via .github/workflows/fetch-images.yml whenever images.json changes.
// Manual use: node scripts/fetch-images.mjs [slot ...]
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const manifest = JSON.parse(await readFile(new URL('./images.json', import.meta.url), 'utf8'));
const only = process.argv.slice(2);
const outDir = new URL('../src/assets/img/', import.meta.url);
await mkdir(outDir, { recursive: true });

let ok = 0, failed = 0;
for (const [slot, { url, id }] of Object.entries(manifest.images)) {
  if (only.length && !only.includes(slot)) continue;
  try {
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    const out = await sharp(input)
      .rotate()
      .resize({ width: 2400, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    await writeFile(new URL(`${slot}.jpg`, outDir), out);
    console.log(`✓ ${slot} (${Math.round(out.length / 1024)} KB)`);
    ok++;
  } catch (e) {
    console.warn(`✗ ${slot} (${id}): ${e.message}`);
    failed++;
  }
}
console.log(`${ok} updated, ${failed} failed.`);
if (failed && !ok) process.exit(1);
