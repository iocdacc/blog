> React和Vue都可以嵌入传统项目中，只需遵循一定的规范都能很好的和传统项目共存。但其实并没有多少人使用渐进式开发。  
> React和Vue主要还是开发前后端分离的SPA和SSR项目。  
> 传统的多页项目，由于和后端结合紧密，并且后端占主导地位。实际上很多后端框架有自己的前端开发范式，可能就是Vue或者React，但也可能是别的方法，这种情况下需要项目团队商议具体方法。不建议前端单独决定使用React或Vue。

## React和Vue异同
### 创建组件
**React**
```js
// 创建组件
let componentReact = React.createElement(
  'div', // 标签名
  {num: 1}, // 标签的attr
  '123'|otherComponent // 子元素内容
)

// 如果需要接收父组件传过来的数据需要使用函数包裹
let componentReact = props=>React.createElement(
  'div', // 标签名
  {num: 1}, // 标签的attr
  props.nothing|'123'|otherComponent // 子元素内容
)
```
**Vue**
```js
// 创建组件
let componentVue = Vue.extend({
  props: {}, // 接收父元素数据
  template: '<div>123</div>'
})

// 注册组件
Vue.comprnent('componentVue', componentVue)

// 简写
Vue.comprnent('componentVue', { // Vue.extend会自动执行
  props: {}, // 接收父元素数据
  template: '<div>123</div>'
})
```
### 虚拟DOM渲染
**React**
```js
ReactDOM.render(
  componentReact, 
  document.getElementById('id'), 
  callback
)
```
**Vue**
1. 手动渲染

```js
let vm = new Vue({
  render: h=>h('div', [{/* 标签的attr */},] '123')
}).$mount(
  '#id'|'.id'|document.getElementById('id')
)
```

2. 创建时渲染

```js
let vm = new Vue({
  el: '#id'|'.id'|document.getElementById('id'),
  render: h=>h('div', [{/* 标签的attr */},] '123')
})
```
### 生成SSR使用的HTML文本
**React**
```js
let ReactDOMServer = require('react-dom/server')
let htmlStr = ReactDOMServer.renderToString(componentReact)
```
**Vue**
```js
let renderer = require('vue-server-renderer').createRenderer()
renderer.renderToString(vm, (err, htmlStr) => {
  if (err) throw err
  console.log(htmlStr)
})
//renderToString未传入回调时，返回promise。
renderer.renderToString(vm).then(htmlStr => {
  console.log(htmlStr)
}).catch(err => {
  console.error(err)
})
```
### 浏览器接管静态html
**React**
```js
// 假设根元素id为app
ReactDOM.hydrate(componentReact, document.getElementById('app'))
```
**Vue**
```js
// 就是对根元素进行渲染操作
new Vue({
  props: {},
  render: h=>h('<componentVue></componentVue>')
}).$mount('#app')
// or
let vm = new Vue({
  el: '#app',
  props: {},
  render: h=>h('<componentVue></componentVue>')
})
```
### 模板语言
**React**
1. JSX

**<a href="https://babeljs.io/docs/en/babel-preset-react" target="_blank">React JSX babel配置方法</a>**
```js
// 使用JSX需要使用Babel插件转换
let componentReact = <div data='nothing'>123</div>
// 两者等效
let componentReact = React.createElement(
  'div', 
  {data: 'nothing'}, 
  '123'
)

// 渲染到页面
ReactDOM.render(componentReact, document.getElementById('app'))
```
```html
<div id='app'></div>
```
**Vue**
> 相较于React，Vue有多种编写模板的方式。
1. 直接使用html

**需要加载完整版的vue** vue.esm.js
```js
// 因为需要解析模板里的花括号之类的东西
// 需要加载完整版的vue
let vm = new Vue({
  el: '#app',
  data: {
    num: 1
  }
})
```
```html
<div id='app'>
  {{ num }}
</div>
```
2. 使用template属性

**需要加载完整版的vue** vue.esm.js
```js
// 因为需要解析模板里的花括号之类的东西
// 需要加载完整版的vue
let vm = new Vue({
  el: '#app',
  data: {
    num: 1
  }
  template: '<div>{{ num }}</div>'
})
```
```html
<div id='app'></div>
```
3. 使用JSX

**<a href="https://github.com/vuejs/jsx " target="_blank">Vue JSX babel配置方法</a>**
```js
// 使用JSX需要使用Babel插件转换
// Babel顺便将JSX模板进行了编译，所以只需要加载运行时的vue。
let vm = new Vue({
  el: '#app',
  data: {
    num: 1
  }
  render: h=>(
    <div>{{ num }}</div>
  )
})
```
```html
<div id='app'></div>
```
需要注意的是这三种优先级是 **render > template > html**

优先级高的方法会**覆盖**优先级低的方法。其中template，render会**覆盖**根元素内的其他内容，除非使用了**插槽&lt;slot>&lt;/slot>**。html方式不会覆盖根元素内其他内容。

### 主流开发方式
**React**
1. ES6

```js
import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
  constructor(props) { // props为父组件通过attr传入的数据
    super(props) // 执行父类的构造函数
    this.state = { // 组件的私有数据
      str: '我是初始值'
    }
  }

  clickFun(){
    this.setState({str: '我被点击了'}) // 必须使用this.setState方法修改才会触发页面重绘。
  }
  
  render(){
    return (
      <div onClick={clickFun}>{this.state.str}</div>
    )
  }
}

ReactDom.render(<App/>, document.getElementById('app'))
```
2. 函数组件

> 函数组件相较于ES6方式有很多优点，简单，代码量大幅减少。但函数组件的缺点很明显即它无法使用生命周期和state等react特性。  
> 值得庆幸的是React添加了钩子函数（hook），使得函数组件拥有了使用所有react特性的能力。现在越来越多的开发者开始使用函数组件。
```js
import React, { useState } from 'react'
import ReactDom from 'react-dom'

let App = props=>{
  let [str, setStr] = useState('我是初始值')

  let clickFun = ()=>{
    setStr({str: '我被点击了'}) // 必须使用钩子函数提供的setStr方法修改才会触发页面重绘。
  }

  return (
    <div onClick={clickFun} >{str}</div>
  )
}

ReactDom.render(<App/>, document.getElementById('app'))
```
某些时候函数组件甚至只需要一行：
```js
let App = props=><div>{props.data}</div>
```
**Vue**
1. Vue Loader

> 使用运行时版本的vue  
> 此方法需要使用webpack的Vue Loader编译

<a href="https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE" target="_blank">Vue Loader webpack配置方法</a>

app.vue
```html
<template>
  <div class="example" v-on:click="setStr">{{ str }}</div> <!--在模板里不用加this-->
  <div>props: {{ prop1 }}</div> <!--在模板里不用加this-->
</template>

<script>
export default { // 编译后此处返回当前组件
  props: ['prop1'], // 要使用props必须先注册
  methods:{
    setStr(){
      this.str = '我被点击了' // 直接修改data就能触发页面重绘。
    } 
  },
  // Vue Loader编译后实际上使用的是Vue.extend()。所以data必须是函数。
  data(){
    return {
      str: '我是初始值'
    }
  },
  mounted(){
    console.log(this.prop1) // props会直接注入到实例的根属性下。不像react需要使用this.props.prop1访问。
    console.log(this.str) // data会直接注入到实例的根属性下。
  }
}
</script>

<style>
.example {
  color: red;
}
</style>
```
index.js
```js
import Vue from 'vue/dist/vue.runtime.esm.js';

import App from './App.vue';

Vue.component('App', App)

// 1. 直接使用html作为模板
new Vue({
  el: '#app',
})
// html
<div id="app"><App></App></div>

// 2. 使用template作为模板
new Vue({
  el: '#app',
  template: '<App></App>'
})

// 3. 使用JSX作为模板
new Vue({
  el: '#app',
  render: h=>(
    <App></App>
  )
})

// 4. 直接使用render回调方法渲染（主流）
new Vue({
  el: '#app',
  render: h=>h(App)
})
```

### 全家桶
|功能|React|Vue|
|:-:|:-:|:-:|
|核心功能|react|vue|
|html渲染|react-dom|vue|
|ssr文本渲染|react-dom/server|vue-server-renderer|
|模板编写方式|JSX|HTML,template,JSX,vue-loader|
|路由|react-router|vue-router|
|状态管理器|redux|vuex|
|cli|create-react-app|vue-cli|
|ssr框架|nextjs|nuxtjs|
|原生app框架|react-native|weex|


## React
### 名词解释
#### 组合

> 子组件内容的定制，一种特殊的props。  
> 类似Vue的插槽。

使用props.children可以获取组件的标签的内容。
```jsx
let MyComponent = props=>{
  return (
    <div>
      {props.children}{/*<h1>title</h1><div>nothing</div>*/}
      <div>123</div>
    </div>
  )
}

<MyComponent>
  <h1>title</h1>
  <div>nothing</div>
</MyComponent>
```
通过命名使用多个组合
```jsx
let MyComponent = props=>{
  return (
    <div>
      {props.a}
      <div>123</div>
      {props.b}
    </div>
  )
}

<MyComponent>
  a={/*组合命名*/
    <h1>title</h1>
  }
  b={
    <div>nothing</div>
  }
</MyComponent>
```
---
#### 状态提升

>某些时候两个同级的组件数据需要共享并同步，可以将数据存放在它们共同的父组件中，以简化逻辑。

