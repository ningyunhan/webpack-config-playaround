const { resolve } = require("path");

const mode = 1 ? "development" : "production";
const isDevelopment = mode === "development";
const isProduction = mode === "production";

const REG = {
    JS: {
        regularJS: /\.js$/
    }
};

module.exports = {
	entry: "./src-loader/index.js",
	output: {
		filename: "js/[name].js",
		path: resolve(__dirname, "build/build3"),
	},
	module: {
		rules: [
            {
                test: REG.JS.regularJS,
                loader:
            }
        ],
	},
	plugins: [],
	mode: "",
};
