# JS的语言组成

- 基本语法：C
- 数据类型 内存管理：Java
- 函数式编程：Scheme 函数是第一等公民
- 原型继承：Self 基于原型prototype的继承机制

# 奇葩的JS



```javascript
('b'+'a'+ + 'a'+'a'+ +'').toLowerCase()//"banana0"
0 == '0' //true
0 == [] //true
'0' == [] //false
typeof NaN //number
99999999999//100000000000
0.1+0.2==0.3//false 精度丢失
Math.max()//-Infinity 负无穷
Math.min()//Infinity 正无穷
[] + [] //""
[] + {} //"[object object]"
{} + [] // 0
true + true + true===3 //true
true - true //0
(!+[]+[]+![]).length//9 "truefalse"
9 + "1" //91
91 - "1" //90
[] == false //true
0==false //true
undefined == false //true
NaN == false //true
"" == false //true 包括多空格
null == false //true
```

# 语言特性

动态类型语言 JS 编译环境JIT Just In Time Compilation

静态类型语言 C++ 编译环境 AOT Ahead Of Time

**JIT**

js引擎运用了一项技术叫运行时编译 JIT

白话就是：在运行时编译成机器代码

**AOT**

在运行前提前生成好机器代码

**JS引擎**

将js代码编译成机器能够识别的代码

常见的有：

1. 谷歌V8
2. 苹果 - javaScriptCore
3. 火狐 - SpideMonkey
4. QuickJs
5. FaceBook - Hermes

# 编译流程

1. parser - 将js源码通过parser解析器生成AST 抽象语法树
2. interpreter - 通过解释器将AST编程成功字节码bytecode (字节码与平台无关，是中间层，可以在各个平台上运行)
3. compiler - 根据当前平台编译出相应的机器代码也就是汇编代码 常见的操作系统平台有：IA32 X64 ARM MIPS

# 版本差异

V8在5.9之前 是没有字节码的环节