> React和Vue都可以嵌入传统项目中，只需遵循一定的规范都能很好的和传统项目共存。但其实并没有多少人使用渐进式开发。  
> React和Vue主要还是开发前后端分离的SPA和SSR项目。  
> 传统的多页项目，由于和后端结合紧密，并且后端占主导地位。实际上很多后端框架有自己的前端开发范式，可能就是Vue或者React，但也可能是别的方法，这种情况下需要项目团队商议具体方法。不建议前端单独决定使用React或Vue。

## React和Vue异同
### 创建组件
#### React
```js
// 创建组件
let componentReact = React.createElement(
  'div', // 标签名
  {num: 1}, // 传入标签的数据
  '123'|otherComponent // 子元素内容
)

// 如果需要接收父组件传过来的数据需要使用函数包裹
let componentReact = props=>React.createElement(
  'div', // 标签名
  {num: 1}, // 传入标签的数据
  props.nothing|'123'|otherComponent // 子元素内容
)
```
#### Vue
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
#### React
```js
ReactDOM.render(
  componentReact, 
  document.getElementById('id'), 
  callback
)
```
#### Vue
1. 手动渲染

```js
let vm = new Vue({
  render: h=>h('div', '123'|'<componentVue></componentVue>')
}).$mount(
  '#id'|'.id'|document.getElementById('id')
)
```

2. 创建时渲染

```js
let vm = new Vue({
  el: '#id'|'.id'|document.getElementById('id'),
  render: h=>h('div', '123'|'<componentVue></componentVue>')
})
```
### 生成SSR使用的HTML文本
#### React
```js
let ReactDOMServer = require('react-dom/server')
let htmlStr = ReactDOMServer.renderToString(componentReact)
```
#### Vue
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
#### React
```js
// 假设根元素id为app
ReactDOM.hydrate(componentReact, document.getElementById('app'))
```
#### Vue
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
#### React
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
#### Vue
> 相较于React，Vue有多种编写模板的方式。
1. 直接使用html

**需要加载完整版的vue**
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

**需要加载完整版的vue**
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
#### React
1. ES6

```js
import React, { Component } from 'react'
import ReactDom from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props) // 执行父类的构造函数
    this.state = {
      str: '我是初始值'
    }
  }
  
  render(){
    return (
      <div onClick={()=>{this.setState({str: '我被点击了'})}}>{this.state.str}</div>
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

  return (
    <div onClick={()=>setStr('我被点击了')} >{str}</div>
  )
}

ReactDom.render(<App/>, document.getElementById('app'))
```
某些时候函数组件甚至只需要一行：
```js
let App = props=><div>{props.data}</div>
```
#### Vue
1. Vue Loader

> 使用运行时版本的vue  
> 此方法需要使用webpack的Vue Loader编译

<a href="https://vue-loader.vuejs.org/zh/guide/#%E6%89%8B%E5%8A%A8%E8%AE%BE%E7%BD%AE" target="_blank">Vue Loader webpack配置方法</a>

app.vue
```html
<template>
  <div class="example" v-on:click="setStr">{{ str }}</div>
</template>

<script>
export default { // 编译后此处返回当前组件
  methods:{
    setStr(){this.str = '我被点击了'}
  },
  // Vue Loader编译后实际上使用的是Vue.extend()。所以data必须是函数。
  data () {
    return {
      str: '我是初始值'
    }
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
#### 1. 组合

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
#### 2. 状态提升

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
#### 3. 受控组件与非受控组件

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
#### 4. 代码分割

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
如果需要SSR代码分割可以使用<a href="https://loadable-components.com/" target="_blank">loadable-components</a>这个库。

---
#### 5. context

> 根组件下的所有组件共享数据的一种方法。  
> 在简单项目中替代redux的一种方法。  
> 当共享的数据使用setState更新时，所有订阅的组件都会重新渲染。

```jsx
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
#### 6. 错误边界

> 因为组件内部只能写表达式，不能写try/catch语句。  
> 使用static getDerivedStateFromError()或componentDidCatch()的特性，创建一个专门处理组件报错的组件。  
> 报错处理组件包裹任意其他组件后，可以监控处理这些组件的报错，比如渲染备用页面。

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
#### 7. ref和refs转发

> React获取真实Dom的方法
> 标签必须渲染后，dom才会映射到ref对象上。

