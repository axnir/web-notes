# CSS相关

## BFC(块级格式化上下文)

### 作用

* 防止`margin`重叠

* 防止元素塌陷(实际数值取塌陷两边较大的值)

* 创建两栏布局

### 创建方式

* `display: flex;`
* `float`为非`none`
* `position`为非`static`或者`relative`
* `overflow`为非`visible`

## 选择器优先级

内联 > ID选择器 > 类/属性/伪类选择器 > 标签选择器 /伪元素

##  link和@import

* link是XHTML标签、@import是**CSS提供**的

* link**可被DOM获取**到，@import不可以

* 页面加载时，link会被**同时加载**，@import会在**页面加载完再加载**

## 隐藏元素

* `dispaly: none`不占空间
* `opacity: 0`全透明效果
* `visibility: hiden`同上
* `overflow: hidden`隐藏溢出部分
* `z-index: -9999`置于底层
* `transform: scale(0,0)`缩放元素到0大小，依然占据空间

## em/rem/px/vw/vh/vmax/vmin区别

* px是像素，绝对大小；rem/em是相对大小，rem基于根元素的font-size，em基于父元素(一般情况下，1em=16px)
* vw、vh、vmax、vmin都是基于视口(viewport)，1vw是视口**宽度**的百分之一，1vh是视口**高度**的百分之一，1vmax、1vmin取视口**宽高最大或最小**的百分之一

##  CSS定位方式position

- static：默认值。正常流
- realtive：相对定位，相对于正常位置
- absolute：基于最近的非static进行定位。
- fixed：基于视口(viewport)位置，相对于浏览器窗口进行绝对定位。
- sticky：粘性定位

##  怎么理解z-index

z-index控制重叠元素的叠加顺序，默认为0，值大的在上层，小的在下层。z-index**只能影响设置了position值的元素**

## 盒模型

盒模型由content(内容)、padding（内边距）、border（边框）、margin（外边距）。

默认情况下，我们定义的width为content的值，即box-sizing：content-box；如果将box-sizing：border-box，此时宽高包括content、padding、border

## 为什么使用translate改变位置而不是定位

`translate()`是`transform`的一个值，改变`translate`或`opacity`不会触发重流（reflow）和重绘（repaint），只会触发复合（compositions）。而绝对定位会触发。

## Reflow和Repaint

### Reflow：

当涉及到DOM节点的布局属性发生变化时，就会重新计算该属性，浏览器会重新描绘相应的元素，此过程叫Reflow（回流或重排）。

例如以下操作会触发回流：

1. 一个 DOM 元素的几何属性变化，常见的几何属性有`width`、`height`、`padding`、`margin`、`left`、`top`、`border` 等等, 这个很好理解。
2. 使 DOM 节点发生`增减`或者`移动`。
3. 读写 `offset`族、`scroll`族和`client`族属性的时候，浏览器为了获取这些值，需要进行回流操作。
4. 调用 `window.getComputedStyle` 方法。

### Repaint：

当影响DOM元素可见性的属性发生变化 (如 color) 时, 浏览器会重新描绘相应的元素, 此过程称为Repaint（重绘）。因此重排必然会引起重绘。

重绘过程：由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，所以当发生重绘的时候，会跳过`生存布局树`和`建立图层树`的阶段，直接到`生成绘制列表`，然后继续进行分块、生成位图等后面一系列操作。

### **如何避免触发Reflow和Repaint**：

1. 避免频繁使用 style，而是采用修改`class`的方式。
2. 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上。
3. 也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的DOM操作不会引发回流和重绘
4. 使用`createDocumentFragment`进行批量的 DOM 操作。
5. 对于 resize、scroll 等进行防抖/节流处理。
6. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
7. 利用 CSS3 的`transform`、`opacity`、`filter`这些属性可以实现合成的效果，也就是`GPU`加速。

## 浏览器渲染过程

1. 解析HTML生成DOM树。
2. 解析CSS生成CSS规则树。
3. 将DOM树与CSS规则树合并在一起生成渲染树（render tree）。
4. 遍历渲染树开始布局，计算每个节点的位置大小信息。
5. 将渲染树每个节点绘制到屏幕。