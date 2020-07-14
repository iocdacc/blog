## React API
### React
React的核心API,主要用于生成React虚拟节点.
### ReactDom
React的ECMAScript渲染API,主要用于在浏览器或node环境将虚拟节点渲染到html上.
### ReactNative
React的APP渲染API,主要用于在安卓或IOS的环境将虚拟节点渲染到html上.

> React的核心API必选,而后面两个API视生产环境选一个使用.

## React

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
componentDidUpdate(prevProps, prevState, snapshot) //渲染后触发
```