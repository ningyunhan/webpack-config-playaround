const { validate } = require("schema-utils");
const schema = require("./CopyWebpackSchema.json");
const globby = require("globby");
const path = require("path");
const { isAbsolute } = require("path");
const fs = require("fs");
const { promisify } = require("util");
const webpack = require("webpack");

const readFile = promisify(fs.readFile);
const { RawSource } = webpack.sources;

class CopyWebpackPlugin {
	constructor(options = {}) {
		validate(schema, options, {
			name: "CopyWebpackPlugin",
		});
		this.options = options;
	}

	apply(compiler) {
		// 初始化compilation
		compiler.hooks.thisCompilation.tap(
			"CopyWebpackPlugin",
			(compilation) => {
				// 为compilation添加hooks
				compilation.hooks.additionalAssets.tapAsync(
					"CopyWebpackPlugin",
					async (cb) => {
						const { from, ignore } = this.options;
						const to = this.options.to || ".";

						// 指的是运行代码的目录
						const context = compiler.options.context;
						const absolutePath = path.isAbsolute(from)
							? from
							: path.resolve(context, from);

						// 实际测试绝对路径在windows系统下不起作用，此处暂时使用相对路径
						const paths = await globby(from, { ignore });
						console.log(paths);

						// 读取file信息
						const files = await Promise.all(
							paths.map(async (p) => {
								const data = await readFile(p);
								const filename = path.basename(p);
								return {
									data,
									filename: path.join(to, filename),
								};
							})
						);

						//生成webpack格式的资源
						const assets = files.map((f) => {
							const source = new RawSource(f.data);
							return {
								source,
								filename: f.filename,
							};
						});

						// 添加到compilation中，进行文件输出
						assets.forEach((asset) => {
							compilation.emitAsset(asset.filename, asset.source);
						});


						cb();
					}
				);
			}
		);
	}
}

module.exports = CopyWebpackPlugin;
