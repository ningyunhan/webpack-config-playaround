# 介绍optimization

```javascript
    optimization: {
        splitChunks: {
            chunks: 'all',

            // 分割的chunk最小的文件大小30kb 
            minSize: 30 * 1024，

            // 表示文件分割大小没有限制
            maxSize: 0,
            
            // 被提取的chunk最少被引用一次，如果一次都没有被引用则不会被打包
            minChunks: 1,

            // 按需加载时并行文件的最大数量
            maxAsyncRequests: 5，

            // 入口js文件最大的并行请求数量
            maxInitialRequests: 3，

            // 
            automaticNameDelimiter: '~',

            /*
                将当前模块记录其他模块的hash单独打包成一个文件runtime
                当其他文件内容改变时只有runtime发生改变文件则不会发生任何改变

                例如a.js动态引入b.js，在不做配置情况下a文件内部会记录b文件的hash值，因此b文件的改动会引起不必要的a文件的rebuild
                
                在进行配置之后运行webpack会生成a.js和runtime-a.js(此文件名称通过配置得到),
                在b文件发生改动之后只有记录如何引用b文件的runtime-a.js发生改变a文件本身则不会发生改变因此不会进行rebuild
            */
            runtimeChunk: {
                name: entryPoint => `runtime-${entryPoint.name}`
            },

            // 配置生产环境为js和css的压缩方案
            minimizer: [
                new TerserWebpackPlugin({
                    // 开启多进程打包
                    parallel: true，

                    // 启用source map
                    sourceMap: true
			    })
            ]
        }
    }
```