# Vue面试题

### 对SPA单页面的理解

> SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

###### 优点

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免不必要的跳转和重复渲染
- SPA相对对服务器压力小
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理

###### 缺点
- 初次加载耗时多：为实现单页Web应用功能以及显示效果，需要在加载页面时将JavaScript、CSS统一加载，部分页面按需加载
- 前进后退路由管理：由于单页应用在一个页面中显示所有内容，所以不能使用路由器前进后退功能，所有页面切换需要自己建立堆栈管理
- SEO难度大：所有的内容都在一个页面中动态替换显示

### v-show与v-if有什么区别

**v-if**是真正的条件渲染，因为他会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**：因为在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时才会开始渲染条件块。

**v-show**不管条件是都真假都会渲染，为假时相当于display: none;

所以，v-if适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show则适合于需要非常频繁切换条件的场景。

### Class与Style如何动态绑定

Class可以通过对象语法和数组语法进行动态绑定：

- 对象语法：

  ```vue
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  
  data() {
      return {
  		isActive: true,
  		hasError: false
      }
  }
  ```
  
- 参数语法：

    ```vue
    <div :class="[isActive ? activeClass : '', errorClass]"></div>
    
    ```

data() {
    	return {
    		activeClass: 'active',
    		errorClass: 'text-danger'
    	}
    }
    ```

Style也可以通过对象语法和数组语法进行动态绑定

- 对象语法：

  ```vue
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  
  data() {
  	return {
  		activeColor: 'red',
  		fontSize: 30
  	}
  }
  ```

- 数组语法：

  ```vue
  <div :style="[styleColor, styleSize]"></div>
  
  data() {
  	return {
  		styleColor: {
  			color: 'red'
  		},
  		styleSize: {
  			fontSize: '30px'
  		}
  	}
  }
  ```


### Vue单向数据流

所有的prop都使其父子 prop 之间形成一个**单项下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来不行。这样会防止子组件意外改变父级组件的状态，从而导致应用的数据流难以理解。

其次，每次父级组件发生变化时，子组件所有的 prop 都将会刷新为最新的值。这意味着不应该在一个子组件内部改变 prop 。如果修改，Vue会在浏览器控制台中发出警告。子组件想修改时，只能通过 $emit 派发一个自定义事件，父组件收到后，由父组件修改。

有两种常见的试图改变一个 prop 的情形：

- **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用**。在这种情况下，最好定义一个本地的 data 属性并将这 prop 用作其初始值：

  ```javascript
  props: ['initialCounter'],
  data () {
  	return {
  		counter: this.initialCounter
  	}
  }
  ```
  
- **这个 prop 以一种原始的值传入且需要进行转换**。在这种情况下，最好使用这个 prop 的值来定义一个计算属性：

  ```javascript
  props: ['size'],
  computed: {
      normallizedSize () {
          return this.size.trim().toLowerCase()
      }
  }
  ```

### computed 和 watch 的区别和运用场景

>  **computed：**是计算属性，依赖其他属性值，并且 computed 的值有缓存，只有它依赖的属性值发生变化，下一次获取 computed 的值时才会重新计算 computed 的值；
>
> **watch：**更多的是「观察」的作用，类似于某些数据的监听回调，每当坚挺的数据变化时都会执行回调进行后续操作；

###### 运用场景：

- 当需要进行数值计算，并且依赖于其他数据时，应该使用 computed ，因为可以利用 computed 的缓存特性，避免每次获取值时都需要重复计算；
- 当需要在数据变化执行时异步或者开销较大的操作时，应该使用 watch ,使用 watch 允许执行异步操作（访问一个API），限制我们执行该操作的频率，并在得到这个最终结果前，设置中间状态。这些都是计算属性无法做到的。

### 什么是MVVM

> Model–View–ViewModel （MVVM） 是一个软件架构设计模式，MVVM 源自于经典的 Model–View–Controller（MVC）模式  ，MVVM 的出现促进了前端开发与后端业务逻辑的分离，极大地提高了前端开发效率，MVVM 的核心是 ViewModel 层，它就像是一个中转站（value converter），负责转换 Model 中的数据对象来让数据变得更容易管理和使用，该层向上与视图层进行双向数据绑定，向下与 Model 层通过接口请求进行数据交互，起呈上启下作用。

<img src="..\pics\MVVM.jpg" alt="MVVM" style="zoom:60%;" />

(1) View 层

​	View 是视图层，也就是用户界面。前端主要由 HTML 和 CSS 来构建 。

(2) Model层

​	Model 是指数据模型，泛指后端进行的各种业务逻辑处理和数据操控，对于前端来说就是后端提供的 api 接口。

(3) ViewModel层

​	ViewModel 是由前端开发人员组织生成和维护的视图数据层。在这一层，前端开发者对从后端获取的 Model 数据进行转换处理，做二次封装，以生成符合 View 层使用预期的视图数据模型。需要注意的是 ViewModel 所封装出来的数据模型包括视图的状态和行为两部分，而 Model 层的数据模型是只包含状态的，比如页面的这一块展示什么，而页面加载进来时发生什么，点击这一块发生什么，这一块滚动时发生什么这些都属于视图行为（交互），视图状态和行为都封装在了 ViewModel 里。这样的封装使得 ViewModel 可以完整地去描述 View 层。

##### 特点：

MVVM 框架实现了**双向绑定**，这样 ViewModel 的内容会实时展现在 View 层，前端开发者再也不必低效又麻烦地通过操纵 DOM 去更新视图，MVVM 框架已经把最脏最累的一块做好了，我们开发者只需要处理和维护 ViewModel，更新数据视图就会自动得到相应更新。这样 View 层展现的不是 Model 层的数据，而是 ViewModel 的数据，由 ViewModel 负责与 Model 层交互，这就完全解耦了 View 层和 Model 层，这个解耦是至关重要的，它是前后端分离方案实施的重要一环。

###### 实例：

View 层：

```html
<div id="app">
    <p>{{message}}</p>
    <button @click="showMessage">Click me</button>
</div>
```

ViewModel 层：

```javascript
let app = new Vue({
    el: '#app',
    data: { //用来描述视图状态
        message: 'Hello Vue!'
    },
    methods: {
        showMesssage () {
            alert(this.message)
        }
    },
    created () {
        ajax({
            url: '/server/api',
            success (res) {
                this.message = res
            }
        })
    }
})
```

Model层：

```javascript
{
    "url": "/server/api",
    "res": {
        "success": true,
        "name": "Name",
        "domain": "www.example.com"
    }
}
```

