const { getOptions } = require("loader-utils");
const { validate } = require("schema-utils");

const schema = require('./schema.json');

module.exports = function (content, map, meta) {
	const options = getOptions(this);
	console.log(222, options);

    validate(schema, options, {
        name: 'loader2'
    });
	return content;
};

module.exports.pitch = function () {
	console.log("pitch 222");
};
 