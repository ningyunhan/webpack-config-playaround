// module.exports = function(content, map, meta) {
//     console.log(111);
//     return content;
// };


module.exports = function(content, map, meta){
    console.log(111);
    const cb = this.async();
    setTimeout(() => {
        cb(null, content);
    }, 1000)
};

module.exports.pitch = function(){
    console.log('pitch 111')
};