## 名词解释

### 盒子模型

所谓盒子模型即，每个标签都是一个矩形空间。

这个矩形空间由：内容（content）,内边距（padding），边框（border），外边距（margin）组成。

因为历史遗留问题盒子模型分为两种。

1. 标准盒子模型（w3c盒子模型），内容高宽不包括内边距和边框。

2. IE盒子模型，内容高宽包括内边距和边框。

现在普遍使用标准盒子模型。IE盒子模型主要使用于IE6，IE7，IE8。

### 文档流
html的文档流分三种。普通文档流，浮动文档流，定位文档流。

其中定位文档流完全独立于其他文档流，它们互相不会产生任何影响。（其实定位的默认位置还是会受到BFC的影响）

而普通文档流和浮动文档流因为BFC和IFC的存在会互相产生影响。

html默认情况下都处于普通文档流。

当使用了一些特殊的样式后标签会脱离排列队伍。

已知的脱离文档流的样式：  
1. float 浮动，浮动后的标签会脱离普通文档流进入浮动文档流，但是在同一个容器内的浮动标签又会按一定规则组成一个队列。
2. posision 定位，fixed和absolute会脱离普通文档流进入定位文档流。但不像浮动，定位标签之间完全不会组成队列，甚至会重叠。

### 格式化上下文（Formatting Context）
1. 块格式化上下文 - block Formatting Context

BFC是一块独立的渲染区域，外部的任何元素都无法影响它。比如重叠，环绕效果等。 

创建BFC的方法：  
* 根元素(html标签)
* float属性不为none
* position为absolute或fixed
* display为inline-block, table-cell, table-caption, flex, inline-flex
* overflow不为visible，

元素默认情况下不处于BFC。BFC因其拥有隔离性质可以实现一些技巧。

BFC的实用技巧：
* 清除浮动
* 防止浮动元素覆盖
* 防止外边距重叠

2. 行格式化上下文 - inline Formatting Context

IFC是行内元素和文字所处的区域。注意并非所有父元素区域都处于IFC。只有行内元素或文本部分才会处于IFC。比如存在兄弟块元素则块元素部分并非IFC。

IFC布局规则：
* 在一个行内格式化上下文中，盒是一个接一个水平放置
* 这些盒之间的水平margin，border和padding都有效
* 盒可能以不同的方式竖直对齐：以它们的底部或者顶部对齐，或者以它们里面的文本的基线对齐
* 行内块级元素之间默认留有间隙
* 矩形区域包含着来自一行的盒子叫做line box，line box的宽度由浮动情况和它的包含块决定，高度由line-height的计算结果决定。即IFC部分的元素会在浮动元素周围产生环绕效果。

IFC其实就是行内元素的样式原理。即所有行内元素都会产生IFC，IFC又赋予了行内元素IFC布局规则。

3. 弹性盒格式化上下文 - flexible Formatting Context
4. 网格格式化上下文 - grids Formatting Context

## 样式关键字

> 理论上关键字可用于任何CSS样式的值。

1. initial 使用样式默认值。display的默认值是inline，和标签没关系，div也会变成inline。
2. inherit 强制继承父元素的值。
3. unset 如果样式可以继承则用inherit，不能继承则用initial。**默认关键字。**
4. revert 使用浏览器初始化样式表。浏览器初始化样式中div的display是block，则div的revert等于block。
5. all 当前选择器下所有样式指定一个关键字。

```css
div{
  display: initial;  /* inline （display默认值是block）*/
  display: inherit;  /* block （body是block） */
  display: unset;  /* inline （display不能继承，所以使用initial。） */
  display: revert;  /* block （在浏览器样式表中div的display是block） */
  all: initial; /* div的所有样式都使用样式默认值 */
}
```

## 常用样式

### float 浮动
> 设置浮动后元素会脱离文档流

浮动的最初目的是产生文字环绕效果。现在已经多作为布局来使用。

浮动虽然脱离了文档流，但因为浮动自身的特性，还是会影响正常文档流的内容。（主要影响行内元素和文字）甚至于只要在浮动元素附近就会受到影响。不管是不是兄弟元素。

