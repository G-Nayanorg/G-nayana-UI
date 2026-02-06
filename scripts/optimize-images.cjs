// scripts/optimize-images.js
// Run with: node scripts/optimize-images.js

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "..", "src", "assets");

async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    let pipeline = sharp(inputPath);

    if (ext === ".jpg" || ext === ".jpeg") {
      pipeline = pipeline.jpeg({ quality: options.quality || 80 });
    } else if (ext === ".png") {
      pipeline = pipeline.png({
        compressionLevel: 9,
        quality: options.quality || 80,
      });
    }

    if (options.resize) {
      pipeline = pipeline.resize(options.resize.width, options.resize.height, {
        fit: "inside",
      });
    }

    await pipeline.toFile(outputPath);

    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = (((originalSize - newSize) / originalSize) * 100).toFixed(
      1,
    );

    console.log(
      `✓ ${path.basename(inputPath)}: ${(originalSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB (${savings}% smaller)`,
    );
    return true;
  } catch (error) {
    console.error(`✗ ${path.basename(inputPath)}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("🖼️  Optimizing images...\n");

  // Optimize background.jpg
  const backgroundPath = path.join(assetsDir, "background.jpg");
  if (fs.existsSync(backgroundPath)) {
    const backupPath = path.join(assetsDir, "background.original.jpg");
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(backgroundPath, backupPath);
    }
    await optimizeImage(backupPath, backgroundPath, {
      quality: 60,
      resize: { width: 1920, height: 1080 },
    });
  }

  // Optimize gradient.png
  const gradientPath = path.join(assetsDir, "gradient.png");
  if (fs.existsSync(gradientPath)) {
    const backupPath = path.join(assetsDir, "gradient.original.png");
    if (!fs.existsSync(backupPath)) {
      fs.copyFileSync(gradientPath, backupPath);
    }
    await optimizeImage(backupPath, gradientPath, {
      quality: 60,
      resize: { width: 1920, height: 1080 },
    });
  }

  console.log("\n✅ Image optimization complete!");
  console.log(
    "\n⚠️  Note: The SVG files (Gnayanalogo.svg, icon.svg) contain embedded base64 images.",
  );
  console.log(
    "   These need to be replaced with proper vector SVGs from your designer.",
  );
}

main().catch(console.error);
