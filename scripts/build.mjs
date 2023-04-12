import fs from "fs-extra";
import * as cheerio from "cheerio";

// Copy files to build folder
const destDir = "./build";

const htmlFiles = fs.readdirSync("./").filter(file => file.endsWith(".html"));

htmlFiles.forEach(file => fs.copySync(file, `${destDir}/${file}`));
fs.copySync("scripts", "build/scripts");
fs.copySync("images", "build/images");
fs.copySync("misc", "build/misc");

for (const fileName of htmlFiles) {
	const file = `build/${fileName}`;
	const html = fs.readFileSync(file);
	const $ = cheerio.load(html);

	$("link[rel='stylesheet']").attr("href", "style.min.css");
	fs.writeFileSync(file, $.html());
}
