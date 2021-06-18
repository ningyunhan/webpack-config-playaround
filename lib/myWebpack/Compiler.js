const parser = require("./Parser");
const fs = require("fs");
const path = require("path");

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

			for (const relativePath in deps) {
				const absolutePath = deps[relativePath];
				const fileInfo = this.build(absolutePath);
				this.modules.push(fileInfo);
			}
		});

		const depsGraph = this.modules.reduce((prev, next) => {
			return {
				...prev,
				[next.filePath]: {
					code: next.code,
					deps: next.deps,
				},
			};
		}, {});

		/*
		
			{
				'absolutePath': {
					code: 'xxx',.
					deps: {}
				},
				'absolutePath2': {
					code: 'xxx',.
					deps: {}
				},
			}
		
		
		*/

		this.generate(depsGraph);
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

	//生成输出资源
	generate(depsGraph) {
		const bundle = `
			(function(depsGraph) {
				function require(module) {
					function localRequire(relativePath) {
						return require(depsGraph[module].deps[relativePath]);
					}

					var exports = {};
					(function(require, exports, code) {
						eval(code);
					})(localRequire, exports, depsGraph[module].code);

					return exports;
				}

				require('${this.options.entry}');

			})(${JSON.stringify(depsGraph)});
		`;

		//生成输出文件的绝对路径
		const filePath = path.resolve(this.options.output.path, this.options.output.filename);
		fs.writeFileSync(filePath, bundle, 'utf-8');
	}
}

module.exports = Compiler;
