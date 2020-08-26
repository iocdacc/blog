## React和Vue异同
|类别|React|Vue|
|:--|:--|:--|
|虚拟DOM生成|React.createElement()|new Vue({render(h){return h()}})|
|虚拟DOM渲染|ReactDOM.render()|new Vue({}).$mount('#app')</br>new Vue({el:'#app'})|
|模板编译|JSX|Vue Loader,Vue,JSX|
|模板语法|JSX|**Vue Loader,Vue:**{{插值}},v-if,v-for,...</br>**JSX:**JSX|
|生成静态html|ReactDOMServer.renderToString()|require('vue-server-renderer').createRenderer().renderToString()|
|接管静态html|ReactDOM.hydrate()|new Vue({})|
|状态管理器|redux|veex|

## React API
### React
React的核心API,主要用于生成React虚拟节点.
### ReactDom
React的ECMAScript渲染API,主要用于在浏览器或node环境将虚拟节点渲染到html上.
### ReactNative
React的APP渲染API,主要用于在安卓或IOS的环境将虚拟节点渲染到html上.

> React的核心API必选,而后面两个API视生产环境选一个使用.

### React

```javascript
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

### React.Component

> React.Component是React比较重要又特殊的API.  
> React.Component是组件的抽象类.  
> 它的主要作用是,赋予一个类,组件的特性.  
> 只有继承它,在React.createElement()渲染虚拟DOM时,才会实例化具体组件,从而才会在渲染时调用具体组件相应的生命周期方法.  
> 如果不继承它,具体组件渲染虚拟DOM时将被普通调用.  
> 当然它也提供了一些辅助作用的实例方法  

```javascript
//继承React.Component后能使用的生命周期
//在React.createElement()渲染虚拟DOM时会回调这些生命周期方法

//初次渲染
constructor() //和原生JS一样实例化的第一步执行构造方法
static getDerivedStateFromProps(props, state) //render()初次渲染或更新之前执行此方法,它的返回值修改state. 
render() //渲染方法,返回值为虚拟DOM
componentDidMount() //渲染完成后执行此方法,如果使用this.setState()更新state将触发更新阶段

//更新阶段
static getDerivedStateFromProps(props, state) //render()初次渲染或更新之前执行此方法,它的返回值修改state. 
shouldComponentUpdate(nextProps, nextState) //如果此方法返回false将不执行render()渲染
render() //渲染方法,返回值为虚拟DOM
getSnapshotBeforeUpdate() //渲染已经完成,但还没有更新DOM时触发.它的返回值将传给之后的componentDidUpdate()
componentDidUpdate(prevProps, prevState, snapshot) //更新渲染后触发
```

### ReactDom
```javascript
ReactDOM.render(element, container[, callback]) //渲染一个虚拟DOM到指定节点中.
ReactDOM.unmountComponentAtNode(container) //删除指定节点中的虚拟DOM.
ReactDOM.createPortal(element, container) //创建一个渲染动作,当ReactDOM.render执行时,会执行这个渲染动作.
```

### ReactDOMServer
```javascript
ReactDOMServer.renderToString(element) //将react虚拟DOM渲染成静态html字符串
```


## redux
> 一种全局共享的数据仓库
```javascript
// 当更新仓库时执行的方法
// state：仓库实体
// action：操作的类型
// return: 覆盖整个仓库
let reducer = function (state, action){

}

// 创建一个仓库
let store = createStore(reducer, [defaultState], applyMiddleware)

// 当仓库更新时会执行回调方法
store.subscribe(function (){});

// 更新仓库
store.dispatch({ type: 'INCREMENT' });
```

## react redux
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

## SSR

1. 客户端发起请求
2. 服务端根据请求组织组件
3. 预取数据存入redux仓库
4. 渲染组件成静态HTML
5. 将仓库赋值到静态HTML的window
6. 返回静态HTML
7. 客户端接收HTML，解析JS
8. 接管静态HTML，并且把window内的仓库复制到客户端的仓库。

如果SSR 使用组件懒加载（异步组件）同构时前端组件内容为空 导致无意义的重绘