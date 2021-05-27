# 介绍devServer

```javascript
    devServer: {
        // 代码运行的目录
        contentBase: ''，

        // 监视contentBase下的文件，一旦文件变化就会reload
        watchContentBase: true,

        watchOptions: {
            // 该目录下的文件不要进行监视
            ignored: /node_modules/
        },

        // 启动压缩
        compress: true | false，

        port: 5000,

        host: 'localhost',

        // 自动打开浏览器
        open: true,

        // 开启HMR
        hot: true,

        // 不要显示启动服务器的日志信息
        clientLogLevel: 'none'，

        // 除了一些基本的启动信息之外，其他的信息都不要打印
        quiet: true,

        // 出现错误不要全屏提示 
        overlay: false,

        // 服务器代理，解决开发环境下的跨域问题
        proxy: {
            // 一旦devServer(5000)接到api开头的请求，就会把请求转发到另外一个服务器 http://localhost:3000
            '/api': {
                target: 'http://localhost:3000',

                // 发送请求时路径重写
                pathRewrite: {
                    '/^api/': ''
                }
            }
        }
    }
```