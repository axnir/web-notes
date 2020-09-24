# Event Loop
* JS引擎是单线程的
* 拥有任务队列 (Task Queue)
* Event Loop：不断循环任务队列
* 主线程=>微任务=>宏任务
  * 微任务：`Promise.then catch finally` `MutationObserver`
  * 宏任务：`I/O` `setTimeout` `setInterval` `requestAnimationFrame`