浮动的特性：
1. 浮动的元素自动转换成块元素。
2. 浮动的元素会尽可能的偏移到祖先块元素浮动方向的顶端。如果祖先没有块元素则偏移到body的浮动方向的顶端。
3. 浮动的元素和其他未激活BFC的块元素之间不会相互影响，完全遵循脱离文档流的情况。（其他块元素无视浮动元素，但浮动元素能看见其他块元素。）
4. 浮动的元素和其他行元素（IFC部分）之间会产生环绕效果。行元素会尽可能环绕浮动的元素。即便这些行元素是其他块元素的子元素只要IFC和浮动元素重叠就会产生环绕效果。
5. 如果其他元素产生了BFC，则浮动元素无法再覆盖BFC的元素。父元素BFC也会重新计算浮动元素的尺寸。
6. 因为浮动使自身形成一个BFC，导致浮动标签之间不会重叠，而是根据标签书写顺序横向排列。

``` css
{
  float: left;
  float: right;
}
```

### position 定位
> 设置定位后元素会脱离文档流

``` css
{
  position:static; /* 默认值 */
  position:relative; /* 相对于自身实际位置定位 */
  position:absolute; /* 相对于自身非static定位父元素位置定位 */
  position:fixed; /* 相对于整个窗口定位 */
  left:100px|50%;
  right:100px|50%;
  top:100px|50%;
  bottom:100px|50%;
}
```

### background 背景属性
``` css
{
  background-color: #000000; /* 背景颜色 */
  background-image: url(/i/eg_bg_03.gif); /* 背景图片 */
  background-repeat: repeat|repeat-x|repeat-y|no-repeat; /* 背景重复 */
  background-attachment: scroll|fixed; /* 背景图片是滚动还是固定 */
  background-position: center|bottom|top|left|50%|50px; /* 背景图片的定位 */
  background: background-color background-image background-repeat background-attachment background-position;
}
```
常用写法：
``` css
{
  /* 简写时的书写顺序 如果值为inherit则使用非简写处书写的参数 */
  background: #000000 url(/i/eg_bg_03.gif) no-repeat scroll center;
}
```

### border 边框属性
``` css
{
  border-width: 1px; /* 边框宽度 */
  border-color: #f0f0f0|red; /* 边框颜色 */
  border-style: /* 边框样式 */
    none| /* 无边框 */
    solid| /* 实线边框 */
    dotted| /* 点状边框 */
    dashed| /* 虚线边框 */
    double| /* 双边框 */
    groove| /* 凹槽边框 */
    ridge| /* 垄状边框 */
    inset| /* 嵌入边框 */
    outset /* 外凸边框 */
  ;
  border:border-width border-style border-color; /* 简写 */
}
```
常用写法：
```css
{
  border:5px solid red;
}
```

### other 杂项
```css
{
  padding-top: 10px; /* 上内边距 */
  padding-right: 10px; /* 右内边距 */
  padding-bottom: 10px; /* 下内边距 */
  padding-left: 10px; /* 左内边距 */
  padding: 10px 10px 10px 10px; /* 简写 */
  margin-top: 10px; /* 上外边距 */
  margin-right: 10px; /* 右外边距 */
  margin-bottom: 10px; /* 下外边距 */
  margin-left: 10px; /* 左外边距 */
  margin: 10px 10px 10px 10px; /* 简写 */
  width: 10px; /* 内容宽度 */
  height: 10px; /* 内容高度 */
  top: 10px; /* 定位偏移量 */
  left: 10px; /* 定位偏移量 */
  right: 10px; /* 定位偏移量 */
  bottom: 10px; /* 定位偏移量 */
  overflow: /* 当内容超出盒子模型时 */
    visible| /* 超出内容不会隐藏 */
    hidden| /* 超出内容隐藏 */
    scroll| /* 超出内容隐藏，并始终显示滚动条。 */
    auto /* 超出内容隐藏，并显示滚动条。 */
  ;
  display: /* 规定元素类型 */
    none| /* 元素不会渲染 */
    block| /* 定义为块元素 */
    inline-block| /* 定义为行内块元素 */
    inline| /* 定义为行内元素 */
    flex| /* 定义为弹性盒子元素 */
    inline-flex| /* 定义为行内弹性盒子元素 */
    grid| /* 定义为网格盒子元素 */
    inline-grid /* 定义为行内网格盒子元素 */
  ;
  visibility: /* 元素渲染可见性 */
    visible| /* 元素渲染并可见 */
    hidden| /* 元素渲染不可见（元素始终占据空间） */
    collapse /* 隐藏表格单元格之后单元格会补充空白区域 */
  ;
  cursor: /* 鼠标样式 */
    pointer| /* 手型标志 */
    help| /* 鼠标带一个问号 */
    progress| /* 加载状态 */
    wait| /* 等待状态 */
    move| /* 移动标志 */
    text /* 文本状态 */
  ;
  box-shadow: /* 元素阴影 */
    h-shadow /* 阴影水平位置 */
    v-shadow /* 阴影垂直位置 */
    blur /* 阴影模糊距离 */
    spread /* 阴影大小 */
    color /* 阴影颜色 */
    inset /* 内阴影 */
  ;
}
```
常用写法：
```css
{
  overflow: hidden;
  visibility: hidden;
  cursor: pointer;
  box-shadow: 10px 10px 5px #888888;
}
```

