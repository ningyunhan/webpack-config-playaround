const { validate } = require("schema-utils");
const schema = require("./CopyWebpackSchema.json");

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
					(cb) => {
                        
                    }
				);
			}
		);
	}
}

module.exports = CopyWebpackPlugin;
