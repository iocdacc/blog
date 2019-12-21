<template>
  <div class="m-tag clear">
    <ul>
      <li class="level1">Centos</li>
      <li class="level2">Centos</li>
      <li class="level3">Centos</li>
      <li class="level4">Centos</li>
      <li class="level5">Centos</li>
      <li class="level6">Centos</li>
      <li class="level7">Centos</li>
      <li class="level6">Centos</li>
      <li class="level5">Centos</li>
      <li class="level4">Centos</li>
      <li class="level3">Centos</li>
      <li class="level2">Centos</li>
      <li class="level1">Centos</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mTag",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 文章标签 */
.m-tag {
  padding: 40px 0 0 0;
}
.m-tag ul li {
  float: left;
  margin: 0 5px 0 0;
  line-height: 34px;
}
.m-tag ul li.level1 {
  font-size: 1rem;
}
.m-tag ul li.level2 {
  font-size: 1.2rem;
}
.m-tag ul li.level3 {
  font-size: 1.4rem;
}
.m-tag ul li.level4 {
  font-size: 1.6rem;
}
.m-tag ul li.level5 {
  font-size: 1.8rem;
}
.m-tag ul li.level6 {
  font-size: 2rem;
}
.m-tag ul li.level7 {
  font-size: 2.2rem;
}
</style>