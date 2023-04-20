import fs from "fs-extra";
import * as cheerio from "cheerio";

// fs.copySync("public", "deploy");
fs.copySync("scripts", "deploy/scripts");
fs.copySync("images", "deploy/images");
fs.copySync("misc", "deploy/misc");

const destDir = "deploy";

const htmlFiles = fs.readdirSync("./").filter(file => file.endsWith(".html"));

htmlFiles.forEach(file => fs.copySync(file, `./${destDir}/${file}`));

for (const fileName of htmlFiles) {
	const file = `${destDir}/${fileName}`;
	const html = fs.readFileSync(file);
	const $ = cheerio.load(html);

	$("link[rel='stylesheet']").attr("href", "style.min.css");
	fs.writeFileSync(file, $.html());
}

// const htmlFiles = fs.readdirSync("public");
// for (const fileName of htmlFiles) {
// 	const file = `public/${fileName}`;
// 	const html = fs.readFileSync(file);
// 	const $ = cheerio.load(html);

// 	$("link[rel='stylesheet']").attr("href", "style.min.css");
// 	fs.writeFileSync(file, $.html());
// }
