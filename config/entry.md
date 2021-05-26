# 介绍entry

* string
    >此时只有一个chunk，输出一个bundle文件
    >
    >此时chunk的默认名字是main
    ```javascript
        entry: './src/index.js'
    ```
* array
    ```javascript
        entry: ['./src/index.js', './src/index2.js']
    ```
    >所有的入口文件只会形成一个chunk，输出一个bundle
    >
    >但是作用只有在HMR功能中让html hot update生效， 所以一般情况下不会使用

* object
    ```javascript
        entry: {
            index: './src/index.js',
            add: './src/add.js'
        }
    ```
    **or**

    ```javascript
        entry: {
            index:  ['./src/index.js', './src/count.js'],
            add: './src/add.js'
        }
    ```