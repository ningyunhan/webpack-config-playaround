const copyWebpackPlugin = require('./src-plugins/plugins/CopyWebpackPlugin');


module.exports = {
    entry: "./src-plugins/index.js",
    plugins: [
        new copyWebpackPlugin({
            from: 'public',
            ignore: ['index.html']
        })
    ],
    mode: 'development'
};