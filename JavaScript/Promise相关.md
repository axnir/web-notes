# Promise相关

#### Promise三种状态

* Pending ----Promise对象实例创建时的初始状态

* Fulfilled-----成功时的状态

* Rejected-----失败时的状态

Promise一旦从等待状态变成为其他状态就永远不能更改状态了

#### Promise的链式调用

* 每次调用返回的都是一个新的Promise实例(这就是then可用链式调用的原因)
* 如果then中返回的是一个结果的话会把这个结果传递下一次then中的成功回调
* 如果then中出现异常,会走下一个then的失败回调
* 在then中使用了return，那么return的值会被Promise.resolve() 包装
* then中可以不传递参数，如果不传递会透到下一个then中
* catch 会捕获到没有捕获的异常

#### async/await

* async/await是基于Promise实现的，它不能用于普通的回调函数
* async/await与Promise一样，是非阻塞的
* async/await使得异步代码看起来像同步代码，写法优雅，处理 then 的调用链，能够更清晰准确的写出代码