### transition 过渡
```css
{
  transition-property: width; /* 规定产生过渡效果的样式 */
  transition-duration: .5s; /* 规定过渡的时间 */
  /**
    transition-timing-function 过渡的速度曲线
    linear: 匀速
    ease: 慢快慢
    ease-in: 慢匀
    ease-out: 匀慢
    ease-in-out: 慢匀慢
    cubic-bezier(n,n,n,n): 定义一个速度贝塞尔曲线
  */
  transition-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n);
  transition-delay: 2s; /* 开始前的等待时间 */
  transition: transition-property transition-duration transition-timing-function transition-delay;
}
```
常用写法：
```css
{
  transition: width .5s linear 2s;
}
```

### animation 动画
```css
/* @keyframes 定义一个动画 花括号内用0%~100%描述动画的样式变化过程 */
@keyframes name {
  from {top:0px;} /* from相当于0% */
  to {top:200px;} /* to相当于100% */
}

@keyframes name {
  0% {top:0px;}
  50% {top:100px;}
  100% {top:200px;}
}

{
  animation-name: name; /* 在选择器上使用指定的动画 */
  animation-duration: 2s; /* 动画的播放时间 */
  /**
    animation-timing-function 动画的速度曲线
    linear: 匀速
    ease: 慢快慢
    ease-in: 慢匀
    ease-out: 匀慢
    ease-in-out: 慢匀慢
    cubic-bezier(n,n,n,n): 定义一个速度贝塞尔曲线
  */
  animation-timing-function: linear|ease|ease-in|ease-out|ease-in-out|cubic-bezier(n,n,n,n); /* 动画的速度曲线 */
  animation-delay: 2s; /* 动画延迟播放时间 */
  animation-iteration-count: 2|infinite; /* 动画循环次数 */
  /**
    animation-direction 是否反向播放
    normal: 正向播放
    reverse: 反向播放
    alternate: 奇数正向播放，偶数反向播放。
    alternate-reverse: 奇数反向播放，偶数正向播放。
  */
  animation-direction: normal|reverse|alternate|alternate-reverse; /* 是否反响播放 */
  animation-play-state: paused|running; /* 暂停或开始动画 */
  animation: animation-name animation-duration animation-timing-function animation-delay animation-iteration-count animation-direction animation-play-state; /* 简写 */
}
```
常用写法：
```css
{
  animation: name 2s linear 0s infinite normal running;
}
```

### transform 2D/3D 转换属性
透视相机特性：  
通过perspective开启透视相机后，实际上3d元素呈现的是，perspective所处平面的投影。它与现实生活中是不一样的。

在现实生活中，这个平面相当于我们的视网膜。我们始终看见的都是正视方向距离合适的视网膜像。但是此处移动相机后，3d元素呈现的像会发生和现实生活中不一样的形变。但其还是遵守近大远小的规律。因为此处实际上看见的是perspective所处平面的投影。

一般perspective设置为舞台长宽高中最大值的3倍。其值和perspective-origin不经常变动。

**perspective和perspective-origin需要在父元素上设置**

```css
{
  transform: 
    translate(x,y)| /* 2d位移 */
    translate3d(x,y,z)| /* 3d位移 */
    scale(x,y)| /* 2d缩放 */
    scale3d(x,y,z)| /* 3d缩放 */
    rotate(angle)| /* 2d旋转 */
    rotate3d(x,y,z,angle)| /* 3d旋转 */
    skew(x-angle,y-angle)| /* 2d倾斜 */
    perspective(n) /* 转换为透视相机 */
  ;
  transform-origin: 50% 50% 0; /* 修改2d，3d元素的原点位置 */
  transform-style: flat|preserve-3d; /* flat为以当前元素为平面子元素使用正交相机，preserve-3d为子元素统一使用当前元素的透视相机。 */
  perspective: 150px; /* 子元素开启透视相机，设置相机相对于当前元素平面中心的z轴偏移量，默认为none，当未设置perspective时将使用正交相机。 */
  perspective-origin: 50% 50%; /* 设置相机相对于当前元素平面中心的x,y轴偏移量。当未设置perspective时此项无效。 */
  backface-visibility: visible|hidden; /* 3d元素背面是否可见 */
}
```

