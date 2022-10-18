# MongoDB 入门

#### 基本命令

- `show dbs`：显示已有数据库，如果你刚安装好，会默认有local、admin(config)，这是MongoDB的默认数据库，在新建库时是不允许起这些名称的。

- `use admin`：进入数据，也可以理解成为使用数据库。成功会显示：switched to db admin。

- `show collections`：显示数据库中的集合（关系型中叫表）。

- `db`： 显示当前位置，也就是你当前使用的数据库名称。

- `use db`(建立数据库):  use 不仅可以进入一个数据库，如果你敲入的库不存在，它还可以帮你建立一个库。但是在没有集合前，它还是默认为空。

- `db.集合.insert()`：新建数据集合和插入文件（数据），当集合没有时，这时候就可以新建一个集合，并向里边插入数据。Demo：`db.user.insert({“name”:”Amy”})`。

- `db.集合.find()`：查询所有数据，这条命令会列出集合下的所有数据，可以看到MongoDB是自动给我们加入了索引值的。Demo：`db.user.find()`。

- `db.集合.findOne()`：查询第一个文件数据，**所有MongoDB的组合单词都使用首字母小写的驼峰式写法**。

- `db.集合.update({查询},{修改})`：修改文件数据，第一个是查询条件，第二个是要修改成的值。

  Demo：`db.user.update({"name":"Amy"}, {"name":"Amy", "gender":"female"})`。

- `db.集合.remove(条件)`：删除文件数据，注意的是**要跟一个条件**。Demo：`db.user.remove({“name”:”Amy”})`。

- `db.集合.drop()`：删除整个集合。

- `db.dropDatabase()`：删除整个数据库，**在删除库时，一定要先进入数据库，然后再删除**。

#### 使用 JavaScript 来操作数据库

```javascript
let userName = 'Amy' // 登录名
let timeStamp = Date.parse(new Date()) // 登录时间戳
let jsonDatebase = {"loginName": userName, "loginTime": timeStamp} // JSON数据
const db = connect('log') // 连接数据库
db.login.insert(jsonDatebase) // 插入数据

print('[demo]log  print success')  // 没有错误显示成功
```

#### 批量插入

```javascript
db.test.insert([
    {"_id":1},
    {"_id":2},
    {"_id":3}
])
```

#### update 修改器

- `$set`修改器

  ```javascript
  db.user.update({"name":"Amy"},{"$set":{"age": 21}})
  ```

  **修改嵌套内容(内嵌文档)**

  ```javascript
  db.user.update({"name":"Amy"},{"$set":{"skill.skillThree": "word"}})
  ```

- `$unset`用于将 key 删除

  ```javascript
  db.user.update({"name":"Amy"},{"$unset":{"age": ""}})
  ```
  
- `$inc`对数字进行计算
  
  ```javascript
  db.user.update({"name":"Amy"},{$inc:{"age": -2}})
  ```
  
- `multi`选项
  
  要把每个人的爱好也加入进来，但是如果你直接写会只加一个，比如下面这种形式。
  
  ```javascript
  db.user.update({},{$set:{interset:[]}})
  ```
  
  这时候你用`db.user.find()`查找，你会发现只改变了第一个数据，其他两条没有改变。这时候我们想改变就要用到`multi`选项。
  
  ```javascript
  db.workmate.update({},{$set:{interset:[]}},{multi: true})
  ```
  
- `upsert`选项
  
  upsert是在找不到值的情况下，直接插入这条数据。比如我们这时候又来了一个新同事xiaoWang，我们这时候修改他的信息，age设置成20岁，但集合中并没有这条数据。这时候可以使用upsert选项直接添加。
  
  ```javascript
  db.user.update({name:'xiaoWang'},{$set:{age:20}},{upsert:true})
  ```
  
  



