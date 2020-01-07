## div
```html
<div></div><!-- 无属性的块级元素 -->
<!-- 
1.每个块级元素都是独自占一行，其后的元素也只能另起一行，并不能两个元素共用一行。
2.元素的高度、宽度、行高和顶底边距都是可以设置的。　　
3.元素的宽度如果不设置的话，默认为父元素的宽度。
-->
```

## span
```html
<span></span><!-- 无属性的行级元素 -->
<!-- 
1.可以和其他元素处于一行，不用必须另起一行。
2.元素的高度、宽度及顶部和底部边距不可设置。
3.元素的宽度就是它包含的文字、图片的宽度，不可改变。
-->
```

## a
```html
<a href="xxx.com" target="_blank">click</a><!-- 在新窗口打开链接 -->
<a href="xxx.com" target="_self">click</a><!-- 默认，在当前窗口打开链接 -->
<a href="xxx.com" target="_parent">click</a><!-- 在父框架中打开链接 -->
<a href="xxx.com" target="_top">click</a><!-- 在顶层框架中打开链接 -->
```

## form
```html
<form action="form_action.asp" method="get">
```

## input
```html
<input type="text" name="name" value="" />
<input type="button" value="Click me" onclick="msg()" /><!-- 按钮 -->
<input type="hidden" name="country" value="Norway" /><!-- 隐藏字段 -->
<input type="file" name="pic" accept="image/gif" /><!-- 上传文件 -->
<input type="password" name="pwd" /><!-- 密码字段 -->
<input type="checkbox" name="vehicle" value="Bike" /><!-- 复选框 -->
<input type="radio" name="sex" value="male" /><!-- 单选框 -->
<input type="reset" /><!-- 重置按钮，清除from内所有数据 -->
<input type="submit" value="Submit" /><!-- 提交按钮 -->
<input type="image" src="submit.gif" alt="Submit" /><!-- 图片提交按钮 -->
```

## table
```html
<table border="1">
  <tr><!-- 行 -->
    <th>Month</th><!-- 表头 -->
    <th colspan="2">Savings</th><!-- 横跨多少列 -->
    <th rowspan="2">Savings</th><!-- 横跨多少行 -->
  </tr>
  <tr>
    <td>January</td><!-- 单元格 -->
    <td colspan="2">$100</td><!-- 横跨多少列 -->
    <td rowspan="2">$100</td><!-- 横跨多少行 -->
  </tr>
</table>
```

## ul 无序列表
```html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

## ol 有序列表
```html
<ol start="2"><!-- 规定有序列表的起始值 -->
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
<ol reversed><!-- H5|规定有序列表为降序 -->
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ol>
```