### Font 字体
```css
{
  font-family: "family-name"; /* 定义字体系列，前面的优先级更高。 */
  font-size: 12px; /* 字体大小 */
  font-style: /* 字体倾斜 */
    italic| /* 使用字体自带的斜体样式，如果没有斜体样式则此项无效 */
    oblique /* 强制文字变成斜体 */
  ;
  font-variant: small-caps; /* 将小写字母转换成小型的大写字母 */
  font-weight: /* 字体粗细 */
    bold| /* 粗体 */
    bolder| /* 特粗体 */
    lighter /* 细体 */
  ;
}

/* 加载一个远程字体，并命名使其可以被font-family使用。 */
@font-face
{
  font-family: "family-name";
  src: url('Sansation_Light.ttf');
}
```
常用代码：
```css
/**
  font-family常用写法（兼容各种设备）
  第1、2个"Helvetica Neue", Helvetica为mac os下的西文字体；
  第3个Arial为windows下的西文字体；
  第4、5、6个"PingFang SC"，"Hiragino Sans GB", "Heiti SC"为mac os下的中文字体；
  第7个"Microsoft YaHei"为windows下的中文字体；
  第8个"WenQuanYi Micro Hei"为linux下的中文字体；
  第9个sans-serif为一个无衬线字体族；
*/
{
  font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
}

/* @font-face兼容写法 */
@font-face {
  font-family: "family-name";
  src: url('//get-font.com/font.eot'); /* IE9 */
  src: url('//get-font.com/font.eot?#iefix') format('embedded-opentype'),  /* IE6-IE8 */
  url('//get-font.com/font.woff2') format('woff2'), /* 现代浏览器 */
  url('//get-font.com/font.woff') format('woff'), /* 现代浏览器 */
  url('//get-font.com/font.ttf') format('truetype'), /* Safari, Android, iOS */
  url('//get-font.com/font.svg#iconfont') format('svg'); /* Legacy iOS */
}
```

### Text 文本

文字的基线：  
<img src="/md/img/text-base-line.PNG" />

基线涉及到vertical-align的对齐方式。

文字的基线就是x这个字母的底边。**中线并非在行框的垂直中心。**

**当未设置行高时，行框顶部和文字顶线重合，行框底部和文字底线重合。**

默认情况下一行文字的基线都是对齐父元素的基线，不管其中字体大小是否相同。对齐基线后会重新计算整行的高度以行高最大的文字作为整行的高度。

**父元素的基线就是内部文字没有覆盖父元素文字样式时的基线。**其他顶线，中线，底线同理。

需要注意的是行内块元素与兄弟行内元素对齐时分为两种情况。

1. 行内块元素中不存在文字。此时行内块元素的基线为其盒子模型的外边距底边。
2. 行内块元素中存在文字。此时会忽略块元素的高度按内部文字对齐。

