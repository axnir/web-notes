# Cookie和Session

Session是在无状态的HTTP协议下，服务端记录用户状态时用于标识具体用户的机制。它是在服务端保存的用来跟踪用户的状态的数据结构，可以保存在文件、数据库或者集群中。

**Cookie与Session都能够进行会话跟踪，普通状况下二者均能够满足需求**。

* `Cookie`数据存放在客户的**浏览器（客户端）**上，`Session`数据放在**服务器**上
* 但是服务端的`Session`的实现对客户端的`Cookie`**有依赖关系**的，`Session`的运行依赖`Session ID`，而`Session ID`是存在 Cookie 中的。也就是说，如果浏览器禁用了`Cookie`,`Session`也会失效（但是可以通过其它方式实现，比如在`url`中传递`Session ID`,即`sid=xxxx`
* `Cookie`**不是很安全**，别人可以分析存放在本地的`Cookie`并进行`Cookie`欺骗，考虑到安全应当使用`Session`；
* `Session`会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能。考虑到减轻服务器性能方面，应当使用`Cookie`；
* 单个`Cookie`在客户端的限制在4KB左右,很多浏览器限制一个网站最多20个`Cookie`；

