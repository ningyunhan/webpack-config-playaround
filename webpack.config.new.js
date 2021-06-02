const { resolve } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require('terser-webpack-plugin');

const mode = "development";
const loaders = [];
const plugins = [new HTMLWebpackPlugin()];

module.exports = {
	entry: [
		"./src2/index.js"
	],
	output: {
		filename: "js/[name].js",
		path: resolve(__dirname, "build2"),
        // publicPath: '/',
        chunkFilename: 'js/[name].[contenthash:10].chunk.js',
		pathinfo: false,
		// chunkLoadingGlobal: `webpackJsonphellopppp`,
        library: '[name]_sss',
        libraryTarget: 'window',
		// globalObject: 'this'
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
