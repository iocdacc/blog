## 准备工作

> 在使用vue之前需要先了解一下单页应用（SinglePage Application ， SPA）和多页应用（MultiPage Application ， MPA）。  
1. 所谓单页应用就是整个项目只存在一个html。并且内容全部由js加载，包括页面的切换也由js来完成。  
2. 而多页应用则存在多个html。其url路由一般都直接采用文件目录的路由，每一个页面都对应一个html。  

> 为什么要使用单页应用？

1. 因为单页应用的内容全部由js加载，这使得js对页面的控制粒度更细。
2. 并且因为不再需要刷新页面的缘故，切换页面时不再需要渲染整个页面，而只需要渲染改变的部分。这样大大节约的客户端的资源消耗和服务端带宽。
3. 因为页面由js来渲染，服务端不再需要传输html。可以直接传输json数据。这样cs端和bs端可以使用同一套接口。

> 为什么要使用vue？

vue的主要作用就是将单页应用的框架搭好，比如说页面的渲染，页面的跳转，数据共享，组件的实现等等。这些工作我们自己也可以完成但那样就太繁琐，属于重复造轮子，并且还没有vue做得好。  
当然vue也支持传统的script标签引入，但那主要是给以前的传统多页应用来过渡的。即所谓的渐进式开发。

> nodejs, npm, webpack这些是什么？

要了解这些之前我们要知道什么是javascript。  

javascript发展到今天它已经形成了一套成熟的规范，**EcmaScript**。你可以把它理解成类似ISO的国际标准。需要注意的是EcmaScript它只是规范而不是语言。即**没有直接运行EcmaScript的环境**。   

这里就要提到规范的实现。任何人或组织都可以根据一种编程语言的规范来实现一个运行环境。主要的EcmaScript实现有两个。其一为**浏览器环境**，其二就是**node环境**。  

实现规范时必须尽可能的将规范里的需求方法写成真实的可以使用的函数。同时各个组织又会在自己的环境中实现一些不在规范内的符合自己环境需求的函数。比如在浏览器环境中dom访问方法就不是EcmaScript的规范。node中访问数据库和文件系统的方法也不是EcmaScript的规范。其实console.log也不是EcmaScript的规范。

现在我们知道了nodejs只是**EcmaScript的一个实现**。
而**npm**是nodejs的依赖安装程序。

到这里产生了一个问题，nodejs是服务端的语言它为什么和前端扯上关系了？  

我们先来回想一下在传统的前端开发中js是如何编写的。首先必须引入script标签这些可能是依赖也可能是业务代码。依赖过多时可能有十几个script标签，并且得保证他们的顺序正确。版本也不能错误。这导致代码是极难维护的。  

我们必须以一种更加规范的方式来编写前端代码。  
得益于nodejs是服务端语言它对系统的访问权限是很高的，不像浏览器的js只有有限的系统访问能力。  
因此我们可以使用nodejs来对前端代码做一些预处理。  
即我们可以先按照某种规范来编写前端代码。然后使用nodejs对这些代码进行预处理。使浏览器可以运行这些代码。  

不要小看预处理，它可以做很多事情。比如自动将js代码的顺序保持正确。锁定依赖的版本号。压缩css js html。可以使用还未实现的EcmaScript规范ES2022等。甚至是EcmaScript的超集TypeScript。  
而vue的代码编写规范就是规范的一种。
而**webpack**就是基于nodejs开发的预处理程序的一种。

## 开始使用vue

> 因为林业项目我会把框架搭好，你应该只需要开发组件即可。所有暂时只需要了解组件的开发方法和一些基本使用方法即可。

> 首先我们先来看一下一个组件由哪些部分组成

vue组件扩展名是.vue，例如 app.vue。  
组件包括自身数据（data）和外部传入数据（props）。他们都会注入到组件的this对象下。  
组件内部可以使用其他组件，使用前需要先注册。分为局部注册和全局注册。 全局注册后的组件无需局部注册一般使用ui框架的组件都会全局注册。
组件存在生命周期，类似与o2oa里afterLoad这种事件。  

组件的模板语法可以参考这篇文章： https://blog.iocdacc.com/#/archive/2019-07-09 的模板语法部分
```html
<template> <!-- 在这里写模板 -->
  <div class="example" v-on:click="setStr">{{ str }}</div> <!--在模板里不用加this-->
  <div>props: {{ prop1 }}</div> <!--在模板里不用加this-->
</template>

<script> // 在这里写脚本
import Component1 from 'Component1.vue'
export default {
  props: ['prop1'], // 要使用props必须先注册
  components: { // 局部注册组件，组件需要注册后才能使用。
    Component1
  },
  methods:{ // 这里编写的方法会注入到组件的this中，可以在模板和生命周期中使用。
    setStr(){
      this.str = '我被点击了' // 直接修改data就能触发页面重绘。
    } 
  },
  // data必须是函数。因为引用数据类型的原因如果不会函数，则多个相同组件的数据会冲突。
  data(){
    return {
      str: '我是初始值'
    }
  },
  mounted(){
    console.log(this.prop1) // props会直接注入到实例的根属性下。不像react需要使用this.props.prop1访问。
    console.log(this.str) // data会直接注入到实例的根属性下。
  }

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
}
</script>

<style> /* 在这里写样式 */
.example {
  color: red;
}
</style>
```

上面就是一个完整的组件。组件的使用方法。

```html
<template> <!-- 在这里写模板 -->
  <App prop1="123"></App> <!-- 两种写法 -->
  <App prop1="123" /> <!-- 两种写法 -->
</template>

<script> // 在这里写脚本
import App from 'App.vue' // 如果上面的组件名字是App
export default {
  components: { // 局部注册组件，组件需要注册后才能使用。
    App
  },
  methods:{},
  data(){
    return {}
  },
  mounted(){
  }
}
</script>

<style> /* 在这里写样式 */
</style>
```