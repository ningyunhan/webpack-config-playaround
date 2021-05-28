const { resolve } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');

const mode = "development";
const loaders = [];
const plugins = [new HTMLWebpackPlugin()];

module.exports = {
	entry: {
		index: "./src2/index.js",
		add123: "./src2/add.js",
	},
	output: {
		filename: "js/[name].js",
		path: resolve(__dirname, "build2"),
        // publicPath: '/',
        chunkFilename: 'js/[name].[contenthash:10].chunk.js',
        // library: '[name]',
        // libraryTarget: 'commonjs'
	},
	module: {
		rules: [...loaders],
	},
	plugins: [...plugins],
	mode,
	resolve: {

	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			automaticNameDelimiter: '~',
		},
		runtimeChunk: {
			name: entryPoint => `runtime-${entryPoint.name}`
		},
		minimizer: [
			new TerserWebpackPlugin()
		]
	}
};