```jsx
let ComponentChildrenA = props=><div onClick={props.setDataFun}>{props.num}</div> // 俩个子组件的数据同步，一个改变另一个也会更新。
let ComponentChildrenB = props=><div onClick={props.setDataFun}>{[...props.num.toString()].length}位数</div> // 俩个子组件的数据同步，一个改变另一个也会更新。

let ComponentA = props=>{
  let [data, setData] = useState({
    num: 2
  })

  let setDataFun = ()=>setData({
    num: ++data.num
  })

  return (
    <>
      <ComponentChildrenA num={data.num} setDataFun={setDataFun} />
      <ComponentChildrenB num={data.num} setDataFun={setDataFun} />
    </>
  )
}
```
---
#### 受控组件与非受控组件

> react表单相关范式。

在传统的前端项目中表单的提交有两种方式。
1. from同步提交（页面刷新）,这种方法完全由DOM自己控制，JS无需插手。
2. 异步提交（页面无刷新）,这种方法使用JS的DOM操作能力将数据读取然后使用AJAX提交到服务器。

受控组件主要针对第二种情况，React没必要去读取DOM的数据，完全可以使用自己的特性，将组件的state绑定到表单上，统一保存数据和响应更新。

这种让React完全控制表单的组件称为**受控组件**。

```jsx
let ComponentA = props=>{
  let [data, setData] = useState({
    userName: ''
  })

  let setDataFun = (e)=>setData({[e.target.name]: e.target.value})
  let onSubmitFun = (e)=>{
    e.preventDefault()
    console.log('提交数据：' + data.userName)
  }

  return (
    <>
      <form onSubmit={onSubmitFun}>
        <input type="text" name="userName" value={data.userName} onChange={setDataFun}/>
        <input type="submit" value="提交"/>
      </form>
    </>
  )
}
```

> 受控组件每一个表单更新行为都需要自己编写，对于简单项目过于麻烦。  
> 非受控组件只是单纯获取表单数据，不模拟表单行为。相对更简单。（类似于传统项目的获取DOM数据）

```jsx
let ComponentA = props=>{
  let userName = React.createRef() // 当变量绑定到表单的ref属性上时，表单的DOM将映射到此变量上。

  let onSubmitFun = (e)=>{
    console.log('提交数据：' + userName.current.value)
    e.preventDefault()
  }
  
  return (
    <>
      <form onSubmit={onSubmitFun}>
        <input type="text" name="userName" ref={userName}/>
        <input type="submit" value="提交"/>
      </form>
    </>
  )
}
```
---
#### 代码分割

webpack提供的代码分割
```jsx
import("./ComponentA").then(ComponentA => {
  <ComponentA />
});
```
webpack的代码分割有个问题，返回的是Promise实例，代码必须嵌套在then方法里。  
增加了代码复杂度。    
React提供了一个React.lazy方法，可以像平常一样写组件。
```jsx
const ComponentA = React.lazy(() => import('./ComponentA'));
<ComponentA />
```
如果需要更完善的功能和SSR可以使用<a href="https://loadable-components.com/" target="_blank">loadable-components</a>这个库。

---
#### 组件数据共享（context）

> 根组件下的所有组件共享数据的一种方法。  
> 在简单项目中替代redux的一种方法。  
> 当共享的数据使用setState更新时，所有订阅的组件都会重新渲染。

```jsx
// context的创建和注册
const ComponentContext = React.createContext();

const App = props=>(
  <ComponentContext.Provider value={{num: 234}}> {/* Provider组件，内部所有子孙组件都能消费它的context。 */}
    <ComponentA />
  </ComponentContext.Provider>
)

// 函数组件使用context
const ComponentA = props=>{ 
  let context = useContext(ComponentContext) // 钩子函数，需要哪个context。
  return <div>{context.num}</div>
}

// ES6使用context
class ComponentA extends React.Component { 
  render(){
    return <div>{this.context.num}</div>
  }
}
ComponentA.contextType = ComponentContext // 静态方法，需要哪个context。

// ES6以组件的形式使用context(函数组件也能用)
class ComponentA extends React.Component {
  render(){
    return (
      <ComponentContext.Consumer>
        {value=><div>{value.num}</div>}
      </ComponentContext.Consumer>
    )
  }
}
```
---
#### 错误边界

> 因为组件内部只能写表达式，不能写try/catch语句。  
> 使用static getDerivedStateFromError()或componentDidCatch()的特性，创建一个专门处理组件报错的组件。  
> 报错处理组件包裹任意其他组件后，可以监控处理这些组件的报错，比如渲染备用页面。  
> 注意此处处理的错误主要时自定义错误，throw new Error('I crashed!');。

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 你同样可以将错误日志上报给服务器
    logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // 你可以自定义降级后的 UI 并渲染
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```
---
#### ref和refs转发

> React获取组件实例或元素Dom的方法  
> 必须渲染完成阶段，才能访问ref对象。

```jsx
// 函数组件
let ComponentA = props=>{
  let ref = React.useRef() // ref变量绑定到标签后，标签选然后，标签dom会映射到变量上。
  ref.current // 此时ref.current为空
  let clickFun = ()=>console.log(ref.current) // 此时对象才有值
  return <><span onClick={clickFun} ref={ref}>123</span></>
}

let ComponentA = props=>{
  let ref
  let refFun = element=>ref=element // 可以直接传递一个回调函数而不使用React.useRef()
  ref.current // 此时ref.current为空
  let clickFun = ()=>console.log(ref.current) // 此时对象才有值
  return <><span onClick={clickFun} ref={refFun}>123</span></>
}

// ES6
class ComponentA extends React.Component { // ES6
  constructor(props){
    super(props)
    this.ref = React.createRef()
  }
  
  clickfun(){
    console.log(this.ref)
  }

  render(){
    return <div onClick={this.clickfun.bind(this)} ref={this.ref}>{value.num}</div>
  }
}

```
> 如果需要子组件内部的某个真实dom。  
> 可以使用React.forwardRef进行refs转发的方式

```jsx
let App = props=>{
  let ref = React.useRef()
  return <ComponentA ref={ref} /> // 转发ref
}

let ComponentA = React.forwardRef((props, ref) => (
  <><span ref={ref}>123</span></> // 将ref转发给子组件的dom
))

// 实际上使用props，context或redux都能转发ref，但转发时不能绑定到ref属性上。ref是保留属性。
// 绑定到ref属性对后期的调试维护有一定帮助，具体情况需要取舍。

let App = props=>{
  let ref = React.useRef()
  return <ComponentA myRef={ref} /> // 转发ref
}
// 使用自定义属性myRef通过props转发ref。myRef不是标准的ref属性调试工具无法识别。
let ComponentA = <><span ref={props.myRef}>123</span></> 
```
---
#### 高阶组件（HOC，Height Of Component）

> 将组件重复的逻辑抽象出来，抽象方法返回一个子组件。  
> 这个抽象方法就叫高阶组件。

其实大量的组件都在做一件事即：获取数据->渲染数据。  
如果在组件内部实现重复功能将造成大量的代码冗余。  
并且高阶组件可以将组件的数据和渲染分离。

在下面的例子中ComponentA，ComponentB，...是一个又一个普通组件。它们负责各式各样的渲染，但都需要获取数据。
```jsx
let asycData = { // 模拟异步方法
  comments: setDataFun => setTimeout(setDataFun, 1000, ['list1', 'list2', 'list3', 'list4', 'list5']),
  article: setDataFun => setTimeout(setDataFun, 1000, ['article1', 'article2', 'article3', 'article4', 'article5']),
}