```css
{
  color: red|#000000; /* 颜色 */
  direction: ltr|rtl; /* 文本书写方向 */
  letter-spacing: 5px; /* 文字间距 */
  word-spacing: 5px; /* 单词间距 */
  line-height: 5px; /* 行高 */
  text-decoration: /* 文本装饰效果 */
    underline| /* 下划线 */
    overline| /* 上划线 */
    line-through| /* 删除线 */
    blink /* 文本闪烁效果（仅限火狐） */
  ; 
  text-indent: 4px; /* 段落首行缩进 */
  text-transform: /* 文本字母大小写 */
    none| /* 默认效果 */
    capitalize| /* 每个单词首字母大写 */
    uppercase| /* 全部大写 */
    lowercase /* 全部小写 */
  ; 
  text-align: left|right|center|justify; /* 水平对齐方式 */
  vertical-align: /* 文本基线对齐 */
    baseline| /* 默认。对齐父元素基线 */
    sub| /* 文字基线对齐父元素的下标基线 */
    super| /* 文字基线对齐父元素的上标基线 */
    top| /* 文字顶线对齐整行的顶线 */
    text-top| /* 行框顶部对齐父元素的顶线 */
    bottom| /* 文字底线对齐整行的底线 */
    text-bottom| /* 行框底部对齐父元素的底线 */
    middle| /* 文字行框的垂直中心对齐父元素的中线 */
    10px /* 文字垂直移动指定距离可以是负值 */
  ; 
  white-space: /* 文本如何换行 */
    normal| /* 容器边界换行，<br/>换行，源码换行忽略，合并空格 */
    nowrap| /* 容器边界不换行，<br/>换行，源码换行忽略，合并空格 */
    pre| /* 容器边界不换行，<br/>换行，源码换行不忽略，不合并空格 */
    pre-wrap| /* 容器边界换行，<br/>换行，源码换行不忽略，不合并空格 */
    pre-line /* 容器边界换行，<br/>换行，源码换行不忽略，合并空格 */
  ; 
  text-align-last: /* 最后一行的对齐方式 */
    auto| /* 默认。最后一行左对齐并调整文本 */
    left| /* 最后一行左对齐 */
    right| /* 最后一行右对齐 */
    center| /* 最后一行居中对齐 */
    justify| /* 最后一行两端对齐 */
    start| /* 最后一行书写方向开始对齐 */
    end| /* 最后一行书写方向末尾对齐 */
  ; 
  text-overflow: /* 当文字超出父元素并且父元素设置了overflow:hidden;时如何裁剪文字 */
    clip|/* 删除多余部分 */
    ellipsis| /* 使用省略号代替余部分 */
    string|/* 使用指定文本代替余部分（仅火狐） */
  ; 
  text-shadow: /* 文字阴影 */
    2px| /* 阴影水平位置 */
    2px| /* 阴影垂直位置 */
    2px| /* 阴影模糊距离 */
    #000000| /* 阴影颜色 */
  ; 
  word-break: /* 长单词换行。尽可能填充空白空间。阅读难度增加。 */
    break-all|  /* 允许在单词内换行。 */
    keep-all /* 只能在半角空格或连字符处（-）换行。 */
  ;
  word-wrap: break-word; /* 长单词换行。依然会出现部分空白。阅读难度尚可。 */
}
```

### Table 表格
> 一列单元格的总宽度需要等于表格的100%，所以单元格宽度请使用半分比设置。

```css
{
  border-collapse: collapse; /* 合并相邻单元格的边框 */
  border-spacing: 5px; /* 单元格之间的间距 */
  caption-side: top|bottom; /* 将表格的标题放在上方还是下方 */
  empty-cells: hide|show; /* 是否隐藏空单元格 */
  table-layout: automatic|fixed; /* 列宽由单元格内容决定还是由单元格定义的宽度决定 */
}
```

### Flexible Box 弹性盒子模型
<img src="/md/img/flex.PNG" />

> 使用display: flex|inline-flex创建弹性盒子模型。  
> 弹性盒子模型的特性主要影响子元素。  
> 弹性盒子所在区域为FFC（弹性盒子格式化上下位）。  

flex-grow和flex-shrink的比例不是自身的比例，是**超出部分**和**多余部分**的比例。

子元素长度默认由内容决定。再按flex-grow和flex-shrink修正长度。如果flex-shrink修正后子元素依然超出父元素，则超出部分保留。

