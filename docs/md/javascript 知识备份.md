> 根据ECMA规范 所有javascript的实现都应该有一个全局(顶级)作用域对象 其中浏览器的是window，node的是global

## 名词解释
### 对象
javascript中一切皆对象  

这句话的意思是除了基础数据类型,所有引用数据类型都是一个对象.而这些引用数据类型的区别是它们有不同的对象属性.  

一个**普通对象**在默认情况下只有**\_\_proto\_\_**属性  

一个**普通函数对象**在默认情况下有**arguments,caller,length,name,prototype,__proto__,\[\[FunctionLocation\]\],\[\[Scopes\]\]**属性  

一个**箭头函数对象**在默认情况下有**arguments,caller,length,name,__proto__,\[\[FunctionLocation\]\],\[\[Scopes\]\]**属性  
...  

它们不过是在**普通对象**上加了一些特殊的属性而已,而当JavaScript引擎解析到这些特殊的属性时会做出相应的操作.  

当然需要注意的是这些特殊属性无法手动添加,你无法将一个**普通对象**手动添加这些属性,然后试图修改成**普通函数对象**.  

这些特殊属性只能通过相应的操作才能合法生成,比如 new Function() 之类.  

### 构造函数,普通函数
它们不是具体的东西而是一组对象属性  
而它们的区别是:  
**构造函数**可以实例化(new操作)  
**普通函数**可以普通调用

如果一个**函数(function)**有**构造函数**的属性那它就是构造函数  
如果一个**函数(function)**有**普通函数**的属性那它就是普通函数

这取决于这个对象有什么属性.

比如**声明函数**它拥有**构造函数**和**普通函数**属性,那它即是**构造函数**又是**普通函数**,它能new又能普通调用.  
比如**箭头函数**它只拥有**普通函数**属性,那它就只是**普通函数**,它只能普通调用.

**对象有哪些属性,这完全是由ecma规范规定的.和它是谁的实例没有关系.**

目前所知的拥有**构造函数**属性的有:  
**声明函数**,大部分内置首字母大写的函数

目前所知的拥有**函数**属性的有:  
**声明函数**,**箭头函数**,部分内置首字母大写的函数,内置首字母小写的函数

### Function
**Function**是内置的构造函数，它的作用就时实例化**函数(function)**. ecma规定所有**函数(function)**都是它的实例.  

所以所有**函数(function)**的 **\_\_porto\_\_**都指向他的**prototype**,包括他自己（构造函数也是**函数(function)**）和**Object**。  

总结一下，所有**函数(function)**的原型都指向**Function**的**prototype**。其他普通对象的 **\_\_porto\_\_**指向实例他们的构造函数的**prototype**.

### this
**this**的主要作用是访问宿主对象的属性和方法。

全局作用域this等于根元素。

函数作用域this根据声明函数和箭头函数适用不同的规则。

块作用域根据所处的全局作用域或函数作用域而定。

### 声明函数
**声明函数**是Function的实例.它拥有**构造函数**和**普通函数**属性.  

**声明函数**的**this**,调用**声明函数**时**this**等于**声明函数**所处的对象。如果声明函数直接调用则**this**等于根对象。

### 箭头函数
**箭头函数**是Function的实例.它拥有**普通函数**属性.  

**箭头函数**实际上没有**this**，当访问**this**时会在词法作用域上一层查找**this对象**直到全局作用域，全局作用域的**this**等于根对象。

**箭头函数**的一大作用是使回调函数和外部上下文的this统一。

### 表达式函数
当function关键字两边有运算符参与时**声明函数**就变成了**表达式函数**.  
**表达式函数** 有返回值,返回自身.  
**声明函数** 是声明语句, 语句没有返回值.   
所以表达式函数可以自执行. 而声明函数因为没有返回值所以不能自执行.

### 闭包
**函数(function)**的闭包其实就是一个接口函数，函数外部作用域（window）无法访问函数内部的作用域（**内部作用域可以访问外部作用域，反之则不行。**），此时函数可以**返回另一个函数**（此函数内部写有相关方法访问它父级函数的内容，），外部作用域（window）可以通过调用这个返回的函数**间接访问**到，它父级的作用域。做到了外部作用域间接访问内部作用域的功能。而这个在父函数内部**返回的函数**就叫做**闭包**（使外部作用域间接访问内部作用域），当然不管它被不被返回都叫**闭包**。只是不返回的话好像没什么用。

### 实例链
实例链的顶端是**Function**\.  
实例链条算一个自创的名词\.  
原型链很容易与实例链搞混\.  
子对象的原型指向父对象的**prototype**\.  
父对象由谁实例的和子对象没有关系,子对象也无法访问父对象的 **\_\_proto__**\.  
比如A实例B,B实例C.A只和B有关联,C只和B有关联.A和C没有关联.  
ABC就好像断了一样.

### 原型链
原型链的顶端对象是**Object**的**prototype**,因为**prototype**本质是一个普通对象它也是由**Object**实例出来的,为防止产生自己的原型指向自己的情况，因此**Object**的**prototype**为null.  
需要注意的是,原型链是**prototype**的链条,不是 **\_\_proto__** 的链条,只是在实例的角度它们都变成了 **\_\_proto__**\.  
比如对象的原型继承的是父对象的**prototype**,不是父对象的 **\_\_proto__**\.  
父对象有它自己的原型链和子对象的原型链没有关系\.  
Object的**prototype**-->构造函数的**prototype**-->普通对象的 **\_\_proto__**\.  
Object的**prototype**-->Function的**prototype**-->构造函数的 **\_\_proto__**\.  
但是 **\_\_proto__**可以手动指定的原因,实例的原型可能并不是自己构造函数的**prototype**\.  
Object的**prototype**-->构造函数的**prototype**--N个-->构造函数的**prototype**-->普通对象的 **\_\_proto__**\.  
但因为原型不能循环的原因,最终Object的**prototype**指向null\.  

