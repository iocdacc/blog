## 简介
javascript中存在两种作用域
第一种为全局作用域
第二种为函数作用域（局部作用域）
函数作用域可以访问全局作用域但全局作用域不能访问函数作用域
并且存在就近原则
var function 声明提前适用于 全局作用域和函数作用域

## 实例
``` js
var a = 2;
function fun(){
  var a = 1;
  console.log(a);
}
// 此时输出a为1

var b = 2;
function fun2(){
  console.log(b);
}
fun2()
// 此时输出b为2

var c = 2;
function fun3(){
  console.log(c);
  var c = 1;
}
fun3()
// 此时输出c为undefined
```
