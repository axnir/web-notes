#  输入URL之后发生了什么

- 用户输入URL
- 浏览器会构建请求（请求方式+路径+版本号）
- 查找强缓存，如果命中直接使用，否则继续执行
- DNS解析域名为ip地址或CNAME，如果使用了CDN，通过CDN服务商域名获取最近的静态资源服务器ip。
- 三次握手建立客户端与服务器之间的TCP连接
- 如果是https的，还需要建立SSL握手过程
- 传输数据，数据包校验，保证数据到达接收方。数据传输过程中如果发生丢包就重新发送数据包，发送过程中有个优化策略，把大包拆成小包一次传输，到目的地后再组装成完整数据包。
- 发送HTTP请求，服务器处理请求，返回响应结果
- 判断Connection字段，如果是keep-alive，则建立持久连接，否则四次挥手断开连接
- 当客户端接收到响应之后，如果响应头Content-Type是text/html，接下来开始解析html字符串
- 标记化算法：输入的HTML文本，输出HTML标记，也即是标记生成器
- 建树算法：解析器创建document对象，标记生成器把每个标记交给建树器创建对应DOM对象，并添加到DOM树中
- 格式化样式表，将CSS文本转化为结构化对象styleSheets
- 标准化样式属性，如em->px、black->#000000、blod->700
- 计算每个节点的具体样式信息，继承父节点的属性和层叠规则
- 遍历DOM树节点，添加到Layout树中
- 对Layout树进行分层，生成Layer Tree分层树
- 为每个图层生成绘制列表，交给合成线程
- 合成线程将图层分成图块，并在光栅化线程池中将图块转化为位图
- 合成线程发送绘制图块命令DrawQuad给浏览器进程
- 浏览器`viz`组件接受命令，把页面绘制到内存
- 发送到显卡成像