# apply、call、bind 区别
## apply
* apply() 方法调用一个函数, 其具有一个指定的this值，以及作为一个**数组(或类似数组的对象)**提供的参数
* 语法:
    ```javascript
    fun.apply(thisArg, [argsArray])
    ```
    * thisArg：在 fun 函数运行时指定的 this 值。需要注意的是，指定的 this 值并不一定是该函数执行时真正的 this 值，如果这个函数处于非严格模式下，则指定为 null 或 undefined 时会自动指向全局对象（浏览器中就是window对象），同时值为原始值（数字，字符串，布尔值）的 this 会指向该原始值的自动包装对象。
    * argsArray：一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 fun 函数。如果该参数的值为null 或 undefined，则表示不需要传入任何参数。
## call
* apply 和 call 基本类似，他们的区别只是传入的参数不同
* 语法:
    ```javascript
    fun.call(thisArg[, arg1[, arg2[, ...]]])
    ```
* apply 和 call 的区别是 call 方法接受的是若干个参数列表，而 apply 接收的是一个包含多个参数的数组
## bind 和 apply、call 区别
* bind()方法创建一个新的函数, 当被调用时，将其this关键字设置为提供的值，在调用新函数时，在任何提供之前提供一个给定的参数序列。
* bind 是创建一个新的函数，我们必须要手动去调用