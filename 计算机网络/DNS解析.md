# DNS解析

> DNS（Domain Name System，域名系统），最初，由于 IP 地址长且难记，通过 IP 访问网站不方便。
>
> 所以后来通过发明了 DNS 服务器，这个时候我们访问网站输入网站域名，DNS 服务器就解析我们的域名为 IP。

1. 查询 `www.baidu.com`
2. 访问客户端 DNS 缓存：**浏览器缓存** -> **系统缓存（host）** -> **路由器缓存**
3. 访问 **ISP DNS 服务器**（ISP，互联网服务提供商，有联通电信移动等。如果你是电信网络，则进入电信的 DNS 缓存服务器，以下简称**本地**），如果本地服务器有，则直接返回；如果没有，让本地 DNS 服务器去逐个咨询查找。
4. 本地 DNS 服务器去咨询 **DNS 根服务器**，DNS 根服务器发现是 `.com 区域` 管理的，告诉本地去咨询它。
5. 本地 DNS 服务器去咨询 **.com 顶级域服务器**，.com 域服务器告诉本地去咨询 `baidu.com 主区域` 的服务器。
6. 本地 DNS 服务器去咨询 **baidu.com 主域名服务器**，baidu.com 域服务器查找到对应的 IP 地址，返回给本地。
7. 本地 DNS 云服务器通知用户对方 IP 地址，同时缓存这个 IP 地址，下次就直接访问了。