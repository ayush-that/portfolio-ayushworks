// Generates public/og.png (1200x630) for site-wide Open Graph / Twitter card.
import sharp from "sharp";
import { writeFile } from "node:fs/promises";

const W = 1200;
const H = 630;

const logo = await sharp(
  await (await fetch("https://cdn.ayushworks.com/site/logo.png")).arrayBuffer(),
)
  .resize(180, 180)
  .png()
  .toBuffer();

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="#000000"/>
  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="#ffffff"/>
  <text x="80" y="360" font-family="Georgia, 'Times New Roman', serif" font-size="72" fill="#ffffff">Ayush Singh</text>
  <text x="80" y="430" font-family="Helvetica, Arial, sans-serif" font-size="36" fill="#a1a1aa">Software Engineer &#183; ayushworks.com</text>
</svg>`;

const out = await sharp(Buffer.from(svg))
  .composite([{ input: logo, top: 80, left: 80 }])
  .png()
  .toBuffer();

await writeFile("public/og.png", out);
console.log(`wrote public/og.png (${out.length} bytes)`);
