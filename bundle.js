import fs from "fs";
import path from "path";

const distDir = path.join(process.cwd(), "dist");
const outputFilePath = path.join(process.cwd(), "epsilon_standalone.html");

try {
  console.log("Analyzing built production files...");
  
  // Find JS and CSS assets in dist/assets
  const assetsDir = path.join(distDir, "assets");
  const files = fs.readdirSync(assetsDir);
  
  const jsFile = files.find(f => f.endsWith(".js"));
  const cssFile = files.find(f => f.endsWith(".css"));
  
  if (!jsFile || !cssFile) {
    throw new Error("Could not find standard JS or CSS compiled build files in dist/assets");
  }
  
  console.log(`Found compiled JS: ${jsFile}`);
  console.log(`Found compiled CSS: ${cssFile}`);
  
  const jsContent = fs.readFileSync(path.join(assetsDir, jsFile), "utf-8");
  const cssContent = fs.readFileSync(path.join(assetsDir, cssFile), "utf-8");
  
  // Inject into single layout template
  const standaloneHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Epsilon</title>
    <style>
${cssContent}
    </style>
  </head>
  <body class="bg-black text-white">
    <div id="root"></div>
    <script type="text/javascript">
${jsContent}
    </script>
  </body>
</html>`;

  fs.writeFileSync(outputFilePath, standaloneHtml, "utf-8");
  console.log(`Success! Standalone single-file HTML compiled successfully at: ${outputFilePath}`);
} catch (error) {
  console.error("Bundling script caught an exception: ", error);
}
