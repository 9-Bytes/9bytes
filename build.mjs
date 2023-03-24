import fs from "fs-extra";
import * as cheerio from "cheerio";

// Copy files to build folder
fs.copySync("index.html", "build/index.html");
fs.copySync("datenschutz.html", "build/datenschutz.html");
fs.copySync("impressum.html", "build/impressum.html");
fs.copySync("main.mjs", "build/main.mjs");
fs.copySync("images", "build/images");
fs.copySync("robots.txt", "build/robots.txt");

// Modify index.html file
const htmlFiles = ["index", "datenschutz", "impressum"];

for (const fileName of htmlFiles) {
	const html = fs.readFileSync(`build/${fileName}.html`);
	const $ = cheerio.load(html);

	$("link[rel='stylesheet']").attr("href", "style.min.css");
	fs.writeFileSync("build/index.html", $.html());
}