```css
flex-direction: /* 子元素排列方向 */
  row| /* 默认。从左至右 */
  row-reverse| /* 从右至左 */
  column| /* 从上至下 */
  column-reverse /* 从下至上 */
;
flex-wrap: /* 空间不足时换行现实 */
  nowrap| /* 默认。不换行。 */
  wrap| /* 根据排列方向换行 */
  wrap-reverse /* 根据排列反方向换行 */
;
flex-flow: flex-direction flex-wrap; /* 简写 */
justify-content: /* 整体主轴对齐方式 */
  space-between| /* 默认值。两端对齐。多余长度分别放在各个子元素一侧，并确保在内侧。 */
  space-around| /* 默认值。两端对齐。多余长度分别平分放在各个子元素两侧。 */
  center| /* 中心对齐 */
  flex-start| /* 默认值。对齐于排列方向的开始位置 */
  flex-end| /* 对齐于排列方向的结束位置 */
;
align-content: /* 整体侧轴对齐方式 */
  stretch| /* 默认值。两端对齐。多余长度分别放在各个子元素一侧。 */
  space-between| /* 两端对齐。多余长度分别放在各个子元素一侧，并确保在内侧。 */
  space-around| /* 两端对齐。多余长度分别平分放在各个子元素两侧。 */
  center| /* 中心对齐 */
  flex-start| /* 对齐于排列方向的开始位置 */
  flex-end| /* 对齐于排列方向的结束位置 */
;
align-items: /* 行内侧轴对齐方式 */
  stretch| /* 拉伸子元素以占满侧轴整行，如果设置高宽则使用flex-start */
  center| /* 子元素在当前行的侧轴中心对齐 */
  flex-start| /* 对齐于当前行排列方向的开始一侧 */
  flex-end| /* 对齐于当前行排列方向的结束一侧 */
  baseline /* 对齐当前行的文本基线 */
;
align-self: /* 单独行内侧轴对齐方式 */
  stretch| /* 拉伸元素以占满侧轴整行，如果设置高宽则使用flex-start */
  center| /* 元素在当前行的侧轴中心对齐 */
  flex-start| /* 对齐于当前行排列方向的开始一侧 */
  flex-end| /* 对齐于当前行排列方向的结束一侧 */
  baseline /* 对齐当前行的文本基线 */
;
flex-grow: 0; /* 父元素有多余长度时，子元素按比例分配多余长度，默认为0。为0时不参与分配多余长度。*/
flex-shrink: 1; /* 子元素总长度超出父元素时，按比例分配超出长度，子元素各自删除自己的比例长度。默认为1。为0时不参与分配超出长度。*/
flex-basis: 100px|auto; /* 默认为auto。子元素的默认长度。优先级高于width和height，低于min-width，max-width，min-height，max-height和content。 */
flex: flex-grow flex-shrink flex-basis; /* 简写 */
order: 0; /* 子元素排列位置 */
```

### Grid Box 网格盒子模型
> 使用display: grid|inline-grid创建网格盒子模型。  
> 网格盒子模型的特性主要影响子元素。  
> 弹性盒子所在区域为GFC（网格盒子格式化上下位）。  

