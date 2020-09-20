# JS面向对象基础
JavaScript对每个创建的对象都会设置一个原型，指向它的原型对象
* **面向对象核心规则**
    1. **所有的函数对象都有一个原型对象** ` prototype `
    2. **所有的对象上都有一个隐式对象** ` _proto_ ` **指向创建该对象的构造函数的原型**
    3. **所有的原型上都有一个** `constructor ` **指向该原型所在的构造函数本身**

* 构造函数模式
    >所谓构造函数，就是普通函数，但是内部使用了this变量，对构造函数使用new运算符，就能生成实例，并且this变量会绑定在实例对象上
    ```javascript
    function Cat(name,color) {
        this.name = name
        this.color = color
    }
    let cat1 = new Cat("大黄", "黄色")
    let cat2 = new Cat("大白", "白色")
    /*
    这时cat1和cat2会自动含有一个constructor属性，指向它们的构造函数  
    cat1.constructor == Cat 
    */
    ```
    此方法的弊端：如果所执行的方法都是一样的，但都要生成一个实例，就很占内存。instanceof 验证原型对象与实例对象之间的关系

    alert(cat1 instanceof Cat); //true
    
    前面（cat1）必须是复杂数据类型
* prototype模式

    每一个构造函数都有一个` prototype `属性，指向另一个对象。这个对象的属性和方法，都会被构造函数的实例继承。

    为了解决构造函数占用重复内存，我们将共有的属性和方法放在` prototype `对象上（公共区域）
    ```javascript
    Cat.prototype.eat = function({
        alert("吃老鼠")}
    cat1.eat == cat2.eat //true
    ```
    * prototype模式验证方法

        * ` isPrototypeOf() ` 
        
        用来判断某个某个对象的原型与某个实例之间的关系
        ```javascript
        Cat.prototype.isPrototypeOf(cat1)
        ```
        * ` hasownProperty() ` 
        
        每个对象都有一个hasownproperty()方法，用来判断某一个属性到底是本地属性，还是继承prototype（继承下的）对象的属性
        * in运算符
        用来判断实例对象是否含有某个属性，不管是不是本地属性还是继承属性；还in可以用来遍历某个对象的所有属性
        ```javascript
        for (var key in cat1) {
            alert(`cat1[ ${key}  ]=` + cat1[key])
        }
        ```
* 继承
    * 构造函数绑定

    使用 ` call `，` apply `方法将父对象的构造函数绑定在子对象上
    ```javscript
    function Cat(name, age) {
        Animal.call(this, arguments)//继承Animal
        this.name = name
        this.age = age
    }
    ```
    * prototype模式

    如果Cat的` prototype `指向一个Animal实例那么所有Cat的实例都能继承Animal了
    ```javascript
    Cat.prototype = new Animal()
    //此时的Cat.prototype.constructor==Animal;cat1明明是用构造函数Cat生成的，因此我们必须手动矫正
    Cat.prototype.constructor = Cat
    let cat1 = new Cat()
    ```
    * 直接继承
        ```javascript
        Cat.prototype = Animal.prototype
        Cat.prototype = Cat
        Cat.constructor = Cat
        ```
        **但是改变Cat原型，Animal的原型也会改变。不可取**
    * 空对象继承
        ```javascript
        //创建一个空的函数对象
        let F = function () {};
        //将该函数对象的原型指向父对象的原型
        F.prototype = Parent.prototype;
        //删除了子对象prototype 对象原先的值，然后赋予一个新值
        Child.prototype = new F();
        //将gnaij改变的constructor指向改回原来的指向
        Child.prototype.constructor = Child
        ```
    * 拷贝继承
        ```javascript
        function extend2(Child, Parent) {
            var p = Parent.prototype
            var c = Child.prototype
            for (var i in p) {
                c[i] = p[i]
            }
            c.uber = p
        }
        ```