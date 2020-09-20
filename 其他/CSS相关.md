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

* px是像素，绝对大小；rem/rem是相对大小，rem基于根元素的font-size，em基于父元素(一般情况下，1em=16px)
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