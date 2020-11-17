# Vue生命周期

### Vue2 生命周期

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

### Vue3 周期

- `setup()` :开始创建组件之前，在`beforeCreate`和`created`之前执行。创建的是`data`和`method`。
- `onBeforeMount()` : 组件挂载到节点上之前执行的函数。
- `onMounted()` : 组件挂载完成后执行的函数。
- `onBeforeUpdate()`: 组件更新之前执行的函数。
- `onUpdated()`: 组件更新完成之后执行的函数。
- `onBeforeUnmount()`: 组件卸载之前执行的函数。
- `onUnmounted()`: 组件卸载完成后执行的函数。
- `onActivated()`: 被包含在`<keep-alive>`中的组件，会多出两个生命周期钩子函数。被激活时执行。
- `onDeactivated()`: 比如从 A 组件，切换到 B 组件，A 组件消失时执行。
- `onErrorCaptured()`: 当捕获一个来自子孙组件的异常时激活钩子函数（以后用到再讲，不好展现）。

与 vue2 的对应关系

```js
Vue2---------------Vue3
beforeCreate  -> setup
created       -> setup
beforeMount   -> onBeforeMount
mounted       -> onMounted
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
activated     -> onActivated
deactivated   -> onDeactivated
errorCaptured -> onErrorCaptured
```

