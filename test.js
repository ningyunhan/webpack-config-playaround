const globby = require('globby');

(async () => {
    const paths = await globby('src-plugins');
    console.log(paths)
})()