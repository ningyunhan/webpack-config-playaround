const { validate } = require("schema-utils");
const schema = require("./CopyWebpackSchema.json");
const globby = require("globby");
const path = require("path");
const { isAbsolute } = require("path");

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
                        const absolutePath = path.isAbsolute(from) ? from : path.resolve(context, from);
                        
                        // 实际测试绝对路径在windows系统下不起作用，此处暂时使用相对路径
						const paths = await globby(from, { ignore });
                        console.log(paths);
                        cb();
					}
				);
			}
		);
	}
}

module.exports = CopyWebpackPlugin;
