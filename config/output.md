# 介绍output

* filename
    ```javascript
        output: {
            filename: 'js/[name].js'
        }
    ```
    >可以指定名称和path
* path
    >所有资源输出的公共目录
* publicPath
    > 所有资源引入的公共路径
    ```javascript
        publicPath: '/'

        then

        'imgs/a.png' => '/imgs/a.png'
    
    ```
* chunkFilename
    ```javascript
        chunkFilename: '[name]_chunk.js'
    ```
    >指的是非入口chunk的名称
    >
    >两种方法形成非入口chunk,如果没有指定则会使用filename
    1. 通过import（dynamic）

    2. 
        ```javascript
        	optimization: {
                splitChunks: {
                    chunks: 'all'
                }
	        },
        ```
* library
    >向外暴露变量名称
    ```javascript
        library: '[name]'
    ```
* libraryTarget
    >暴露的变量名添加到哪个属性上面
    ```javascript
        libraryTarget: 'window', //用于浏览器
        /*
            window.index = __webpack_exports__;
        */

        libraryTarget: 'global', //用于nodejs
        /*
            self.index = __webpack_exports__;
        */

        libraryTarget: 'commonjs'
        /*
            exports.index = __webpack_exports__;
        */
    ```
    
