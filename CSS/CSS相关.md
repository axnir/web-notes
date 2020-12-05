## CSS 相关

#### 1.BFC(块级格式化上下文)

> 块格式化上下文（Block Formatting Context，BFC）是一个独立的渲染区域，让处于 BFC 内部的元素与外部的元素相互隔离，使内外元素的定位不会相互影响。

###### 通俗来讲

- BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。
- 如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。

###### 创建方式

- 根元素或者包含根元素的元素

* `display`为`inline-block`或`flex`或`inline-flex`或`table-cell`或`table-caption`
* `float`不为`none`（可以为`left` `right` `inherit`）
* `position`不为`static`或者`relative`（可以为`absolute` `fixed`）
* `overflow`不为`visible`（可以为`hidden` `auto` `scroll`）
###### BFC 的布局规则

- 内部的盒模型会在垂直方向按照顺序一个接一个的排列
- 同一个 BFC 内部的相邻元素的 margin 会重叠
- BFC 相当于页面上的独立隔离容器，里面的子元素和外部元素相互不影响
- 计算 BFC 容器的高度时，浮动元素也参与计算
- 同一个 BFC 内部每个盒子的左外边框紧挨着包含块的左边框（从右到左的格式，则为紧挨右边框），即使存在也是这样

#### 2.选择器优先级

- `!important` > 内联 > ID选择器 > 类/属性/伪类选择器 > 标签选择器 /伪元素 > * > 继承 > 默认

- 选择器 **从右往左** 解析

####  3.link和@import

* link是XHTML标签、@import是**CSS提供**的

* link**可被DOM获取**到，@import不可以

* 页面加载时，link会被**同时加载**，@import会在**页面加载完再加载**

#### 4.隐藏元素

* `dispaly: none`不占空间，重排
* `opacity: 0`全透明效果
* `visibility: hiden`同上，重绘
* `overflow: hidden`隐藏溢出部分，重绘
* `z-index: -9999`置于底层
* `transform: scale(0,0)`缩放元素到0大小，依然占据空间

#### 5.em/rem/px/vw/vh/vmax/vmin区别

* px是像素，绝对大小；rem/em是相对大小，rem基于根元素的font-size，em基于父元素(一般情况下，1em=16px)
* vw、vh、vmax、vmin都是基于视口(viewport)，1vw是视口**宽度**的百分之一，1vh是视口**高度**的百分之一，1vmax、1vmin取视口**宽高最大或最小**的百分之一

####  6.CSS 定位方式 position

- static：默认值。正常流
- realtive：相对定位，相对于正常位置
- absolute：基于最近的非static进行定位。
- fixed：基于视口(viewport)位置，相对于浏览器窗口进行绝对定位。
- sticky：粘性定位

####  7.怎么理解z-index

z-index控制重叠元素的叠加顺序，默认为0，值大的在上层，小的在下层。z-index**只能影响设置了position值的元素**

#### 8.盒模型

盒模型由content(内容)、padding（内边距）、border（边框）、margin（外边距）。

默认情况下，我们定义的width为content的值，即box-sizing：content-box；如果将box-sizing：border-box，此时宽高包括content、padding、border

#### 9.为什么使用translate改变位置而不是定位

`translate()`是`transform`的一个值，改变`translate`或`opacity`不会触发重流（reflow）和重绘（repaint），只会触发复合（compositions）。而绝对定位会触发。

#### 10.浏览器渲染过程

1. 解析HTML生成DOM Tree；
2. 解析CSS生成CSSOM Rule Tree；
3. 将DOM Tree与CSSOM Rule Tree合并在一起生成渲染树（render tree）；
4. 遍历渲染树开始布局，计算每个节点的位置大小信息；
5. 将渲染树每个节点绘制到屏幕。

#### 11.Reflow和Repaint

###### Reflow：

当涉及到DOM节点的布局属性发生变化时，就会重新计算该属性，浏览器会重新描绘相应的元素，此过程叫Reflow（回流或重排）。

例如以下操作会触发回流：

1. 一个 DOM 元素的几何属性变化，常见的几何属性有`width`、`height`、`padding`、`margin`、`left`、`top`、`border` 等等, 这个很好理解。
2. 使 DOM 节点发生`增减`或者`移动`。
3. 读写 `offset`族、`scroll`族和`client`族属性的时候，浏览器为了获取这些值，需要进行回流操作。
4. 调用 `getComputedStyle` 方法。

###### Repaint：

当影响DOM元素可见性的属性发生变化 (如 color) 时, 浏览器会重新描绘相应的元素, 此过程称为Repaint（重绘）。因此重排必然会引起重绘。

重绘过程：由于没有导致 DOM 几何属性的变化，因此元素的位置信息不需要更新，所以当发生重绘的时候，会跳过`生存布局树`和`建立图层树`的阶段，直接到`生成绘制列表`，然后继续进行分块、生成位图等后面一系列操作。

###### **如何避免触发Reflow和Repaint**：