```css
grid-template-rows: 10px 10px 10px|repeat(3, 10px); /* 定义行 */
grid-template-columns: /* 定义列 */
  10px 10px 10px| /* 定义3列 */
  repeat(3, 10px)| /* 定义3列，重复10px三次。 */
  repeat(3, 10px 20px 10px)| /* 定义9列，重复10px 20px 10px三次。 */
  repeat(3, 10px 20px 10px)| /* 定义9列，重复10px 20px 10px三次。 */
  1fr 2fr 1fr| /* 定义3列，按比例定义列宽。 */
  minmax(100px, 1fr)| /* 定义1列，列宽为一个范围值（100px~1fr）。 */
  auto| /* 自动分配列宽 */
  [c1] 10px [c2] 10px [c3] 10px [c4]| /* 为垂直网格线定义名称 */
;
grid-auto-columns: 10px; /* grid-template-areas指定的位置未定义行时，取这个值。 */
grid-auto-rows: 10px; /* grid-template-areas指定的位置未定义列时，取这个值。 */
grid-area: a; /* 子元素放在哪个区域 */
grid-template-areas:". a a"
                    ". b b"
                    ". b b"; /* 规划一个区域，（.）为不规划区域，只能是矩形。 */
grid-row-gap: 10px; /* 行间距 */
grid-column-gap: 10px; /* 列间距 */
grid-auto-flow: /* 单元格的排列方式 */
  row| /* 从左至右排列 */
  column| /* 从上至下排列 */
  row dense| /* 使用grid-template-areas指定位置后，剩余部分从左至右排列。 */
  column dense| /* 使用grid-template-areas指定位置后，剩余部分从上至下排列。 */
;
justify-items: /* 所有单元格水平对齐 */
  start| /* 水平对齐开始位置 */
  end| /* 水平对齐结束位置 */
  center| /* 水平中心对齐 */
  stretch| /* 水平拉伸两端对齐 */
;
justify-self: /* 单个单元格水平对齐 */
  start| /* 水平对齐开始位置 */
  end| /* 水平对齐结束位置 */
  center| /* 水平中心对齐 */
  stretch| /* 水平拉伸两端对齐 */
;
align-items: /* 所有单元格垂直对齐 */
  start| /* 垂直对齐开始位置 */
  end| /* 垂直对齐结束位置 */
  center| /* 垂直中心对齐 */
  stretch| /* 垂直拉伸两端对齐 */
;
align-self: /* 单个单元格垂直对齐 */
  start| /* 垂直对齐开始位置 */
  end| /* 垂直对齐结束位置 */
  center| /* 垂直中心对齐 */
  stretch| /* 垂直拉伸两端对齐 */
;
place-items: align-items justify-items; /* 简写 */
place-self: align-self justify-self; /* 简写 */
justify-content: /* 网格整体水平对齐 */
  start| /* 水平对齐开始位置 */
  end| /* 水平对齐结束位置 */
  center| /* 水平居中对齐 */
  stretch| /* 水平拉伸两端对齐 */
  space-around| /* 水平两端对齐，不拉伸，空白部分分布于列两端。 */
  space-between| /* 水平两端对齐，不拉伸，空白部分分布网格内侧。 */
  space-evenly| /* 水平两端对齐，不拉伸，空白部分分布于列两端，并确保空白距离相等。 */
;
align-content: /* 网格整体垂直对齐 */
  start| /* 垂直对齐开始位置 */
  end| /* 垂直对齐结束位置 */
  center| /* 垂直居中对齐 */
  stretch| /* 垂直拉伸两端对齐 */
  space-around| /* 垂直两端对齐，不拉伸，空白部分分布于列两端。 */
  space-between| /* 垂直两端对齐，不拉伸，空白部分分布网格内侧。 */
  space-evenly| /* 垂直两端对齐，不拉伸，空白部分分布于列两端，并确保空白距离相等。 */
;
place-content: align-content justify-content; /* 简写 */
grid-column-start: 1; /* 单元格开始方向的列边框在哪个垂直网格线（开始方向数起） */
grid-column-end: 4; /* 单元格结束方向的列边框在哪个垂直网格线（开始方向数起） */
grid-row-start: 1; /* 单元格开始方向的行边框在哪个水平网格线（开始方向数起） */
grid-row-end: 4; /* 单元格结束方向的行边框在哪个水平网格线（开始方向数起） */
grid-column: grid-column-start / grid-column-end; /* 简写 */
grid-row: grid-row-start / grid-row-end; /* 简写 */
```

## 常用技巧

### 上下左右绝对居中
利用定位的fixed和absolute属性，所以这种方法只能相对于屏幕居中或者相对于非static定位父元素居中。

<iframe height="265" style="width: 100%;" scrolling="no" title="RwaOmXX" src="https://codepen.io/iocdacc/embed/RwaOmXX?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/iocdacc/pen/RwaOmXX'>RwaOmXX</a> by iocdacc
  (<a href='https://codepen.io/iocdacc'>@iocdacc</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

```css
{
  height:50px;
  width:50px;
  position:fixed|absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  margin:auto;
}
```

### 容器内部标签宽度大于容器，居中显示内部标签。
因为内部标签宽度大于容器，所以用一般的margin:0 auto;无法居中。

使用定位并且需要三个容器配合，最外层容器宽度自适应，内部两个容器设置需要的固定宽度，中间容器向右偏移50%，最内层容器向左偏移50%。

因为中间容器向右偏移了50%，导致它的左边线始终处于居中位置，不管最外层的宽度如何变化。

而最内层的容器又向左偏移了50%，导致它的中线和中间容器的左边线重合。

最终目的使最内层容器始终处于居中状态。

<iframe height="265" style="width: 100%;" scrolling="no" title="eYZowyL" src="https://codepen.io/iocdacc/embed/eYZowyL?height=265&theme-id=dark&default-tab=result" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/iocdacc/pen/eYZowyL'>eYZowyL</a> by iocdacc
  (<a href='https://codepen.io/iocdacc'>@iocdacc</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

```css
.box{
  height:170px;
  background-color: blue;
  overflow: hidden;
  position: relative;
}

.solid1{
  position: absolute;
  left: 50%;
  background-color: red;
  height:150px;
  width:1920px;
}

.solid2{
  position: absolute;
  left: -50%;
  background-color: antiquewhite;
  height:130px;
  width:1920px;
  text-align: center; /* 行内居中，不是示例代码 */
}
```

```html
<div class="box">
  <div class="solid1">
    <div class="solid2">
      <span>内容</span>
    </div>
  </div>
</div>
```