<a href="/md/img/原型链.png" target="_blank"><img src="/md/img/原型链.png"></a>

### 作用域链
在JS里存在两个重要的链条 一个是原型链  一个就是作用域链  
作用域链相较于原型链要简单不少   
作用域链 分为全局作用域 和 函数作用域  
var声明 全局作用域->函数作用域  
当内部作用域无法找到变量时,会到上层作用域寻找,直到找到全局作用域对象(window||global).  
ES6中增加了块作用域,除了函数的其他花括号就是块作用域.  
并增加了let声明语句.  
var声明无视块作用域,按ES5的作用域声明.  
而在块作用域内部let声明的变量只有在块作用域内部才能访问.  
let声明 全局作用域->函数作用域->块作用域

### 词法作用域和动态作用域
JavaScript使用的是词法作用域（静态作用域）

即访问变量时：函数本身的作用域->函数**定义处**的外层查找->直到顶级作用域

而与之相对应的是动态作用域

即访问变量时：函数本身的作用域->函数**调用处**的外层查找->直到顶级作用域

### 同步代码，异步代码，宏任务，微任务。
JavaScript是单线程的。

JavaScript会优先执行同步代码。将异步代码放入任务队列中。只有等浏览器认为同步代码执行完毕才会通知主线程开始执行任务队列中的异步代码。

其中只有setTimeout,setInterval的回调，AJAX的回调等等耗时任务才是异步代码，其他的都是同步代码。

这其中同步代码，任务队列中的每一个异步代码块都是一个宏任务。
而微任务会在这些宏任务执行完成后马上执行。

其中只有Promise.then，Object.observe，MutaionObserver，process.nextTick(Node.js 环境)等等，才是微任务，其他都是宏任务。

微任务特点是它会在宏任务后渲染前执行。而异步任务则是在同步任务后渲染后执行。

## 数据类型

### 基础数据类型
1. 数值(number)
2. 字符串(string)
3. 布尔(boolean)
4. null(object)
5. undefined(undefined)

### 引用(对象)数据类型
1. 对象(object)
  - 狭义对象(object)
  - 数组(array)
  - 函数(function)
    - 普通函数(function)
    - 构造函数(constructor)

### 特性
1. 基础数据类型直接指向**数据本体**，引用(对象)数据类型直接指向**数据的内存地址**。所以当赋值时，实际上基础类型是**复制一个本体给新变量**，而引用类型是复制了**内存地址给新变量**。这造成基础类型的新变量修改时**不会影响原来的变量**，而引用数据类型**会影响原来的变量**。

2. 数值的各种进制表示方法：  
十进制：1234567890  无前缀  
八进制：012345670  前缀为0并且之后没有超过7的数字  
十六进制：0x1234567890abcdef  前缀为0x  
二进制：0b10  前缀为0b

## 运算符

> 运算符是对底层代码的直接访问
> 运算符有一个重要的功能 它可以将它参与的语句变成表达式 前提是语句有对应的表达式  比如function声明语句 有对应的function表达式 而if没有对应的表达式就不能转换
> 用运算符转换成的function表达式 主要用途就是执行IIFE

### 算术运算符

```javascript
x + y //加法运算符
x - y //减法运算符
x * y //乘法运算符
x / y //除法运算符
x ** y //指数运算符
x % y //余数运算符
++x,x++ //自增运算符
--x,x-- //自减运算符
+x //数值运算符
-x //负数值运算符
```

#### 特性
1. 运算符优先级时是，先乘除后加减，相同的从左往右。
2. **加法运算符**拥有**连接运算符**的功能，当运算子中存在字符串基础类型时就会重载成**连接运算符**，并且之后同一个**链式**内的所有**加法运算符**都会重载成**连接运算符**。  
3. 当运算子为**对象**时，首先调用**valueOf()**实例方法，然后调用**toString()**实例方法，其返回结果再进行基础数据类型运算。所以可以根据此特性，重新定义这两个方法达到想要的效果。

### 比较运算符

```javascript
> //大于运算符
< //小于运算符
<= //小于或等于运算符
>= //大于或等于运算符
== //相等运算符
=== //严格相等运算符
!= //不相等运算符
!== //严格不相等运算符
```

#### 特性
1. 大于，小于运算符中，如果两个运算子都是字符串则将比较它们的Unicode 码点。否则一律转换为数值基础类型进行比较。
2. 大于，小于运算符中，当运算子为**对象**时，首先调用**valueOf()**实例方法，然后调用**toString()**实例方法，其返回结果再进行基础数据类型运算。所以可以根据此特性，重新定义这两个方法达到想要的效果。
3. 相等，不相等运算符中，如果运算子**都**为**对象**则会比较是否指向同一个内存地址。
4. 相等，不相等运算符中，如果运算子**之一**为**对象**则会先转换成基础数据类型运算子的类型再进行比较。
5. undefined和null与自身严格相等。**var v1** 变量声明后默认值是undefined。

### 布尔运算符

```javascript
! //取反运算符
&& //且运算符
|| //或运算符
?: //三元运算符
```

#### 特性
1. **&&** 且运算符中，如果前一个运算子为**true**则返回**后**一个运算子的值。反之为**false**则返回**前**一个的值，并且不对第二个求值。且运算符某些时候可以取代if语句。
2. **||** 或运算符中，如果前一个运算子为**true**则返回**前**一个运算子的值，并且不对第二个求值。反之为**false**则返回**后**一个的值。且运算符某些时候可以为变量设置默认值。
3. **?:** 三元运算符中，如果第一个运算子为**true**，,则返回第二个运算子的值，反之为**false**，则返回第三个运算子的值。

