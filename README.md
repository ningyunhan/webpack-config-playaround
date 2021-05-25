# webpack性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境
* 优化打包构建速度
    * HMR
        * css 因为style-loader实现了HMR多以开发环境使用style-loader
        * html 默认不使用HMR 本质上也不需要
        * js 默认不使用HMR， 但是需要添加代码才能支持, 而且只能对非入口文件有效
            ```javascript
                if(module.hot) {
                    module.hot.accept(
                        './file-path', 
                        function() {

                        }
                    )
                }
            ```
* 优化代码调试
    * source-map


## 生产环境优化
* 优化打包构建速度 （对于开发者而言）
    * oneOf
    * 缓存
        * babel缓存
    * 多进程打包  
    * externals
        >用于不打包某些package 使用cdn链接引入
    * dll  
        >用于将某些package单独打包后续不需要打包直接引用
* 优化代码运行的性能
    * 缓存
        * hash（所有文件都共享的hash）
        * chunkHash (同一个入口共享的hash)
        * contentHash
    * tree shaking （移除掉没有使用的code）
        * 只有es6的module tree shaking才会起作用
        * webpack mode production 自动开启tree shaking
        * 需要给package.json添加sideEffects
    * code split
        * 单入口
        ```javascript
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },   
        
        用于将node_module 里面的代码和自己写的js代码打包成不同的
        ```
        * 多入口
        ```javascript
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        },   
        
        用于将node_module 里面的代码和自己写的js代码打包成不同的以及将公用的package只打包一份
        ```        
    * 懒加载/预加载
    * pwa
        >service + cache 用于离线也可以访问
