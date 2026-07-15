import sharp from "sharp";
import fs from "fs";

async function optimizeImages() {
  const posterInput = "./public/images/hero.png";
  const posterOutput = "./public/images/hero_poster.webp";

  if (fs.existsSync(posterInput)) {
    await sharp(posterInput)
      .resize({ width: 782, height: 782, fit: 'cover' })
      .webp({ quality: 75 })
      .toFile(posterOutput);
  }

  const logoInput = "./public/logoo.png";
  const logoOutput = "./public/logoo.webp";
  if (fs.existsSync(logoInput)) {
    await sharp(logoInput)
      .resize({ width: 400 })
      .webp({ quality: 80 }) 
      .toFile(logoOutput);
  }

  console.log("Images re-optimized!");
}

optimizeImages().catch(console.error);
