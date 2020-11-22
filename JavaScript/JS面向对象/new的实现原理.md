# new的实现原理

1. 创建空对象 `obj`
2. 将新创建的空对象的隐式原型指向其构造函数的显式原型（将函数的`prototype`赋值给对象的`__proto__`属性）
3. 执行构造函数（传入相应的参数，如果没有参数就不用传），同时 this 指向这个新实例 （使用 `call` 改变 `this` 的指向）
4. 如果无返回值或者返回一个非对象值，则将 `obj` 返回作为新对象；如果返回值是一个对象的话那么直接直接返回该对象。

##### 手写new

```javascript
function myNew(func, ...args) {
  // 1. 判断方法体
  if (typeof func !== 'function') {
    throw '第一个参数必须是方法体'
  }

  // 2. 创建新对象 obj
  const obj = {}

  // 3. obj 的 __proto__ 指向 func 这个类的原型对象
  // 即实例可以访问构造函数原型（constructor.prototype）所在原型链上的属性
  obj.__proto__ = Object.create(func.prototype)

  // 4. 通过 apply 绑定 this 执行并且获取运行后的结果
  let result = func.apply(obj, args)
  
  // 5. 如果构造函数返回的结果是引用数据类型，则返回运行后的结果
  if (result && (typeof result === 'object' || typeof result === 'function')) {
      return result
  }
  // 否则返回新创建的 obj
  return obj
}
```

