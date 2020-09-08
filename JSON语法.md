# JSON语法
JSON(JavaScript Object Notation)：是ECMAScript的子集。作用是进行数据的交换。语法更为简洁，网络传输、机器解析都更为迅速。
### 语法规则：
* 数据在键值对中
* 数据由逗号分隔
* 花括号保存对象
* 方括号保存数组
### 数据类型：
* 数字（整数或浮点数）
* 字符串（在双引号中）
* 逻辑值（true 或 false）
* 数组（在方括号中）
* 对象（在花括号中）
* null
### 示例：
```javascript
// 对象
{
  "name":"fox",
  "age":"18",
  "sex":"true",
  "car":null
}

// 数组
[
  {
      "name":"小小胡",
      "age":"1"
  },
  {
      "name":"小二胡",
      "age":"2"
  }
]
```