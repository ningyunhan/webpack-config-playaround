const parser = require("./Parser");

class Compiler {
	constructor(options = {}) {
		this.options = options;
	}

	// 启动webpack打包
	run() {
		// 1.读取入口文件内容
		const filePath = this.options.entry;

        const ast = parser.getAst(filePath);
        const deps = parser.getDeps(ast, filePath);
        const code = parser.getCode(ast);

        console.log(deps)
	}
}

module.exports = Compiler;
