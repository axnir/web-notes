# Vue面试题

### 对 SPA 单页面的理解

> SPA（ single-page application ）仅在 Web 页面初始化时加载相应的 HTML、JavaScript 和 CSS。一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新加载或跳转；取而代之的是利用路由机制实现 HTML 内容的变换，UI 与用户的交互，避免页面的重新加载。

###### 优点

- 用户体验好、快，内容的改变不需要重新加载整个页面，避免不必要的跳转和重复渲染
- SPA相对对服务器压力小
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理

###### 缺点
- 初次加载耗时多：为实现单页Web应用功能以及显示效果，需要在加载页面时将JavaScript、CSS统一加载，部分页面按需加载
- 前进后退路由管理：由于单页应用在一个页面中显示所有内容，所以不能使用路由器前进后退功能，所有页面切换需要自己建立堆栈管理
- SEO难度大：所有的内容都在一个页面中动态替换显示

###  v-show 与 v-if 有什么区别

**v-if** 是真正的条件渲染，因为他会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是**惰性的**：因为在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时才会开始渲染条件块。

**v-show** 不管条件是都真假都会渲染，为假时相当于display: none;

所以，v-if适用于在运行时很少改变条件，不需要频繁切换条件的场景；v-show则适合于需要非常频繁切换条件的场景。

### Class 与 Style 如何动态绑定

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
> **watch：**更多的是「观察」的作用，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作；

###### 区别

- 功能上：`computed` 是计算属性，也就是依赖其他的属性计算所得出最后的值。`watch`是去监听一个值的变化，然后执行相对应的函数
- 使用上：`computed`中的函数必须要用`return`返回；`watch`的回调里面会传入监听属性的新旧值，通过这两个值可以做一些特定的操作，不是必须要用`return`
- 性能上：`computed`中的函数所依赖的属性没有发生变化，那么调用当前的函数的时候会从缓存中读取，而`watch`在每次监听的值发生变化的时候都会执行回调
- 场景上：`computed`：当一个属性受多个属性影响的时候，例子：购物车商品结算；`watch`：当一条数据影响多条数据的时候，例子：搜索框

###### 运用场景：

- 当需要进行数值计算，并且依赖于其他数据时，应该使用 `computed` ，因为可以利用 `computed` 的缓存特性，避免每次获取值时都需要重复计算；
- 当需要在数据变化执行时异步或者开销较大的操作时，应该使用 `watch` ,使用 `watch` 允许执行异步操作（访问一个API），限制我们执行该操作的频率，并在得到这个最终结果前，设置中间状态。这些都是计算属性无法做到的。

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

### Vue 生命周期

> Vue 实例有一个完整的生命周期，也就是从开始创建、初始化数据、编译模版、挂载 Dom -> 渲染、更新 -> 渲染、卸载等一系列过程，我们称这是 Vue 的生命周期。

| 生命周期钩子  |                           组件状态                           |                          最佳实践                           |
| :-----------: | :----------------------------------------------------------: | :---------------------------------------------------------: |
| beforeCreate  | 实例初始化后，this指向创建的实例，不能访问到data、computed、watch、methods上的方法和数据 |                  常用于初始化非响应式变量                   |
|    created    | 实例创建完成，可访问methods、data、computed、watch上的方法和数据，未挂载到DOM，不能访问$el属性，$ref属性内容为空数组 |               用于页面初始化，简单的ajax请求                |
|  beforeMount  | 在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数 |                              -                              |
|    mounted    | 实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问 |             常用于获取VNode信息和操作，ajax请求             |
| beforeUpdate  |        响应式数据更新时调用，发生在虚拟DOM打补丁之前         | 适合在更新之前访问现有的DOM，比如手动移除已添加的事件监听器 |
|    updated    | 虚拟 DOM 重新渲染和打补丁之后调用，组件DOM已经更新，可执行依赖于DOM的操作 |        避免在这个钩子函数中操作数据，可能陷入死循环         |
|   activated   |              keep-alive 专属，组件被激活时调用               |                              -                              |
|  deactivated  |              keep-alive 专属，组件被销毁时调用               |                              -                              |
| beforeDestroy | 实例销毁之前调用。这一步，实例仍然完全可用，this仍能获取到实例 |     常用于销毁定时器、解绑全局事件、销毁插件对象等操作      |
|   destroyed   | 实例销毁后调用，调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁 |                              -                              |

**注意**

1. `created`阶段的ajax请求与`mounted`请求的区别：前者页面视图未出现，如果请求信息过多，页面会长时间处于白屏状态。

