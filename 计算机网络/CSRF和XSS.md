# CSRF和XSS

### CSRF

> CSRF（Cross-site request forgery）即**跨站请求伪造**。**是一种劫持受信任用户向服务器发送非预期请求**的攻击方式，通常情况下，它是**攻击者借助受害者的 Cookie 骗取服务器的信任**，但是它并不能拿到Cookie，也看不到Cookie的内容，它能做的就是给服务器发送请求，然后执行请求中所描述的命令，以此来改变服务器中的数据，也就是并不能窃取服务器中的数据。

##### 类型：

- **自动发起 Get 请求**

  ```html
  <!DOCTYPE html>
  <html>
    <body>
      <h1>黑客的站点：CSRF 攻击演示</h1>
      <img src="https://jsliang.top/index.html?user=hacker&number=100">
    </body>
  </html>
  ```

  黑客将转账的请求接口隐藏在 `img` 标签内，欺骗浏览器这是一张图片资源。

  当该页面被加载时，浏览器会自动发起 `img` 的资源请求，如果服务器没有对该请求做判断的话，那么服务器就会认为该请求是一个转账请求，于是用户账户上的 100 块就被转移到黑客的账户上去了。

- **自动发起 POST 请求**

  ```html
  <!DOCTYPE html>
  <html>
  <body>
    <h1>黑客的站点：CSRF 攻击演示</h1>
    <form id='hacker-form' action="https://jsliang.top" method=POST>
      <input type="hidden" name="user" value="hacker" />
      <input type="hidden" name="number" value="100" />
    </form>
    <script>
      document.getElementById('hacker-form').submit();
    </script>
  </body>
  </html>
  ```

  在页面中构建了一个隐藏的表单，该表单的内容就是极客时间的转账接口。

  当用户打开该站点之后，这个表单会被自动执行提交；当表单被提交之后，服务器就会执行转账操作。

  因此使用构建自动提交表单这种方式，就可以自动实现跨站点 POST 数据提交。

- **引诱用户点击链接**

  ```html
  <div>
    <img width=150 src=http://images.xuejuzi.cn/1612/1_161230185104_1.jpg>
    </div>
  <div>
    <a href="https://jsliang.top?user=hacker&number=100" taget="_blank">
      点击下载美女照片
    </a>
  </div>
  ```

  传说中的色诱，或者 “点击即送 100w 元” 之类的。

##### 防御措施：

- 验证`token`：浏览器请求服务器时，服务器返回一个 `token` ，每个请求都需要同时带上` token` 和 `cookie` 才会被认为是合法请求。
- 验证`Referer`：通过验证请求头的 `Referer` 来验证来源站点，但请求头很容易伪造。
- 设置`SameSite`：设置 `cookie` 的 `SameSite` ，可以让 `cookie `不随跨站请求发出，但浏览器兼容不一致。

### XSS

> XSS（Cross Site Script）**跨站脚本攻击**。指的是**攻击者向网页注入恶意的客户端代码，通过恶意的脚本对客户端网页进行篡改，从而在用户浏览网页时，对用户浏览器进行控制或者获取用户隐私数据**的一种攻击方式。

##### 类型：

- **存储型**：即攻击被存储在服务端，常见的是在评论区插入攻击脚本，如果脚本被储存到服务端，那么所有看见对应评论的用户都会受到攻击。

- **反射型**：攻击者将脚本混在URL里，服务端接收到URL将恶意代码当做参数取出并拼接在HTML里返回，浏览器解析此HTML后即执行恶意代码。

- **DOM型**：攻击者通过各种手段将恶意脚本注入用户的页面中，例如通过网络劫持（WiFi 路由器劫持、本地恶意软件劫持等）在页面传输过程中修改 HTML 页面内容。

##### 防御措施：

- **输入检查**：对输入内容中的`script`和`<iframe>`等标签进行转义或者过滤。
- **设置 httpOnly**：很多XSS攻击目标都是窃取用户 `cookie` 伪造身份认证，设置此属性可防止JS获取 `cookie`。
- **开启CSP**：即开启白名单，可阻止白名单以外的资源加载和运行。

