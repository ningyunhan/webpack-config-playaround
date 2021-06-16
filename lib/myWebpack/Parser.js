const fs = require("fs");
const path = require("path");
const babelParser = require("@babel/parser");
const traverse = require("@babel/traverse").default;
const { transformFromAst } = require("@babel/core");


const parser = {

    //将文件解析成为ast
    getAst(filePath) {
        //读取文件
        const file = fs.readFileSync(filePath, "utf-8");
		
        // 解析成为ast抽象语法树
		const ast = babelParser.parse(file, {
			sourceType: "module", //解析文件的模块化方案是ES Module
		});
        return ast;
    },


    //获取依赖
    getDeps(ast, filePath) {
        const dirname = path.dirname(filePath);
        
		// 定义一个存储依赖的容器
		const deps = {};

        // 收集所有的依赖
		traverse(ast, {
			ImportDeclaration({ node }) {
				// 依赖的一个相对路径
				const relativePath = node.source.value;
				//生成基于入口文件的绝对路径
				const absolutePath = path.resolve(dirname, relativePath);
				//添加依赖
				deps[relativePath] = absolutePath;
			},
		});

        return deps;
    },


    // 将ast解析成为代码
    getCode(ast) {
        //编译代码，将代码中浏览器不能识别的语法进行编译
		const { code } = transformFromAst(ast, null, {
			presets: ["@babel/preset-env"],
		});
        return code;
    }

};


module.exports = parser;