class P1 {
    apply(compiler) {

        compiler.hooks.emit.tap('P1', (c) => {
            console.log('emit', 111);
        });
        compiler.hooks.emit.tapAsync('P1-v2', (c, cb) => {
            console.log('emitv2', 111);
            // cb()
        });
    }
}

module.exports = P1;