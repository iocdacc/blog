<template>
  <div class="m-article">
    <h1 class="title">持续集成 - 使用Gilab CI进行前端项目的持续集成</h1>
    <div class="info">
      <span>2019-09-20</span>
      <span>495</span>
      <span>持续集成</span>
    </div>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import marked from "marked";
import axios from "axios";

export default {
  name: "mArticle",
  props: {
  },
  data:function (){
    return {
      content:""
    }
  },
  beforeCreate() {
    let that = this
    axios.get("/md/可能被忽略的CSS优先级问题.md").then(function(response) {
      that.content = marked(response.data)
      window.console.log(response)
    })
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
.m-article /deep/ .content {
  padding: 24px 0 0 0;
  font-size: 1.2rem;
}
.m-article /deep/ .content p {
  margin: 1rem 0;
  word-break: break-all;
  text-align: justify;
}
.m-article /deep/ .content .h1,
.m-article /deep/ .content h1 {
  letter-spacing: 0.01em;
  font-size: 1.6em;
  font-style: normal;
  font-weight: 700;
  color: #2bbc8a;
  margin-top: 3rem;
  margin-bottom: 1rem;
  display: block;
}
.m-article /deep/ .content .h2,
.m-article /deep/ .content h2,
.m-article /deep/ .content h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #eee;
}
.m-article /deep/ .content .h2,
.m-article /deep/ .content h2 {
  position: relative;
  text-transform: none;
  letter-spacing: normal;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
  display: block;
}
.m-article /deep/ .content h2:before {
  content: "#";
  color: #2bbc8a;
  position: absolute;
  left: -1.5rem;
  top: 0rem;
  font-size: 1.6rem;
  font-weight: 700;
}
.m-article /deep/ .content h4,
.m-article /deep/ .content h5,
.m-article /deep/ .content h6 {
  font-size: 1.2rem;
  font-weight: 400;
  color: #ccc;
  border-bottom: 1px dashed #ccc;
  display: inline;
  text-decoration: none;
}
.m-article /deep/ .content dt,
.m-article /deep/ .content strong,
.m-article /deep/ .content th {
  font-weight: 700;
}
.m-article /deep/ .content h3,
.m-article /deep/ .content h4,
.m-article /deep/ .content h5,
.m-article /deep/ .content h6 {
  margin-top: 0.9rem;
  margin-bottom: 0.5rem;
}
</style>