# 使用ES5实现一个继承？

## 组合继承(原型链+构造函数继承)

组合继承指的是**将原型链和借用构造函数技术组合到一块**，从而发挥二者之长的一种继承模式。基本思路：

使用原型链实现对原型属性和方法的继承，通过借用构造函数来实现对实例属性的继承，既通过在原型上定义方法来实现了函数复用，又保证了每个实例都有自己的属性。

```javascript
function SuperType() {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}
SuperType.prototype.sayName = function() {
    console.log(this.name);
}

function SubType(name, age) {
    SuperType.call(this, name);
    this.age = age;
}
SubType.prototype = new SuperType();
SubType.prototype.constructor = SubType;

SubType.prototype.sayAge = function() {
    console.log(this.age);
}
```

## 寄生组合式继承

所谓寄生组合式继承，即通过**借用构造函数来继承属性，通过原型链的混成**形式来继承方法，基本思路：

不必为了指定子类型的原型而调用超类型的构造函数，我们需要的仅是超类型原型的一个副本，本质上就是使用寄生式继承来继承超类型的原型，然后再将结果指定给子类型的原型。寄生组合式继承的基本模式如下所示：

```javascript
function inheritPrototype(subType, superType) {
    var prototype = Object.create(superType.prototype); //创建对象
    prototype.constructor = subType;//增强对象
    subType.prototype = prototype;//指定对象
}
```

- 第一步：创建超类型原型的一个副本
- 第二步：为创建的副本添加 `constructor` 属性
- 第三步：将新创建的对象赋值给子类型的原型