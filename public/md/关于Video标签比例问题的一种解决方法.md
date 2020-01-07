##问题
因为video标签默认是固定比例的 也就是说视频的比例是多少标签会自动调整高宽做到等比例。  

但这带来一个问题，如果外部标签设置了高宽，video标签因为视频比例问题 会溢出外部标签无视外部标签的高宽。
  
然而video标签固定比例无可厚非，因为视频本身就应该固定比例，不然视频就变形了。  

**一般的做法是将video标签高宽设置为100%，自此一般情况下就完美解决了。**  

但如果video存在兄弟标签毫无疑问设置100%是不行的，这会把兄弟标签挤出去。  

当然你可以把高度固定，但这样就无法自适应外部标签了。

##解决方法
使用弹性盒子可以完美解决此类问题。

```
<style>
    .video-box{
      display: flex;  /*设置弹性盒子*/
      flex-direction: column;/*设置纵向排列*/
      width: 500px;
      height: 500px;
    }
    .video-box video{
      flex-grow: 1;/*空间多余时放大占用100%多余空间*/
      width: 100%;
      height: 0;/*此处就是重点设置高度为0*/
    }
    .video-box .menu{
      height: 30px;
      flex-shrink: 0;/*空间不足时不缩小*/
    }
</style>

<div class="video-box">
    <video></video>
    <div class="menu"></div>
</div>
```
为什么video标签要设置高度0，因为固定比例的原因，高度在特殊情况会溢出，设置高度0可以充分利用弹性盒子的特性。

因为弹性盒子的子元素设置了flex-grow: 1;的原因，他会自动占用多余空间，那高度为0，其多余空间自然是除了兄弟元素的空间。

这样就做到了自适应父标签的高宽。

###第二种方法

```
<style>
    .video-box{
      display: flex;  /*设置弹性盒子*/
      flex-direction: column;/*设置纵向排列*/
      width: 500px;
      height: 500px;
    }
    .video-box .video-main {
      flex-grow: 1;/*空间多余时放大占用100%多余空间*/
      display: flex;  /*设置弹性盒子*/
    }
    .video-box .video-main video{
      width: 100%;
      max-height: 100%;
    }
    .video-box .menu{
      height: 30px;
      flex-shrink: 0;/*空间不足时不缩小*/
    }
</style>

<div class="video-box">
    <div class="video-main">
        <video></video>
    </div>
    <div class="menu"></div>
</div>
```
发现了弹性盒子新特性，在设置了弹性盒子display: flex;后，子元素video标签无法因为比例问题将父元素撑出极限。

这样同样也能自适应外部高宽。

##总结

其实这类固定比例的标签应该都有这个问题
