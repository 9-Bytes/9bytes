import gulp from "gulp";
const { src, dest, parallel, series, watch } = gulp;

import { exec } from "child_process";
import postcss from "gulp-postcss";
import rename from "gulp-rename";
import BrowserSync from "browser-sync";
const browserSync = BrowserSync.create();

import uglifyES from "gulp-uglify-es";
const uglify = uglifyES.default;

import imagemin from "gulp-imagemin";
import avif from "gulp-avif";
import loadPostCSSConfig from "postcss-load-config";
import imageResize from "gulp-image-resize";

const buildDir = "build";

function handlebarsCompile() {
	return new Promise((resolve, reject) => {
		exec("npm run compile", (err, stdout, stderr) => {
			console.log(stdout);
			console.log(stderr);
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}

function css() {
	return loadPostCSSConfig().then(({ plugins, options }) => {
		return src("css/*.css")
			.pipe(postcss(plugins, options))
			.pipe(rename("style.min.css"))
			.pipe(dest(buildDir));
	});
}

function js() {
	return src("scripts/*.mjs")
		.pipe(uglify())
		.pipe(dest(`${buildDir}/scripts`));
}

function images() {
	return src("images/*.{jpg,jpeg,png,avif}")
		.pipe(imagemin())
		.pipe(dest(`${buildDir}/images`));
}

function subImages() {
	return src("images/*/**/*.{jpg,jpeg,png}")
		.pipe(imagemin())
		.pipe(dest(`${buildDir}/images`))
		.pipe(
			imageResize({ width: 1920, height: 1280, crop: false, upscale: false })
		)
		.pipe(rename({ basename: "regular" }))
		.pipe(dest(`${buildDir}/images`))
		.pipe(imageResize({ width: 640, height: 427, crop: false, upscale: false }))
		.pipe(rename({ basename: "small" }))
		.pipe(dest(`${buildDir}/images`));
}

function avifImages() {
	return src(`${buildDir}/images/**/*.+(jpg|jpeg|png)`)
		.pipe(rename({ extname: ".avif" }))
		.pipe(avif({ quality: 50 }))
		.pipe(dest(buildDir + "/images"));
}

const misc = () => src("misc/**/*").pipe(dest(buildDir));

function serve(cb) {
	browserSync.init({ server: { baseDir: buildDir } });
	cb();
}

function reload(cb) {
	browserSync.reload();
	cb();
}

function watchFiles() {
	watch(
		["templates/*.hbs", "partials/*.hbs"],
		series(handlebarsCompile, reload)
	);
	watch("css/*.css", series(css, reload));
	watch("scripts/*.mjs", series(js, reload));
	watch("images/*", series(series(images, subImages, avifImages), reload));
	watch("misc/**/*", series(misc, reload));
}

export const build = parallel(
	handlebarsCompile,
	misc,
	css,
	js,
	series(images, subImages, avifImages)
);

export default series(build, serve, watchFiles);