### 其他运算符

```javascript
void(0) //void运算符
, //逗号运算符
... //扩展运算符（ES6新增）
() //圆括号运算符
obj.a/obj['a'] //属性访问符
new //实例运算符
instanceof //实例检测运算符
```

#### 特性
1. **void()** void运算符中，执行一个表达式。通常用在a标签防止跳转。
2. **,** 逗号运算符中，执行所有运算子，但只返回最后一个运算子的值。
3. **...** 扩展运算符中，其主要功能为将可遍历结构（数组，对象）将其中的元素提取出来。其中对象的元素是成对出现的，并且无法脱离花括号。所以对象的元素只能提取到其他的对象中。无法直接提取给变量。
4. **new** new.target属性可以在类函数中判断这个函数执行时是否是实例. 如果是则返回函数本身如果不是则返回undefined
5. **instanceof** 判断第一个运算子是否为第二个运算子的实例 返回布尔值

### 二进制位运算符(位运算符)

https://wangdoc.com/javascript/operators/bit.html

## 关键字/字面量

> JavaScript的关键字或字面量是一种语法糖，比如 **{}**等于**new Object()**,**[]**等于**new Array()**。他们的本质其实就是代码片段.

```javascript
['value1','value2'] //定义一个数组,等同于new Array().
{key: 'value'} //定义一个对象,等同于new Object().
/ab+c/i //正则表达式字面量,等同于new RegExp('ab+c', 'i').
this //指向函数的执行上下文
super //指向父对象
function //定义了函数表达式,和new Function()功能相同.
class //定义了类表达式,这个是ES6的功能.让JS更像传统的面向对象语法.
function* //定义一个协程函数.ES6的异步解决方案.现阶段用的比较少,只有最新版本的浏览器支持.
yield //暂停协程函数. g.next() 执行后会在此处暂停.
yield* //调用另一个协程函数. g.next() 执行后会在此调用另一个协程函数.
async function //function*的语法糖,使用更方便.此为ES2016的内容.
await //yield的语法糖,使用更方便.
```

## 语句

> 语句和表达式类似，它们的区别是**表达式有返回值**而**语句无返回值**。比如**for**，**if**，**switch**等都没有返回值。这里需要注意**function**，当他被赋值给其他变量时 var myfun = function fun(){} **它是表达式有返回值**（返回函数本身，相当于Object.prototype.valueOf()），当直接书写时 function fun(){} **它是声明没有返回值**。表达式和语句都有其各自的固定写法。

### 流程控制语句
```javascript
{ /* code */ } // 定义一个代码块
if...else //判断语句
break //终止当前代码之后的代码.包括之后的循环.只在switch语句和迭代语句中有效.
continue //终止当前代码之后的代码.不包括之后的循环.只在迭代语句中有效.
switch(1){ //执行括号内的代码返回值与case的值进行匹配,执行匹配的case之后break之前的代码.未匹配时执行default后的代码.
  case 1:
  break;
  default:
  break;
}
Empty //空语句,有时在迭代语句中不需要之后的代码块可以直接写一个分号其表示空语句.但最好在分号前写一个注释表示这个时空语句增加可读性
try{...}catch(err if condition){...}finally{...} //异常响应语句. 当try代码块中报错时执行catch中的代码err为捕获的异常 并且condition为true才执行.finally为不管报不报错都执行的代码.
throw '...' //用户自定义的报错 
```

### 声明
```javascript
var //声明一个函数作用域的变量
let //声明一个块数作用域的变量
const //声明一个常量
function //声明一个函数 声明函数时没有返回值
function* //声明一个协程函数 声明协程函数时没有返回值
async function //声明一个协程函数 function*的语法糖
return //函数内部返回一个值 其本身没有返回值
class //声明一个类 使JS更像传统的面向对象语言
```

### 迭代器
```javascript
for(let i = 0; i < 2; i++>) //本质是3个表达式,  第一个表达式会在整个迭代前执行一次, 第二个表达式返回true时执行此次迭代,第三个表达式是此次迭代完成时执行(可以忽略但最好在其他位置让第二个表达式返回false不然会造成死循环)
for(const key in object) //遍历一个对象的所有下标,只能遍历有下标的对象 比如array,object 而map,set没有下标无法遍历
for(const element of array) //遍历一个可迭代对象的迭代部分,只要是可迭代对象都可以遍历 比如array,map,set 而object不是可迭代对象无法遍历
let i = 0
while(i < 2) //当括号内返回true时执行此次迭代
```

## 标准对象(非构造函数)
```javascript
//变量
Infinity //值为Infinity 可以将其与其他值进行比较是否为true
NaN //值为NaN NaN与任何数据比较都是false 需要判断是否为NaN请使用isNaN()
undefined //值为undefined 可以将其与其他值进行比较是否为true

//函数
eval(x)
isFinite(number)
isNaN(number)
parseFloat(string) //数据类型转换成浮点型
parseInt(string, radix) //数据类型转换成整型
```

## 标准对象(构造函数)

