const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");

const babel = require("@babel/core");
const util = require("util");

const schema = require("./babel-schema.json");

const transform = util.promisify(babel.transform);

module.exports = function (content, map, meta) {
	const options = getOptions(this) || {};
	validate(schema, options, {
		name: "babelLoader",
	});

	const cb = this.async();
	transform(content, options)
		.then(({ code, map }) => {
			cb(null, code, map);
		})
		.catch((e) => {
			cb(e);
		});
};
