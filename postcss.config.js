module.exports = {
	plugins: [
		require("postcss-nesting"),
		require("autoprefixer"),
		require("postcss-import"),
		require("cssnano")({
			preset: "default",
		}),
	],
};
