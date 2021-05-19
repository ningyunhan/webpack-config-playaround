const { resolve, dirname } = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

// 单独提取css文件
const MiniCssPlugin = require("mini-css-extract-plugin");

// 压缩css
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const production = true;
const env = production ? "production" : "development";
const cssLoader = [production ? MiniCssPlugin.loader : "style-loader"];


// hash 
// 所有文件共享webpack打包生成的hash
// chunkhash
// 同一个chunk共享同一个hash
// contenthash
// 根据文件的内容生成hash
// 所以文件名最终选择contenthash，避免修改一个文件影响其他文件名的hash


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
				// 文件名加入hash值防止浏览器缓存
				filename: "css/build.[contenthash:10].css",
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
		// 文件名加入hash值防止浏览器缓存
		filename: "js/build.[contenthash:10].js",
		path: resolve(__dirname, "build"),
	},
	module: {
		rules: [
			{
				// 指示loader只会匹配一个， 但是注意不能两个loader处理同一种类型文件，所以将eslint-loader提取出来
				oneOf: [
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
								// 开启babel缓存,让第二次打包速度更快
								cacheDirectory: true
							},
						},
					},
				],
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

	// inline- | hidden | eval- | nosources- | cheap- | cheap-module

	// source-map
	// 外部 提示到错误代码准确信息和在源代码的错误位置

	// inline-source-map 不会生成map文件，构建速度更快
	// 内部 只生成一个内联source map文件
	// 提示到错误代码准确信息和在源代码的错误位置

	// hidden-source-map
	// 外部生成map文件
	// 提示错位代码错误原因，但是没有错误位置，不能追踪到源代码错误，只能提示到构建后代码错误位置

	// eval-source-map
	// 内部 每一个js文件都会生成source-map 在eval函数里面
	// 提示到错误代码准确信息和在源代码的错误位置

	// nosources-source-map
	// 外部
	// 能到到错误代码准确信息，但是没有任何源代码的错误，看不到构建后的代码和源代码

	//cheap-source-map
	// 外部
	// 提示到错误代码准确信息和在源代码的错误位置，但是只能精确到行

	// cheap-module-source-map
	// 外部
	// 提示到错误代码准确信息和在源代码的错误位置，但是只能精确到行

	// 用法
	// development
	// production

	// build speed  =======>   eval>inline>cheap

	devtool: "source-map",
};