### Array
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array
```javascript
//静态方法
Array.isArray() //判断值是否为数组

//修改器方法（会修改原数组）
Array.prototype.shift() //开头删除一个值，并返回这个值。
Array.prototype.pop() //末尾删除一个值，并返回这个值。
Array.prototype.unshift() //开头增加一个或多个值，并返回新的length。
Array.prototype.push() //末尾增加一个或多个值，并返回新的length。
Array.prototype.splice(start, end, item) //对任意位置的值进行，增删改操作，并返回被删除的值。其他情况返回空数组。
Array.prototype.reverse() //颠倒数组。返回被颠倒的数组。和原数组相等（原数组被颠倒了，其实返回的就是原数组）。
Array.prototype.sort() //对数组进行排序。返回被排序的数组。和原数组相等。（原数组被排序了，其实返回的就是原数组）

//访问方法（不会修改原数组）
Array.prototype.concat() //合并数组。
Array.prototype.toString() //将数组转换为字符串，元素之间由逗号隔开。
Array.prototype.toLocaleString() //将数组转换为字符串，特殊元素（时间，数字）会进行本地化处理。
Array.prototype.join() //将数组转换为字符串，并且可以指定分隔符。
Array.prototype.slice() //将数组中某一范围内的元素组成一个新数组。
Array.prototype.indexOf() //正向查找指定的元素是否存在，存在则返回键值，否则返回-1。（如果多个相同的值则返回第一个的键值）
Array.prototype.lastIndexOf() //反向查找指定的元素是否存在，存在则返回键值，否则返回-1。（如果多个相同的值则返回最后一个的键值）

//迭代方法
(callback(当前元素, 当前索引, 数组本身), this)
Array.prototype.forEach() //遍历一个数组，并将当前元素，当前索引，和数组本身传给回调函数。
Array.prototype.every() //遍历一个数组，如果所有回调函数都返回true，则整体返回true。反之则整体返回false。
Array.prototype.some() //遍历一个数组，只要有一个回调函数返回true，则整体返回true。反之则整体返回false。
Array.prototype.filter() //遍历一个数组，然后将所有返回true的元素组成一个新数组。并整体返回这个新数组。
Array.prototype.map() //遍历一个数组，然后将所有回调函数的返回组成一个新数组。并整体返回这个新数组。

(callback(累加值, 当前值, 当前索引, 数组本身), 初始值)
Array.prototype.reduce() //遍历一个数组，将上一个回调函数的返回值作为下一个回调函数的累加值。最后整体返回最后一个回调函数的值。
Array.prototype.reduceRight() //和Array.prototype.reduce()一样，但是是从最后一个元素往前遍历。
```

#### 特性
1. 所有**实例的Array**都有一个自动添加的**length属性**注意它不是原型属性所以他是实例数组的**私有属性**，表示当前数组有多少个值。注意不要和**Array.prototype.length**和**Array.length**搞混。**Array.prototype.length**在实例中存在于 **\_\_proto\_\_** 中。而**Array.length**是属于**Array构造函数的静态属性**。

### Object
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object
```javascript
//静态方法
Object.keys() //对象的键值转数组
Object.values() //对象值转数组
Object.entries() //对象的键值和值成对转换成二维数组。
Object.assign() //合并两个对象，如果键值相同则使用最后一个实参的，并返回第一个实参对象。(会修改第一个实参对象)
Object.create() //返回一个空白的新对象，其原型是第一个实参。（一般用于指定prototype的原型）
Object.getOwnPropertyNames() //对象的键值转数组（不可枚举也会转换。比如数组的length）
Object.getOwnPropertyDescriptor(obj, 'key') // 返回对象指定的值
Object.getOwnPropertySymbols() // 将对象上的Symbols键值转成数组
Object.getPrototypeOf() //返回实参对象的原型。
Object.setPrototypeOf(要修改的对象, 作为原型的对象) //修改对象的原型

//实例方法
Object.prototype.hasOwnProperty(某个键值) //判断自己是否存在某个键值（不包括原型链）。返回布尔值
Object.prototype.isPrototypeOf(某个对象) //判断实例是否存在于某个对象的原型链中。返回布尔值
Object.prototype.valueOf() //返回对象自身（此方法一般会自定义来达到某些需求）
Object.prototype.toString() //返回自身字符串（此方法一般会自定义来达到某些需求。此方法还可准确判断实参的类型，不同类型会返回不同字符串。因为实例的此方法有可能会自定义所以如果需要用其判断类型一般这样调用Object.prototype.toString.call(value)或者Object.getPrototypeOf(value).toString.call(value)，此处一定要注意this指向，需要将this指向需要执行的对象。不直接使用__proto__的原因是，__proto__不是标准访问方式，某些JavaScript环境可能没有__proto__。）
```

### Function
```javascript
//实例方法
Function.prototype.apply(this, [arg1, arg2, ...]) //重新定义this。数组的元素为函数的实参。
Function.prototype.call(this, arg1, arg2, ...) //重新定义this。和apply唯一区别是实参直接书写不是数组。
Function.prototype.bind(this)(arg1, arg2, ...) //重新定义this。并返回这个新函数。它不会直接调用函数。
```

#### 特性
1. 所有构造函数都是Function的实例，包括他自己和Object。所有普通对象都是实例它的构造函数的实例。

### Number
```javascript
//静态常量
Number.MAX_SAFE_INTEGER // 最大安全数
Number.MIN_SAFE_INTEGER // 最小安全数
Number.MAX_VALUE // 最大正数，或加负号最小负数。
Number.MIN_VALUE // 最接近0的正数，或加负号最接近0的负数。
Number.NaN // 表示NaN,和全局变量NaN一样。不要用这个判断是否为NaN。请使用isNaN()方法。
Number.POSITIVE_INFINITY // 正无穷，溢出时返回此常量。
Number.NEGATIVE_INFINITY // 负无穷，溢出时返回此常量。

//静态方法
Number.isNaN() // 是否为NaN
Number.isFinite() // 是否为有限小数或整数，不包括0。
Number.isInteger() // 是否为整数
Number.isSafeInteger() // 是否为安全数
Number.parseFloat() // 字符串转浮点数
Number.parseInt() // 字符串转整数

//实例方法
Number.prototype.toFixed() //保留小数点(0-20)，多余部分四舍五入。太大或太小会报出异常。
Number.prototype.toPrecision() //和toFixed一样，只是多余部分舍去。并且范围为(1-100)。
Number.prototype.toExponential() //用一个指数表示法字符串表示数字。
```

