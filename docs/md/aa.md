对于CSS优先级问题，我一开始认为的是，后面的覆盖前面的，内联>内部>外部，仅此而已，顶多再加一个!important。
但其实这是非常片面的，如果这个问题没有弄清楚，在书写样式时可能会出现无法解释的情况。
对此免得到时候再去找解决办法，不如在此进行归档。以便之后查阅

## CSS 优先规则1

最近的祖先样式比其他祖先样式优先级高。
``` html
<!-- 类名为 son 的 div 的 color 为 blue -->
<div style="color: red">
    <div style="color: blue">
        <div class="son"></div>
    </div>
</div>
```

## CSS 优先规则2

"直接样式"比"祖先样式"优先级高。
``` html
<!-- 类名为 son 的 div 的 color 为 blue -->
<div style="color: red">
    <div class="son" style="color: blue"></div>
</div>
```

## CSS 优先规则3

规则1和规则2 其实和我的固有认知没有差别 即之后的覆盖之前的，内联样式优先级最高。
但规则3就有出入了

### 列出CSS 7种选择器:

ID 选择器， 如 #id{}

类选择器， 如 .class{}

属性选择器， 如 a[href="segmentfault.com"]{}

伪类选择器， 如 :hover{}

伪元素选择器， 如 ::before{}

标签选择器， 如 span{}

通配选择器， 如 *{}

优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

``` html
<!-- 标签颜色为black，因为内联样式优先级最高 -->
// HTML
<div class="content-class" id="content-id" style="color: black"></div>

// CSS
<style>
#content-id {
    color: red;
}
.content-class {
    color: blue;
}
div {
    color: grey;
}
</style>
```
原来优先级跟内部样式还是外部样式没有半毛钱关系。

## CSS 优先规则4

现在到了重头戏了，这种情况之前完全没有考虑，也是无法解释问题的原因。

### 首先列出优先级关系:

优先级关系：内联样式 > ID 选择器 > 类选择器 = 属性选择器 = 伪类选择器 > 标签选择器 = 伪元素选择器

注意其实选择器是拥有权重的即
1权重：标签选择器、伪元素选择器
2权重：类选择器、属性选择器、伪类选择器
3权重：ID 选择器

一个选择器加一分
**权重高的有一票否决权，比如当存在ID选择器时加一分，此时就算有一百个类选择器加了一百分还是不如那个ID选择器的一分。因为ID选择器的权重是3，而类选择器的权重只有2。权重高的有一票否决权。**

另外不要认为只有标签上的选择器才会进行加权比较。其实就连外部样式的关于这个标签的整个样式链都会参与加权比较。
例如：
``` html
<!-- 注意样式第二行不止.chain-c这个选择器参与了计算加权 .chain-a、.chain-b、.chain-c这三个选择器都参与了加权 -->
<!-- 此外因为第一行是ID选择器它权重最高为3 那么很可惜后面第二行即便有3个类选择器并且它在后面 但还是无法生效 -->
<!-- 此时aaa颜色为yellow -->
<style>
#chain-c{color:yellow;}
.chain-a .chain-b .chain-c{color:red;}
.chain-c{color:blue;}
</style>

<div class="chain-a">
    <div class="chain-b">
        <div id="chain-c" class="chain-c">aaa</div>
    </div>
</div>
```

这也就是为什么有时候在写了这样的样式.chain-c{color:blue;}就是不生效，其实它之前肯定存在权重更高的样式。只有在权重分相同的情况浏览器才会去考虑离标签的远近。

## CSS 优先规则5

即!important它的优先级最高
可以看作权重为5

## 总结

5权重(!important) > 4权重(内联样式) > 3权重(ID 选择器) > 2权重(类选择器 = 属性选择器 = 伪类选择器) > 1权重(标签选择器 = 伪元素选择器)

1、同一组选择器链条只看权重最高的
2、权重相同看权重选择器个数
3、权重相同个数也相同再看离标签的远近（可以理解为后面的覆盖前面的）