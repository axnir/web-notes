# TypeScript 特性

### TypeScript 特性
1. TypeScript是由微软开发的开源编程语言
2. TypeScript 是 JavaScript 的超集
3. TypeScript 是开发大型应用的基石
4. TypeScript 提供了更丰富的语法提示
5. TypeScript 在编译阶段能够检查错误

### 2.TypeScript 是静态类型，JavaScript是动态类型

### 3. 数据类型：
- JavaScript中：
    原始数据类型：`boolean` `string` `number` `null` `undefined` `symbol` `bigint`
    引用数据类型：`object`

- TypeScript中：
    基础类型：`boolean` `string` `number` `null` `undefined` `symbol` `bigint` `any` `never`
    对象：`interface` 
    数组：`number[]` `string[]` `boolean[]` 泛型写法：`Array<number>`

- 函数的注解：
	
- 新的语法特性：
	- `as` 断言
  
  - `class` (OOP  面向对象三大特征) ：封装、继承、多态
  
### 4 基础

#### 4.1 原始数据
- **布尔值**：
  
  > 使用 `boolean` 定义布尔值类型
  
  ```typescript
let isDone:boolean = false
  ```

  事实上 `new Boolean()` 返回的是一个 `Boolean` 对象：
  
  ```typescript
let isDone:boolean = Boolean(1)
  ```

    但不可使用
  
  ```typescript
  let isDone:boolean = new Boolean(1)
  // Type 'Boolean' is not assignable to type 'boolean'.
// 'boolean' is a primitive, but 'Boolean' is a wrapper object. Prefer using 'boolean' when possible.
  ```

  在 TypeScript 中，`boolean` 是 JavaScript 中的基本类型，而 `Boolean` 是 JavaScript 中的构造函数。其他基本类型（除了 `null` 和 `undefined`）一样。
  
- **数值**：

  > 使用 `number` 定义数值类型

  ```typescript
  let decLiteral: number = 6
  let hexLiteral: number = 0xf00d
  // ES6 中的二进制表示法，会被编译成十进制数
  let binaryLiteral: number = 0b1010
  // ES6 中的八进制表示法，会被编译成十进制数
  let octalLiteral: number = 0o744
  let notANumber: number = NaN
  let infinityNumber: number = Infinity
  ```

- **字符串**：

  > 使用 `string` 定义字符串类型
  
  ```typescript
  let catName: string = 'Tom'
  ```
  
- **空值**：
  
  > 在 TypeScript 中，可以用 `void` 表示没有任何返回值的函数
  
  ```typescript
  function alertName(): void {
      alert('My name is Tom')
  }
  ```
  
  声明一个 `void` 类型的变量没有什么用，因为你只能将它赋值为 `undefined` 和 `null`：
  
  ```typescript
let unusable: void = undefined
  ```
  
- **Null 和 Undefined**：

  > 可以使用 `null` 和 `undefined` 来定义这两个原始数据类型
  
  ```typescript
  let u: undefined = undefined
let n: null = null
  ```

  与 `void` 的区别是，`undefined` 和 `null` 是所有类型的子类型。也就是说 `undefined` 类型的变量，可以赋值给 `number` 类型的变量：
  
  ```typescript
  // 这样不会报错
  let num: number = undefined
  // 这样也不会报错
  let u: undefined
let num: number = u
  ```

  而 `void` 类型的变量不能赋值给 `number` 类型的变量：
  
  ```typescript
  let u: void
  let num: number = u
  
  // Type 'void' is not assignable to type 'number'.
  ```

#### 4.2 任意值：

> 任意值（Any）用来表示允许赋值为任意类型。**变量如果在声明的时候，未指定其类型，也没有赋值，那么它会被识别为任意值类型**。**声明一个变量为任意值之后，对它的任何操作，返回的内容的类型都是任意值**

```typescript
let something: any
something = 'seven'
something = 7
```

#### 4.3 类型推断

>  如果没有明确的指定类型，那么 TypeScript 会依照类型推论（Type Inference）的规则推断出一个类型。

#### 4.4 联合类型

> 联合类型（Union Types）表示取值可以为多种类型中的一种。

```typescript
let myFavoriteNumber: string | number
myFavoriteNumber = 'seven'
myFavoriteNumber = 7
```

联合类型使用 `|` 分隔每个类型。

这里的 `let myFavoriteNumber: string | number` 的含义是，允许 `myFavoriteNumber` 的类型是 `string` 或者 `number`，但是不能是其他类型。

当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性或方法**：

```typescript
function getLength(something: string | number): number {
    return something.length;
}

// index.ts(2,22): error TS2339: Property 'length' does not exist on type 'string | number'.
// Property 'length' does not exist on type 'number'.
```

上例中，`length` 不是 `string` 和 `number` 的共有属性，所以会报错。

#### 4.5 对象的类型——接口

> 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implement）。

```typescript
interface Person {
  readonly id: number // 只读属性
  name: stirng // 确定属性
  age?: number // 可选属性，可选属性的含义是该属性可以不存在
  [propName: string]: any // 任意属性，一个接口中只能定义一个任意属性。可以在任意属性中使用联合类型
}

// 使用
class amy: Person {
  id: 01
  name: 'amy'
  gender: 'female'
}
```

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```typescript
interface Person {
    name: string // 确定属性
    age?: number // 可选属性
    [propName: string]: string // 任意属性
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```