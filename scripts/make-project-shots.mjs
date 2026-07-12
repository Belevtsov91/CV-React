import sharp from "sharp";

const shots = [
  ["shot-bankist.png", "public/img/bankist-landing.webp"],
  ["shot-mapty.png", "public/img/mapty-tracker.webp"],
  ["shot-radiant.png", "public/img/low-analysis.webp"],
  ["shot-low.png", "public/img/low-analysis-home.webp"],
];

for (const [src, out] of shots) {
  const r = await sharp(src)
    .resize(800, 500, { fit: "cover" })
    .webp({ quality: 84 })
    .toFile(out);
  console.log(out, `${r.width}x${r.height}`, `${Math.round(r.size / 1024)}KB`);
}