let ComponentA = props => { // 渲染评论
  /* 重复逻辑 */
  let [list, setList] = useState([])
  let setComments = (data) => setList(data) // 数据更新方法
  asycData.comments(setComments)
  /* 重复逻辑 */
  return (
    <ul>
      {list.map((v, k) => (
        <li key={k}>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  )
}

let ComponentB = props => { // 渲染文章之类的东西
  /* 重复逻辑 */
  let [articleList, setArticleList] = useState([])
  let setArticle = (data) => setArticleList(data) // 数据更新方法
  asycData.article(setArticle)
  /* 重复逻辑 */
  return (
    <>
      {articleList.map((v, k) => <p key={k}>{v}</p>)}
    </>
  )
}

let App = props=><><ComponentA/><ComponentB/></>

ReactDom.render(<App/>, document.getElementById('app'))
```
将重复的逻辑抽象到HeightComponent中。普通组件只负责渲染页面。
```jsx
let asycData = { // 模拟异步方法
  comments: setDataFun => setTimeout(setDataFun, 1000, ['list1', 'list2', 'list3', 'list4', 'list5']),
  article: setDataFun => setTimeout(setDataFun, 1000, ['article1', 'article2', 'article3', 'article4', 'article5']),
}

let HeightComponent = (Component, getDataFun)=>{
  return props=>{
    /* 抽离的重复逻辑 */
    let [state, setState] = useState()
    let setStateFun = (data)=>setState(data)
    getDataFun(setStateFun)
    /* 抽离的重复逻辑 */
    return <Component state={state} />
  }
}

let ComponentA = HeightComponent(props=>{
  let list = props.state || []
  return (
    <ul>
      {list.map((v, k) => (
        <li key={k}>
          <span>{v}</span>
        </li>
      ))}
    </ul>
  )
},setDataFun=>asycData.comments(setDataFun))

let ComponentB = HeightComponent(props=>{
  let articleList = props.state || []
  return articleList.map((v, k) => <p key={k}>{v}</p>)
},setDataFun=>asycData.article(setDataFun))


let App = props=><><ComponentA/><ComponentB/></>

ReactDom.render(<App/>, document.getElementById('app'))
```
---
#### key
在react中如果有循环结构就必须在循环的标签上加key。  

主要原因是react通过key来决定是否重绘此标签。两次渲染如果相同顺位的标签属性key没有变化则react认为标签内容没有变化，不会重绘此标签。  

key与标签的内容应该是绑定并唯一的。一般后端输出的数据都存在一个唯一的数据id,一般以此作为key。  

如果没有数据id则用数组下标作为key。但数组的顺序不能发生改变，否则会导致不必要的重绘。并且如果标签内容是表单也会导致表单内容混乱。

---
#### 传送门（Portal）

可以将子元素渲染到其他DOM中的方法。

```jsx
import React from 'react';
import ReactDom from 'react-dom';

let App = props=>ReactDom.createPortal(
  <div>app2</div>, 
  document.getElementById('app2')
)

ReactDom.render(<App/>, document.getElementById('app1'))
```
```html
<div id="app1"></div>
<div id="app2"><!-- <div>app2</div> --></div>
```
---
#### 合成事件
react中绑定的事件实际上并非直接绑定在指定的DOM上，而是统一绑定到document上。  
然后根据其内部的虚拟DOM树进行事件冒泡。

将所有事件绑定到document上然后根据虚拟DOM进行事件冒泡和其他特性就是合成事件。  

合成事件使用的是React的虚拟DOM树和实际的DOM树其实没有关系。  

所以使用Portal将子元素渲染到其他位置其还是遵循原来的虚拟DOM树进行事件冒泡或者context。

合成事件相较于普通事件优化了性能。

#### 内置组件性能测试组件（Profiler）
Profiler是一个React内置组件，它在生产环境是禁用的。

主要主要功能是监听指定的组件和其子组件的渲染性能。

```jsx
let App = props=>(
  <Profiler id="otherComponent" onRender={callback}> {/* 使用callback监听渲染性能 */}
    <otherComponent />
  </Profiler>
)
```

### React api
#### React

> React的核心API,主要用于生成React虚拟节点.

```jsx
import React from 'react'

//静态属性
React.Fragment //虚拟dom组件占位根元素,简写：<></>.
React.Suspense //虚拟dom组件占位根元素,当使用懒加载组件时,可以传递props.fallback(加载时显示的组件).

//静态方法
//虚拟dom创建方法
React.createElement(标签名, {/* 标签的attr */}, children|[children]) //创建一个react虚拟dom,实际上JSX用babel转换后就是执行这个方法.
React.createFactory(标签名) //返回一个已经指定标签的React.createElement(),新版本已弃用.
React.cloneElement(虚拟dom, {/* 标签的attr */}, children|[children]) //克隆一个虚拟dom

//虚拟dom集合的迭代器,能识别不同的数据结构,主要用域this.props.children
React.Children.map(虚拟dom集合, callback(虚拟dom)) //遍历一个虚拟dom集合,将所有回调函数的返回组成一个新数组,返回新数组.
React.Children.forEach(虚拟dom集合, callback(虚拟dom)) //遍历一个虚拟dom集合,没有返回值.

//虚拟dom辅助方法
React.Children.count(虚拟dom集合) //返回一个虚拟dom集合的元素个数.
React.Children.only(虚拟dom集合) //检测虚拟dom是否只有一个子组件,如果是则返回这个子组件,否则报错.
React.Children.toArray(虚拟dom集合) //将虚拟dom集合转换成标准的Array
React.isValidElement(obj) //检测是否为虚拟dom对象,返回布尔值.
React.createRef() //创建一个ref对象,当挂载ref对象后,挂载的dom会传入这个对象的current属性.
React.forwardRef(callback(props, ref)) //让ref转发写法更统一.
React.lazy(callback()) //懒加载一个组件.

//虚拟dom抽象方法
React.Component() //组件抽象类
React.PureComponent() //组件抽象类,props和state无更新时不刷新组件.
React.memo(函数组件) //props和state无更新时不刷新组件.

//context
React.createContext({data: '默认值'}) // 创建一个context对象
Context.Provider // context注册根组件
Context.Consumer // 组件的方式消费指定context
Class.contextType // 消费指定context

``` 

#### React Hook
> React Hook是增强函数组件的一系列API，函数组件取代了传统的ES6的class开发方式。

```js
import React from 'react'

//hook(只有函数组件可以使用)
React.useState(初始化state) // 使函数组件可以是用state, 返回一个数组第一个是当前state,第二个是setstate()
React.useEffect(callback()) // 生命周期钩子,组件初次渲染和更新后执行其回调函数.
React.useRef() // 创建一个ref对象.
React.useContext() // 消费指定context
```
  

#### React.Component
> React.Component主要用于ES6的class方式开发。  
> React.Component是React比较重要又特殊的API。  
> React.Component是组件的抽象类。  
> 它的主要作用是，赋予一个类，组件的特性。  
> 只有继承它，在React.createElement()渲染虚拟DOM时，才会实例化具体组件，从而才会在渲染时调用具体组件相应的生命周期方法。  
> 如果不继承它，具体组件渲染虚拟DOM时将被普通调用。  
> 当然它也提供了一些辅助作用的实例方法  

生命周期和其他功能：
```javascript
// 继承React.Component后能使用的生命周期
// 在React.createElement()渲染虚拟DOM时会回调这些生命周期方法

import React, { Component } from 'react'

class App extends Component{
  constructor(props) { // 和原生JS一样实例化的第一步执行构造方法
    super(props) // 父类的构造函数constructor

    this.state = { // 当前组件的数据
      data: 'nothing'
    }
  }

  componentDidMount(){
    this.setState({ // 修改当前组件的数据只有用setState()方法才会触发重绘和更新阶段生命周期。
      data: 'update'
    })
  }

  // 初次渲染生命周期
  componentDidMount(){} //渲染完成后执行此方法,如果使用this.setState()更新state将触发更新阶段
  render(){return <div></div>} // 渲染方法,返回值为虚拟DOM
  static getDerivedStateFromProps(props, state){} //render()初次渲染或更新之前执行此方法,它的返回值修改state. 

  // 更新阶段生命周期
  static getDerivedStateFromProps(props, state){} // render()初次渲染或更新之前执行此方法,它的返回值修改state. 
  shouldComponentUpdate(nextProps, nextState){} // 如果此方法返回false将不执行render()渲染
  render(){return <div></div>} // 渲染方法,返回值为虚拟DOM
  getSnapshotBeforeUpdate(){} // 渲染已经完成,但还没有更新DOM时触发.它的返回值将传给之后的componentDidUpdate()
  componentDidUpdate(prevProps, prevState, snapshot){} // 更新渲染后触发

  // 卸载阶段生命周期
  componentWillUnmount(){}

  // 组件报错阶段生命周期
  static getDerivedStateFromError(error) // 处理错误，返回一个新的state重新渲染页面（不可以有副作用）
  componentDidCatch(error, info) // 处理错误（可以有副作用）

}
```  
  

#### ReactDom

> React的html渲染API,主要用于在浏览器环境将虚拟节点渲染到html上.

```javascript
import ReactDOM from 'react-dom'

ReactDOM.render(element, container[, callback]) // 渲染一个虚拟DOM到指定节点中.
ReactDOM.hydrate(element, container[, callback]) // 和ReactDOM.render一样，区别在于是用来接管服务端渲染的静态HTML。
ReactDOM.unmountComponentAtNode(container) // 删除指定节点中的虚拟DOM.
ReactDOM.createPortal(element, container) // 将子节点渲染到指定的DOM中，而不是父组件中。
```

#### ReactDOMServer

> React的字符串渲染API,主要用于在node环境渲染成文本，由其他web服务器返回给客户端。

```javascript
import ReactDOMServer from 'react-dom/server'

ReactDOMServer.renderToString(element) //将react虚拟DOM渲染成静态html字符串
```

### 模板语法（JSX）
> JSX本质上就是表达式（babel编译后），标签的书写方式和html相似。  
> 所以JS表达式的性质可以套用在JSX上  
> 不像Vue定义了很多特殊的标签属性，JSX完全沿用了DOM的属性。前端程序员可以很容易过渡到JSX。  

```js
// 单行JSX
let jsx = <div></div>

// 多行JSX
let jsx = (
  <div>
    nothing
  </div>
)

// 使用花括号{}插入其他表达式
let jsx = <div>{1+1}</div> // <div>2</div>
let jsx = <div>{this.props.data}</div>
let jsx = <div>{this.props.data ? 1 : 0}</div>
let jsx = <div className={this.props.color}></div> // 作为属性值时外面不要加引号，引号内为字符串。

// JSX更接近于JS而非HTML
// 所以JSX标签属性使用的是DOM属性的书写方式
let jsx = <div className=""></div> // 使用className而非class，其属性名以DOM属性为标准。
let jsx = <div style={{backgroundColor:'red'}}></div> // style传入一个对象而非字符串

// 其他特殊功能
let jsx = <div dangerouslySetInnerHTML={__html: '<div></div>'}></div> // 渲染未转义的内容

```

### 路由（React Router）

> MVVM将传统的MVC的控制器移到了前端，路由的工作自然也就由前端完成了。  
> React Router就是React体系下的路由工具。

React Router由四个部分组成：
1. react-router 核心，一般无需直接直接使用。react-router-dom和react-router-native内部包含了核心部分。
2. react-router-dom DOM环境
3. react-router-native React Native环境
4. react-router-config 配置辅助器

正常情况并不需要引入react-router，但注意如果是老版本(React Router v3)可能有些API在react-router里。

#### 路由的概念

路由的不同状态或页面必定伴随着不同的URL。

但浏览器端接管路由后，因为W3C规范导致URL被修改必定造成请求服务器并刷新页面。这对于前端路由来说是没有必要的。

在传统浏览器要解决这个问题一般是使用锚点（hash）来修改URL，即 http&#58;&#47;&#47;www&#46;x&#46;com/#changeurl。修改锚点并不会请求服务器而刷新页面。

但这个方法有一个问题使用锚点修改URL是反常识的，它和平常所见到的URL不一样，也不美观。

第二种解决办法是使用H5的新API pushState和replaceState，这两个方法可以实现只修改URL而不请求服务器的功能。

但它也面临两个问题，第一，传统浏览器不支持这两个新API。第二，需要服务端配合，因为对于SPA来说服务端实际上只有index主页，但首次访问页面或手动刷新页面都会将当前的URL发送给服务端请求。但服务端并没有除首页以外的其他页面如果不做特殊处理则会返回404，所以SPA页面的服务端应该将除静态资源外的其他URL都返回主页。

有一个例外情况即在SSR项目则没有第二个问题。因为SSR项目的服务端保存了完整的路由。

#### react-router-dom

DOM环境下路由是通过React组件实现的。所以react-router-dom只能在React下使用。

V3老版本开发范式
```jsx
// App组件的props中将注入路由相关的方法。history, location, match, staticContext。
<BrowserRouter>
  <Route path="/d/:id/" component={App}></Route>
  <Route path="/d/:id/" render={({history, location, match, staticContext})=>App}></Route>
  <Route path="/d/:id/" children={({history, location, match, staticContext})=>App}></Route>
</BrowserRouter>
```
V4之后新版本开发范式
```jsx
// 这样更符合react的组件开发范式
// 但此时App组件props内还没有路由相关的方法。history, location, match, staticContext。
<BrowserRouter>
  <Route path="/d/:id/">
    <App/>
  </Route>
</BrowserRouter>

// 请使用钩子来获得路由方法。
// 这也是react官方大力推广函数组件+hook的开发方式。
let App = props=>{
  useHistory() // 浏览记录方法集合，前进后退之类。
  useLocation() // 当前页面的URL信息
  useRouteMatch() // 当前页面的get参数和匹配规则。
  useParams() // 当前页面的get参数。
}
```

react-router-dom api
```jsx
import {
  Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import {
createBrowserHistory, // 使用H5的方式记录修改URL
createHashHistory, // 使用锚点（hash）的方式记录修改URL
createMemoryHistory // 在内存内记录修改URL，不会修改浏览器URL（主要用于React Native）
} from "history"; // 如果直接使用等效组件则不需要引入此库

// 钩子函数
useHistory() // 浏览记录方法集合，前进后退之类。
useLocation() // 当前页面的URL信息
useRouteMatch() // 当前页面的get参数和匹配规则。
useParams() // 当前页面的get参数。

// 根路由组件，所有其他的API都必须在根组件内部。
<Router history={createBrowserHistory()} /> // 使用H5的方式记录修改URL
<BrowserRouter></BrowserRouter> // 两者等效

<Router history={createHashHistory()} /> // 使用锚点（hash）的方式记录修改URL
<HashRouter></HashRouter> // 两者等效

<Router history={createMemoryHistory()} /> // 在内存内记录修改URL，不会修改浏览器URL（主要用于React Native）
<MemoryRouter></MemoryRouter> // 两者等效

<StaticRouter></StaticRouter> // 静态路由，不使用浏览器的URL而是手动指定，这对于SSR项目很有用。
<StaticRouter location="/xxx"></StaticRouter> // 手动指定一个路由
<StaticRouter location=""></StaticRouter>
<StaticRouter context={context}></StaticRouter> // 用于接收重定向信息，服务器软件可以根据此信息重新指定URL。

// 功能组件，必须包含在根组件内。
// 链接组件
<Link to="/user"></Link> // 字符串跳转
<Link to={{ // object跳转
  pathname: "/courses", // url
  search: "?sort=name", // get参数
  hash: "#the-hash", // hash
  state: {fromDashboard: true} // 是否刷新
}}></Link>
<Link to={location=>({ // 函数跳转
  pathname: "/courses", // url
  search: "?sort=name", // get参数
  hash: "#the-hash", // hash
  state: {fromDashboard: true} // 是否刷新
})}></Link>
<Link to="user" replace></Link> // replace会替换当前浏览记录而不是在之后增加。
<Link to="user" component={React.forwardRef((props, ref) => ( // 自定义a标签
  <a ref={ref}>💅 {props.children}</a>
))}></Link>
// 导航链接组件
<NavLink to="/user" activeClassName="selected"></NavLink > // 特殊的Link标签，激活时将添加class="selected"
<NavLink to="/user" activeStyle={{ // 激活时将添加内联样式
  fontWeight: "bold",
  color: "red"
}}></NavLink > 
<NavLink to="/user" activeClassName="selected" exact></NavLink > // 全文匹配时才激活class
<NavLink to="/user" activeClassName="selected" strict></NavLink > // 严格匹配，全文的基础上增加斜杠匹配。
// 重定向组件
<Redirect to="/somewhere/else"></Redirect> // 重定向页面，替换当前浏览记录而不是新增。
<Redirect to="/somewhere/else" push></Redirect> // push为新增浏览记录。
<Redirect from='/old-path' to='/new-path'></Redirect> // from为要重定向的url
<Redirect from='/old-path' sensitive to='/new-path'></Redirect> // from是否区分大小写
<Redirect from='/old-path' exact to='/new-path'></Redirect> // from全文匹配
<Redirect from='/old-path' strict to='/new-path'></Redirect> // from严格匹配，全文的基础上增加斜杠匹配
// 路径组件
<Route path="/"></Route> // URL匹配所显示的内容
                         // path支持字符串，正则和path-to-regexp支持的短语。
                         // :id匹配参数，*全文匹配，短语可以和字符串正则混用。
<Route path="/" exact></Route> // 全文匹配
<Route path="/" strict></Route> // 严格匹配
<Route path="/" sensitive></Route> // 区分大小写
<Route path="/"><OtherComponent /></Route> // V5的新写法
<Route path="/" component={OtherComponent}></Route> // V4的旧写法
<Route path="/" render={({history, location, match, staticContext})=><OtherComponent />}></Route> // V4的旧写法
<Route path="/" children={({history, location, match, staticContext})=><OtherComponent />}></Route> // V4的旧写法，不管是否匹配都会渲染。
// 单选标签
<Switch></Switch> // Route和Redirect多个匹配时只会生效第一个匹配。

// 特殊API
matchPath("/user/12", { // 静态匹配的另一种写法，返回匹配结果，未匹配返回null。主要用于SSR项目。
  path: "/user/:id",
  exact: false,
  strict: false
});
withRouter() // 传入组件，将history, location, match, staticContext注入到组件的props中。
             // 主要用于使根路由组件以外的组件获取路由方法。
```

### Redux
> 状态管理器

```javascript
import { createStore, combineReducers } from 'redux';

// 当更新仓库时执行的方法
// state：仓库实体
// action：操作的类型
// return: 创建一个新状态
let reducer = function (state, action){

}

let reducer = combineReducers({ // 合并reducer。
  reducer1,
  reducer2
})

// 创建一个仓库
let store = createStore(reducer, [defaultState], applyMiddleware)

// 当仓库更新时会执行回调方法
store.subscribe(function (){});

// 更新仓库
store.dispatch({ type: 'INCREMENT' });


```

### React Redux
> redux的react插件,增加易用性.
```javascript
import { Provider, connect } from 'react-redux'

// Provider组件是react redux的组件
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)

const App = props => <div>123</div>

// mapStateToProps,mapDispatchToProps的返回值都会映射到组件的props
// 他们的区别是mapStateToProps的实参是redux仓库的state,mapDispatchToProps的实参的redux仓库的dispatch.
const mapStateToProps = state => ({
  counter: state.counter
})
const mapDispatchToProps = dispatch => ({
  fun1
})

// mapDispatchToProps的简写,唯一区别是,映射的方法返回值会自动执行dispatch.
const mapDispatchToProps = { /* 对象方法会映射到组件的props */ }

export connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
```

## Vue

### 名词解释

#### 自定义事件

> 通过实例方法实现自定义事件

```js
Vue.prototype.$on('eventName', callback) // 创建一个自定义事件
Vue.prototype.$once('eventName', callback) // 创建一个只执行一次的自定义事件
Vue.prototype.$off('eventName'[, callbackName]) // 删除自定义事件,如果没有提供事件名则删除实例上的所有自定义事件。
Vue.prototype.$emit('eventName', value) // 执行一个自定义事件
```
---
#### 代码分割
> 和react类似，有几种方法进行代码分割。
```js
// 全局注册组件
Vue.Component('ComponentName', () => import('./ComponentSrc'))
// 局部注册组件
new Vue({
  component: {
    'ComponentName': () => import('./ComponentSrc')
  }
})
// 这种方法回调函数可以返回一个对象来规定其加载的细节。
Vue.Component('ComponentName', () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```
Vue提供的内置方法
```js
// 类似Promise的回调方法
Vue.Component('ComponentName', function(resolve, reject){
  resolve({/* 组件配置 */})
  // or
  reject('失败')
})
```
---
#### 组件边界

> 组件的逻辑不应该超出组件本身，但以防万一Vue提供了一系列方法访问其他组件。  
> 当数据修改时所有通过这些API使用数据的组件都会重绘。

```js
Vue.prototype.$parent // 父组件实例
Vue.prototype.$root // 根组件实例
Vue.prototype.$children // 子组件实例
```
如果需要复杂的状态管理请使用Vuex。

---
#### 依赖注入
> 一种数据共享的方法

```js
Vue.Component('OtherComponent', {
  inject: ['foo'] // 使用指定的共享数据
})

new Vue({
  provide: { // 依赖注册,所有子组件都能使用这里的数据。
    foo: 'value'
  }
  template: '<OtherComponent />'
})
```
---
#### 混入
> 混入的主要用途在于抽象重复的组件配置  
> 混入后，不同组件内的混入对象是相互独立的
```js
// 局部混入
// 定义一个混入对象
var myMixin = {
  data(){
    return {
      num: 1
      num2: 2
    }
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
}

new Vue({
  mixins: [myMixin],
  data(){
    return {
      num: 2 // 如果配置项冲突则使用组件的配置，其他配置将合并。
    }
  },
})

// 全局混入，所有组件都会受到影响。
Vue.mixin({
  data(){
    return {
      num: 1
    }
  },
  methods: {
    hello: function () {
      console.log('hello from mixin!')
    }
  }
})

// 混入对象的配置被覆盖时，可以定义预处理方法来控制覆盖细节。
Vue.config.optionMergeStrategies.data = function (mixinOption, componentOption, vm){
  console.log(mixinOption) // {num: 1}
  console.log(componentOption) // {num: 2}

  return function (){
    return {
      num: 5
    }
  } // 组件的配置是{num: 2}但经过预处理后会输出{num: 5}
}
```
---
#### ref

> 一种获取指定组件实例或元素DOM的方法   
> 此方法必须渲染完成阶段才能获取ref对象  
```js
new Vue({
  provide: { // 依赖注册,所有子组件都能使用这里的数据。
    foo: 'value'
  }
  template: '<OtherComponent ref="OtherComponent" />'
  /* or */
  template: '<span ref="span"></span>'
})

Vue.prototype.$ref.OtherComponent
Vue.prototype.$ref.span
```
---
#### 特殊模板

> 某些时候可能会用到的模板编写方式
> 这些方法很少会使用

如果使用内联组件  
使用inline-template特殊属性可以将组件的模板写在标签里面
```html
<template>
  <OtherComponent inline-template> <!-- inline-template将忽略组件内的template属性 -->
    <div>123</div>
  </OtherComponent>
</template>

<script>
export default {
  component: {
    OtherComponent: { // 内联组件
      template: "", // 如果写在这里，代码多的时候会很难阅读。
      data(){
        return {
          num: 1
        }
      }
    }
  }
}
</script>
```
X-Template
```js
new Vue({
  template: "#template"
})
```
```html
<script type="text/x-template" id="template">
  <div>123</div>
</script>
```
---
#### 内置组件插槽组件（slot）
> 类似react的组合，将组件的标签内容灵活的渲染到指定位置。
```js
Vue.Component('MyComponent', {
  template: "<div><slot>222</slot></div>"  //<div>123</div>，如果组件标签没有内容则显示默认222。
})

new Vue({
  template: "<MyComponent>123</MyComponent>"
})
```
具名插槽

使用多个插槽时，具名插槽。
```js
// 没有使用指定v-slot的统一在default内。
Vue.Component('MyComponent', {
  template: "<div><slot name='slot1'></slot><slot name='slot2'></slot></div>"
})

// 使用template并使用特殊的attr,v-slot。
new Vue({
  template: "<MyComponent><template v-slot:slot1>slot1</template><template v-slot:slot2>slot2</template></MyComponent>"
})

// 动态插槽名
new Vue({
  template: "<MyComponent><template v-slot:[value]>123</template></MyComponent>"
})

// v-slot的简写#
new Vue({
  template: "<MyComponent><template #slot1>slot1</template><template #slot2>slot2</template></MyComponent>"
})
```
作用域插槽

插槽内容只能使用父组件的数据，不能使用插槽所处组件的数据。 

如果要使用插槽所处组件的数据需要使用作用域插槽。
```js
Vue.Component('MyComponent', {
  data(){
    return {
      num: 1
    }
  },
  template: "<div><slot name='slot1'></slot></div>"
})

// 在此处无法获取到{{num}}，插槽只能访问父组件的数据。
new Vue({
  template: "<MyComponent><template v-slot:slot1>{{num}}</template></MyComponent>"
})

// 作用域插槽，使用v-bind将数据传递给插槽。
Vue.Component('MyComponent', {
  data(){
    return {
      num: 1
    }
  },
  template: "<div><slot name='slot1' v-bind:num='num'></slot></div>"
})

// 使用v-slot:slot1='data'命名变量，并使用{{data.num}}调用。
new Vue({
  template: "<MyComponent><template v-slot:slot1='data'>{{data.num}}</template></MyComponent>"
})

// 如果组件只有默认插槽可以将数据绑定到组件标签上
// 注意如果有多个插槽此方法无效
new Vue({
  template: "<MyComponent v-slot:slot1='data'>{{data.num}}</MyComponent>"
})

// v-slot可以使用结构赋值
new Vue({
  template: "<MyComponent><template v-slot:slot1='{num}'>{{num}}</template></MyComponent>"
})
// 结构赋值默认值，num2不存在则使用默认值5。
new Vue({
  template: "<MyComponent><template v-slot:slot1='{num2=5}'>{{num2}}</template></MyComponent>"
})
// 结构赋值别名
new Vue({
  template: "<MyComponent><template v-slot:slot1='{num:newName}'>{{newName}}</template></MyComponent>"
})
```
---
#### 内置组件元组件（component）

> 元组件本身没有内容，它的作用主要时通过is attr来动态渲染其他组件

```js
new Vue({
  template: "<component v-bind:is='OtherComponent'></component>"
})
```
---
#### 内置组件缓存组件（keep-alive）

> 缓存组件本身没有内容，它的主要功能是将包裹的组件缓存起来。  
> 被缓存组件包裹的组件，当页面重绘时如果组件被删除将不会执行删除操作而是将组件缓存起来。  
> 在下次重新需要渲染此组件时会从缓存取出，这对一些需要保存操作状态的标签很有用，比如保存选单的选择状态，而不是重新回到默认选项。 

```js
new Vue({
  template: "<keep-alive><OtherComponent /></keep-alive>"
})
```
---
#### 控制更新

> 有时候可能需要控制组件的重绘

强制更新
```js
new Vue({
  template: "<button v-on:click='clickFun'>点击</button>",
  methods: {
    clickFun(){
      // 通过Vue.prototype.$forceUpdate进行强制更新
      this.$forceUpdate()
    }
  },
})
```
组件只渲染一次
```js
new Vue({
  // 使用v-once特殊attr来让组件只渲染一次
  template: "<span v-once>我只会初始渲染，不会触发更新渲染。</span>"
})
```
---
#### 过滤器

> 模板插值和v-bind的值可以添加一个预处理方法。  
> 模板语法为一个"|"

```js
new Vue({
  template: "<span>{{num | double}}</span>", // num数字将乘以2
  data(){
    return {
      num: 1
    }
  },
  filters: {
    double(value){
      return value*2
    }
  }
})
```
---
#### 内置组件出场退场过渡组件（transition）

> 主要用于元素或组件的插入、更新或者移除的过渡或动画效果。    

```css
/* 如果标签上有appear attr则初次渲染时将会套用入场动画 */
.v-enter{} /* 入场初始样式（标签渲染前添加，标签渲染后马上删除。） */
.v-enter-active{} /* 入场过程样式（标签渲染前添加） */
.v-enter-to{} /* 入场结束样式（标签渲染后第一帧添加） */

.v-leave{} /* 退场初始样式（触发退场时添加，退场第二帧删除。） */
.v-leave-active{} /* 退场过程样式（触发退场时添加） */
.v-leave-to{} /* 退场结束样式（退场第二帧添加。） */
```
.**v**-enter可以修改成特定的name，只对设置了name的transition标签生效。

如果直接使用.v-enter，则对所有transition标签生效。

其中name可以通过v-bind来实现动态的过渡效果。

结合插槽将过渡效果抽象出来可以实现过渡的复用。

只有下列逻辑渲染操作才会触发transition效果：
1. 条件渲染 (使用 v-if)
2. 条件展示 (使用 v-show)
3. 动态组件
4. 组件根节点

所以transition无法制作过程类的效果。

transition标签内只能渲染一个逻辑标签

```js
new Vue({
  template: `
    <div>
      <button @click="clickFun">click</button>
      <transition name="name1">
        <p v-show="show" style="font-size:56px;">hello</p>
      </transition>
    </div>
  `,
  el: "#app",
  data(){
    return {
      show: true,
    }
  },
  methods: {
    clickFun(){
      this.show = !this.show
    }
  },
})
```
```css
/* 过渡效果 */
.name1-leave-to{
  opacity: 0;
  transition: all 1s;
}
.name1-enter{
  opacity: 0;
}
.name1-enter-to{
  transition: all 1s;
}

/* 动画效果 */
.name2-enter-active{animation: bounce-in .5s}
.name2-leave-active{animation: bounce-in .5s reverse}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
```

**自定义选择器**
```css
enter-class
enter-active-class
enter-to-class (2.1.8+)
leave-class
leave-active-class
leave-to-class (2.1.8+)

/* 需要在transition组件上传入appear props */
/* 重命名初次渲染的选择器则不再套用enter过渡 */
appear-class
appear-to-class (2.1.8+)
appear-active-class
```
```js
new Vue({
  template: `
    <transition 
      enter-class="new-class"
      enter-active-class="new-active-class"
      enter-to-class="new-to-class"
    >
      <p>hello</p>
    </transition>
  `,
})
```
默认情况transition组件会使用CSS内定义的持续时间，但也可以自定义持续时间。
```js
new Vue({
  template: `
    <transition 
      v-bind:duration="持续时间（毫秒）"
      v-bind:duration="{enter: 入场时间（毫秒）, leave: 退场时间（毫秒）}"
    >
      <p>hello</p>
    </transition>
  `,
})
```

**钩子函数**

注意这些钩子不是transitionend或animationend这样的CSS回调。

钩子函数的作用是用JS来进行过渡。
```js
new Vue({
  template: `
    <transition
      v-on:before-enter="beforeEnter" `/* 入场第一帧执行 */`
      v-on:enter="enter" `/* 入场过程 */`
      v-on:after-enter="afterEnter" `/* 入场结束执行 */`
      v-on:enter-cancelled="enterCancelled" `/* 入场取消时执行 */`

      v-on:before-leave="beforeLeave" `/* 出场第一帧执行 */`
      v-on:leave="leave" `/* 出场过程 */`
      v-on:after-leave="afterLeave" `/* 出场结束执行 */`
      v-on:leave-cancelled="leaveCancelled" `/* 出场取消时执行 */`

      v-on:before-appear="customBeforeAppearHook" `/* 初次渲染第一帧执行 */`
      v-on:appear="customAppearHook" `/* 初次渲染过程，可以代替appear props。 */`
      v-on:after-appear="customAfterAppearHook" `/* 初次渲染结束执行 */`
      v-on:appear-cancelled="customAppearCancelledHook" `/* 初次渲染取消时执行 */`
    >
      <!-- ... -->
    </transition>
  `,
  methods:{
    beforeEnter(el),
    enter(el, done){ // 此处需要注意如果只使用JS钩子来实现过渡，需要在合适的地方执行done()函数。
      setTimeOut(done, 700) // 模拟过渡的持续时间
                            // 如果不执行done()函数，Vue不知道过渡在何时完成，过渡将瞬间完成过渡。
                            // 如果结合了CSS的过渡一起使用，并且持续时间没有CSS过渡长则done()函数不一定需要执行。
    },
    afterEnter(el),
    enterCancelled(el),

    beforeLeave(el),
    leave(el, done){}, // 注意事项和enter一样。
    afterLeave(el),
    leaveCancelled(el),

    customBeforeAppearHook(el),
    customAppearHook(el, done){}, // 注意事项和enter一样。
    customAfterAppearHook(el),
    customAppearCancelledHook(el),
  }
})
```
多标签的过渡
```html
<transition> <!-- 不同标签的入场和退场时同时执行的。如果不想同时过渡可以使用mode过渡模式 -->
<transition mode="in-out"> <!-- 入场标签先过渡，退场标签后过渡。 -->
<transition mode="out-in"> <!-- 退场标签先过渡，入场标签后过渡。 -->
  <button v-if="isEditing" key="save">
    Save
  </button>
  <button v-else key="edit">
    Edit
  </button>
</transition>
```
多组件的过渡
```html
<transition>
  <component v-bind:is="OtherComponent"></component>
</transition>
```

列表过渡
> transition组件内部同一时间只能有一个根标签。
> 当需要同时过渡多个标签时可以使用transition-group组件。

注意使用transition-group时每个根标签都要绑定唯一且和标签内容绑定的key props。
```html
<transition-group name="list" tag="p">
  <span v-for="item in items" v-bind:key="item" class="list-item">
    {{ item }}
  </span>
  <!-- or -->
  <span v-bind:key="span">span</span>
  <div v-bind:key="div">div</div>
  <button v-bind:key="button">button</button>
</transition-group>
```
```css
/**
  transition-group除了支持transition的所有出场退场的过渡，
  还支持定位的过渡 
*/
.v-move{} 
```
---
#### 过程过渡的实现范式

> transition组件实现的时出场退场时的过渡，元素或组件必须从无到有或从有到无。  
> 这对于元素或标签只是想执行一段动画或hover效果来说就无法使用transition组件了。

过程动画其实就是用Vue数据绑定的特性完成的，逐渐改变绑定的数据而不是一次性改到目标值。  
要如何逐渐改变一个数字可以借用第三方库实现。<a href="https://greensock.com/" target="_blank">greensock</a>，<a href="https://github.com/tweenjs/tween.js" target="_blank">tween.js</a>等。并且使用类似<a href="https://github.com/brehaut/color-js" target="_blank">Color.js</a>的库更方便的修改CSS样式数值。

### Vue api

> 和react不同的是vue核心api和它的html渲染api在一起。  
> 并且Vue创建组件的方法是通过实例Vue这个构造函数实现的，这与React的函数式创建组件不同。

1. Vue

```js
// Vue构造函数参数
// 需要注意的是如果想在配置对象内访问到实例this切勿在根属性方法上使用箭头函数。
// 因为你无法在Vue实例时去改变内部配置方法的this指向。
new Vue({ // Vue构造函数，创建一个组件并渲染或挂载。核心功能。
  el: '#app|css选择器', // 将这个根组件渲染到指定dom中。如果没有则组件被挂载，可以手动渲染。
  components: { // 局部注册组件，只能在本组件中使用。
    componentsA: componentsA
  },
  functional: false, // 使组件普通调用，没有this和data数据。提高渲染效率。
  propsData: {} // props的默认数据，主要用于测试。
  props: ['title', 'likes'], // 外部传入的数据变量名
  props: { // 可以规定数据类型
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
  },
  delimiters: ['{{', '}}'], // 修改模板插值写法
  data: {num: 1}, // 组件内的数据。为普通对象时相同组件共享数据。
  data(){ // 组件内的数据。为函数时相同组件数据独立，需要通过this访问当前组件内的数据，不能是箭头函数。
    return {num: 1}
  },
  computed: { // 返回一个经过处理的模板可使用的变量
    num2(){
      return this.num + 1 // 2
    }
  },
  mixins: [otherComponentOption], // 局部混入
  extends: otherComponentOption, // 继承和混入一样，写法不同
  provide: { // 共享数据，所有子孙组件可以通过inject获取这些数据
    foo: 'value'
  },
  inject: ['foo'], // 获取指定的共享数据
  watch: { // 监听指定data值，只要改变就会执行回掉方法。
    num(){
      console.log("num改变了")
    },
    num: [
      function (){
        console.log("num改变了，监听方法1。")
      },
      function (){
        console.log("num改变了，监听方法2。")
      }
    ]
  },
  methods: { // 可以通过实例访问这些方法，模板内可以直接使用。
    clickFun(){
      console.log('我被点击了')
    }
  },
  template: '<div>123</div>', // 模板编写方式之一，可选。
  render(h){ // render被回调时会传入渲染函数h，会覆盖template。理论上所有的模板编写方式编译后，本质上都是执行这个方法。
    return h('div', [{/* 标签的attr */},] 'string'|[ // 可以用数组表示多个子元素
      '123',
      '<OtherComponent />',
      h('div', '123') // 甚至可以嵌套其他渲染函数
    ]) 
  },
  name: 'componentName', // keep-alive时使用的组件别名
  model: { // 使自定义组件可以使用v-model
    prop: 'checked',
    event: 'change'
  },
  inheritAttrs: false, // 是否在自定义组件的根元素上渲染绑定的数据
                       // <myComponent aaa="1111"></myComponent> 是否在HTML跟元素上显示 aaa="1111"
  comments: false, // 渲染时是否保留组件模板中的注释
  directive: { // 局部创建一个指令，绑定指令的元素会执行内部的生命周期方法。
    myDirective: { // <div v-myDirective="data"></div>
      bind(){}, // 绑定指令后触发。
      inserted(){}, // 当前组件开始渲染时调用。只保证父组件渲染完成，本身可能还未渲染。
      update(){}, // 当前组件触发更新时调用。不保证子组件是否更新。
      componentUpdated(){}, // 当所处组件和子组件渲染完成时调用
      unbind(){} // 解绑指令后触发。

      callback( // 回调方法参数。
        el, // 触发的元素
        binding, // 指令的参数
        vnode, // 虚拟节点
        oldVnode // 更新前虚拟节点
      ){}
    }
  },

  filter: { // 过滤器，过滤模板变量和v-bind的值，将使用回调方法的返回值覆盖原有值。
    fun(value){ // 使用方法 {{ value | fun }},v-bind="value | fun"。
      return value + '123'
    }
  },

  // 生命周期
  // 初次渲染阶段
  beforeCreate(){}, // 仅仅初始化实例完成。data，props，Dom都无法访问。
  created(){}, // 实例创建完成。data，props可访问，但Dom无法访问。
  beforeMount(){}, // 渲染准备阶段，此时已经渲染了根节点。
  mounted(){}, // 渲染完成阶段，此时节点和数据已经渲染完成。

  // 更新渲染阶段
  beforeUpdate(){}, // 数据更新但未渲染
  updated(){}, // 已经重新渲染完成

  // 删除阶段
  beforeDestroy(){}, // 删除准备阶段
  destroyed(){}, // 已完成删除

  // 报错阶段
  errorCaptured(){},

  // 缓存
  activated(),
  deactivated(),
})

// 静态属性
Vue.config.silent = false // 是否开启报错
Vue.config.devtools = true // 是否开启devtools调试工具，开发版本默认为 true，生产版本默认为 false。
Vue.config.errorHandler = (err, vm, info)=>{} // 报错处理
Vue.config.warnHandler = (msg, vm, trace)=>{}  // 警告处理
Vue.config.ignoredElements = (msg, vm, trace)=>{}  // 警告处理
Vue.config.keyCodes = {v: 86, f1: 112, "media-play-pause": 179} // 键盘事件别名，不能使用大写。
Vue.config.productionTip = true  // 开启生产提示
Vue.config.optionMergeStrategies.ComponentOption = function (mixinOption, componentOption, vm){} // 全局混入覆盖时执行的预处理方法

// 静态方法
Vue.extend({}) // 继承预设并返回一个Vue构造函数。参数和Vue构造函数一样。
Vue.component( // 将一个预设的Vue构造函数注册为组件。
  'componentName', // 组件名
  Vue.extend({})|{} // Vue.extend可省略。
) 
Vue.nextTick(callback) // Dom下一次渲染之后触发回调。
Vue.set(Vue.prototype.data, key, value) // 实例创建后，给data数据的对象添加新值时不会触发重绘，此时使用此方法添加新值可以强制重绘。
Vue.delete(Vue.prototype.data, 'name') // 删除组件data中的一个数据。会触发更新阶段。不能是data的一级对象。
Vue.directive('my-directive', { // 全局创建一个指令，绑定指令的元素会执行内部的生命周期方法。
  bind(){}, // 绑定指令后触发。
  inserted(){}, // 当前组件开始渲染时调用。只保证父组件渲染完成，本身可能还未渲染。
  update(){}, // 当前组件触发更新时调用。不保证子组件是否更新。
  componentUpdated(){}, // 当所处组件和子组件渲染完成时调用
  unbind(){} // 解绑指令后触发。

  callback( // 回调方法参数。
    el, // 触发的元素
    binding, // 指令的参数
    vnode, // 虚拟节点
    oldVnode // 更新前虚拟节点
  ){}
})
Vue.filter('fun', callback(value)) // 过滤器，过滤模板变量和v-bind的值，将使用回调方法的返回值覆盖原有值。
                                   // 使用方法 {{ value | fun }},v-bind="value | fun"。
Vue.use(Plugin|{install(){}}, {someOption: true /* 是否只注册一次 */}) // 插件注册方法，插件本身或插件对象中的install方法会被执行，传入Vue构造方法，供其改造。
Vue.mixin({}) // 全局混入，就是预设一些Vue构造方法的配置，之后的组件能直接使用。注意全局混入不用在组件的mixins属性声明。
Vue.compile(template) // 将一个模板字符串编译成render函数。
Vue.observable({}) // 注册一个可以触发更新阶段的对象。此方法的返回值对象如果改变，会触发所有使用到它的组件更新。
Vue.version() // 返回Vue的版本号

// 实例属性
Vue.prototype.$data // 组件实例的data
Vue.prototype.$props // 组件实例的props
Vue.prototype.$el // 组件实例的el
Vue.prototype.$options // 组件实例的组件选项
Vue.prototype.$parent // 父组件实例
Vue.prototype.$root // 根组件实例
Vue.prototype.$children // 子组件实例
Vue.prototype.$slots // 组件实例的插槽内容
Vue.prototype.$scopedSlots // 组件实例的作用域插槽的内容
Vue.prototype.$refs // 当前组件的所有用ref attr注册了的dom和组件
Vue.prototype.$isServer // 当前组件是否运行在服务器
Vue.prototype.$attrs // 
Vue.prototype.$listeners // 当前组件所有事件回调方法

// 实例方法
Vue.prototype.$watch('dataKey', callback) // 监听data数据是否发生变化，是则触发回调方法。
Vue.prototype.$set(Vue.prototype.data, key, value) // 当对data数据内的对象新增属性时不会发生重绘，可以使用此方法新增属性并强制重绘。
                                                   // 不能修改Vue实例，或修改根实例上的data数据。
Vue.prototype.$delete(Vue.prototype.data, key) // 删除指定的data属性。触发重绘。
                                               // 不能删除Vue实例属性，或删除根实例上的data数据。
Vue.prototype.$on('eventName', callback) // 创建一个自定义事件
Vue.prototype.$once('eventName', callback) // 创建一个只执行一次的自定义事件
Vue.prototype.$off('eventName'[, callbackName]) // 删除自定义事件,如果没有提供事件名则删除实例上的所有自定义事件。
Vue.prototype.$emit('eventName', value) // 执行一个自定义事件
Vue.prototype.$mount('CSS选择器') // 当未定义el时，可以使用此方法手动渲染根组件。
Vue.prototype.$forceUpdate() // 强制重绘。它只影响当前组件和使用了插槽的子组件。
Vue.prototype.$nextTick(callback) // Dom下一次渲染之后触发回调。当前实例作为回调的实参。
Vue.prototype.$destroy() // 完全销毁当前实例
```

### 模板语法
> Vue的标签直接套用html，但是却定义了很多特殊的属性。  

```html
<!-- 语法 -->
<div>{{ 1+1 }}</div> <!-- 使用双花括号插入表达式 -->
<div>{{ this.props.data }}</div>
<div>{{ this.props.data ? 1 : 0 }}</div>
<div data={{ data }}></div> <!-- 错误写法，要传输变量请使用v-bind。 -->

<!-- 属性 -->
<div v-text="msg"></div> <!-- 和<div>{{msg}}</div>一样 -->
<div v-html="html"></div> <!-- 渲染没有转义的HTML标签 -->
<div v-show="true"></div> <!-- 改变元素的display可见性 -->
<div v-cloak></div> <!-- 在样式中设置[v-cloak]{}的样式，在渲染结束前显示这个样式。主要用于隐藏未渲染时的模板标签 -->
<div v-once></div> <!-- 组件只会渲染一次，之后为静态模式，优化性能。 -->
<div v-pre></div> <!-- 静态输出标签，提高性能。 -->
<div v-if="num === 1"></div> <!-- 条件渲染 -->
<div v-else-if="num === 2"></div> <!-- 条件渲染 -->
<div v-else></div> <!-- 条件渲染 -->
<div v-for="item in items">  <!-- 循环渲染 -->
  {{ item.text }}
</div>
<div v-for="(text) in items">
  {{ text }}
</div>
<button v-on:click="doThis"></button> <!-- 绑定事件 -->
<button v-on:[event]="doThis"></button> <!-- 动态事件 -->
<button @click="doThis"></button> <!-- 缩写 -->
<button @click.stop="doThis"></button> <!-- 绑定事件，并停止冒泡 -->
<a herf="xxx.com" @click.prevent="doThis"></a> <!-- 绑定事件，并阻止默认行为 -->
<form @submit.prevent></form> <!-- 只阻止默认行为 -->
<button @click.stop.prevent="doThis"></button> <!-- 链式调用 -->
<input @keyup.enter="onEnter"> <!-- 使用Vue.config.keyCodes定义的keyup别名 -->
<input @keyup.13="onEnter"> <!-- 使用按键码 -->
<button @click.once="doThis"></button> <!-- 只触发一次 -->
<button v-on="{ mousedown: doThis, mouseup: doThat }"></button> <!-- 对象写法 -->

<img data="123"> <!-- 数据绑定，只能静态绑定字符串。 -->
<img v-bind:data="imageSrc + 'srt' + 123"> <!-- 数据绑定，可以绑定表达式。 -->
<img :data="imageSrc + 'srt' + 123"> <!-- 简写 -->
<img :[key]="imageSrc"> <!-- 动态绑定 -->
<img :class="{red: true}"> <!-- 当对象键值对未true时，键会进行绑定。 -->
<img :class="[data1, data2]"> <!-- 将数组变量的值进行绑定 -->
<div v-bind="{id: 'aaa', class: data}"></div> <!-- 批量绑定 -->
<my-component v-bind="$props"></my-component> <!-- 将父组件的props传递给子组件 -->
<div v-bind:text-content.prop="text"></div> <!-- 将指定props数据渲染到元素内容 -->

<input type="text" value="nothing" v-model="message" /> <!-- 将表单输入内容和data数据双向绑定 -->
<textarea v-model="message" placeholder="add multiple lines"></textarea>
<select v-model="selected"></select>

<template v-slot:slotname></template> <!-- 插槽命名。使用多个插槽时，将插槽内容用template标签包裹，为其命名。 -->
<template #slotname></template> <!-- 简写 -->
<slot name="slotname"></slot>
<slot name="default"></slot> <!-- 插槽默认名称为default -->
```

### 路由（Vue Router）

>和React Router类似  
>相关概念可以查看React Router章节

#### 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用 beforeRouteLeave 守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 调用 beforeRouteEnter 守卫中传给 next 的回调函数，创建好的组件实例会作为回调函数的参数传入。

#### 开发范式
```js
Vue.use(VueRouter) // 页面引入不需要此步

const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo },
    { path: '/bar', component: Bar }
  ]
})

const app = new Vue({
  router, // 配置了router属性，即路由实例的组件就是路由根组件。路由根组件不一定要是Vue根组件。
  template: `
    <router-link to="/foo"></router-link>
    <router-view></router-view> `/* 根组件的路由默认组件 */`
    <router-view name="a"></router-view> `/* 根组件的路由命名组件 */`
  `,
  created(){
    this.$router // 路由实例，所有子组件都能通过这个方法获得。
    this.$route // 当前路由的信息，只读。
  },
  beforeRouteEnter(){} // 当路由开始渲染组件时触发。不能访问组件实例。
  beforeRouteUpdate(){} // 当路由复用组件时触发。可以访问组件实例。
  beforeRouteLeave(){} // 当路由离开此组件时触发。可以访问组件实例。
}).$mount('#app')
```

#### React Router API
```js
// 构造函数配置
let RouteConfig = [{
  path: 'string|:id|*', // path-to-regexp规则
  alias: string|Array, // 别名，和path等效。
  name: 'string', // 命名路由
  component: Component, // 组件
  components: { // 可以同时显示多个组件，使用<router-view name="a" />来指定。
    default: Foo,
    a: Bar,
    b: Baz
  }
  children: [ // 嵌套路由
    routes // 和routes配置一样理论上可以无限嵌套，在当前路由组件中同样使用<router-view/>来渲染嵌套组件。
  ],
  redirect: 'string'|{name: 'foo'}|to=>'重定向的 字符串路径/路径对象',
  props: boolean|Object|route=>{route}, // 布尔值：get参数会被传入props。Object：对象本身被传入props。function：返回值被传入props。
  beforeEnter: (to, from, next) => {}, // 路由独享前置守卫
  meta: {}, // 路由元素据，主要用于当前路由的自定义配置。 
  // 2.6.0+
  caseSensitive: boolean, // 匹配规则是否大小写敏感？(默认值：false)
  pathToRegexpOptions: Object // 编译正则的选项
}]


new VueRouter({
  routes: RouteConfig, // 路由配置
  mode: 'hash|history|abstract', // URL修改方式，锚点，H5API，摘要（NODE）。
  base: '/app/', // 基础路由，所有路由都会带这个前缀。
  linkActiveClass: 'router-link-active', // 全局修改<router-link active-class/>的默认值
  linkExactActiveClass: 'router-link-exact-active', // 全局修改<router-link exact-active-class/>的默认值
  scrollBehavior (to, from, savedPosition) { // 规定路由切换后滚动到指定位置
    if (savedPosition) {
      return savedPosition // 浏览记录中的位置如果存在
    }else if(to.hash) { 
      return {selector: to.hash, offset:{x: number, y: number}} // 锚点位置和偏移量
    }else{
      return { x: 0, y: 0 } // 指定位置
    }
  },
  fallback: true // 在不支持history的环境是否退回hash，默认true。
                 // 如果设置false，则每次导航都会刷新页面并不退回hash模式。这对于传统浏览器的SSR很有用。
})

// 实例属性
VueRouter.prototype.app // Vue的根实例
VueRouter.prototype.mode // 路由模式
VueRouter.prototype.currentRoute // 当前路由的信息

// 实例方法
VueRouter.prototype.beforeEach((to, from, next)=>{}) // 全局前置守卫。离开当前导航时触发。
VueRouter.prototype.beforeResolve((to, from, next)=>{}) // 全局解析守卫。
VueRouter.prototype.afterEach((to, from, next)=>{}) // 全局后置守卫。
VueRouter.prototype.push("/user") // 类似router-link组件
VueRouter.prototype.push({path:'register', query:{plan:'private'}}) // 使用对象带参数
VueRouter.prototype.push({name:'user', params:{userId:'123'}}) // 命名路由
VueRouter.prototype.replace() // 和push类似区别在于将覆盖当前的浏览记录而不时添加。
VueRouter.prototype.go() // 指定前进或后退步数
VueRouter.prototype.back() // 后退一步
VueRouter.prototype.forward() // 前退一步
VueRouter.prototype.getMatchedComponents('/user') // 返回指定路由匹配的组件数组或当前的组件数组。 
VueRouter.prototype.resolve("/user") // 返回指定路由的导航后的路径（路由路径可能和真实路径不同比如hash模式），提供给非路由方法使用。
VueRouter.prototype.addRoutes(RouteConfig) // 动态添加路由
VueRouter.prototype.onReady(callback, errorCallback) // 路由首次渲染时触发的生命周期，可以获得异步组件。异步组件解析失败时触发errorCallback。
VueRouter.prototype.onError() // 导航失败时触发
```

#### 组件API
```html
<!-- 链接组件 -->
<router-link to="/xxx"></router-link> <!-- 指定URL -->
<router-link :to="{ name: 'user', params: { userId: 123 }}">User</router-link> <!-- 命名的路由 -->
<router-link :to="{ path: 'register', query: { plan: 'private' }}"></router-link> <!-- 对象的形式传入GET参数 -->
<router-link to="/xxx" replace></router-link> <!-- 没有浏览记录 -->
<router-link to="/xxx" append></router-link> <!-- 是否相对路径 -->
<router-link to="/xxx" tag="span"></router-link> <!-- 自定义标签 -->
<router-link to="/xxx" active-class="router-link-active"></router-link> <!-- 激活时添加class，默认值router-link-active。 -->
<router-link to="/xxx" exact-active-class="router-link-exact-active"></router-link> <!-- 全文匹配时添加class，默认值router-link-exact-active。 -->
<router-link to="/xxx" exact></router-link> <!-- 是否全文匹配 -->
<router-link to="/xxx" event="span|array"></router-link> <!-- 什么事件触发链接 -->
<router-link v-slot="{ href, route, navigate, isActive, isExactActive }"> <!-- 作用域插槽，可以定制a标签 -->
  <a v-bind:href="href">click</a>
</router-link>

<!-- 嵌套路由组件 -->
<router-view></router-view> <!-- 路由匹配的组件会渲染到这里 -->
<router-view name='a'></router-view> <!-- 如果使用了name则会渲染components内的命名组件，无name的命名为default。 -->
<router-view></router-view> <!-- 如果路由配置里设置了嵌套组件（children），则路由组件内部可以用此来渲染嵌套组件。 -->
```

### Vuex
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // 将Vue构造函数传给Vuex。

const store = new Vuex.Store({ // 创建一个状态管理器
  state: { // 状态数据
    count: 1
  },
  getters: { // 状态数据预处理器
    addCount: state => {
      return state.count + 1 // 2
    },
    addCount: state => state => { // 返回一个方法
      return state.count + 1 // 2
    }
  }
  mutations: { // 状态变更方法，内部只能有同步代码。
    increment (state) { // 接收state
      state.count++
    }
  },
  actions: { // 间接状态变更方法，内部可以有异步代码。
    increment (store) { // 接收仓库本身
      store.commit('increment')
    }
  }
})

Vue.component('componentName', {
  methods: {
    increment() {
      console.log(this.$store.state.count) // 在组件中可以通过this.$store访问到状态管理器
      this.$store.getters.addCount // 2
      this.$store.getters.addCount(this.$store.state) // 2
      this.$store.commit('increment') // 触发一个mutations，内部只能写同步代码。
      this.$store.actions('increment') // 触发一个action，内部可以有异步代码。
    }
  }
})

new Vue({
  el: '#app',
  store: store, // 需要注册状态管理器
})

// 当有多个仓库时
const store1 = {
  namespaced: true, // 开启命名空间
  state: {},
  getters: {}
  mutations: {},
  actions: {}
}

const store2 = {
  namespaced: true, // 开启命名空间
  state: {},
  getters: {}
  mutations: {},
  actions: {}
}

const store = new Vuex.Store({
  modules: {
    store1,
    store2
  }
})

Vue.component('componentName', {
  methods: {
    increment() {
      this.$store.state.store1
      this.$store.state.store2

      // 默认情况除state外的相同属性名会同时触发，可以命名空间解决此问题。
      // 命名空间调用方法
      this.$store.getters['store1/addCount'] // 2
      this.$store.getters['store1/addCount'](this.$store.state.store1) // 2
      this.$store.commit('store1/increment') // 触发一个mutations，内部只能写同步代码。
      this.$store.actions('store1/increment') // 触发一个action，内部可以有异步代码。
    }
  }
})

```

## SSR

1. 客户端发起请求
2. 服务端根据请求组织组件
3. 预取数据存入状态管理器
4. 渲染组件成静态HTML
5. 将仓库赋值到静态HTML的window
6. 返回静态HTML
7. 客户端接收HTML，解析JS
8. 接管静态HTML，并且把window内的仓库复制到客户端的仓库。