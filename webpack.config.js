const { resolve, dirname } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "js/build.js",
		path: resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					// "style-loader",
					MiniCssPlugin.loader,
					"css-loader",
					{
						loader: 'postcss-loader'
					}
				],
			},
			{
				test: /\.(jpg|png)$/,
				loader: "url-loader",
				options: {
					limit: 8 * 1024,
					name: "[hash:5].[ext]",
					esModule: true,
					outputPath: "imags",
				},
			},
			{
				test: /\.html$/i,
				loader: "html-loader",
				options: {
					esModule: false,
				},
			},
			// {
			// 	exclude: /\.(html|css|js|jpg|png)$/i,
			// 	loader: "file-loader",
			// 	options: {
			// 		name: "[hash:10].[ext]",
			// 		outputPath: "files",
			// 	},
			// },
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssPlugin({
			filename: 'css/build.css'
		}),
	],
	mode: "development",

	//npx webpack serve
	devServer: {
		contentBase: resolve(__dirname, "build"),
		compress: true,
		port: 3000,
		open: true,
	},
};