2. `mounted` 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用`vm.nextTick`。

3. Vue2.0 之后主动调用 `$destroy()` 不会移除dom节点，作者不推荐直接 `destroy` 这种做法，如果实在需要这样用可以在这个生命周期钩子中手动移除dom节点。

<img src="..\pics\vue生命周期.png" alt="Vue生命周期" style="zoom:30%;" />

### Vue 的父组件和子组件生命周期钩子函数执行顺序

Vue 的父组件和子组件生命周期钩子函数执行顺序可以归类为以下 4 部分：

- 加载渲染过程

  父 beforeCreate -> 父 created -> 父 beforeMount -> 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted -> 父 mounted

- 子组件更新过程

  父 beforeUpdate -> 子 beforeUpdate -> 子 updated -> 父 updated

- 父组件更新过程

  父 beforeUpdate -> 父 updated

- 销毁过程

  父 beforeDestroy -> 子 beforeDestroy -> 子 destroyed -> 父 destroyed

### 组件的keep-alive

> keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，避免重新渲染。

- 一般结合路由和动态组件一起使用，用于缓存组件。

- 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高。

- 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

### Vue 组件间通信

> Vue 组件间通信只要指以下 3 类通信：父子组件通信、隔代组件通信、兄弟组件通信。

1. **` props / $emit `适用 父子组件通信 **

2. **`ref` 与 `$parent / $children` 适用 父子组件通信**

- ` ref `：如果在普通的 DOM 元素上使用，引用指向的就是 DOM 元素；如果用在子组件上，引用就指向组件实例
- ` $parent / $children `：访问父 、 子实例

3. **`EventBus （$emit / $on）` 适用于 父子、隔代、兄弟组件通信**

   通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。

4. **`$attrs / $listeners` 适用于 隔代组件通信**

- `$attrs`：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 ( class 和 style 除外 )。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过 `v-bind="$attrs"` 传入内部组件。通常配合 inheritAttrs 选项一起使用。
- `$listeners`：包含了父作用域中的 (不含 .native 修饰器的)  v-on 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件

5. **`provide / inject` 适用于 隔代组件通信**

   祖先组件中通过 `provide` 来提供变量，然后在子孙组件中通过 `inject` 来注入变量。 `provide / inject `API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

6. **Vuex 适用于 父子、隔代、兄弟组件通信**

   Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是显式地提交  (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

### vue-router 中常用的 hash 和 history 路由模式实现原理

##### hash 模式的实现原理

> 早期的前端路由的实现就是基于 location.hash 来实现的。其实现原理很简单，location.hash 的值就是 URL 中 # 后面的内容。

hash 路由模式的实现主要是基于下面几个特性：

- URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；

- hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；

- 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用  JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；

- 可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）。

##### history 模式的实现原理

> HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：history.pushState() 和 history.repalceState()。这两个 API 可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：
>
> ```javascript
> window.history.pushState(null, null, path)
> window.history.replaceState(null, null, path)
> ```

history 路由模式的实现主要基于存在下面几个特性：

- ` pushState ` 和 ` repalceState ` 两个 API 来操作实现 URL 的变化 ；
- 我们可以使用 ` popstate `  事件来监听 url 的变化，从而对页面进行跳转（渲染）；
- ` history.pushState() ` 或 ` history.replaceState() ` 不会触发 popstate 事件，这时我们需要手动触发页面跳转（渲染）。

### 虚拟 DOM 的优缺点

##### 优点：

- **保证性能下线：**框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
- **无需手动操作 DOM ：**我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
- **跨平台：**虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

##### 缺点：

- **无法进行极致优化：** 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

### 为什么Vue组件的data是个函数

​	Vue组件可能存在多个实例，如果使用对象形式定义 `data`，则会导致它们共用一个 `data` 对象，那么状态变更将会影响所有组件实例，这是不合理的；采用函数形式定义，在 `initData` 时会将其作为工厂函数返回全新 `data` 对象，有效规避多实例之间状态污染问题。而在Vue根实例创建过程中则不存在该限制，也是因为根实例只能有一个，不需要担心这种情况。

### Vue中key的作用

1. key的作用主要是为了高效的更新虚拟DOM，其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同元素，使得整个patch过程更加高效，减少DOM操作量，提高性能。

2. 若不设置key还可能在列表更新时引发一些隐蔽的bug
3. vue中在使用相同标签名元素的过渡切换时，也会使用到key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过渡效果。