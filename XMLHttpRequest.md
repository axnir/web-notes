# AJAX XMLHttpRequest使用
### get请求
``` javascript
// 1.创建XMLHttpRequest对象
const oAjax = new XMLHttpRequest()
// 2.设置请求参数。open(方法,url,是否异步)
oAjax.open('get','a.md',true)
// 3.发送请求
oAjax.send()
// 4.注册时间。onreadystatechange事件，状态改变时调用
oAjax.onreadystatechange = function () {
        /* 
        属性：请求状态
            0: 未初始化 还没有调用 open() 方法
            1: 开始载入 已调用 send() 方法，正在发送请求
            2: 载入完成send() 发送完成，已收到全部响应内容
            3: 解析 正在解析响应内容
            4: 完成 响应内容解析完成，可以在客户端调用了
        */
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                fnSucc(oAjax.responseText)
            } else {
                fnFaild(oAjax.status)
            }
        }
}
```
### post请求
```javascript
// 1.创建XMLHttpRequest对象
const oAjax = new XMLHttpRequest()
// 2.设置请求参数。open(方法,url,是否异步)
oAjax.open('post','a.md',true)
// 如果想要使用post提交数据,必须添加此行
oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
// 3.发送请求
oAjax.send(info)
// 4.注册时间。onreadystatechange事件，状态改变时调用
oAjax.onreadystatechange = function () {
        /* 
        属性：请求状态
            0: 未初始化 还没有调用 open() 方法
            1: 开始载入 已调用 send() 方法，正在发送请求
            2: 载入完成send() 发送完成，已收到全部响应内容
            3: 解析 正在解析响应内容
            4: 完成 响应内容解析完成，可以在客户端调用了
        */
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                fnSucc(oAjax.responseText)
            } else {
                fnFaild(oAjax.status)
            }
        }
}
```
### 服务器响应的内容
* responseText：获得字符串形式的响应数据。
* responseXML：获得 XML 形式的响应数据。
