> 本文章基于 redux 4.0.5  
> redux 类似于 sessionStorage 的加强版  
> redux 本质还是页面的数据 和定义一个全局变量的形式差不多 所以当页面刷新时 redux的数据就没有了 而 sessionStorage 类似一个数据库 数据存在于硬盘所以 页面刷新时数据依然存在  
> redux 和 sessionStorage 各有优势 它们可以配合使用  
> redux 的优势是 数据存在于内存中 读写速度非常快 并且 redux 还有其他很多实用的功能比如状态保存,状态回溯等 但缺点是依附于页面 页面刷新就无法读取了  
> sessionStorage 的优势是 数据存在于硬盘 它不依附于页面 所以数据可以一直保存 但缺点是读写速度没有内存快  
> 所以要让 redux 也能刷新读取 就可以在刷新前将 redux 的数据存储于 sessionStorage 刷新后重新载入 redux  

## redux源码解析

### 目录
```
./src/utils/actionTypes.js
./src/utils/isPlainObject.js
./src/utils/warning.js

./src/applyMiddleware.js
./src/bindActionCreators.js
./src/combineReducers.js
./src/compose.js
./src/createStore.js           --
./src/index.js                 --代码入口
```

### ./src/index.js
``` javascript
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'

//代码第一步定义了一个虚构函数
function isCrushed(){}

//这里其实就是在生产环境下提醒开发者你的代码没压缩 赶紧去压缩代码 不然会很慢
if (
  process.env.NODE_ENV !== 'production' && //这里判断是不是生产模式
  typeof isCrushed.name === 'string' && //这里判断函数名是不是字符串 因为压缩后的代码函数名可能不是字符串
  isCrushed.name !== 'isCrushed' //这里判断函数名是否被更改了 因为压缩后的代码函数名一般会变成a b c d之类的
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === "production". ' +
      'This means that you are running a slower development build of Redux. ' +
      'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
      'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
      'to ensure you have the correct code for your production build.'
  )
}

//返回一些其他模块的方法给外部使用
export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes
}
```