1. 避免频繁使用 style，而是采用修改`class`的方式。
2. 将动画效果应用到`position`属性为`absolute`或`fixed`的元素上。
3. 也可以先为元素设置`display: none`，操作结束后再把它显示出来。因为在`display`属性为`none`的元素上进行的DOM操作不会引发回流和重绘。
4. 使用`createDocumentFragment`进行批量的 DOM 操作。
5. 对于 resize、scroll 等进行防抖/节流处理。
6. 避免频繁读取会引发回流/重绘的属性，如果确实需要多次使用，就用一个变量缓存起来。
7. 利用 CSS3 的`transform`、`opacity`、`filter`这些属性可以实现合成的效果，也就是`GPU`加速。

#### 12.display的值及作用


- block	块类型。默认宽度为父元素宽度，可设置宽高，换行显示。
- none	元素不显示，并从文档流中移除。
- inline	行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。
- inline-block 默认宽度为内容宽度，可以设置宽高，同行显示。
- list-item	像块类型元素一样显示，并添加样式列表标记。
- table	此元素会作为块级表格来显示。
- inherit	规定应该从父元素继承display属性的值。

#### 13.position 的值 relative 和 absolute 定位原点

- absolute
生成绝对定位的元素，相对于值不为static的第一个父元素的padding box进行定位，也可以理解为离自己这一级元素最近的
一级position设置为absolute或者relative的父元素的padding box的左上角为原点的。

- fixed（老IE不支持）
生成绝对定位的元素，相对于浏览器窗口进行定位。

- relative
生成相对定位的元素，相对于其元素本身所在正常位置进行定位。

- static
默认值。没有定位，元素出现在正常的流中（忽略top,bottom,left,right,z-index声明）。

- inherit
规定从父元素继承position属性的值。

#### 14. CSS 中可继承的属性

>  每一个属性在定义中都给出了这个属性是否具有继承性，一个具有继承性的属性会在没有指定值的时候，会使用父元素的同属性的值来作为自己的值。

一般具有继承性的属性有，字体相关的属性，font-size 和 font-weight 等；文本相关的属性，color 和 text-align 等；表格的一些布局属性、列表属性如 list-style 等；还有光标属性 cursor 、元素可见性 visibility 。

当一个属性不是继承属性的时候，我们也可以通过将它的**值设置为inherit来使它从父元素那获取同名的属性值来继承**。

#### 15. CSS 伪类和伪元素

<img src="..\pics\伪类.png" alt="伪类" style="zoom:80%;" />

<img src="..\pics\伪元素.png" alt="伪元素" style="zoom:100%;" />

**P.S.具体信息点击文章[总结伪类与伪元素](http://www.alloyteam.com/2016/05/summary-of-pseudo-classes-and-pseudo-elements/)**

#### 16.CSS3 有哪些新特性？

```css
新增各种CSS选择器	（:not(.input)：所有class不是“input”的节点）
圆角		（border-radius:8px）
多列布局	（multi-column layout）
阴影和反射	（Shadow\Reflect）
文字特效		（text-shadow）
文字渲染		（Text-decoration）
线性渐变		（gradient）
旋转			（transform）
缩放，定位，倾斜，动画，多背景
例如：transform:\scale(0.85,0.90)\translate(0px,-30px)\skew(-9deg,0deg)\Animation
```

#### 16.CSS3 的 Flex box（弹性盒布局模型）

> Flex 是 Flexible Box 的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。
任何一个容器都可以指定为Flex布局。行内元素也可以使用Flex布局。注意，设为Flex布局以后，子元素的 float、clear 和 vertical-align 属性将失效。
采用 Flex 布局的元素，称为 Flex 容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

###### 使用方法

> 容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿主轴排列。


以下6个属性设置在**容器**上。

- `flex-direction`属性决定主轴的方向（即项目的排列方向）。

- `flex-wrap`属性定义，如果一条轴线排不下，如何换行。

- `flex-flow`属性是`flex-direction`属性和`flex-wrap`属性的简写形式，默认值为`row nowrap`。

- `justify-content`属性定义了项目在主轴上的对齐方式。

- `align-items`属性定义项目在交叉轴上如何对齐。

- `align-content`属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。


以下6个属性设置在**项目**上。

- `order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为`0`。

- `flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

- `flex-shrink`属性定义了项目的缩小比例，默认为`1`，即如果空间不足，该项目将缩小。

- `flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

- `flex`属性是`flex-grow`，`flex-shrink`和`flex-basis`的简写，默认值为`0 1 auto`。

- `align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

#### 17.为什么需要清除浮动？清除浮动的方式

> ​	浮动元素可以左右移动，直到遇到另一个浮动元素或者遇到它外边缘的包含框。浮动框不属于文档流中的普通流，当元素浮动之后，不会影响块级元素的布局，只会影响内联元素布局。此时文档流中的普通流就会表现得该浮动框不存在一样的布局模式。当包含框的高度小于浮动框的时候，此时就会出现“高度塌陷”。
​	清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

###### 清除浮动方式

1. 使用 `clear` 属性清除浮动

2. 使用 BFC 块级格式化上下文来清除浮动。

   因为BFC元素不会影响外部元素的特点，所以BFC元素也可以用来清除浮动的影响，因为如果不清除，子元素浮动则父元素高度塌陷，必然会影响后面元素布局和定位，这显然有违BFC元素的子元素不会影响外部元素的设定。

