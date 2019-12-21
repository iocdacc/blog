<template>
  <div class="m-article">
    <h1 class="title">持续集成 - 使用Gilab CI进行前端项目的持续集成</h1>
    <div class="info">
      <span>2019-09-20</span>
      <span>495</span>
      <span>持续集成</span>
    </div>
    <div class="content">
      <p>所有的Gitlab任务都会放在Gitlab Runner中执行.</p>
      <p>GitLab Runner的安装环境,根据你的需求而定,一个gitlab 可以注册的Runner是没有限制的.</p>
      <p>普通的前端项目直接安装在Linux中就可以了,如果是小程序或者RN这种项目,目前我是直接找了一台mac mini来安装Runner.</p>
      <h2>GitLab Runner安装</h2>
      <p>安装Runner 非常简单, 这里晒出Gitlab的官方安装教程,你可以根据你的系统环境自行下载.</p>
      <h2>本文链接：</h2>
      <p>
        <a href>file:///D:/code/blog-static/archive.html</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "mArticle",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 文章内容 */
.m-article {
  padding: 0 16px;
}
.m-article .title {
  font-size: 1.75rem;
  color: #2bbc8a;
  padding: 64px 0 0 0;
}
.m-article .info {
  padding: 2px 0 0 0;
  font-size: 1.2rem;
}
.m-article .content {
  padding: 24px 0 0 0;
  font-size: 1.2rem;
}
.m-article .content p {
  margin: 1rem 0;
  word-break: break-all;
  text-align: justify;
}
.m-article .content .h1,
.m-article .content h1 {
  letter-spacing: 0.01em;
  font-size: 1.6em;
  font-style: normal;
  font-weight: 700;
  color: #2bbc8a;
  margin-top: 3rem;
  margin-bottom: 1rem;
  display: block;
}
.m-article .content .h2,
.m-article .content h2,
.m-article .content h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #eee;
}
.m-article .content .h2,
.m-article .content h2 {
  position: relative;
  text-transform: none;
  letter-spacing: normal;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}
.m-article .content h2:before {
  content: "#";
  color: #2bbc8a;
  position: absolute;
  left: -1.5rem;
  top: 0rem;
  font-size: 1.6rem;
  font-weight: 700;
}
.m-article .content h4,
.m-article .content h5,
.m-article .content h6 {
  font-size: 1.2rem;
  font-weight: 400;
  color: #ccc;
  border-bottom: 1px dashed #ccc;
  display: inline;
  text-decoration: none;
}
.m-article .content dt,
.m-article .content strong,
.m-article .content th {
  font-weight: 700;
}
.m-article .content h3,
.m-article .content h4,
.m-article .content h5,
.m-article .content h6 {
  margin-top: 0.9rem;
  margin-bottom: 0.5rem;
}
</style>