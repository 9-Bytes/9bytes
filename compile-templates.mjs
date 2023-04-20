import fs from "fs";
import Handlebars from "handlebars";

const partials = fs.readdirSync("./partials");

for (const file of partials) {
	const partial = fs.readFileSync(`./partials/${file}`, "utf-8");

	const [fileName] = file.split(".");

	Handlebars.registerPartial(fileName, partial);
}

const templates = fs.readdirSync("./templates");

const htmlFiles = [];

for (const file of templates) {
	const template = fs.readFileSync(`./templates/${file}`, "utf-8");
	const htmlTemplate = Handlebars.compile(template);
	const html = htmlTemplate();

	const [fileName] = file.split(".");
	fs.writeFileSync(`${fileName}.html`, html);
	htmlFiles.push(`${fileName}.html`);
}

console.log("🥳 HTML files successfully built in the public folder:");
htmlFiles.forEach(fileName => {
	console.log(`- ${fileName}`);
});
