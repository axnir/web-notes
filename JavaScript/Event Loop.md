# Event Loop

> 在`JavaScript`中，任务被分为两种，一种宏任务（`MacroTask`）也叫`Task`，一种叫微任务（`MicroTask`）。

####  MacroTask（宏任务）

​	`script`全部代码、`setTimeout`、`setInterval`、`I/O`、`UI Rendering`

#### MicroTask（微任务）

​	`Promise.then catch finally`、 `MutationObserver`、`Process.nextTick（Node独有）`

## 浏览器中的Event Loop

> `Javascript` 有一个 `main thread` 主线程和 `call-stack` 调用栈(执行栈)，所有的任务都会被放到调用栈等待主线程执行。

#### JS调用栈

​	JS调用栈采用的是后进先出的规则，当函数执行的时候，会被添加到栈的顶部，当执行栈执行完成后，就会从栈顶移出，直到栈内被清空。

#### 同步任务和异步任务

​	`Javascript`单线程任务被分为**同步任务**和**异步任务**，同步任务会在调用栈中按照顺序等待主线程依次执行，异步任务会在异步任务有了结果后，将注册的回调函数放入任务队列中等待主线程空闲的时候（调用栈被清空），被读取到栈内等待主线程的执行。

​	任务队列`Task Queue`，即队列，是一种先进先出的一种数据结构。

<img src="..\pics\任务队列.jpg" alt="任务队列" style="zoom:60%;" />

在执行栈空的时候，主线程会从任务队列中取任务来执行，其过程如下：

1. 选择最先进入队列的宏任务执行（最开始是 script 整体代码）

2. 检查是否存在微任务，如果存在，执行微任务队列中得所以任务，直至清空微任务队列

3. 重复以上步骤

#### 例子

###### 题目

```javascript
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end') 
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')

// 执行结果
script start
async2 end
Promise
script end
async1 end
promise1
promise2
setTimeout
```

###### 解析

​	这里需要先理解`async/await`。

​	`async/await` 在底层转换成了 `promise` 和 `then` 回调函数。也就是说，这是 `promise` 的语法糖。每次我们使用 `await`, 解释器都创建一个 `promise` 对象，然后把剩下的 `async` 函数中的操作放到 `then` 回调函数中。

​	`async/await` 的实现，离不开 `Promise`。从字面意思来理解，`async` 是“异步”的简写，而 `await` 是 	`async wait` 的简写可以认为是等待异步方法执行完成。