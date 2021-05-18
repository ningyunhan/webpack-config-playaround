const { resolve, dirname } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

// 单独提取css文件
const MiniCssPlugin = require("mini-css-extract-plugin");

// 压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const production = true;
const env = production ? "production" : "development";
const cssLoader = [production ? MiniCssPlugin.loader : "style-loader"];

const plugins = production
	? [
			new HTMLWebpackPlugin({
				template: "./src/index.html",
				// 用来压缩html
				minify: {
					collapseWhitespace: true,
					removeComments: true,
				},
			}),
			new MiniCssPlugin({
				filename: "css/build.css",
			}),
			new OptimizeCssAssetsWebpackPlugin(),
	  ]
	: [
			new HTMLWebpackPlugin({
				template: "./src/index.html",
			}),
	  ];

// 设置node js环境变量
// process.env.NODE_ENV = "development";

module.exports = {
	entry: ["./src/index.js", "./src/index.html"],
	output: {
		filename: "js/build.js",
		path: resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					...cssLoader,
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
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
				// 指定eslint loader优先执行
				enforce: "pre",
				options: {
					fix: true,
				},
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [
							[
								"@babel/preset-env",
								{
									// 测试一定要指定 否则无法编译es6 -> es5
									targets: "defaults",
									// 按需加载
									useBuiltIns: "usage",
									corejs: {
										version: 3,
									},
									// 指定兼容性做到哪个浏览器版本
									// targets: {
									// 	chrome: "60",
									// 	ie: '9'
									// },
								},
							],
						],
					},
				},
			},
		],
	},
	plugins: plugins,
	mode: env,

	// 保证webpack输出的代码不含有es6语法
	target: "es5",

	//npx webpack serve
	devServer: {
		contentBase: resolve(__dirname, "build"),
		compress: true,
		port: 3000,
		// 开启HMR
		// 入口文件没法进行HMR，html文件也不会进行HMR
		hot: true,
		open: true,
	},
	devtool: "source-map",
};
