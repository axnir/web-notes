# Vuex 相关

## 组件之间共享数据的方式

- 父向子传值：`v-bind`属性绑定 `props`接收
- 子向父传值：`v-on`事件绑定 `$emit`监听
- 姐妹组件之间共享数据：`EventBus`
  	- `$on`接收数据的组件
    - `$emit`发送数据的组件

- 使用Vuex，Vuex是实现组件全局状态（数据）管理的一种机制，可以方便的实现组件之间数据的共享

  - 优点：

    - 能够在Vuex中集中管理共享的数据，易于开发和后期维护

    - 能够高效地实现组件之间的数据共享，提高开发效率

    - 存储在Vuex中的数据都是响应式的，能够实时保持数据与页面的同步
  -   一般情况下，只有组件之间共享的数据才有必要存储到Vuex中；对于组件中的私有数据，依旧存储在组件自身的`data`中即可

## Vuex核心概念

### State

`State`提供唯一的公共数据源，所有共享的数据都要统一放到`Store`的`State`中进行存储

```javascript
// 创建store数据源，提供唯一公共数据
const store = new Vuex.Store({
    state: { count:0 }
})
```

###### 组件访问State中数据的方式

- ```javascript
    this.$store.state.全局数据名称
    ```
  
- ```javascript
  // 1.从vuex中按需导入mapState函数
  import { mapState } from 'vuex'
  ```
  通过导入`mapState`函数，将当前组件需要的全局数据映射为当前组件的`computed`计算属性

  ```javascript
  // 2.将全局数据映射为当前组建的计算属性
  computed: {
      ...mapState(['count'])
  }
  ```

### Mutation

Mutation用于变更Store中的数据

- 只能通过Mutation变更Store数据，不可以直接操作Store中的数据
- 可以集中监控所有数据的变化
- 不可以进行异步操作

###### 触发Mutation的方式

  - ```javascript
// 定义Mutation
    const store = new Vuex.Store({
        state: {
            count: 0
        },
        mutations: {
            add(state) {
                // 变更状态
                state.count++
            },
            // 可以有两个参数
            subN (state, step) {
              // 变更状态
              state.count -= step
            }
        }
    })
    ```
    
    ```javascript
    // 触发Mutation
    methods: {
        handelCount1 () {
            // 触发mutation的第一种方式
            // commit就是调用mutations里的函数
            this.$store.commit('add')
        },
        handleCount2 () {
          // 可以传参数
          this.$store.commit('subN', 10)
        }
    }
    ```
    
- ```javascript
  // 1. 从vuex中按需导入mapMutations函数
  import { mapMutation } from 'vuex'
  ```

  通过导入mapMutations函数，将需要的mutations函数，映射为当前组件的methods方法：

  ```javascript
  // 2. 将指定的mapMutation函数映射为当前组件的methods函数
  methods: {
      ...mapMutations(['add', 'addN'])
  }
  ```

### Action

Action用于处理异步任务

如果通过异步操作变更数据，必须通过Action，不能使用Mutation，但是在Action中还是要通过触发Mutation的方式间接变更数据。

###### 触发方式

- ```javascript
  // 定义 Action
  const store = new Vuex.Store({
    mutations: {
        add (state) {
            state.count++
        },
        addN (state, step) {
          // 变更状态
          state.count += step
    	}
    },
    actions: {
        addAsync (context) {
            setTimeout(() => {
                context.commit('add')
            }, 1000)
        },
        addNAsync (context, step) {
            setTimeout(() => {
                context.commit('addN', step)
            }, 1000)
        }
    }
  })
  ```

  ```javascript
    // 触发 Action
    methods: {
        handle1 () {
            // 触发actions的第一种方式
            this.$store.dispatch('addAsync')
        },
        handle2 () {
            // 可以传参数
            this.$store.dispatch('addNAsync', 10)
        }
    }
  ```

- ```javas
  // 1.从vuex中按需导入mapActions函数
  import { mapActions } from 'vuex'
  ```

  通过导入的mapAction函数，将需要的actions函数映射为当前组件的methods方法

  ```javascript
  // 2. 将指定的actions函数映射为当前组件的methods函数
  methods: {
      ...mapActions(['addAsync', 'addNSync'])
  }
  ```

### Getter

Getter用于对Store中的数据进行加工处理形成新的数据

- Getter用于对Store中的数据进行加工处理形成新的数据，类似于Vue的计算属性

- Stroe中的数据发生变化，Getter的数据也会跟着变化

###### Getter的定义

  ```javascript
// 定义Getter
const store = new Vuex.Store({
	state: {
		count: 0
	},
	getters: {
		showNum: state => {
            return '当前最新数据是【' + state.count + '】'
        }
	}
})
  ```
###### 调用方式

- ```javascript
  this.$store.getters.全局函数名称
  ```

- ```javascript
  // 1.从vuex中按需导入mapGetters函数
  import { mapGetters } from 'vuex'
  ```

  ```javascript
  // 2.将全局数据映射为当前组建的计算属性
  computed: {
      ...mapGetters(['showNum'])
  }
  ```