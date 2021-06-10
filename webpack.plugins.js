const P1 = require('./src-plugins/plugins/P1');

module.exports = {
    entry: "./src-plugins/index.js",
    plugins: [
        new P1()
    ],
    mode: 'development'
};