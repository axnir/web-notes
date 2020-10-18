# Vue-router相关

#### 动态路由匹配

> 经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，我们有一个 User 组件，对
> 于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，我们可以在 vue-router 的路由路径中
> 使用“动态路径参数”(dynamic segment) 来达到这个效果：

**使用`this.$route.params`来获取传入的信息**

范例：

```vue
<div>
	<h2>detail page</h2>
	<p>{{$route.params.name}} ...</p>
</div>
```

router/index.js

```javascript
{
	path: '/course/:name',
	component: () => import('../views/Detail.vue')
}
```

列表中的导航

```vue
<router-link :to="`/course/${c.name}`">
	{{ c.name }} - {{ c.price | currency('￥') }}
</router-link>
```

##### 通配符

适合做404页面路由

```javascript
{
	// 会匹配所有路径
	path: '*',
	component: () => import('../views/404.vue')
}
```



#### 编程导航

>  借助 router 的实例方法，可编写代码来实现编程式导航

**this.$router.push(location, onComplete?, onAbort?) **

```javascript
// 字符串
this.$router.push('home')
// 对象
this.$router.push({ path: 'home' })
// 命名的路由
this.$router.push({ name: 'user', params: { userId: '123' }})
// 带查询参数，变成 /register?plan=private
this.$router.push({ path: 'register', query: { plan: 'private' }})
```

#### 命名路由

> 通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。
> 你可以在创建 Router 实例的时候，在 routes 配置中给某个路由设置名称。

```javascript
const router = new VueRouter({
	routes: [
		{
			path: '/user/:userId',
			name: 'user',
			component: User
		}
	]
})
```

要链接到一个命名路由，可以给 `router-link` 的 `to` 属性传一个对象：

```vue
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link>
```

调用 `router.push() `时：

```javascript
router.push({ name: 'user', params: { userId: 123 }})
```



#### 路由守卫

> `vue-router`提供的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航的过程中：全局的，单个路由独享的，或者组件级的。

- 全局路由守卫

    ```javascript
    router.beforeEach((to, from, next) => {
        // ...
        // to: Route: 即将要进入的目标路由对象
        // from: Route: 当前导航正要离开的路由
        // next: Function: 调用该方法来resolve beforeEach钩子
    })
    ```

    例子：

    ```javascript
    router.beforeEach((to, from, next) => {
        if (to.meta.auth) {
            if (window.isLogin) {
                next()
        } else {
            next('/login?redirect='+to.fullPath)
        }
        } else {
            next()
        }
    })
    ```

- 路由独享的守卫

  > 可以路由配置上直接定义 beforeEnter 守卫：

  ```javascript
  {
  	path: '/about',
  	name: 'about',
  	// ...
  	beforeEnter(to, from, next) {
  		if (to.meta.auth) {
  			if (window.isLogin) {
  				next()
  			} else {
  				next('/login?redirect=' + to.fullPath)
  			}
  		} else {
  			next()
      	}
  	}
  }
  ```

- 组件内的守卫

  可以在路由组件内直接定义以下路由导航守卫：

  - beforeRouteEnter

  - beforeRouteUpdate

  - beforeRouteLeave
  
  ```javascript
  beforeRouteEnter(to, from, next) {
  	if (window.isLogin) {
  		next();
  	} else {
  		next("/login?redirect=" + to.fullPath);
  	}
  }
  ```

#### 动态路由

> 通过`router.addRoutes(routes)`方式动态添加路由

```javascript
// 全局守卫修改为：要求用户必须登录，否则只能去登录页
router.beforeEach((to, from, next) => {
	if (window.isLogin) {
		if (to.path === '/login') {
			next('/')
		} else {
			next()
		}
	} else {
		if (to.path === '/login') {
			next()
		} else {
			next('/login?redirect=' + to.fullPath)
		}
	}
})
```

```javascript
// Login.vue用户登录成功后动态添加/about
login() {
	window.isLogin = true;
	this.$router.addRoutes([{
			path: "/about", //...
		}
	]);
	const redirect = this.$route.query.redirect || "/";
	this.$router.push(redirect);
}
```

#### 路由组件缓存

> 利用keepalive做组件缓存，保留组件状态，提高执行效率

范例：缓存about组件

```vue
<keep-alive include="about">
	<router-view></router-view>
</keep-alive>
```

> 使用include或exclude时要给组件设置name（设置在vue文件的export default里面）
> 两个特别的生命周期：activated、deactivated

#### 路由懒加载

> 路由组件的懒加载能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应
> 组件，会更加高效。
>
> ```vue
> () => import(/* webpackChunkName: "group-about" */ "../views/About.vue")
> ```

