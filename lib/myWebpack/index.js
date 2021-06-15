const fs = require("fs");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;


function myWebpack(config) {
	return new Compiler(config);
}

class Compiler {
	constructor(options = {}) {
		this.options = options;
	}

	// 启动webpack打包
	run() {
		// 1.读取入口文件内容
		const filePath = this.options.entry;
		const file = fs.readFileSync(filePath, "utf-8");

		// 2.解析成为ast抽象语法树
        const ast = babelParser.parse(file, {
            sourceType: 'module',  //解析文件的模块化方案是ES Module
        });

        //3.收集所有的依赖
        traverse(ast, {
            ImportDeclaration(code) {
                console.log(code)
            }
        });
	}
}

module.exports = myWebpack;
