# Cookie、localStorage和sessionStorage

这三者都是用来存储客户端临时信息的对象,储存在客户端

* `Cookie`：使用`expires`设置失效时间或者使用 `max-age` 设置存活时长，没有设置的话，默认是关闭浏览器后失效；浏览器生成的默认是关闭浏览器后失效
* `localStorage`：声明周期是永久，除非用户主动在浏览器上清除信息，否则这些信息将永远存在
* `sessionStorage`：生命周期为当前窗口或标签页，一旦窗口或标签页被关闭，所有通过其存储的数据也会被清空

## 三者的异同
<table>
	<thead>
		<tr>
			<th>特性</th>
			<th>Cookie</th>
			<th>localStorage</th>
			<th>sessionStorage</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>数据的生命期</td>
			<td>一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效</td>
			<td>除非被清除，否则永久保存</td>
			<td>仅在当前会话下有效，关闭页面或浏览器后被清除</td>
		</tr>
		<tr>
			<td>存放数据大小</td>
			<td>4K左右</td>
			<td colspan="2">一般为5MB</td>
		</tr>
		<tr>
			<td>与服务器端通信</td>
			<td>每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题</td>
			<td colspan="2">仅在客户端（即浏览器）中保存，不参与和服务器的通信</td>
		</tr>
		<tr>
			<td>易用性</td>
			<td>需要程序员自己封装，原生的Cookie接口不友好</td>
			<td colspan="2">原生接口可以接受，亦可再次封装来对Object和Array有更好的支持</td>
		</tr>
	</tbody>
</table>


 		不同浏览器无法共享`localStorage`或`sessionStorage`中的信息。相同浏览器的不同页面间可以共享相同的 `localStorage`（页面属于相同域名和端口），但是不同页面或标签页间无法共享`sessionStorage`的信息。这里需要注意的是，页面及标签页仅指顶级窗口，如果一个标签页包含多个`iframe`标签且他们属于同源页面，那么他们之间是可以共享`sessionStorage`的。

* `Cookie`的使用方法

  ```javascript
  //封装setCookie函数
  function setCookie(name, value, iTime) {
      let oDate = new Date()
      oDate.setTime(oDate.getTime() + iTime)//用毫秒计算
      document.cookie = name + '=' + value + ';expires=' + oDate
  }
  //封装getCookie函数
  function getCookie(name) {
      let arr = document.cookie.split('; ')
      for (let item of arr) {
          let elem = item.split('=')
          if (elem[0] === name) {
              return elem[1]
          }
      }
      return ''
  }
  //封装removeCookie函数
  function removeCookie(name) {
      setCookie(name, '', -1)
  }
  ```

  

* `localStorage`和`sessionStorage`使用时使用相同的API：
  
  ```javascript
  localStorage.setItem('myCat', 'Tom')
  let cat = localStorage.getItem('myCat')
  localStorage.removeItem('myCat')
  localStorage.clear()	// 移除所有
  ```

`localStorage`的除了get的API都会触发storage事件，可以利用这个来做不同标签页的通信，比如多个页面的购物车数据同步

## 应用场景

* `Cookie`：**判断用户是否登录**，针对登录过的用户，服务器端会在他登录时往 Cookie 中插入一段加密过的唯一辨识单一用户的辨识码，下次只要读取这个值就可以判断当前用户是否登录啦。

* `localStorage`：**保存用户在电商网站的购物车信息**、**HTML5游戏产生的一些本地数据**

* `sessionStorage`：**内容特别多的表单**，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写

## 安全性的考虑

​		需要注意的是，不是什么数据都适合放在 Cookie、localStorage 和 sessionStorage 中的。使用它们的时候，需要时刻注意是否有代码存在 XSS 注入的风险。因为只要打开控制台，你就随意修改它们的值，也就是说如果你的网站中有 XSS 的风险，它们就能对你的 localStorage 肆意妄为。所以千万不要用它们存储你系统中的敏感数据。

## Cookie 和 Session 对比

`Session`是在无状态的HTTP协议下，服务端记录用户状态时用于标识具体用户的机制。它是在服务端保存的用来跟踪用户的状态的数据结构，可以保存在文件、数据库或者集群中。

**Cookie与Session都能够进行会话跟踪，普通状况下二者均能够满足需求**。

* `Cookie`数据存放在客户的**浏览器（客户端）**上，`Session`数据放在**服务器**上
* 但是服务端的`Session`的实现对客户端的`Cookie`**有依赖关系**的，`Session`的运行依赖`Session ID`，而`Session ID`是存在 Cookie 中的。也就是说，如果浏览器禁用了`Cookie`,`Session`也会失效（但是可以通过其它方式实现，比如在`url`中传递`Session ID`,即`sid=xxxx`;
* `Cookie`**不是很安全**，别人可以分析存放在本地的`Cookie`并进行`Cookie`欺骗，考虑到安全应当使用`Session`；
* `Session`会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能。考虑到减轻服务器性能方面，应当使用`Cookie`；
* 单个`Cookie`在客户端的限制在4KB左右,很多浏览器限制一个网站最多20个`Cookie`。