### String
```javascript
//实例属性
String.prototype.length //返回字符串的长度

//实例方法
String.prototype.charAt() //返回指定位置的字符（从0开始）
String.prototype.charCodeAt() //返回指定位置字符的Unicode 码点（从0开始 十进制）
String.prototype.concat() //合并多个字符串返回新字符串对原字符串无修改
String.prototype.slice() //截取指定范围字符返回新字符串对原字符串无修改（从0开始）
String.prototype.indexOf() //正向查找指定字符出现位置（相同返回第一个的位置）。未查找到返回-1。
String.prototype.lastIndexOf() //逆向查找指定字符出现位置（相同返回逆向第一个的位置）。未查找到返回-1。
String.prototype.trim() //去除字符串两边的空格，制表符，换行符，回车符。返回新字符串不改变原字符串。
String.prototype.toLowerCase() //字符串全部转为小写。返回新字符串不改变原字符串。
String.prototype.toUpperCase() //字符串全部转为大写。返回新字符串不改变原字符串。
String.prototype.match(可使用正则) //查找字符串是否存在某段字符，返回新数组不改变原字符串。数组index属性代表匹配的位置，input 代表原字符串。未查找到返回null。
String.prototype.search(可使用正则) //查找字符串是否存在某段字符，返回字符出现的位置不改变原字符串。未查找到返回-1。
String.prototype.replace(可使用正则,替换的字符) //替换字符串中某段字符。返回新字符串不改变原字符串。未查找到返回原字符串。
String.prototype.split(可使用正则) //按照实参的字符串分割字符串。返回一个字符分割后作为元素的新数组。
```

### RegExp

> 创建正则表达式的字面量是 // 两个斜杠，正则内容在两个斜杠中间。

正则表达式由一些普通字符，一些元字符和修饰符组成。普通字符包括大小写的字母，数字和unicode编码。而元字符和修饰符则具有特殊的含义

|修饰符|全称|备注|
|-|-|-|
|g|**g**lobal|告诉引擎在找到第一个匹配项后不要停止，而是继续直到找不到更多匹配项为止。|
|i|**i**nsensitive|不区分大小写|
|m|**m**ulti line|多行匹配，主要用于^$，将换行符之后视为新行而不是将整体视为一行。|
|s|**s**ingle line|允许.匹配换行符|
|u|**u**nicode|主要用于\u匹配大于4位数的unicode字符，\u之后的unicode改用花括号包裹。|
|y|stick**y**|黏性匹配，主要是配合g使用，之后的匹配的必须紧挨着之前匹配。不然就抛弃之后的匹配。|

|元字符|备注|
|-|-|
|**^**普通字符|一行的开始，匹配的字符必须在行首。|
|普通字符**$**|一行的结束，匹配的字符必须在行尾。|
|普通字符**{1}**|匹配一个匹配的普通字符。|
|普通字符**{1,2}**|最少匹配一个匹配的普通字符，最多匹配连续的两个匹配的普通字符。|
|普通字符**{1,}**|最少匹配一个匹配的普通字符，最多匹配连续的无限个匹配的普通字符。|
|元字符**?**|使用非贪婪模式，尽可能少的匹配符合要求的普通字符。|

```js
// 参数
new RegExp('正则表达式'[, '修饰符']) // /.../ 字面量

// 实例属性
RegExp.prototype.source // 返回正则的内容 不包括/和修饰符

// 实例方法
RegExp.prototype.exec('str') // 搜索字符串返回匹配结果数组，和String.prototype.match(可使用正则)类似。
RegExp.prototype.test('str') // 搜索字符串返回是否存在匹配的布尔值，和String.prototype.search(可使用正则)类似。
```
正则表达式测试工具：  
<a href="https://regex101.com/" target="_blank">https://regex101.com/</a>

### JSON
```javascript
//静态方法
JSON.stringify() //对象转JSON
JSON.parse() //JSON转对象（某些非标准JSON可能无法转换 可以使用eval("(" + JSON + ")")的方法 但此方法可能有执行未知代码的风险）
```

### Promise
```js
// 参数
// resolve 完成函数，实例的then方法开始运行。并将其参数传给它。
// reject 失败函数，抛出错误，错误信息为其参数。
new Promise(function callback(resolve, reject)());

// 静态方法
Promise.all([promise1, promise2, promise3]).then(values=>{ // 同时监听多个Promise实例。如果有一个执行reject（失败）则整体失败，失败参数为第一个执行的reject。
  console.log(values); // [values1, values2, values3]
}); 

Promise.allSettled([promise1, promise2, promise3]).then(values=>{ // 同时监听多个Promise实例。成功失败互不影响，成功失败信息和数据分别存入数组。
  console.log(values); // [{reason: "values1", status: "rejected"}, {reason: "values2", status: "fulfilled"}, {reason: "values3", status: "fulfilled"}]
}); 

Promise.any([promise1, promise2, promise3]).then(values=>{ // 同时监听多个Promise实例。只接收第一个成功的信息。所有都失败则返回固定错误语句。
  console.log(values); // values1
});

Promise.race([promise1, promise2, promise3]).then(values=>{ // 同时监听多个Promise实例。只接收第一个成功或失败的信息。
  console.log(values); // values1
});

Promise.reject('失败参数') // 固定返回失败的Promise实例
Promise.resolve('成功参数') // 固定返回成功的Promise实例

// 实例方法
Promise.prototype.then(value=>{}) // 处理成功的方法
Promise.prototype.catch(error=>{}) // 处理失败的方法
Promise.prototype.finally(()=>{}) // 不管成功失败都会执行，回调函数没有参数。
```

### Math
数学内置构造函数：  
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math

## 浏览器对象(非构造函数)

