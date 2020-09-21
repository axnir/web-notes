# JS异步加载方式

1. `<script>`的`defer`属性，HTML4新增

2. `<script>`的`async`属性，HTML5新增

`<script>`标签打开defer属性，脚本就会异步加载。渲染引擎遇到这一行命令，就会开始下载外部脚本，但不会等它下载和执行，而是直接执行后面的命令。

`defer `和 `async `的区别在于: `defer`要等到**整个页面在内存中正常渲染结束，才会执行**；

`async`一旦下载完，渲染引擎就会**中断渲染，执行这个脚本以后，再继续渲染**。`defer`是“**渲染完再执行**”，`async`是“**下载完就执行**”。

如果有多个` defer` 脚本，会**按照它们在页面出现的顺序加载**。

多个`async`脚本是**不能保证加载顺序**的。

3. 动态加载script脚本

   ```javascript
   function downloadJS() { 
       varelement = document.createElement("script"); 
       element.src = "XXX.js"; 
       document.body.appendChild(element); 
   }
   //何时的时候，调用上述方法 
   ```

4. 有条件地动态调用脚本

   例如，在页面onload之后