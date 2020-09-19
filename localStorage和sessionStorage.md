# localStorage和sessionStorage

这两者都是用来存储客户端临时信息的对象

* `localStorage`声明周期是永久，除非用户主动在浏览器上清除`localStorage`信息，否则这些信息将永远存在
* `sessionStorage`生命周期为当前窗口或标签页，一旦窗口或标签页被永久关闭了，那么所有通过`sessionStorage`存储的数据也就被清空了

不同浏览器无法共享`localStorage`或`sessionStorage`中的信息。相同浏览器的不同页面间可以共享相同的 `localStorage`（页面属于相同域名和端口），但是不同页面或标签页间无法共享`sessionStorage`的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个`iframe`标签且他们属于同源页面，那么他们之间是可以共享`sessionStorage`的

使用时使用相同的API：

* `localStorage.setItem('myCat', 'Tom')`
* `let cat = localStorage.getItem('myCat')`
* `localStorage.removeItem('myCat')`
* `localStorage.clear()	// 移除所有`

`localStorage`的除了get的API都会触发storage事件，可以利用这个来做不同标签页的通信，比如多个页面的购物车数据同步