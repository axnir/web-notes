# 异步加载js脚本的方法

#### `<script>` 标签中增加 `async`(html5) 或者 `defer`(html4) 属性,脚本就会异步加载。

```javascript
<script src="../XXX.js" defer></script>
```

`defer` 和 `async` 的区别在于：

- `defer` 要等到整个页面在内存中正常渲染结束（DOM 结构完全生成，以及其他脚本执行完成），在`window.onload` 之前执行
- `async` 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染
- 如果有多个 `defer` 脚本，会按照它们在页面出现的顺序加载
- 多个 `async` 脚本不能保证加载顺序

#### 动态创建 `script` 标签

动态创建的 `script` ，设置 `src` 并不会开始下载，而是要添加到文档中，JS文件才会开始下载

```javascript
let script = document.createElement('script');
script.src = 'XXX.js';
// 添加到html文件中才会开始下载
document.body.append(script);
```

#### XHR 异步加载JS

```javascript
let xhr = new XMLHttpRequest();
xhr.open("get", "js/xxx.js",true);
xhr.send();
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
        eval(xhr.responseText);
    }
}
```