```jsx
// 函数组件
let ComponentA = props=>{
  let ref = React.useRef() // ref变量绑定到标签后，标签选然后，标签dom会映射到变量上。
  ref.current // 此时ref.current为空
  let clickFun = ()=>console.log(ref.current) // 此时对象才有值
  return <><span onClick={clickFun} ref={ref}>123</span></>
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
#### 8. 高阶组件（HOC，Height Of Component）

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
#### 9. key
在react中如果有循环结构就必须在循环的标签上加key。  

主要原因是react通过key来决定是否重绘此标签。两次渲染如果相同顺位的标签属性key没有变化则react认为标签内容没有变化，不会重绘此标签。  

key与标签的内容应该是绑定并唯一的。一般后端输出的数据都存在一个唯一的数据id,一般以此作为key。  

如果没有数据id则用数组下标作为key。但数组的顺序不能发生改变，否则会导致不必要的重绘。并且如果标签内容是表单也会导致表单内容混乱。

### react api
1. React

> React的核心API,主要用于生成React虚拟节点.

```jsx
import React from 'react'

//静态属性
React.Fragment //虚拟dom组件占位根元素,简写：<></>.
React.Suspense //虚拟dom组件占位根元素,当使用懒加载组件时,可以传递props.fallback(加载时显示的组件).

//静态方法
//虚拟dom创建方法
React.createElement(标签名, {props}, children|[children]) //创建一个react虚拟dom,实际上JSX用babel转换后就是执行这个方法.
React.createFactory(标签名) //返回一个已经指定标签的React.createElement(),新版本已弃用.
React.cloneElement(虚拟dom, {props}, children|[children]) //克隆一个虚拟dom

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

//hook(只有函数组件可以使用)
React.useState(初始化state) // 使函数组件可以是用state, 返回一个数组第一个是当前state,第二个是setstate()
React.useEffect(callback()) // 生命周期钩子,组件初次渲染和更新后执行其回调函数.
React.useRef() // 创建一个ref对象.
React.useContext() // 消费指定context

//context
React.createContext({data: '默认值'}) // 创建一个context对象
Context.Provider // context注册根组件
Context.Consumer // 组件的方式消费指定context
Class.contextType // 消费指定context

``` 
  

2. React.Component

> React.Component是React比较重要又特殊的API.  
> React.Component是组件的抽象类.  
> 它的主要作用是,赋予一个类,组件的特性.  
> 只有继承它,在React.createElement()渲染虚拟DOM时,才会实例化具体组件,从而才会在渲染时调用具体组件相应的生命周期方法.  
> 如果不继承它,具体组件渲染虚拟DOM时将被普通调用.  
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
  

3. ReactDom

> React的html渲染API,主要用于在浏览器环境将虚拟节点渲染到html上.

```javascript
import ReactDOM from 'react-dom'

ReactDOM.render(element, container[, callback]) //渲染一个虚拟DOM到指定节点中.
ReactDOM.unmountComponentAtNode(container) //删除指定节点中的虚拟DOM.
ReactDOM.createPortal(element, container) //创建一个渲染动作,当ReactDOM.render执行时,会执行这个渲染动作.
```

4. ReactDOMServer

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
```

### redux
> 一种全局共享的数据仓库

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

### react redux
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

### vue api

> 和react不同的是vue核心api和它的html渲染api在一起。

1. Vue

```js
// 参数
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
  watch: { // 监听指定data值，只有改变就会执行回掉方法。
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
  render(h){ // 渲染函数，会覆盖template。
    return h('div', '123') // 理论上所有的模板编写方式编译后，本质上都是执行这个方法。
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
  beforeCreate(){},
  created(){},
  beforeMount(){},
  mounted(){},

  // 更新渲染阶段
  beforeUpdate(){},
  updated(){},

  // 删除阶段
  beforeDestroy(){},
  destroyed(){},

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

// 静态方法
Vue.extend({}) // 继承预设并返回一个Vue构造函数。参数和Vue构造函数一样。
Vue.component( // 将一个预设的Vue构造函数注册为组件。
  'componentName', // 组件名
  Vue.extend({})|{} // Vue.extend可省略。
) 
Vue.nextTick(callback) // Dom下一次渲染之后触发回调。
Vue.delete(this.list, 'name') // 删除组件data中的一个数据。会触发更新阶段。不能是data的一级对象。
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
Vue.use(install()|{install(){}}) // 插件注册方法，插件本身或插件对象中的install方法会被执行，传入Vue构造方法，供其改造。
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
Vue.prototype.$refs
Vue.prototype.$isServer
Vue.prototype.$attrs
Vue.prototype.$listeners
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