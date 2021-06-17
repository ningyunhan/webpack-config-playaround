const parser = require("./Parser");

class Compiler {
	constructor(options = {}) {
		this.options = options;
		this.modules = [];
	}

	// 启动webpack打包
	run() {
		// 1.读取入口文件内容
		const filePath = this.options.entry;
		const fileInfo = this.build(filePath);
		this.modules.push(fileInfo);

		this.modules.forEach((fileInfo) => {
			const { deps } = fileInfo;
			/*
				deps的结构
			{
				'./add.js': 'C:\\Users\\ningy\\Desktop\\test_webpack\\src\\add.js',   
				'./count.js': 'C:\\Users\\ningy\\Desktop\\test_webpack\\src\\count.js'
			}
			*/

			for(const relativePath in deps) {
				const absolutePath = deps[relativePath];
				const fileInfo = this.build(absolutePath);
				this.modules.push(fileInfo);
			}

		});
	}

	build(filePath) {
		const ast = parser.getAst(filePath);
		const deps = parser.getDeps(ast, filePath);
		const code = parser.getCode(ast);
		return {
			filePath,
			deps,
			code,
		};
	}
}

module.exports = Compiler;
