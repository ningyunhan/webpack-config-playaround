# 介绍loader

>介绍按照不同的格式使用loader

```javascript
    module: {
        rules: [
            {
                test: '/\.less$/',
                use: [
                    'style-loader', 
                    'css-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            
                        }
                    }
                ]
            },
            {
                test: '/\.js$/',

                //排除一些文件
                exclude: /node_modules/,

                //表示只检查src目录下的文件
                include: resolve(__dirname, 'src')，

                // pre表示优先执行，post表示延后执行 
                enforce: 'pre | post',

                loader: 'eslint-loader',

                options: {

                }
            },
            
            // 表示里面的loader只会执行一个
            oneOf:[
                {
                    test: /\.png$/,
                    use: {
                        loader: 'html-loader',
                        options: {

                        }
                    }
                }
            ]
        ]
    }
```