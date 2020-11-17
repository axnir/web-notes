# CSS 选择器

### 选择器

```
（1）id选择器（#myid）
（2）类选择器（.myclassname）
（3）标签选择器（div,h1,p）
（4）后代选择器（h1 p）
（5）相邻后代选择器（子）选择器（ul>li）
（6）兄弟选择器（li~a）
（7）相邻兄弟选择器（li+a）
（8）属性选择器（a[rel="external"]）
（9）伪类选择器（a:hover,li:nth-child）
（10）伪元素选择器（::before、::after）
（11）通配符选择器（*）
```

### CSS 属性选择器 *=, |=, ^=, $=, *= 的区别

1. **attribute 中包含 value:**
   
    * [attribute~=value] 属性中包含独立的单词为 value，例如：
        ```html
        [title~=flower]  -->  <img src="/i/eg_tulip.jpg" title="tulip flower" />
        ```
    * [attribute*=value] 属性中做字符串拆分，只要能拆出来 value 这个词就行，例如：
        ```html
        [title*=flower]   -->  <img src="/i/eg_tulip.jpg" title="ffffflowerrrrrr" />
        ```
2. **attibute 以 value 开头:**
   
    * [attribute|=value] 属性中必须是完整且唯一的单词，或者以 - 分隔开，例如：
        ```html
        [lang|=en]     -->  <p lang="en">  <p lang="en-us">
        ```
    * [attribute^=value] 属性的前几个字母是 value 就可以，例如：
        ```html
        [lang^=en]    -->  <p lang="ennn">
        ```
3. **attribute 以 value 结尾:**

    * [attribute$=value] 属性的后几个字母是 value 就可以，例如：
        ```html
        a[src$=".pdf"]
        ```