```javascript
// 属性
screen // 一些硬件信息（分辨率之类）
navigator // 客户端信息
clientInformation // 客户端信息
innerHeight // 包括滚动条的页面高度
innerWidth // 包括滚动条的页面宽度
outerHeight // 浏览器的整体高度
outerWidth // 浏览器的整体宽度
pageXOffset // 横向滚动条到左边的距离
pageYOffset // 纵向滚动条到顶边的距离
screenLeft，screenX // 浏览器窗口左边到屏幕左边的距离
screenTop，screenY // 浏览器窗口顶边到屏幕顶边的距离
scrollX // 滚动条横向滚动的距离
scrollY // 滚动条纵向滚动的距离
isSecureContext // 是否处于SSL安全页面，布尔值。
location // 页面URL相关
parent // 当前窗口的父窗口的window，父窗口即window.open的创建者。
top // 当前窗口的最顶层window，最顶层即window.open嵌套创建时最顶层的窗口。
performance // 当前窗口的性能相关。
visualViewport // 返回当前可视区域的信息

// 函数
setTimeout(func|code,time[,param1,param2,...]) // 指定毫秒后执行定义的方法,返回ID。
clearTimeout(int) // 根据ID取消setTimeout回调函数执行。
setInterval(func|code,time[,param1,param2,...]) // 指定毫秒循环执行定义的方法,返回ID。
clearInterval(int) // 根据ID取消setInterval回调函数执行。
alert(str) // 带确认的对话框。
confirm(str) // 带确认及取消按钮的对话框，确认返回true,取消返回false。
prompt(str) // 带输入框的对话框。输入内容在返回的对象内。
close() // 关闭所在的window窗口
btoa() // 编码base64
atob() // 解码base64
blur() // 使所在的window窗口失去焦点
requestAnimationFrame(func) // 在浏览器下一帧渲染时运行回调函数。返回预约ID。
cancelAnimationFrame(int) // 通过预约ID，取消requestAnimationFrame()的回调函数执行。
requestIdleCallback(func) // 在浏览器下次空闲时运行回调函数。返回预约ID。
cancelIdleCallback(int) // 通过预约ID，取消requestIdleCallback()的回调函数执行。
createImageBitmap() // 图标裁切
fetch() // 浏览器实现的AJAX请求，返回一个Promise实例。
focus() // 使窗口置于最前面。
getSelection() // 显示当前窗口内文本选择范围和光标位置。
history() // 浏览器的浏览历史。
matchMedia() // 媒体查询方法。
moveBy(x, y) // 相对当前位置移动窗口位置 (大部分浏览器默认禁用)
moveTo(x, y) // 移动窗口到指定位置 (大部分浏览器默认禁用)
resizeBy(x, y) // 增加窗口的大小 (大部分浏览器默认禁用)
resizeTo(x, y) // 指定窗口的大小 (大部分浏览器默认禁用)
open() // 打开一个新的浏览器窗口 
postMessage() // 与相同域的其他窗口通信
print() // 启用打印机打印当前窗口内容
queueMicrotask() // 执行一个微任务
scroll(x, y, options)，scrollTo(x, y, options) // 将滚动条移动到指定位置
scrollBy(x, y, options) // 将滚动条移动指定像素
stop() // 停止网页载入
```

## 浏览器对象(构造函数)

### 主要DOM节点原型链关系图

<a href="/md/img/主要DOM节点原型链关系图.png" target="_blank"><img src="/md/img/主要DOM节点原型链关系图.png"></a>

### EventTarget

>EventTarget->Node  
>浏览器的所有构造方法API都继承Node,而Node又继承EventTarget.  

```javascript
//实例方法
EventTarget.prototype.addEventListener() //在实例上绑定一个事件
EventTarget.prototype.removeEventListener() //删除实例上绑定的指定事件
```

### Document

> Node->Document  
> 这个方法一般无需手动实例化,它的实例就是当前浏览的网页.浏览器自动执行.  
> 注意实例后的命名为**document**首字母为小写  

```javascript
//实例属性
Document.prototype.body //当前网页的body
Document.prototype.all //当前网页的所有标签 注意这个不是数组 (最新标准已经删除此方法)(只读)
Document.prototype.compatMode //当前网页是怪异模式(BackCompat)还是标准模式(CSS1Compat)(只读)
Document.prototype.readyState //当前网页的加载状态
Document.prototype.cookie //当前网站的cookie
Document.prototype.title //当前网站的title
Document.prototype.domain //当前网站的域名 
Document.prototype.location //当前网站的URI(只读)
Document.prototype.referrer //来源网站的URI(只读)
Document.prototype.URL //当前网站的URL(只读)

//实例方法
Document.prototype.getElementById() //获取指定id的节点(返回动态节点)
Document.prototype.getElementsByClassName() //获取指定class的节点集合(集合)(返回动态节点)
Document.prototype.getElementsByName() //获取指定name的节点集合(集合)(返回动态节点)
Document.prototype.getElementsByTagName() //获取指定标签的节点集合(集合)(返回动态节点)
Document.prototype.getElementsByTagNameNS() //获取指定命名空间的指定标签的节点集合(集合)(返回动态节点)
Document.prototype.hasFocus() //当前页面是否获取焦点 返回布尔值
Document.prototype.createElement() //创建一个Dom节点(Element对象)
```

### Node

>Node->Element  
>所有Element实例都继承Node  
>Node的实例方法,Element的实例都能用.  

