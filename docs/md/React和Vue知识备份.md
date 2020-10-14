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
|ssr|自带功能，nextjs|自带功能，nuxtjs|
|原生app框架|react-native|weex|


## React
### react api
1. React

> React的核心API,主要用于生成React虚拟节点.

```js
import React from 'react'

//静态属性
React.Fragment //虚拟dom组件占位根元素.
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
React.createRef() //创建一个ref对象,当挂载ref后,挂载的dom会传入这个对象.
React.forwardRef(callback(props, ref)) //让ref转发写法更统一.
React.lazy(callback()) //懒加载一个组件.

//虚拟dom抽象方法
React.Component() //组件抽象类
React.PureComponent() //组件抽象类,props和state无更新时不刷新组件.
React.memo(函数组件) //props和state无更新时不刷新组件.

//hook(只有函数组件可以使用)
React.useState(初始化state) //使函数组件可以是用state, 返回一个数组第一个是当前state,第二个是setstate()
React.useEffect(callback()) //生命周期钩子,组件初次渲染和更新后执行其回调函数.
React.useRef() //创建一个ref对象.

``` 
  

2. React.Component

> React.Component是React比较重要又特殊的API.  
> React.Component是组件的抽象类.  
> 它的主要作用是,赋予一个类,组件的特性.  
> 只有继承它,在React.createElement()渲染虚拟DOM时,才会实例化具体组件,从而才会在渲染时调用具体组件相应的生命周期方法.  
> 如果不继承它,具体组件渲染虚拟DOM时将被普通调用.  
> 当然它也提供了一些辅助作用的实例方法  

生命周期：
```javascript
// 继承React.Component后能使用的生命周期
// 在React.createElement()渲染虚拟DOM时会回调这些生命周期方法

import React, { Component } from 'react'

class App extends Component{
  constructor(props) { // 和原生JS一样实例化的第一步执行构造方法
    super(props)
  }

  // 初次渲染
  componentDidMount(){} //渲染完成后执行此方法,如果使用this.setState()更新state将触发更新阶段
  render(){return <div></div>} // 渲染方法,返回值为虚拟DOM
  static getDerivedStateFromProps(props, state){} //render()初次渲染或更新之前执行此方法,它的返回值修改state. 

  // 更新阶段
  static getDerivedStateFromProps(props, state){} // render()初次渲染或更新之前执行此方法,它的返回值修改state. 
  shouldComponentUpdate(nextProps, nextState){} // 如果此方法返回false将不执行render()渲染
  render(){return <div></div>} // 渲染方法,返回值为虚拟DOM
  getSnapshotBeforeUpdate(){} // 渲染已经完成,但还没有更新DOM时触发.它的返回值将传给之后的componentDidUpdate()
  componentDidUpdate(prevProps, prevState, snapshot){} // 更新渲染后触发

  // 卸载阶段
  componentWillUnmount(){}
}
```  
  

3. ReactDom

> React的ECMAScript渲染API,主要用于在浏览器或node环境将虚拟节点渲染到html上.

```javascript
import ReactDOM from 'react-dom'

ReactDOM.render(element, container[, callback]) //渲染一个虚拟DOM到指定节点中.
ReactDOM.unmountComponentAtNode(container) //删除指定节点中的虚拟DOM.
ReactDOM.createPortal(element, container) //创建一个渲染动作,当ReactDOM.render执行时,会执行这个渲染动作.
```

4. ReactDOMServer

```javascript
import ReactDOMServer from 'react-dom/server'

ReactDOMServer.renderToString(element) //将react虚拟DOM渲染成静态html字符串
```


### redux
> 一种全局共享的数据仓库
```javascript
// 当更新仓库时执行的方法
// state：仓库实体
// action：操作的类型
// return: 创建一个新状态
let reducer = function (state, action){

}

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
// 静态属性
Vue.config.silent = false // 是否开启报错
Vue.config.devtools = true // 是否开启devtools调试工具，开发版本默认为 true，生产版本默认为 false。
Vue.config.errorHandler = (err, vm, info)=>{} // 报错处理
Vue.config.warnHandler = (msg, vm, trace)=>{}  // 警告处理
Vue.config.ignoredElements = (msg, vm, trace)=>{}  // 警告处理
Vue.config.keyCodes = {v: 86, f1: 112, "media-play-pause": 179} // 键盘事件别名，不能使用驼峰。
Vue.config.productionTip = true  // 开启生产提示

// 静态方法
Vue.extend({ // 创建一个组件
  components: { // 局部注册组件，只能在本组件中使用。
    componentsA: componentsA
  },
  props: ['title', 'likes'], // 外部传入的数据变量名
  props: { // 可以规定数据类型
    title: String,
    likes: Number，
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise // or any other constructor
  },
  template: '<div>123</div>', // 模板编写方式之一，可选。
  data(){ // 组件内data必须是函数，因为需要通过this访问组件内的数据，不能是箭头函数。
    return {}
  },
  methods: { // 事件绑定时能使用这里面的方法
    clickFun(){
      console.log('我被点击了')
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