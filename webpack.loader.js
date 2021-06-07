const { resolve } = require("path");

const mode = 1 ? "development" : "production";
const isDevelopment = mode === "development";
const isProduction = mode === "production";

const REG = {
    JS: {
        regularJS: /\.js$/
    }
};

module.exports = {
	entry: "./src-loader/index.js",
	output: {
		filename: "js/[name].js",
		path: resolve(__dirname, "build"),
	},
	module: {
		rules: [
            {
                test: REG.JS.regularJS,
                use: [
                    'loader1',
                    {
                        loader: 'loader2',
                        options: {
                            name: 'jack',
                            age: 18
                        }
                    }
                ]
            }
        ],
	},
    resolveLoader: {
        modules: [
            'node_modules',
            resolve(__dirname, 'src-loader/loaders')
        ]
    },
	plugins: [],
	mode,
};