```javascript
//实例方法
Node.prototype.cloneNode(deep) //克隆一个Dom节点 两个节点相互独立 deep为true时克隆子节点反之不克隆
Node.prototype.insertBefore() //在元素的第一个子节点之前添加一个节点,它只接受Element对象
Node.prototype.appendChild() //在元素的最后一个子节点之后添加一个节点,它只接受Element对象
Node.prototype.hasChildNodes() //节点是否存在子节点返回布尔值
Node.prototype.normalize() //整理所有文本子节点,合并相邻的文本节点,删除空白文本节点.
Node.prototype.removeChild(element) //删除一个子节点
Node.prototype.replaceChild(newChild, oldChild) //替换一个子节点
```

### Element

>Element->HTMLElement->HTMLDivElement ...  
>Element一般不直接对应节点,一些细分的Element类别继承Element.  
>也就是说Element的实例才直接对应节点,比如Element->HTMLElement->HTMLDivElement对应div标签  

#### 元素偏移量和自身尺寸示意图:  
<a href="/md/img/元素偏移量示意图.png" target="_blank"><img src="/md/img/元素偏移量示意图.png"></a>

```javascript
//实例属性
Element.prototype.className //字符串 返回元素的class属性 
Element.prototype.id //字符串 返回元素的id属性 
Element.prototype.innerHTML //字符串 元素的文本内容
Element.prototype.classList //只读 对象 返回元素的class属性 可以通过它的原型方法 add() remove() toggle()添加和删除,切换class属性

Element.prototype.clientHeight //只读 元素不带边框的高度
Element.prototype.clientWidth //只读 元素不带边框的宽度
Element.prototype.clientTop //只读 元素顶边到边框顶边的距离(可视为上边框宽度)
Element.prototype.clientLeft //只读 元素左边到边框左边的距离(可视为左边框宽度)

HTMLElement.prototype.offsetWidth //只读 元素带边框的宽度
HTMLElement.prototype.offsetHeight //只读 元素带边框的高度
HTMLElement.prototype.offsetTop //只读 元素带边框顶边到,除了position为static之外的父元素的顶边框下边的距离.如果父元素定位都为static,则父元素视作body.
HTMLElement.prototype.offsetLeft //只读 元素带边框左边到,除了position为static之外的父元素的左边框右边的距离.如果父元素定位都为static,则父元素视作body.

Element.prototype.scrollHeight //只读 内容高度(包括滚动条视野外的部分)
Element.prototype.scrollWidth //只读 内容宽度(包括滚动条视野外的部分)
Element.prototype.scrollTop //可视内容的顶部 到内容整体顶部的距离(包括滚动条视野外的部分)
Element.prototype.scrollLeft //可视内容的左边 到内容整体左边的距离(包括滚动条视野外的部分)

//实例方法
Element.prototype.append() //在元素的最后一个子节点之后添加一个节点,它只接受字符串形式的Dom节点
Element.prototype.hasAttribute() //当前节点是否存在某个属性,返回布尔值.
Element.prototype.getAttribute() //返回当前节点的指定属性值
Element.prototype.getAttributeNames() //返回包含所有属性名的数组
Element.prototype.getBoundingClientRect() //返回一个对象,其包含了相对于网页整体左上角的坐标偏移值和自身的尺寸信息,自身的边框包括在内,自身的外边距不包括在内. IE9^
Element.prototype.getClientRects() //和getBoundingClientRect()类似,区别是行内元素会根据换行符分割成多个对象
Element.prototype.setAttribute(name, value) //设置指定属性的值
Element.prototype.toggleAttribute(name) //删除或添加一个布尔属性值
Element.prototype.removeAttribute(name) //删除一个指定的元素

Element.prototype.insertAdjacentText(position, text) //在元素旁边插入文本
Element.prototype.insertAdjacentElement(position, element) //在元素旁边插入元素
// position:
//'beforebegin': 在该元素本身的前面.
//'afterbegin':只在该元素当中, 在该元素第一个子孩子前面.
//'beforeend':只在该元素当中, 在该元素最后一个子孩子后面.
//'afterend': 在该元素本身的后面.

Element.prototype.querySelector() //使用CSS选择器查询节点,返回查询到的第一个节点(返回静态节点,不会随节点更新而更新)
Element.prototype.querySelectorAll() //使用CSS选择器查询节点,返回查询到的所有节点(返回静态节点,不会随节点更新而更新)

Element.prototype.requestFullscreen() //使指定节点进入全屏模式

Element.prototype.scroll({top: 垂直距离, left: 水平距离, auto||smooth}) //相对于绝对坐标移动滚动条
Element.prototype.scrollBy({top: 垂直距离, left: 水平距离, auto||smooth}) //相对于当前坐标移动滚动条
Element.prototype.scrollTo({top: 垂直距离, left: 水平距离, auto||smooth}) //将滚动条移动到指定坐标
Element.prototype.scrollIntoView([bool, {过渡方式, 垂直对齐, 水平对齐}]) //将指定的元素滚动到可视区域，如果第一个参数为true（默认值），则顶部对齐。false为底部对齐。
```

### WebSocket
```js
// 参数
new WebSocket(url[, 协议])

// 静态常量
WebSocket.CONNECTING // 值为0，表示正在连接。
WebSocket.OPEN // 值为1，表示连接成功，可以通信了。
WebSocket.CLOSING	// 值为2，表示连接正在关闭。
WebSocket.CLOSED // 值为3，表示连接已经关闭，或者打开连接失败。

// 实例属性
webSocket.prototype.binaryType // 返回websocket连接所传输二进制数据的类型。
webSocket.prototype.bufferedAmount // 返回被send但还没有发送给服务器的数据。

// 实例方法
webSocket.prototype.send('json') // 将数据发送给服务端。
webSocket.prototype.close([错误状态码[, 错误原因字符串]]) // 关闭当前连接。

// 实例事件
webSocket.prototype.onclose = function(){} // 当一个 WebSocket 连接被关闭时触发。
webSocket.prototype.error = function(){} // 当一个 WebSocket 连接因错误而关闭时触发，例如无法发送数据时。
webSocket.prototype.message = function(){} // 当通过 WebSocket 收到数据时触发。
webSocket.prototype.open = function(){} // 当一个 WebSocket 连接成功时触发。
```

