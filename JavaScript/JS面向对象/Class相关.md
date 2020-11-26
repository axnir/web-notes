# Class相关

#### 继承

ES6新增的语法糖，语法与Java类继承的语法相似,使用`extends`继承

实例：

```javascript
class Animal {
    constructor(name) {
        this.name = name
    }
    sayName () {
        console.log('My name is ' + this.name + '.')
    }
}
class Cat extends Animal {
    constructor(name, age) {
        super(name)
        this.age = age
    }
    sayHi () {
        super.sayName()
        console.log('Hi,I am ' + this.age + ' years old.')
    }
}
```

#### super 关键字

> `super`关键字，既可以当作函数使用，也可以当作对象使用。

**第一种情况**，`super`作为函数调用时，代表父类的构造函数。ES6 要求，子类的构造函数必须执行一次`super`函数。

注意，`super`虽然代表了父类`A`的构造函数，但是返回的是子类`B`的实例，即`super`内部的`this`指的是`B`的实例，因此`super()`在这里相当于`A.prototype.constructor.call(this)`。

```javascript
class A {
  constructor() {
    console.log(new.target.name);
  }
}
class B extends A {
  constructor() {
    super();
  }
}
new A() // A
new B() // B
```

作为函数时，`super()`只能用在子类的构造函数之中，用在其他地方就会报错。

```javascript
class A {}

class B extends A {
  m() {
    super(); // 报错
  }
}
```

**第二种情况**，`super`作为对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。

具体见：[Class 的继承 - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/class-extends))