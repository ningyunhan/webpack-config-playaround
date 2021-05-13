const { resolve, dirname } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssPlugin = require("mini-css-extract-plugin");

// 设置node js环境变量
process.env.NODE_ENV = "development";

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
						// 默认是读取browserslist的production的配置，需要设置node环境变量来实现develop配置读取
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: ["postcss-preset-env"],
							},
						},
					},
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
			{
				exclude: /\.(html|css|js|jpg|png)$/i,
				loader: "file-loader",
				options: {
					name: "[hash:10].[ext]",
					outputPath: "files",
				},
			},
		],
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./src/index.html",
		}),
		new MiniCssPlugin({
			filename: "css/build.css",
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
