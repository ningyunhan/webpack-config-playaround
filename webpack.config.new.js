const { resolve } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const mode = "development";
const loaders = [];
const plugins = [new HTMLWebpackPlugin()];

module.exports = {
	entry: {
		index: "./src2/index.js",
		add: "./src2/add.js",
	},
	output: {
		filename: "[name].[contenthash:5].js",
		path: resolve(__dirname, "build2"),
	},
	module: {
		rules: [...loaders],
	},
	plugins: [...plugins],
	mode,
};
