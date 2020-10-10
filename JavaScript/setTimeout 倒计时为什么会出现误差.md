# setTimeout 倒计时为什么会出现误差

`setTimeout` 只能保证延时或间隔不小于设定的时间。因为它实际上只是将回调添加到了宏任务队列中，但是如果主线程上有任务还没有执行完成，它必须要等待。

如果你对前面这句话不是非常理解，那么有必要了解一下 JS的运行机制。

#### JS的运行机制

（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。

（2）主线程之外，还存在"任务队列"(task queue)。

（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。

（4）主线程不断重复上面的第三步。

如 `setTimeout(()=>{callback();}, 1000)` ，即表示在1s之后将 `callback` 放到宏任务队列中，当1s的时间到达时，如果主线程上有其它任务在执行，那么 `callback` 就必须要等待，另外 `callback` 的执行也需要时间，因此 `setTimeout` 的时间间隔是有误差的，它只能保证延时不小于设置的时间。

#### 如何减少 `setTimeout` 的误差

我们只能减少执行多次的 `setTimeout` 的误差，例如倒计时功能。

倒计时的时间通常都是从服务端获取的。造成误差的原因：

1.没有考虑误差时间（函数执行的时间/其它代码的阻塞）

2.没有考虑浏览器的“休眠”

完全消除 `setTimeout`的误差是不可能的，但是我们减少 `setTimeout` 的误差。通过对下一次任务的调用时间进行修正，来减少误差。

```javascript
let count = 0;
let countdown = 5000; //服务器返回的倒计时时间
let interval = 1000;
let startTime = new Date().getTime();
let timer = setTimeout(countDownStart, interval); //首次执行
//定时器测试
function countDownStart() {
    count++;
    const offset = new Date().getTime() - (startTime + count * 1000);
    const nextInterval = interval - offset; //修正后的延时时间
    if (nextInterval < 0) {
        nextInterval = 0;
    }
    countdown -= interval;
    console.log("误差：" + offset + "ms，下一次执行：" + nextInterval + "ms后，离活动开始还有：" + countdown + "ms");
    if (countdown <= 0) {
        clearTimeout(timer);
    } else {
        timer = setTimeout(countDownStart, nextInterval);
    }
}
```

如果当前页面是不可见的，那么倒计时会出现大于100ms的误差时间。因此在页面显示时，应该重新从服务端获取剩余时间进行倒计时。当然，为了更好的性能，当倒计时不可见(Tab页切换/倒计时内容不在可视区时)，可以选择停止倒计时。

为此，我们可以监听 `visibityChange` 事件进行处理。