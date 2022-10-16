# JS中函数的调用

函数调用的方法有4种

1. 作为一个函数调用

   例如：

   ```javascript
   var name = "windowsName";
   function a() {
       var name = "Cherry";
       console.log(this.name);          // windowsName
       console.log("inner:" + this);    // inner: Window
   }
   a();
   console.log("outer:" + this)         // outer: Window
   ```
   
   这样一个最简单的函数，**不属于任何一个对象**，就是一个函数，这样的情况在 JavaScript 的在浏览器中的**非严格模式默认是属于全局对象 window 的，在严格模式，就是 undefined**。 

   但这是一个**全局的函数**，很**容易产生命名冲突**，所以不建议这样使用。

2. 函数作为方法（对象中的函数称为方法）调用

   例如：

   ```javascript
   var name = "windowsName";
   var a = {
       name: "Cherry",
       fn : function () {
           console.log(this.name);      // Cherry
       }
   }
   a.fn();
   ```

   **这是使用最多的情况**，例子中定义一个对象 `a`，对象 `a` 有一个属性（`name`）和一个方法（`fn`）。

   然后对象 `a` 通过 `.` 方法调用了其中的 `fn` 方法。

   然后我们一直记住的那句话“**this 永远指向最后调用它的那个对象**”，所以在`fn`中的 this 就是指向` a `的。

3. 使用构造函数调用

   >如果函数调用前使用了 new 关键字, 则是调用了构造函数。
   >这看起来就像创建了新的函数，但实际上 JavaScript 函数是重新创建的对象：
   
   ```javascript
   // 构造函数:
   function myFunction(arg1, arg2) {
       this.firstName = arg1;
       this.lastName  = arg2;
   }
   
   // This creates a new object
   var a = new myFunction("Li","Cherry");
   a.lastName; 	// 返回 "Cherry"
   ```
   
   在 `new` 的过程中，我们是使用 `call` 改变了 `this` 的指向
   
4. 作为函数方法调用函数（call、apply）

   > 在 JavaScript 中, 函数是对象。
   >
   > JavaScript 函数有它的属性和方法。
   > call() 和 apply() 是预定义的函数方法。 两个方法可用于调用函数，两个方法的第一个参数必须是对象本身
   >
   > 在 JavaScript 严格模式(strict mode)下, 在调用函数时第一个参数会成为 this 的值， 即使该参数不是一个对象。
   > 在 JavaScript 非严格模式(non-strict mode)下, 如果第一个参数的值是 null 或 undefined, 它将使用全局对象替代。

   例子1：

   ```javascript
   var name = "windowsName";
   function fn() {
       var name = 'Cherry';
       innerFunction();
       function innerFunction() {
           console.log(this.name);      // windowsName
       }
   }
   fn();
   ```

   这里的 `innerFunction()` 的调用是不是属于第一种调用方式：作为一个函数调用（它就是作为一个函数调用的，没有挂载在任何对象上，所以对于没有挂载在任何对象上的函数，在非严格模式下 this 就是指向 window 的）
   
   例子2：
   
   ```javascript
   var name = "windowsName";
   var a = {
       name : "Cherry",
       func1: function () {
           console.log(this.name)     
       },
       func2: function () {
           setTimeout(  function () {
               this.func1()
           },100 );
       }
   };
   a.func2()     // this.func1 is not a function
   ```
   
   这个简单一点的理解可以理解为“**匿名函数的 this 永远指向 window**”，你可以这样想，还是那句话**this 永远指向最后调用它的那个对象**，那么我们就来找最后调用匿名函数的对象，这就很尴尬了，因为匿名函数名字啊，笑哭，所以我们是没有办法被其他对象调用匿名函数的。所以说 匿名函数的 this 永远指向 window。
   
   如果这个时候你要问，那匿名函数都是怎么定义的，首先，我们通常写的匿名函数都是自执行的，就是在匿名函数后面加 `()` 让其自执行。其次就是虽然匿名函数不能被其他对象调用，但是可以被其他函数调用啊，比如例子2 中的 `setTimeout`。