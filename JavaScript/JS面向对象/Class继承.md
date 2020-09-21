# Class继承

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

