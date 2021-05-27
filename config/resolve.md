# 介绍resolve

```javascript
    resolve: {
        alias: {
            $css: resolve(__dirname, 'src/css')
        }，

        // 配置省略文件路径的后缀名
        // 文件的名字尽量不要相同可能带来问题
        extensions：['.js', '.json', '.css']，

        /*
            告诉webpack解析模块去找哪个目录,或者可以理解为告诉webpack直接去哪里找node_modules，
            如果找不到的话webpack会自动去上一层找,测试发现上层目录找不到也会尝试在当前目录寻找
        */
        modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    }
```

* alias

    *before*
    ```javascript
        import '../css/index.css'
    ```
    *after*
    ```javascript
        //得到的是css目录的绝对路径
        import `$css/index.css`
    ```
***
* extensions

    *before*
    ```javascript
        import '../css/index.css'
    ```

    *after*
    ```javascript
        //得到的是css目录的绝对路径
        import '../css/index'
    ```