# CSS 题目

#### 1. 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改

> `<img src="1.jpg" style="width:480px!important;”>`

答案：

1. `<img src="1.jpg" style="width:480px!important; max-width: 300px">`
2. `<img src="1.jpg" style="width:480px!important; transform: scale(0.625, 1);" >`
3. `<img src="1.jpg" style="width:480px!important; width:300px!important;">`