## 浏览器事件(Event)

### 鼠标事件
|名称|内容|备注|
|:--|:--|:--|
|onclick|单击鼠标时触发||
|ondblclick|双击鼠标时触发||
|oncontextmenu|在用户点击鼠标右键打开上下文菜单时触发||
|onmouseenter|鼠标移动到元素上时触发|子元素不会触发|
|onmouseleave|鼠标移出元素时触发|子元素不会触发|
|onmouseover|鼠标移动到元素上时触发|子元素会触发|
|onmouseout|鼠标移出元素时触发|子元素会触发|
|onmousemove|鼠标被移动||
|onmousedown|鼠标按钮被按下||
|onmouseup|鼠标按钮被松开||
|onwheel|该事件在鼠标滚轮在元素上下滚动时触发||

### 键盘事件
|名称|内容|备注|
|:--|:--|:--|
|onkeydown|某个键盘按键被按下||
|onkeyup|某个键盘按键被松开||
|onkeypress|某个键盘按键被按下并松开||  

### 表单事件
|名称|内容|备注|
|:--|:--|:--|
|onblur|元素失去焦点时触发||
|onfocus|元素获取焦点时触发||
|onchange|该事件在表单元素的内容改变时触发(input, keygen, select, 和 textarea)||
|onfocusin|元素即将获取焦点时触发||
|onfocusout|元素即将失去焦点时触发||
|oninput|元素获取用户输入时触发||
|onreset|表单重置时触发||
|onsearch|用户向搜索域输入文本时触发 (input="search")||
|onselect|用户选取文本时触发 (input 和 textarea)||
|onsubmit|表单提交时触发||  

### 框架/对象（Frame/Object）事件  
|名称|内容|备注|
|:--|:--|:--|
|onabort|图像的加载被中断。 (object)||
|onbeforeunload|该事件在即将离开页面（刷新或关闭）时触发||
|onerror|在加载文档或图像时发生错误。 (object, body和 frameset)||
|onhashchange|该事件在当前 URL 的锚部分发生修改时触发||
|onload|一张页面或一幅图像完成加载||
|onpageshow|该事件在用户访问页面时触发||
|onpagehide|该事件在用户离开当前网页跳转到另外一个页面时触发||
|onresize|窗口或框架被重新调整大小||
|onscroll|当文档被滚动时发生的事件||
|onunload|用户退出页面。 (body 和 frameset)||  

### 剪贴板事件
|名称|内容|备注|
|:--|:--|:--|
|oncopy|该事件在用户拷贝元素内容时触发||
|oncut|该事件在用户剪切元素内容时触发||
|onpaste|该事件在用户粘贴元素内容时触发||

### 拖动事件
|名称|内容|备注|
|:--|:--|:--|
|ondrag|该事件在元素正在拖动时触发||
|ondragend|该事件在用户完成元素的拖动时触发||
|ondragenter|该事件在拖动的元素进入放置目标时触发||
|ondragleave|该事件在拖动元素离开放置目标时触发||
|ondragover|该事件在拖动元素在放置目标上时触发||
|ondragstart|该事件在用户开始拖动元素时触发||
|ondrop|该事件在拖动元素放置在目标区域时触发||

### 多媒体事件
|名称|内容|备注|
|:--|:--|:--|
|onabort|事件在视频/音频（audio/video）终止加载时触发。||
|oncanplay|事件在用户可以开始播放视频/音频（audio/video）时触发。||
|oncanplaythrough|事件在视频/音频（audio/video）可以正常播放且无需停顿和缓冲时触发。||
|ondurationchange|事件在视频/音频（audio/video）的时长发生变化时触发。||
|onemptied|当期播放列表为空时触发||
|onended|事件在视频/音频（audio/video）播放结束时触发。||
|onerror|事件在视频/音频（audio/video）数据加载期间发生错误时触发。||
|onloadeddata|事件在浏览器加载视频/音频（audio/video）当前帧时触发触发。||
|onloadedmetadata|事件在指定视频/音频（audio/video）的元数据加载后触发。||
|onloadstart|事件在浏览器开始寻找指定视频/音频（audio/video）触发。||
|onpause|事件在视频/音频（audio/video）暂停时触发。||
|onplay|事件在视频/音频（audio/video）开始播放时触发。||
|onplaying|事件在视频/音频（audio/video）暂停或者在缓冲后准备重新开始播放时触发。||
|onprogress|事件在浏览器下载指定的视频/音频（audio/video）时触发。||
|onratechange|事件在视频/音频（audio/video）的播放速度发送改变时触发。||
|onseeked|事件在用户重新定位视频/音频（audio/video）的播放位置后触发。||
|onseeking|事件在用户开始重新定位视频/音频（audio/video）时触发。||
|onstalled|事件在浏览器获取媒体数据，但媒体数据不可用时触发。||
|onsuspend|事件在浏览器读取媒体数据中止时触发。||
|ontimeupdate|事件在当前的播放位置发送改变时触发。||
|onvolumechange|事件在音量发生改变时触发。||
|onwaiting|事件在视频由于要播放下一帧而需要缓冲时触发。||

### 动画事件
|名称|内容|备注|
|:--|:--|:--|
|onanimationend|该事件在 CSS 动画结束播放时触发||
|onanimationiteration|该事件在 CSS 动画重复播放时触发||
|onanimationstart|该事件在 CSS 动画开始播放时触发||

### 过渡事件
|名称|内容|备注|
|:--|:--|:--|
|ontransitionend|该事件在 CSS 完成过渡后触发。||