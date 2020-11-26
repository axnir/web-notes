# 异步加载js脚本的方法

#### `<script>` 标签中增加 `async`(html5) 或者 `defer`(html4) 属性

> 加载 `defer` 和 `async` 的脚本都不会阻塞页面的渲染。

```javascript
<script src="../XXX.js" defer></script>
```

`async` 和 `defer` 有一个共同点：加载这样的脚本都不会阻塞页面的渲染。因此，用户可以立即阅读并了解页面内容。

但是，它们之间也存在一些本质的区别：

|         |                             顺序                             |                     **DOMContentLoaded**                     |
| :-----: | :----------------------------------------------------------: | :----------------------------------------------------------: |
| `async` | **加载优先顺序**。脚本在文档中的顺序不重要 —— 先加载完成先执行 | 不相关。可能在文档加载完成前加载并执行完毕。如果脚本很小或者来自于缓存，同时文档足够长，就会发生这种情况。 |
| `defer` |              **文档顺序**（它们在文档中的顺序）              | 在文档加载和解析完成之后（如果需要，则会等待），即在 `DOMContentLoaded` 之前执行。 |

在实际开发中，`defer` 用于需要整个 DOM 的脚本，和/或脚本的相对执行顺序很重要的时候。

`async` 用于独立脚本，例如计数器或广告，这些脚本的相对执行顺序无关紧要。

#### 动态创建 `script` 标签

动态创建的 `script` ，设置 `src` 并不会开始下载，而是要添加到文档中，JS文件才会开始下载

```javascript
let script = document.createElement('script')
script.src = 'XXX.js'
// 添加到html文件中才会开始下载
document.body.append(script)
```

#### XHR 异步加载JS

```javascript
let xhr = new XMLHttpRequest();
xhr.open("get", "js/xxx.js",true)
xhr.send()
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        eval(xhr.responseText)
    }
}
```