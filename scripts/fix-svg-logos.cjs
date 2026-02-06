// scripts/fix-svg-logos.cjs
// Extract embedded base64 images from SVGs and save as optimized PNGs

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "..", "src", "assets");

async function extractAndOptimizeSvg(svgPath, outputPngPath) {
  try {
    const svgContent = fs.readFileSync(svgPath, "utf8");

    // Extract base64 image data from SVG
    const base64Match = svgContent.match(
      /xlink:href="data:image\/png;base64,([^"]+)"/,
    );

    if (!base64Match) {
      console.log(`No embedded base64 found in ${path.basename(svgPath)}`);
      return false;
    }

    const base64Data = base64Match[1];
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Save optimized PNG
    await sharp(imageBuffer)
      .resize(300, 125, { fit: "inside" }) // Reasonable logo size
      .png({ compressionLevel: 9, quality: 80 })
      .toFile(outputPngPath);

    const newSize = fs.statSync(outputPngPath).size;
    console.log(
      `✓ Created ${path.basename(outputPngPath)}: ${(newSize / 1024).toFixed(0)}KB`,
    );
    return true;
  } catch (error) {
    console.error(`✗ ${path.basename(svgPath)}: ${error.message}`);
    return false;
  }
}

async function main() {
  console.log("🔧 Fixing SVG logos with embedded images...\n");

  // Extract Gnayanalogo
  const gnayanaSvg = path.join(assetsDir, "Gnayanalogo.svg");
  const gnayanaPng = path.join(assetsDir, "Gnayanalogo.png");
  if (fs.existsSync(gnayanaSvg)) {
    await extractAndOptimizeSvg(gnayanaSvg, gnayanaPng);
  }

  // Extract icon.svg
  const iconSvg = path.join(assetsDir, "icon.svg");
  const iconPng = path.join(assetsDir, "icon.png");
  if (fs.existsSync(iconSvg)) {
    await extractAndOptimizeSvg(iconSvg, iconPng);
  }

  console.log(
    "\n✅ Done! Now you can update imports to use .png instead of .svg",
  );
}

main().catch(console.error);
