import sharp from "sharp";

const src = "cert-raw.png";
const out = "public/img/certificate-preview.webp";

const cropped = await sharp(src)
  .extract({ left: 221, top: 52, width: 657, height: 624 })
  .png()
  .toBuffer();

const result = await sharp(cropped)
  .trim({ threshold: 25 })
  .webp({ quality: 84 })
  .toFile(out);

console.log("done", result.width, "x", result.height, result.size, "bytes");
